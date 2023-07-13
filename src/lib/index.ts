import type { PaginationBarOptions } from './interfaces/core'
import { PaginationBar } from './paginationBar'

import '@/lib/styles/main.scss'

const createPaginationBar = (opts?: PaginationBarOptions) => {
  return new PaginationBar(opts)
}

export { PaginationBar, createPaginationBar }
