import type { PagerRecord } from './interfaces/core'

class PaginationBar {
  /**
   * 页码按钮的数量，当总页数超过该值时会折叠
   */
  pagerCount = 7

  /**
   * 当前页码
   */
  currentPage = 8

  /**
   * 每页显示条目个数
   */
  pageSize = 10

  /**
   * 总条目数
   */
  total = 300

  constructor() {}

  /**
   * 总页数
   */
  get pageCount() {
    return Math.ceil(this.total / this.pageSize)
  }

  get lastPageNumber() {
    return this.pageCount
  }

  /**
   * 主页码显示个数
   */
  get mainPagerCount() {
    const count = this.pagerCount - 2

    return count <= 0 ? 0 : count
  }

  get mainPagerGap() {
    return Math.floor(this.mainPagerCount / 2)
  }

  /**
   * 主页码起始页码
   */
  get mainPagerStart() {
    let step = this.mainPagerGap

    const lostCount = this.lastPageNumber - this.currentPage

    if (lostCount <= this.mainPagerGap) {
      step += this.mainPagerGap - lostCount + 1
    }

    const pageNumber = this.currentPage - step

    return pageNumber < 1 ? 1 : pageNumber
  }

  /**
   * 主页码结束页码
   */
  get mainPagerEnd() {
    let step =
      this.mainPagerCount % 2 === 0 ? this.mainPagerGap - 1 : this.mainPagerGap

    const lostCount = this.currentPage - 1

    if (lostCount <= this.mainPagerGap) {
      step += this.mainPagerGap - lostCount + 1
    }

    const pageNumber = this.currentPage + step

    return pageNumber > this.pageCount ? this.pageCount : pageNumber
  }

  get mainPager(): PagerRecord[] {
    const res: PagerRecord[] = []

    for (let i = this.mainPagerStart; i <= this.mainPagerEnd; i++) {
      res.push({
        pageNumber: i,
        type: 'main',
      })
    }

    return res
  }

  get leftPager(): PagerRecord[] {
    const res: PagerRecord[] = []
    const firstMainPager = this.mainPager[0]

    if (firstMainPager && firstMainPager.pageNumber !== 1) {
      res.push({
        pageNumber: 1,
        type: 'first-page',
      })

      if (
        this.pageCount > this.pagerCount &&
        typeof firstMainPager.pageNumber === 'number' &&
        firstMainPager.pageNumber > 2
      ) {
        res.push({
          pageNumber: null,
          type: 'prev-ellipsis',
        })
      }
    }

    return res
  }

  get rightPager(): PagerRecord[] {
    const res: PagerRecord[] = []
    const lastMainPager = this.mainPager[this.mainPager.length - 1]

    if (lastMainPager && lastMainPager.pageNumber !== this.pageCount) {
      res.unshift({
        pageNumber: this.pageCount,
        type: 'last-page',
      })

      if (
        this.pageCount > this.pagerCount &&
        typeof lastMainPager.pageNumber === 'number' &&
        lastMainPager.pageNumber < this.pageCount - 1
      ) {
        res.unshift({
          pageNumber: null,
          type: 'next-ellipsis',
        })
      }
    }

    return res
  }

  get finalPager(): PagerRecord[] {
    return this.leftPager.concat(this.mainPager, this.rightPager)
  }

  generatePager() {
    console.log(this.finalPager)
  }

  render() {}
}

export { PaginationBar }
