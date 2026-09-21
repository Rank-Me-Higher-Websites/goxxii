import { QueryClient } from "@tanstack/react-query";

/** Server errors are JSON ({ message }), but a crash can still come back as an
 *  HTML error page. Fall back to the status code rather than a bare
 *  "Request failed": over HTTP/2 res.statusText is always empty, so without the
 *  code the UI shows nothing anyone can act on. */
async function errorMessage(res: Response): Promise<string> {
  const body = await res.json().catch(() => null);
  return body?.message || res.statusText || `Request failed (HTTP ${res.status})`;
}

async function apiRequest(url: string, options?: RequestInit) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });
  if (!res.ok) {
    throw new Error(await errorMessage(res));
  }
  return res.json();
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const res = await fetch(queryKey[0] as string, { credentials: "include" });
        if (!res.ok) {
          throw new Error(await errorMessage(res));
        }
        return res.json();
      },
      staleTime: 1000 * 60,
      retry: false,
    },
  },
});

export { apiRequest };
