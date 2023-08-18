export const formatLibName = (source: string, libName = 'paginationbar') => {
  return source
    .replace('@/lib/PaginationBarClass', libName)
    .replace('@/lib/interfaces/core', libName)
}
