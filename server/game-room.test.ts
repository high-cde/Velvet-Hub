import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Ruby Lounge game room", () => {
  it("ships an adult-gated, non-explicit interactive scene", () => {
    const source = readFileSync(resolve(import.meta.dirname, "../client/src/components/GameRoomManga.tsx"), "utf8");
    expect(source).toContain("adultConfirmed");
    expect(source).toContain("Scelta consensuale");
    expect(source).toContain("niente contenuto esplicito");
    expect(source).toContain("Il patto di Rubina");
  });
});
