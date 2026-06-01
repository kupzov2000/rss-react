export function getTimeSaveCache() {
  const DEFAULT_CACHE_TTL_SECONDS = 100;
  const cacheTtlFromEnvironment = Number(import.meta.env.VITE_CACHE_TTL);

  const cacheTtl = Number.isFinite(cacheTtlFromEnvironment)
    ? cacheTtlFromEnvironment
    : DEFAULT_CACHE_TTL_SECONDS;

  return cacheTtl;
}
