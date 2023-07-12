

class PaginationBar {
  /**
   * 页码按钮的数量，当总页数超过该值时会折叠
   */
  pagerCount = 7

  /**
   * 当前页码
   */
  currentPage = 1

  /**
   * 每页显示条目个数
   */
  pageSize = 10

  /**
   * 总条目数
   */
  total = 0

  /**
   * 总页数
   */
  get pageCount() {
    return Math.ceil(this.total / this.pageSize)
  }

  /**
   * 主页码显示个数
   */
  get mainPagerCount() {
    return this.pageCount - 2
  }

  get mainPagerGap() {
    return Math.floor(this.mainPagerCount / 2)
  }

  /**
   * 主页码起始页码
   */
  get mainPagerStart() {
    const pageNumber = this.currentPage - this.mainPagerGap
    return pageNumber < 1 ? 1 : pageNumber
  }

  /**
   * 主页码结束页码
   */
  get mainPagerEnd() {
    const step = this.mainPagerCount % 2 === 0 ? this.mainPagerGap -1 : this.mainPagerGap
    const pageNumber = this.currentPage + step
    return pageNumber > this.pageCount ? this.pageCount : pageNumber
  }

  get mainPager() {
    const res = []

    for (const i = this.mainPagerStart; i<= this.mainPagerEnd; i++) {
      res.push({
        pageNumber: i,
        type: 'main'
      })
    }

    return res
  }

  get leftPager() {
    const res = []
    const firstMainPager = this.mainPager[0]
    
    if (firstMainPager.pageNumber !== 1) {
      res.push({
        pageNumber: 1,
        type: 'firstPage'
      })

      if (this.pageCount > this.pagerCount && firstMainPager.pageNumber > 2) {
        res.push({
          pageNumber: null,
          type: 'prev-ellipsis'
        })
      }

    }

    return res
  }

  get rightPager() {
    const res = []
    const lastMainPager = this.mainPager[this.mainPager.length - 1]

    if (lastMainPager.pageNumber !== this.pageCount) {
      res.unshift({
        pageNumber: this.pageCount,
        type: 'lastPage'
      })

      if (this.pageCount > this.pagerCount && lastMainPager.pageNumber < this.pageCount - 1) {
        res.push({
          pageNumber: null,
          type: 'next-ellipsis'
        })
      }

    }

    return res
  }

  get finalPager() {
    return [].concat(this.leftPager, this.mainPager, this.rightPager)
  }

  generatePager() {
    
    console.log(this.finalPager);

  }
}

export {
  PaginationBar
}