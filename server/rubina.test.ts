import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("Rubina companion", () => {
  it("requires an authenticated member before opening chat", async () => {
    const ctx = { user: null, req: {}, res: {} } as TrpcContext;
    await expect(appRouter.createCaller(ctx).rubina.chat({
      messages: [{ role: "user", content: "Ciao Rubina" }],
    })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });
});
