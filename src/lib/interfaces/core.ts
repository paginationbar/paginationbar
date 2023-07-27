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

export type PaginationThemes = 'element' | 'material'

export interface PaginationBarOptions {
  container: string | HTMLElement

  theme?: PaginationThemes | string

  firstPageNumber?: number

  pagerCount?: number

  currentPage?: number

  pageSize?: number

  total?: number

  layout?: string | PaginationLayoutTypes[]

  pageSizes?: number[]

  sizesOptionLabel?: (size: number) => string

  prevText?: string

  nextText?: string

  jumperPrefixText?: string

  jumperSuffixText?: string

  totalPrefixText?: string

  totalSuffixText?: string

  onCurrentPageChange?: (index: number) => void

  onPageSizeChange?: (size: number) => void

  disabled?: boolean

  background?: boolean

  hideOnSinglePage?: boolean
}

export interface PaginationBarInstance {
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

  setPageSize(size: number, reRender?: boolean): number

  setTotal(value: number, reRender?: boolean): void

  setOptions(opts: PaginationBarOptions, reRender?: boolean): void

  setTheme(themeName: string): void

  disabled(value: boolean, reRender?: boolean): void

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
