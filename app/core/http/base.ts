/**
 * Base HTTP Client Implementation
 *
 * Extend this by creating app/extensions/http/client.ts
 */

import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { logger } from "../logger";

export interface HttpConfig extends AxiosRequestConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  withCredentials?: boolean;
}

export interface RequestInterceptor {
  onFulfilled?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  onRejected?: (error: unknown) => unknown;
}

export interface ResponseInterceptor {
  onFulfilled?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  onRejected?: (error: AxiosError) => unknown;
}

export class BaseHttpClient {
  protected client: AxiosInstance;
  protected requestInterceptors: RequestInterceptor[] = [];
  protected responseInterceptors: ResponseInterceptor[] = [];

  constructor(config: HttpConfig = {}) {
    this.client = axios.create({
      baseURL: config.baseURL || import.meta.env.VITE_API_BASE_URL || "/api",
      timeout: config.timeout || 30000,
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
      withCredentials: config.withCredentials ?? true,
      ...config,
    });

    this.setupDefaultInterceptors();
    this.setupCustomInterceptors();
  }

  /**
   * Setup default interceptors
   * Can be overridden in extensions
   */
  protected setupDefaultInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Log request in dev mode
        if (import.meta.env.DEV) {
          logger.debug("HTTP Request", {
            method: config.method,
            url: config.url,
            baseURL: config.baseURL,
          });
        }

        return config;
      },
      (error) => {
        logger.error("HTTP Request Error", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        // Log response in dev mode
        if (import.meta.env.DEV) {
          logger.debug("HTTP Response", {
            status: response.status,
            url: response.config.url,
          });
        }
        return response;
      },
      async (error: AxiosError) => {
        return this.handleResponseError(error);
      }
    );
  }

  /**
   * Setup custom interceptors registered via addRequestInterceptor/addResponseInterceptor
   */
  protected setupCustomInterceptors(): void {
    // Request interceptors
    this.requestInterceptors.forEach((interceptor) => {
      this.client.interceptors.request.use(interceptor.onFulfilled, interceptor.onRejected);
    });

    // Response interceptors
    this.responseInterceptors.forEach((interceptor) => {
      this.client.interceptors.response.use(interceptor.onFulfilled, interceptor.onRejected);
    });
  }

  /**
   * Get auth token - can be overridden
   */
  protected getAuthToken(): string | null {
    // Base implementation - can be overridden in extensions
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
    }
    return null;
  }

  /**
   * Handle response error - can be overridden
   */
  protected async handleResponseError(error: AxiosError): Promise<never> {
    if (error.response) {
      const { status, data } = error.response;

      // Handle specific status codes
      switch (status) {
        case 401:
          logger.warn("Unauthorized request", { url: error.config?.url });
          this.handleUnauthorized();
          break;
        case 403:
          logger.warn("Forbidden request", { url: error.config?.url });
          break;
        case 404:
          logger.warn("Resource not found", { url: error.config?.url });
          break;
        case 500:
          logger.error("Server error", undefined, { url: error.config?.url, data });
          break;
        default:
          logger.error("HTTP Error", undefined, { status, url: error.config?.url, data });
      }
    } else if (error.request) {
      logger.error("Network error - no response received", error);
    } else {
      logger.error("Request setup error", error);
    }

    return Promise.reject(error);
  }

  /**
   * Handle unauthorized - can be overridden
   */
  protected handleUnauthorized(): void {
    // Base implementation - can be overridden
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      sessionStorage.removeItem("auth_token");
      // Redirect to login - can be overridden
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
  }

  /**
   * Add custom request interceptor
   */
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
    this.client.interceptors.request.use(interceptor.onFulfilled, interceptor.onRejected);
  }

  /**
   * Add custom response interceptor
   */
  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
    this.client.interceptors.response.use(interceptor.onFulfilled, interceptor.onRejected);
  }

  /**
   * Get the underlying axios instance
   */
  getInstance(): AxiosInstance {
    return this.client;
  }

  // Convenience methods
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(url, data, config);
  }

  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }
}
