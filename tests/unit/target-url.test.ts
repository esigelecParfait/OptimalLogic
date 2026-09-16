import { afterEach, describe, expect, it } from "vitest";

import { validateTargetUrl } from "@/lib/security/validation/target-url";

afterEach(() => {
  delete process.env.SECURITY_AUDIT_ALLOW_LOCALHOST;
});

describe("validateTargetUrl", () => {
  it("accepte et normalise une URL HTTPS", () => {
    expect(
      validateTargetUrl(" https://optimal-logic.com:443/audit#section "),
    ).toMatchObject({
      valid: true,
      normalizedUrl: "https://optimal-logic.com/audit",
    });
  });

  it("refuse HTTP et les identifiants intégrés", () => {
    expect(validateTargetUrl("http://optimal-logic.com").valid).toBe(false);
    expect(validateTargetUrl("https://user:secret@optimal-logic.com").valid).toBe(false);
  });

  it("n'autorise localhost que lorsque le mode local est explicite", () => {
    expect(validateTargetUrl("http://127.0.0.1:3000").valid).toBe(false);

    process.env.SECURITY_AUDIT_ALLOW_LOCALHOST = "true";
    expect(validateTargetUrl("http://127.0.0.1:3000").valid).toBe(true);
  });
});
