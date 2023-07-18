export type PagerRecordType =
  | 'main'
  | 'first-page'
  | 'prev-ellipsis'
  | 'next-ellipsis'
  | 'last-page'

export interface PagerRecord {
  pageNumber: number | null
  type: PagerRecordType
}

export interface PagerItemDataset extends Record<string, string> {
  number: string
  type: PagerRecordType
}

export type PaginationLayoutTypes =
  | 'sizes'
  | 'prev'
  | 'pager'
  | 'next'
  | 'jumper'
  | 'total'

export interface PaginationBarOptions {
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

export interface PaginationBarInstance {
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

export type CreatePaginationBar = (
  opts?: PaginationBarOptions
) => PaginationBarInstance
