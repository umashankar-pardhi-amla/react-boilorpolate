/**
 * Health check route – returns 200 for load balancers / monitoring.
 * GET /health
 */

import type { Route } from "./+types/health";

export function meta(_args: Route.MetaArgs) {
  return [{ title: "Health" }];
}

export default function Health() {
  return (
    <main style={{ padding: "1rem", fontFamily: "monospace" }}>
      <pre data-testid="health-status">{'{"status":"ok"}'}</pre>
    </main>
  );
}
