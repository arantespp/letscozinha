export const CMS_URL = process.env.CMS_URL;

export const CMS_TOKEN = process.env.CMS_TOKEN;

export const API_MAX_LIMIT = 100;

const CMS_FETCH_MAX_ATTEMPTS = 4;

const CMS_FETCH_BACKOFF_MS = 1000;

/**
 * Fetch autenticado ao CMS com retry e backoff exponencial (1s, 2s, 4s).
 *
 * O CMS ocasionalmente recusa conexões sob carga (UND_ERR_CONNECT_TIMEOUT),
 * e uma única falha durante o build derruba o deploy inteiro. O retry torna
 * builds e revalidações resilientes a falhas transitórias de rede.
 *
 * Usa `cache: 'force-cache'` por padrão; sobrescreva via `init` quando o
 * dado não deve ser cacheado.
 */
export const cmsFetch = async <T>(
  url: string,
  init?: RequestInit
): Promise<T> => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= CMS_FETCH_MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${CMS_TOKEN}`,
        },
        cache: 'force-cache',
        ...init,
      });

      if (!response.ok) {
        throw new Error(`CMS request failed (${response.status}): ${url}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError = error;

      if (attempt < CMS_FETCH_MAX_ATTEMPTS) {
        await new Promise((resolve) =>
          setTimeout(resolve, CMS_FETCH_BACKOFF_MS * 2 ** (attempt - 1))
        );
      }
    }
  }

  throw lastError;
};
