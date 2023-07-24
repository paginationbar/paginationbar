import type {
  PagerRecord,
  PaginationBarOptions,
  PaginationBarInstance,
  PagerItemDataset,
  CreatePaginationBar,
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
    theme: 'element',
    firstPageNumber: 1,
    pagerCount: 7,
    currentPage: 1,
    pageSize: 10,
    total: 0,
    layout: 'prev,pager,next',
    pageSizes: [10, 20, 30, 40, 50, 100],
    sizesOptionLabel: (size) => {
      return `${size}/page`
    },
    prevText: '',
    nextText: '',
    jumperPrefixText: 'Go to',
    jumperSuffixText: '',
    totalPrefixText: 'Total',
    totalSuffixText: '',
    onCurrentPageChange: () => {},
    onPageSizeChange: () => {},
  }

  currentJumpNumber: number | '' = ''
  selectedPageSize = this.options.pageSize

  setCurrentPage(value: number, reRender: boolean = true) {
    let num = value

    if (num < this.options.firstPageNumber) {
      num = this.options.firstPageNumber
    } else if (num > this.lastPageNumber) {
      num = this.lastPageNumber
    }

    this.options.currentPage = num
    this.options?.onCurrentPageChange(this.options.currentPage)
    reRender && this.render()

    return num
  }

  setPageSize(value: number, reRender: boolean = true) {
    let num = value

    if (num > this.options.total) {
      num = this.options.total
    }

    this.selectedPageSize = num
    this.options.pageSize = num
    this.options?.onPageSizeChange(this.options.pageSize)
    reRender && this.render()

    return num
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
    this.selectedPageSize = this.options.pageSize
    this.pagerListener = this.pagerListener.bind(this)
    this.prevBtnListener = this.prevBtnListener.bind(this)
    this.nextBtnListener = this.nextBtnListener.bind(this)
    this.jumperListener = this.jumperListener.bind(this)
    this.sizesListener = this.sizesListener.bind(this)

    const container = this.getContainerEl()

    addClass(container, CONSTANTS.containerClassName)
    addClass(container, `theme--${this.options.theme}`)

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
      return this.options.layout.split(',').map((v) => v.trim())
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

    const text = this.options.prevText ? this.options.prevText : PrevIconRaw

    return `<button type="button" class="${CONSTANTS.prevButtonClassName} ${disabledClassName}" ${disabled} role="prev-btn">${text}</button>`
  }

  generateNext() {
    const disabled =
      this.options.currentPage >= this.lastPageNumber
        ? `disabled="disabled"`
        : ''
    const disabledClassName = disabled ? 'disabled' : ''

    const text = this.options.nextText ? this.options.nextText : NextIconRaw

    return `<button type="button" class="${CONSTANTS.nextButtonClassName} ${disabledClassName}" ${disabled} role="next-btn">${text}</button>`
  }

  generateSizes() {
    const selectOptions = this.options.pageSizes
      .map((v) => {
        const selected = this.selectedPageSize === v ? 'selected' : ''
        return `<option value="${v}" ${selected}>${this.options.sizesOptionLabel(
          v
        )}</option>`
      })
      .join('')

    return `<div class="${CONSTANTS.sizesClassName}">
      <select class="${CONSTANTS.sizesClassName}__select">${selectOptions}</select>
    </div>`
  }

  generateJumper() {
    return `<div class="${CONSTANTS.jumperClassName}">
      <span>${this.options.jumperPrefixText}</span>
      <div class="${CONSTANTS.jumperClassName}__input">
        <input type="number" value="${this.currentJumpNumber}"  autocomplete="off" min="${this.options.firstPageNumber}" max="${this.lastPageNumber}" class="${CONSTANTS.jumperClassName}__input-inner" />
      </div>
      <span>${this.options.jumperSuffixText}</span>
    </div>`
  }

  generateTotal() {
    const text =
      `${this.options.totalPrefixText} ${this.options.total} ${this.options.totalSuffixText}`.trim()

    return `<span class="${CONSTANTS.totalClassName}">${text}</span>`
  }

  getPagerItemDataset(el: HTMLElement) {
    return el.dataset as PagerItemDataset
  }

  pagerListener(e: Event) {
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

  jumperListener(e: Event) {
    const el = e.target as HTMLInputElement

    if (!el.value) {
      this.currentJumpNumber = ''
      return
    }

    this.currentJumpNumber = this.setCurrentPage(Number(el.value), false)
    this.render()
  }

  sizesListener(e: Event) {
    const el = e.target as HTMLInputElement

    if (!el.value) {
      this.selectedPageSize = this.options.pageSize
      return
    }

    this.selectedPageSize = this.setPageSize(Number(el.value), false)
    this.render()
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

    containerEl
      .querySelector(`.${CONSTANTS.jumperClassName}__input-inner`)
      ?.addEventListener('change', this.jumperListener)

    containerEl
      .querySelector(`.${CONSTANTS.sizesClassName}__select`)
      ?.addEventListener('change', this.sizesListener)
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

    containerEl
      .querySelector(`.${CONSTANTS.jumperClassName}__input-inner`)
      ?.removeEventListener('change', this.jumperListener)

    containerEl
      .querySelector(`.${CONSTANTS.sizesClassName}__select`)
      ?.removeEventListener('change', this.sizesListener)
  }

  render() {
    const container = this.getContainerEl()

    const htmlContent = this.getLayoutHTML()

    container.innerHTML = htmlContent

    this.registerListeners()
  }

  destory() {
    this.removeListeners()
  }
}

export const createPaginationBar: CreatePaginationBar = (opts) => {
  return new PaginationBar(opts)
}
