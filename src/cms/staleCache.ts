import { unstable_cache } from 'next/cache';

/**
 * Dois níveis de cache para resiliência a quedas do CMS.
 *
 * Problema: quando o cache primário expira (TTL) ou é purgado via
 * revalidateTag, a próxima requisição tenta buscar dado novo. Se o CMS
 * estiver fora nesse momento, a requisição falha.
 *
 * Solução:
 * - Primary: TTL normal + tags (purgável pelo webhook do CMS)
 * - Fallback: revalidate: false, sem tags (nunca expira, nunca é purgado)
 *
 * Quando o primary falha (cache miss + CMS indisponível), o fallback
 * retorna o último dado conhecido em vez de propagar o erro. O fallback
 * só falha no primeiro request de todo o histórico (sem dado anterior).
 */
export function withStaleFallback<Args extends unknown[], Result>(
  fn: (...args: Args) => Promise<Result>,
  primaryKey: string,
  primaryOpts: { revalidate: number; tags?: string[] },
  fallbackKey: string
): (...args: Args) => Promise<Result> {
  const primary = unstable_cache(fn, [primaryKey], primaryOpts);
  const fallback = unstable_cache(fn, [fallbackKey], { revalidate: false });

  return async (...args: Args): Promise<Result> => {
    try {
      return await primary(...args);
    } catch (error) {
      console.warn(
        `[cms] primary cache indisponível para "${primaryKey}", servindo dado stale`,
        error instanceof Error ? error.message : error
      );
      return fallback(...args);
    }
  };
}
