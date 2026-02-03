import type { Route } from "./+types/unauthorized";
import { Unauthorized } from "~/pages";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Access denied" },
    { name: "description", content: "You do not have permission to access this page" },
  ];
}

export default function UnauthorizedRoute() {
  return <Unauthorized />;
}
