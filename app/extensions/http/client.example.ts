/**
 * Example HTTP Client Extension
 *
 * Copy this file to client.ts to override the base HTTP client
 *
 * This is an EXAMPLE file - rename to client.ts to use it
 */

import { BaseHttpClient } from "~/core/http";
import type { AxiosError } from "axios";

export class ExtendedHttpClient extends BaseHttpClient {
  protected getAuthToken(): string | null {
    // Custom token retrieval logic
    // Example: Get from a different storage or API
    if (typeof window !== "undefined") {
      // Try multiple sources
      return (
        localStorage.getItem("auth_token") ||
        sessionStorage.getItem("auth_token") ||
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1] ||
        null
      );
    }
    return null;
  }

  protected async handleResponseError(error: AxiosError): Promise<never> {
    // Custom error handling
    if (error.response) {
      const { status } = error.response;

      // Handle specific status codes with custom logic
      switch (status) {
        case 401:
          // Custom 401 handling - maybe refresh token?
          this.handleUnauthorized();
          break;
        case 403:
          // Custom 403 handling
          // Maybe redirect to a "no access" page
          break;
        case 429:
          // Rate limiting - maybe show a toast
          break;
        default:
          // Call base implementation for other errors
          return super.handleResponseError(error);
      }
    }

    return super.handleResponseError(error);
  }

  protected handleUnauthorized(): void {
    // Custom unauthorized handling
    // Maybe try to refresh token first?
    // Or redirect to a specific login page

    if (typeof window !== "undefined") {
      // Clear tokens
      localStorage.removeItem("auth_token");
      sessionStorage.removeItem("auth_token");

      // Redirect to login with return URL
      const returnUrl = encodeURIComponent(window.location.pathname);
      window.location.href = `/login?returnUrl=${returnUrl}`;
    }
  }
}

export const httpClient = new ExtendedHttpClient({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 30000,
  withCredentials: true,
});
