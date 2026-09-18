import { useEffect, useMemo, useState } from "react";
import { LiveKitRoom, RoomAudioRenderer, StartAudio, VideoConference } from "@livekit/components-react";
import { ArrowUpRight, Ban, Bot, CheckCircle2, ExternalLink, Flag, LockKeyhole, Radio, Send, ShieldCheck, Sparkles, Users, Video, VolumeX } from "lucide-react";
import { toast } from "sonner";
import VelvetNav from "@/components/VelvetNav";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

export default function LiveHub() {
  const { isAuthenticated, user } = useAuth();
  const [roomName] = useState("after-dark");
  const [liveToken, setLiveToken] = useState<{ token: string; url: string } | null>(null);
  const [message, setMessage] = useState("");
  const statusQuery = trpc.integrations.status.useQuery();
  const roomsQuery = trpc.rooms.list.useQuery();
  const selectedRoom = roomsQuery.data?.[0];
  const messagesQuery = trpc.rooms.messages.useQuery({ roomId: selectedRoom?.id ?? 0 }, { enabled: Boolean(selectedRoom?.id), refetchInterval: 5000 });
  const tokenMutation = trpc.integrations.livekitToken.useMutation();
  const sendMutation = trpc.rooms.send.useMutation({ onSuccess: async () => { setMessage(""); await messagesQuery.refetch(); } });
  const joinMutation = trpc.rooms.join.useMutation();
  const reportMutation = trpc.safety.report.useMutation({ onSuccess: () => toast.success("Segnalazione inviata", { description: "Il team safety la prenderà in carico." }) });
  const banMutation = trpc.moderation.ban.useMutation({ onSuccess: () => toast.success("Utente rimosso e bannato dalla room") });
  const muteMutation = trpc.moderation.mute.useMutation({ onSuccess: () => toast.success("Traccia silenziata") });
  const [targetUserId, setTargetUserId] = useState("");
  const [trackSid, setTrackSid] = useState("");
  const [moderationReason, setModerationReason] = useState("Violazione delle regole della room");
  const status = statusQuery.data;
  const canUseLive = Boolean(isAuthenticated && status?.livekit.configured);

  const joinLive = () => {
    if (!isAuthenticated) { toast.error("Accedi per entrare nella live room"); return; }
    tokenMutation.mutate({ room: roomName, role: "viewer" }, { onSuccess: result => {
      if (!result.configured) { toast("LiveKit non configurato", { description: "Aggiungi le variabili server prima di aprire il video reale." }); return; }
      setLiveToken({ token: result.token, url: result.url });
    }, onError: () => toast.error("Impossibile creare il token live") });
  };

  const joinHumanChat = () => {
    if (!isAuthenticated) { toast.error("Accedi per usare la webchat"); return; }
    if (!selectedRoom) { toast("Chat pronta", { description: "La prima room verrà resa disponibile quando il catalogo live sarà popolato." }); return; }
    joinMutation.mutate({ roomId: selectedRoom.id }, { onSuccess: () => toast.success("Sei entrato nella room") });
  };

  const sendHumanMessage = () => {
    if (!isAuthenticated) { toast.error("Accedi per scrivere nella chat"); return; }
    if (!selectedRoom || !message.trim()) return;
    sendMutation.mutate({ roomId: selectedRoom.id, body: message.trim() });
  };

  const reportRoom = () => {
    if (!isAuthenticated || !selectedRoom) { toast.error("Accedi per inviare una segnalazione"); return; }
    reportMutation.mutate({ roomId: selectedRoom.id, reason: "Segnalazione room live", details: "Segnalazione inviata dalla Live Hub." });
  };

  const moderate = (action: "ban" | "mute") => {
    const userId = Number(targetUserId);
    if (!Number.isInteger(userId) || userId <= 0) { toast.error("Inserisci un ID utente valido"); return; }
    if (action === "ban" && selectedRoom) banMutation.mutate({ roomId: selectedRoom.id, room: roomName, userId, reason: moderationReason });
    if (action === "mute") {
      if (!trackSid.trim()) { toast.error("Inserisci il track SID della pubblicazione"); return; }
      muteMutation.mutate({ room: roomName, userId, trackSid: trackSid.trim(), muted: true });
    }
  };

  useEffect(() => () => { setLiveToken(null); }, []);
  const liveLabel = useMemo(() => status?.livekit.configured ? "pronto" : "da configurare", [status?.livekit.configured]);

  return <div className="velvet-shell min-h-screen"><VelvetNav /><main className="container max-w-7xl py-12 md:py-16">
    <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><p className="section-kicker flex items-center gap-2"><span className="live-dot" /> Live / 18+ / consenso</p><h1 className="display-font mt-4 text-6xl leading-[.94] text-white md:text-8xl">La stanza<br /><span className="text-[#d7b46a]">è aperta.</span></h1><p className="mt-6 max-w-2xl text-base leading-8 text-[#bcaeba]">Video live proprietario, webchat con persone reali e Rubina AI nello stesso ecosistema. Nessun mirroring non autorizzato: ogni ingresso è tracciabile, revocabile e moderabile.</p></div><div className="rounded-3xl border border-[#d7b46a]/20 bg-[#190e22] p-6"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#d7b46a] text-[#0b070d]"><ShieldCheck size={19} /></span><div><p className="section-kicker">Stack proprietario</p><p className="font-extrabold text-white">Controllo prima dell'effetto</p></div></div><div className="mt-5 space-y-3 text-xs text-[#b8a8b4]"><div className="flex items-center justify-between"><span className="flex items-center gap-2"><Video size={14} /> Live video / LiveKit</span><span className={status?.livekit.configured ? "text-[#93e5b0]" : "text-[#e4b66b]"}>{liveLabel}</span></div><div className="flex items-center justify-between"><span className="flex items-center gap-2"><Users size={14} /> Webchat / Red Velvet</span><span className="text-[#93e5b0]">attiva</span></div><div className="flex items-center justify-between"><span className="flex items-center gap-2"><Bot size={14} /> Rubina AI</span><span className="text-[#93e5b0]">attiva</span></div></div></div></div>

    <section className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_.7fr]"><div className="overflow-hidden rounded-3xl border border-white/10 bg-[#120b19]">
      {liveToken ? <div className="h-[min(70vh,680px)]"><LiveKitRoom token={liveToken.token} serverUrl={liveToken.url} connect video audio={false} options={{ adaptiveStream: true, dynacast: true }} onDisconnected={() => setLiveToken(null)}><VideoConference /><RoomAudioRenderer /><StartAudio label="Attiva audio" /></LiveKitRoom></div> : <div className="grid min-h-[500px] place-items-center bg-[radial-gradient(circle_at_70%_25%,rgba(144,64,112,.35),transparent_32%),linear-gradient(145deg,#28152d,#100910)] p-8 text-center"><div className="max-w-md"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#d7b46a]/40 bg-[#d7b46a]/10 text-[#d7b46a]"><Radio size={28} /></div><p className="section-kicker mt-6">Live room / {roomName}</p><h2 className="display-font mt-3 text-4xl text-white">After Dark</h2><p className="mt-3 text-sm leading-6 text-[#c0b0bb]">Entra come spettatore. Host e moderator possono pubblicare solo dopo autorizzazione server-side.</p><button onClick={joinLive} disabled={tokenMutation.isPending || !canUseLive} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#d7b46a] px-5 py-3 text-sm font-extrabold text-[#100b0d] disabled:cursor-not-allowed disabled:opacity-50"><Video size={16} />{canUseLive ? (tokenMutation.isPending ? "Apertura…" : "Entra nella live") : "Live in configurazione"}</button></div></div>}
    </div><aside className="space-y-6"><section className="rounded-3xl border border-[#d7b46a]/20 bg-[#190e22] p-6"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#d7b46a] text-[#0b070d]"><Users size={18} /></span><div><p className="section-kicker">Chat umana</p><h2 className="mt-1 text-xl font-extrabold text-white">Persone reali</h2></div></div><p className="mt-4 text-sm leading-6 text-[#bbaab8]">Chat proprietaria con messaggi persistenti, blocco, report e moderazione. Nessuna registrazione a servizi esterni.</p><div className="mt-5 h-[270px] overflow-y-auto rounded-2xl border border-white/10 bg-[#100a15] p-3">{messagesQuery.data?.length ? <div className="space-y-3">{[...(messagesQuery.data ?? [])].reverse().map(item => <div key={item.id}><p className="text-[11px] font-extrabold text-[#f1d58f]">{item.displayName}</p><p className="mt-1 text-xs leading-5 text-[#c2b2bf]">{item.body}</p></div>)}</div> : <div className="grid h-full place-items-center px-4 text-center text-xs leading-5 text-[#958493]">{selectedRoom ? "Nessun messaggio ancora. Apri la conversazione con una frase semplice." : "La lobby chat verrà popolata insieme alle prime room live."}</div>}</div><div className="mt-3 flex gap-2"><input value={message} onChange={event => setMessage(event.target.value)} onKeyDown={event => { if (event.key === "Enter") sendHumanMessage(); }} disabled={!isAuthenticated || !selectedRoom} placeholder={isAuthenticated ? "Scrivi alla room…" : "Accedi per scrivere"} className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-xs text-white outline-none placeholder:text-[#817180] focus:border-[#d7b46a]/50" /><button onClick={sendHumanMessage} disabled={sendMutation.isPending || !isAuthenticated || !selectedRoom} aria-label="Invia messaggio" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#d7b46a] text-[#100b0d] disabled:opacity-40"><Send size={15} /></button></div><div className="mt-3 flex gap-2"><button onClick={joinHumanChat} disabled={joinMutation.isPending} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#d7b46a]/40 bg-[#d7b46a]/10 px-4 py-3 text-xs font-extrabold text-[#f1d58f] disabled:opacity-50"><LockKeyhole size={15} />{isAuthenticated ? "Entra nella chat" : "Accedi per entrare"}</button><button onClick={reportRoom} disabled={reportMutation.isPending} aria-label="Segnala la room" className="grid h-10 w-10 place-items-center rounded-full border border-[#c65b76]/40 text-[#e69caf] disabled:opacity-50"><Flag size={15} /></button></div></section>{user?.role === "admin" && <section className="rounded-3xl border border-[#c65b76]/30 bg-[#1d0e1b] p-6"><div className="flex items-center gap-3"><ShieldCheck size={18} className="text-[#e69caf]" /><div><p className="section-kicker text-[#e69caf]">Moderator console</p><h2 className="mt-1 text-xl font-extrabold text-white">Controlli room</h2></div></div><p className="mt-3 text-xs leading-5 text-[#c6aeb9]">Usa l'ID mostrato nei log utenti e il track SID LiveKit per intervenire senza toccare i dati di altri account.</p><input value={targetUserId} onChange={event => setTargetUserId(event.target.value)} inputMode="numeric" placeholder="ID utente" className="mt-4 w-full rounded-xl border border-white/10 bg-white/[.04] px-3 py-2.5 text-xs text-white outline-none" /><input value={trackSid} onChange={event => setTrackSid(event.target.value)} placeholder="Track SID (per mute)" className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.04] px-3 py-2.5 text-xs text-white outline-none" /><input value={moderationReason} onChange={event => setModerationReason(event.target.value)} placeholder="Motivo" className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.04] px-3 py-2.5 text-xs text-white outline-none" /><div className="mt-3 grid grid-cols-2 gap-2"><button onClick={() => moderate("mute")} disabled={muteMutation.isPending} className="flex items-center justify-center gap-2 rounded-xl border border-[#d7b46a]/40 bg-[#d7b46a]/10 py-2.5 text-xs font-extrabold text-[#f1d58f]"><VolumeX size={14} /> Mute</button><button onClick={() => moderate("ban")} disabled={banMutation.isPending} className="flex items-center justify-center gap-2 rounded-xl border border-[#c65b76]/40 bg-[#c65b76]/10 py-2.5 text-xs font-extrabold text-[#f2b2c1]"><Ban size={14} /> Ban + rimuovi</button></div></section>}<section className="rounded-3xl border border-white/10 bg-[#120b19] p-6"><div className="flex items-center gap-3"><Sparkles size={18} className="text-[#d7b46a]" /><h2 className="font-extrabold text-white">Rubina AI</h2></div><p className="mt-3 text-sm leading-6 text-[#b8a8b4]">Companion separata dalle persone reali. Ruolo adulto, consensuale e non grafico, con uscita immediata e safety escalation.</p><a href="#rubina" className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-[#f1d58f]">Apri Rubina <ArrowUpRight size={14} /></a></section></aside></section>

    <section className="mt-10 rounded-3xl border border-white/10 bg-[#120b19] p-6 md:p-8"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="section-kicker">Partner esterni 18+</p><h2 className="display-font mt-2 text-3xl text-white">Scopri senza confondere i confini.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#b7a7b3]">Questi collegamenti aprono piattaforme esterne. Red Velvet non replica stream, chat o contenuti e non garantisce le policy del partner.</p></div><CheckCircle2 className="text-[#d7b46a]" /></div><div className="mt-6 grid gap-4 md:grid-cols-2">{status?.affiliates.map(item => <a key={item.id} href={item.href} target="_blank" rel="noreferrer" className="group rounded-2xl border border-white/10 bg-white/[.03] p-5 transition hover:-translate-y-1 hover:border-[#d7b46a]/40"><div className="flex items-center justify-between"><p className="font-extrabold text-white">{item.label}</p><ExternalLink size={15} className="text-[#d7b46a]" /></div><p className="mt-3 text-xs leading-5 text-[#a99aa8]">{item.disclosure}</p></a>)}</div></section>
  </main></div>;
}
