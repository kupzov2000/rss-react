const DEFAULT_CACHE_TTL_SECONDS = 600;

export function getTimeSaveCache() {
  const rawCacheTtl = process.env.NEXT_PUBLIC_CACHE_TTL;

  if (!rawCacheTtl) {
    return DEFAULT_CACHE_TTL_SECONDS;
  }

  const cacheTtl = Number(rawCacheTtl);

  if (!Number.isFinite(cacheTtl) || cacheTtl <= 0) {
    return DEFAULT_CACHE_TTL_SECONDS;
  }

  return cacheTtl;
}
