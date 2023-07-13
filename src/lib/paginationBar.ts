import type { PagerRecord, PaginationBarOptions } from './interfaces/core'

export class PaginationBar {
  options = {
    pagerCount: 7,
    currentPage: 1,
    pageSize: 10,
    total: 0,
  }

  constructor(opts?: PaginationBarOptions) {
    this.options = Object.assign(this.options, opts)
  }

  /**
   * 总页数
   */
  get pageCount() {
    return Math.ceil(this.options.total / this.options.pageSize)
  }

  get lastPageNumber() {
    return this.pageCount
  }

  /**
   * 主页码显示个数
   */
  get mainPagerCount() {
    const count = this.options.pagerCount - 2

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

    const lostCount = this.lastPageNumber - this.options.currentPage

    if (lostCount <= this.mainPagerGap) {
      step += this.mainPagerGap - lostCount + 1
    }

    const pageNumber = this.options.currentPage - step

    return pageNumber < 1 ? 1 : pageNumber
  }

  /**
   * 主页码结束页码
   */
  get mainPagerEnd() {
    let step =
      this.mainPagerCount % 2 === 0 ? this.mainPagerGap - 1 : this.mainPagerGap

    const lostCount = this.options.currentPage - 1

    if (lostCount <= this.mainPagerGap) {
      step += this.mainPagerGap - lostCount + 1
    }

    const pageNumber = this.options.currentPage + step

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
        this.pageCount > this.options.pagerCount &&
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
        this.pageCount > this.options.pagerCount &&
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
