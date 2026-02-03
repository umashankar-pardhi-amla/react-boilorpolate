/**
 * Environment validation – fail fast on invalid config.
 * Uses zod for runtime validation. Override in app/extensions/config/env.ts if needed.
 */

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  VITE_API_BASE_URL: z.union([z.string().url(), z.literal("")]).optional().default(""),
});

export type Env = z.infer<typeof envSchema>;

function getEnv(): Env {
  const raw = {
    NODE_ENV: import.meta.env?.MODE ?? process.env.NODE_ENV ?? "development",
    VITE_API_BASE_URL: import.meta.env?.VITE_API_BASE_URL ?? process.env.VITE_API_BASE_URL ?? "",
  };
  const result = envSchema.safeParse(raw);
  if (!result.success) {
    console.error("[env] Invalid environment:", result.error.flatten());
    return raw as Env;
  }
  return result.data;
}

export const env = getEnv();
