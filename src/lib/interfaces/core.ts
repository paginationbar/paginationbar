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

export interface PaginationBarOptions {
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
}
