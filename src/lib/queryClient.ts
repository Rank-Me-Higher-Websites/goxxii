import { QueryClient } from "@tanstack/react-query";

async function apiRequest(url: string, options?: RequestInit) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(body.message || "Request failed");
  }
  return res.json();
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const res = await fetch(queryKey[0] as string, { credentials: "include" });
        if (!res.ok) {
          const body = await res.json().catch(() => ({ message: res.statusText }));
          throw new Error(body.message || "Request failed");
        }
        return res.json();
      },
      staleTime: 1000 * 60,
      retry: false,
    },
  },
});

export { apiRequest };
