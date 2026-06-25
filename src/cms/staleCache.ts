const cacheStore = new Map<string, { data: unknown; expires: number }>();

/**
 * Cache em memória com TTL e fallback para dado stale.
 *
 * Substitui unstable_cache (App Router) no Pages Router.
 * Mesmo comportamento: TTL primário + dado stale em caso de falha do CMS.
 */
export function withStaleFallback<Args extends unknown[], Result>(
  fn: (...args: Args) => Promise<Result>,
  primaryKey: string,
  primaryOpts: { revalidate: number; tags?: string[] },
  _fallbackKey: string
): (...args: Args) => Promise<Result> {
  return async (...args: Args): Promise<Result> => {
    const key = `${primaryKey}-${JSON.stringify(args)}`;
    const now = Date.now();
    const cached = cacheStore.get(key);

    if (cached && cached.expires > now) {
      return cached.data as Result;
    }

    try {
      const result = await fn(...args);
      cacheStore.set(key, {
        data: result,
        expires: now + primaryOpts.revalidate * 1000,
      });
      return result;
    } catch (error) {
      if (cached) {
        console.warn(
          `[cms] stale fallback for "${primaryKey}"`,
          error instanceof Error ? error.message : error
        );
        return cached.data as Result;
      }
      throw error;
    }
  };
}
