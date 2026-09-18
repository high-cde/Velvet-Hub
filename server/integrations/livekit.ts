import { AccessToken, RoomServiceClient } from "livekit-server-sdk";
import { ENV } from "../_core/env";

export type LiveRoomRole = "viewer" | "host" | "moderator";

export function livekitConfigured() {
  return Boolean(ENV.livekitApiKey && ENV.livekitApiSecret && ENV.livekitUrl);
}

function roomService() {
  if (!livekitConfigured()) return null;
  const httpUrl = ENV.livekitUrl.replace(/^wss:\/\//, "https://").replace(/^ws:\/\//, "http://").replace(/\/$/, "");
  return new RoomServiceClient(httpUrl, ENV.livekitApiKey, ENV.livekitApiSecret);
}

export async function createLiveKitToken(input: { identity: string; name: string; room: string; role: LiveRoomRole }) {
  if (!livekitConfigured()) return { configured: false as const };
  const token = new AccessToken(ENV.livekitApiKey, ENV.livekitApiSecret, {
    identity: input.identity,
    name: input.name.slice(0, 120),
    ttl: "10m",
  });
  token.addGrant({
    room: input.room,
    roomJoin: true,
    canSubscribe: true,
    canPublish: input.role !== "viewer",
    canPublishData: true,
    roomAdmin: input.role === "moderator",
  });
  return { configured: true as const, url: ENV.livekitUrl, token: await token.toJwt(), room: input.room, role: input.role };
}

export async function removeLiveKitParticipant(room: string, identity: string) {
  const client = roomService();
  if (!client) return { configured: false as const };
  await client.removeParticipant(room, identity);
  return { configured: true as const, room, identity, action: "removed" as const };
}

export async function muteLiveKitTrack(input: { room: string; identity: string; trackSid: string; muted: boolean }) {
  const client = roomService();
  if (!client) return { configured: false as const };
  await client.mutePublishedTrack(input.room, input.identity, input.trackSid, input.muted);
  return { configured: true as const, ...input, action: input.muted ? "muted" as const : "unmuted" as const };
}
