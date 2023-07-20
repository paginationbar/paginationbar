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

  /**
   * 页码按钮的数量，当总页数超过该值时会折叠
   * 大于等于 5 且小于等于 21 的奇数
   */
  pagerCount?: number

  /**
   * 当前页码
   */
  currentPage?: number

  /**
   * 每页显示条目个数
   */
  pageSize?: number

  /**
   * 总条目数
   */
  total?: number

  layout?: string | PaginationLayoutTypes[]

  onCurrentPageChange?: (index: number) => void

  onPageSizeChange?: (size: number) => void
}

interface PaginationBarInstance {
  options: PaginationBarOptions

  /**
   * 总页数
   */
  get pageCount(): number
  /**
   * 最后一页页码
   */
  get lastPageNumber(): number
  /**
   * 主页码显示个数
   */
  get mainPagerCount(): number

  get mainPagerGap(): number

  /**
   * 主页码起始页码
   */
  get mainPagerStart(): number

  /**
   * 主页码结束页码
   */
  get mainPagerEnd(): number

  get mainPager(): PagerRecord[]

  get leftPager(): PagerRecord[]

  get rightPager(): PagerRecord[]

  get finalPager(): PagerRecord[]

  getContainerEl(): HTMLElement

  render(): void

  destory(): void

  setCurrentPage(index: number, reRender?: boolean): void

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
