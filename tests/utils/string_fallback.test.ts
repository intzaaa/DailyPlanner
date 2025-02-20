import { assertEquals } from "https://deno.land/std@0.194.0/testing/asserts.ts";
import { n, e } from "../../src/utils/string_fallback.ts";

Deno.test("string_fallback - undefined fallback", () => {
  assertEquals(n`Hello, ${undefined}!`, undefined);
  assertEquals(n`Hello, ${"world"}!`, "Hello, world!");
});

Deno.test("string_fallback - empty string fallback", () => {
  assertEquals(e`Hello, ${null}!`, "");
  assertEquals(e`Hello, ${"world"}!`, "Hello, world!");
});
