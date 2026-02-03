// Type declaration for optional extension
import type { BaseLogger } from "~/core/logger";

declare module "~/extensions/logger/logger" {
  export const logger: BaseLogger;
}
