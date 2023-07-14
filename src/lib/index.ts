import type { CreatePaginationBar } from './interfaces/core'
import { PaginationBar } from './paginationBar'

import '@/lib/styles/main.scss'

const createPaginationBar: CreatePaginationBar = (opts) => {
  return new PaginationBar(opts)
}

export { PaginationBar, createPaginationBar }
