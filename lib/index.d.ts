type PagerRecordType =
  | 'main'
  | 'first-page'
  | 'prev-ellipsis'
  | 'next-ellipsis'
  | 'last-page'

interface PagerRecord {
  pageNumber: number | null
  type: PagerRecordType
}

type PaginationLayoutTypes =
  | 'sizes'
  | 'prev'
  | 'pager'
  | 'next'
  | 'jumper'
  | 'total'

interface PaginationBarOptions {
  container: string | HTMLElement

  firstPageNumber?: number

  pagerCount?: number

  currentPage?: number

  pageSize?: number

  total?: number

  layout?: string | PaginationLayoutTypes[]

  onCurrentPageChange?: (index: number) => void

  onPageSizeChange?: (size: number) => void
}

interface PaginationBarInstance {
  options: PaginationBarOptions

  currentJumpNumber: number | ''

  get pageCount(): number

  get lastPageNumber(): number

  get mainPagerCount(): number

  get mainPagerGap(): number

  get mainPagerStart(): number

  get mainPagerEnd(): number

  get mainPager(): PagerRecord[]

  get leftPager(): PagerRecord[]

  get rightPager(): PagerRecord[]

  get finalPager(): PagerRecord[]

  getContainerEl(): HTMLElement

  render(): void

  destory(): void

  setCurrentPage(index: number, reRender?: boolean): number

  setPageSize(size: number, reRender?: boolean): void

  setTotal(value: number, reRender?: boolean): void

  setOptions(opts: PaginationBarOptions, reRender?: boolean): void

  getLayout(): string[]

  getLayoutHTML(): string

  generatePager(): string

  generatePrev(): string

  generateNext(): string

  generateSizes(): string

  generateJumper(): string

  generateTotal(): string
}

type CreatePaginationBar = (
  opts?: PaginationBarOptions
) => PaginationBarInstance

declare const createPaginationBar: CreatePaginationBar

export { PagerRecord, PagerRecordType, PaginationBarInstance, PaginationBarOptions, createPaginationBar };
