/**
 * Centralized API client.
 *
 * This is the single integration point for the future FastAPI backend. Every
 * service module goes through `apiClient` so switching from mock data to the
 * live API is a one-file change: point `API_BASE_URL` at the FastAPI origin
 * and set `USE_MOCK_DATA` to `false`.
 */

export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "/api";

export const USE_MOCK_DATA =
  (import.meta.env.VITE_USE_MOCK_DATA as string | undefined) !== "false";

export class ApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export interface RequestOptions<TBody = unknown> {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: TBody;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

async function request<TResponse, TBody = unknown>(
  path: string,
  options: RequestOptions<TBody> = {},
): Promise<TResponse> {
  const { method = "GET", body, headers, signal } = options;
  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal,
  });

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new ApiError(response.status, message || `Request failed: ${response.status}`);
  }

  if (response.status === 204) return undefined as TResponse;
  return (await response.json()) as TResponse;
}

/** Simulates network latency for mock responses. */
function delay<T>(value: T, ms = 200): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const apiClient = {
  get: <T>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T, B = unknown>(path: string, body?: B, options?: Omit<RequestOptions<B>, "method" | "body">) =>
    request<T, B>(path, { ...options, method: "POST", body }),
  put: <T, B = unknown>(path: string, body?: B, options?: Omit<RequestOptions<B>, "method" | "body">) =>
    request<T, B>(path, { ...options, method: "PUT", body }),
  delete: <T>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...options, method: "DELETE" }),
  /** Return a mock payload as if it came from the API. */
  mock: delay,
};
