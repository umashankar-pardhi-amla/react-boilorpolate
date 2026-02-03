// Type declaration for optional extension
import type { ComponentType, ReactNode } from "react";

declare module "~/extensions/ui/provider" {
  export const UIProvider: ComponentType<{ children?: ReactNode }>;
  const Provider: ComponentType<{ children?: ReactNode }>;
  export default Provider;
}
