import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const read = (relativePath: string) => readFileSync(resolve(projectRoot, relativePath), "utf8");

describe("adult commerce safeguards", () => {
  it("exposes a policy page with required store-policy sections", () => {
    const policies = read("client/src/pages/Policies.tsx");
    expect(policies).toContain("Privacy policy");
    expect(policies).toContain("Termini e condizioni");
    expect(policies).toContain("Spedizioni");
    expect(policies).toContain("Resi e rimborsi");
    expect(policies).toContain("[INSERIRE RAGIONE SOCIALE E INDIRIZZO UFFICIALE]");
  });

  it("protects the adult catalog behind the shared 18+ confirmation", () => {
    const home = read("client/src/pages/Home.tsx");
    expect(home).toContain("const { adultConfirmed } = useVelvet();");
    expect(home).toContain("!adultConfirmed");
    expect(home).toContain("Catalogo riservato 18+");
    expect(read("client/src/App.tsx")).toContain('path="/policy"');
  });
});
