export const CMS_URL = process.env.CMS_URL;

export const CMS_TOKEN = process.env.CMS_TOKEN;

export const API_MAX_LIMIT = 100;

const CMS_FETCH_MAX_ATTEMPTS = 4;

const CMS_FETCH_BACKOFF_MS = 1000;

/**
 * Timeout por tentativa. Sem ele, uma conexão que abre mas nunca responde
 * (o CMS sob carga) trava a requisição até o runtime da Vercel matar a função
 * (504). Com timeout, a tentativa aborta, o retry/backoff age e — em última
 * instância — o `withStaleFallback` serve o último dado conhecido em vez de
 * estourar o limite de 15s da função.
 */
const CMS_FETCH_TIMEOUT_MS = 8000;

/**
 * Fetch autenticado ao CMS com retry e backoff exponencial (1s, 2s, 4s).
 *
 * O CMS ocasionalmente recusa conexões sob carga (UND_ERR_CONNECT_TIMEOUT),
 * e uma única falha durante o build derruba o deploy inteiro. O retry torna
 * builds e revalidações resilientes a falhas transitórias de rede.
 *
 * Cada tentativa tem um timeout (CMS_FETCH_TIMEOUT_MS) para que uma conexão
 * pendurada não consuma todo o orçamento da função serverless.
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
        // Aborta a tentativa se o CMS não responder a tempo; o init do caller
        // tem prioridade caso já forneça um signal próprio
        signal: AbortSignal.timeout(CMS_FETCH_TIMEOUT_MS),
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
