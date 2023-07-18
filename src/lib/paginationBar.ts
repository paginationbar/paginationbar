import type {
  PagerRecord,
  PaginationBarOptions,
  PaginationBarInstance,
  PagerItemDataset,
} from './interfaces/core'
import { ERRORS } from './ERRORS'
import { CONSTANTS } from './CONSTANTS'
import { addClass } from './dom'
import PrevIconRaw from './icons/prev.svg?raw'
import NextIconRaw from './icons/next.svg?raw'
import MoreIconRaw from './icons/more.svg?raw'

export class PaginationBar implements PaginationBarInstance {
  options: Required<PaginationBarOptions> = {
    container: '#pagination-bar-container',
    pagerCount: 7,
    currentPage: 1,
    pageSize: 10,
    total: 0,
    layout: 'prev,pager,next',
    onCurrentPageChange: () => {},
    onPageSizeChange: () => {},
  }

  setCurrentPage(value: number, reRender: boolean = true) {
    this.options.currentPage = value
    this.options?.onCurrentPageChange(this.options.currentPage)
    reRender && this.render()
  }

  setPageSize(value: number, reRender: boolean = true) {
    this.options.pageSize = value
    this.options?.onPageSizeChange(this.options.pageSize)
    reRender && this.render()
  }

  setTotal(value: number, reRender: boolean = true) {
    this.options.total = value || 0
    reRender && this.render()
  }

  setOptions(opts: PaginationBarOptions, reRender: boolean = false) {
    this.options = Object.assign(this.options, opts)
    reRender && this.render()
  }

  constructor(opts?: PaginationBarOptions) {
    this.options = Object.assign(this.options, opts)
    this.render()
  }

  get pageCount() {
    return Math.ceil(this.options.total / this.options.pageSize)
  }

  get lastPageNumber() {
    return this.pageCount
  }

  get mainPagerCount() {
    const count = this.options.pagerCount - 2

    return count <= 0 ? 0 : count
  }

  get mainPagerGap() {
    return Math.floor(this.mainPagerCount / 2)
  }

  get mainPagerStart() {
    let step = this.mainPagerGap

    const lostCount = this.lastPageNumber - this.options.currentPage

    if (lostCount <= this.mainPagerGap) {
      step += this.mainPagerGap - lostCount + 1
    }

    const pageNumber = this.options.currentPage - step

    return pageNumber < 1 ? 1 : pageNumber
  }

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

  getLayout() {
    if (typeof this.options.layout === 'string') {
      return this.options.layout.split(',')
    } else if (Array.isArray(this.options.layout)) {
      return this.options.layout
    }

    return []
  }

  getLayoutHTML() {
    return this.getLayout().reduce((res, name) => {
      if (name === 'pager') {
        res += this.generatePager()
      } else if (name === 'prev') {
        res += this.generatePrev()
      } else if (name === 'next') {
        res += this.generateNext()
      } else if (name === 'jumper') {
        res += this.generateJumper()
      } else if (name === 'total') {
        res += this.generateTotal()
      } else if (name === 'sizes') {
        res += this.generateSizes()
      }

      return res
    }, '')
  }

  getContainerEl(): HTMLElement {
    if (typeof this.options.container === 'string') {
      const el = document.querySelector(this.options.container)
      if (!el) {
        throw new Error(ERRORS.getContainerElError)
      }

      return el as HTMLElement
    }

    return this.options.container
  }

  isPagerNumberType(type: string) {
    return !['prev-ellipsis', 'next-ellipsis'].includes(type)
  }

  generatePager() {
    const numbersHtml = this.finalPager.reduce((res, v) => {
      const text = this.isPagerNumberType(v.type) ? v.pageNumber : MoreIconRaw
      const isActive = this.options.currentPage === v.pageNumber ? 'active' : ''

      res += `<li class="${CONSTANTS.pagerItemClassName} ${isActive}" data-number="${v.pageNumber}" data-type="${v.type}">${text}</li>`

      return res
    }, '')

    return `<ul class="${CONSTANTS.pagerWrapperClassName}">${numbersHtml}</ul>`
  }

  generatePrev() {
    return `<button type="button" class="${CONSTANTS.prevButtonClassName}">${PrevIconRaw}</button>`
  }

  generateNext() {
    return `<button type="button" class="${CONSTANTS.nextButtonClassName}">${NextIconRaw}</button>`
  }

  generateSizes() {
    return ``
  }

  generateJumper() {
    return ``
  }

  generateTotal() {
    return ``
  }

  getPagerItemDataset(el: HTMLElement) {
    return el.dataset as PagerItemDataset
  }

  registerPagerListener() {
    this.getContainerEl()
      .querySelectorAll(
        `.${CONSTANTS.pagerWrapperClassName} .${CONSTANTS.pagerItemClassName}`
      )
      ?.forEach((el) => {
        el.addEventListener('click', (e) => {
          const pagerEl = e.target as HTMLElement
          const dataset = this.getPagerItemDataset(pagerEl)

          if (this.isPagerNumberType(dataset.type)) {
            const newCurrPage = Number(dataset.number)
            this.setCurrentPage(newCurrPage)
          }
        })
      })
  }

  render() {
    const container = this.getContainerEl()

    addClass(container, CONSTANTS.containerClassName)

    const htmlContent = this.getLayoutHTML()

    container.innerHTML = htmlContent
    this.registerPagerListener()
  }
}
