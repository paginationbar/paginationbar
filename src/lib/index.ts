import type { PaginationBarOptions } from './interfaces/core'
import { PaginationBar } from './paginationBar'

const createPaginationBar = (opts?: PaginationBarOptions) => {
  return new PaginationBar(opts)
}

export { PaginationBar, createPaginationBar }
