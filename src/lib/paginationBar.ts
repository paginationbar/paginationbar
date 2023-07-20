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
    firstPageNumber: 1,
    pagerCount: 7,
    currentPage: 1,
    pageSize: 10,
    total: 0,
    layout: 'prev,pager,next,total',
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
    this.pagerListener = this.pagerListener.bind(this)
    this.prevBtnListener = this.prevBtnListener.bind(this)
    this.nextBtnListener = this.nextBtnListener.bind(this)

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

    return pageNumber < this.options.firstPageNumber
      ? this.options.firstPageNumber
      : pageNumber
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

    if (
      firstMainPager &&
      firstMainPager.pageNumber !== this.options.firstPageNumber
    ) {
      res.push({
        pageNumber: this.options.firstPageNumber,
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
    return type && !['prev-ellipsis', 'next-ellipsis'].includes(type)
  }

  generatePager() {
    const numbersHtml = this.finalPager.reduce((res, v) => {
      const text = this.isPagerNumberType(v.type) ? v.pageNumber : MoreIconRaw
      const isActive = this.options.currentPage === v.pageNumber ? 'active' : ''
      const role = this.isPagerNumberType(v.type)
        ? 'pager-number'
        : 'pager-quick-btn'

      res += `<li class="${CONSTANTS.pagerItemClassName} ${isActive}" data-number="${v.pageNumber}" data-type="${v.type}" role="${role}">${text}</li>`

      return res
    }, '')

    return `<ul class="${CONSTANTS.pagerWrapperClassName}">${numbersHtml}</ul>`
  }

  generatePrev() {
    const disabled =
      this.options.currentPage <= this.options.firstPageNumber
        ? `disabled="disabled"`
        : ''
    const disabledClassName = disabled ? 'disabled' : ''

    return `<button type="button" class="${CONSTANTS.prevButtonClassName} ${disabledClassName}" ${disabled} role="prev-btn">${PrevIconRaw}</button>`
  }

  generateNext() {
    const disabled =
      this.options.currentPage >= this.lastPageNumber
        ? `disabled="disabled"`
        : ''
    const disabledClassName = disabled ? 'disabled' : ''

    return `<button type="button" class="${CONSTANTS.nextButtonClassName} ${disabledClassName}" ${disabled} role="next-btn">${NextIconRaw}</button>`
  }

  generateSizes() {
    return ``
  }

  generateJumper() {
    return ``
  }

  generateTotal() {
    const text = `共 ${this.options.total} 条`

    return `<span class="${CONSTANTS.totalClassName}">${text}</span>`
  }

  getPagerItemDataset(el: HTMLElement) {
    return el.dataset as PagerItemDataset
  }

  pagerListener(e: MouseEvent) {
    const el = e.target as HTMLElement
    const role = el.getAttribute('role')

    if (role === 'pager-number') {
      const dataset = this.getPagerItemDataset(el)
      const newCurrPage = Number(dataset.number)
      this.setCurrentPage(newCurrPage)
    }
  }

  prevBtnListener() {
    this.options.currentPage > 1 &&
      this.setCurrentPage(this.options.currentPage - 1)
  }

  nextBtnListener() {
    this.options.currentPage < this.lastPageNumber &&
      this.setCurrentPage(this.options.currentPage + 1)
  }

  registerListeners() {
    this.removeListeners()

    const containerEl = this.getContainerEl()
    containerEl.addEventListener('click', this.pagerListener)
    containerEl
      .querySelector('button[role="prev-btn"]')
      ?.addEventListener('click', this.prevBtnListener)

    containerEl
      .querySelector('button[role="next-btn"]')
      ?.addEventListener('click', this.nextBtnListener)
  }

  removeListeners() {
    const containerEl = this.getContainerEl()
    containerEl.removeEventListener('click', this.pagerListener)
    containerEl
      .querySelector('button[role="prev-btn"]')
      ?.removeEventListener('click', this.prevBtnListener)

    containerEl
      .querySelector('button[role="next-btn"]')
      ?.removeEventListener('click', this.nextBtnListener)
  }

  render() {
    const container = this.getContainerEl()

    addClass(container, CONSTANTS.containerClassName)

    const htmlContent = this.getLayoutHTML()

    container.innerHTML = htmlContent

    this.registerListeners()
  }

  destory() {
    this.removeListeners()
  }
}
