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

type PaginationThemes = 'element' | 'material'

interface PaginationBarOptions {
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

interface PaginationBarInstance {
  options: PaginationBarOptions

  currentJumpNumber: number | ''

  readonly pageCount: number

  readonly lastPageNumber: number

  readonly mainPagerCount: number

  readonly mainPagerGap: number

  readonly mainPagerStart: number

  readonly mainPagerEnd: number

  readonly mainPager: PagerRecord[]

  readonly leftPager: PagerRecord[]

  readonly rightPager: PagerRecord[]

  readonly finalPager: PagerRecord[]

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

type CreatePaginationBar = (
  opts?: PaginationBarOptions
) => PaginationBarInstance

declare const createPaginationBar: CreatePaginationBar

export { PagerRecord, PagerRecordType, PaginationBarInstance, PaginationBarOptions, createPaginationBar };
