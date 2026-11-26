import type { Dataset, Health, ModelType } from "../types";

const base = (import.meta.env.VITE_API_BASE_URL || "/api/v1").replace(/\/+$/, "");

async function request<T>(endpoint: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${base}${endpoint}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    signal,
  });
  if (!response.ok) {
    throw new Error(`API returned HTTP ${response.status}`);
  }
  return (await response.json()) as T;
}

export const api = {
  health: (signal?: AbortSignal) => request<Health>("/health/", signal),
  datasets: (signal?: AbortSignal) =>
    request<{ results: Dataset[] }>("/datasets/", signal),
  modelTypes: (signal?: AbortSignal) =>
    request<{ results: ModelType[] }>("/model-types/", signal),
};
