export const formatLibName = (source: string, libName = 'paginationbar') => {
  return source
    .replace('@/lib/paginationBar', libName)
    .replace('@/lib/interfaces/core', libName)
}
