import type { AxiosError } from "axios";
import { http, API_URL } from "./http";

type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };

interface ApiErrorShape {
  message?: string;
  error?: string;
  errors?: { msg?: string }[];
  [key: string]: Json;
}

export function extractErrorMessage(error: unknown): string {
  const defaultMessage = "Something went wrong. Please try again.";

  const maybeAxios = error as AxiosError<ApiErrorShape> | undefined;
  const data = maybeAxios?.response?.data;

  return (
    data?.message ||
    data?.error ||
    data?.errors?.[0]?.msg ||
    (error instanceof Error ? error.message : undefined) ||
    defaultMessage
  );
}

export { http, API_URL };

