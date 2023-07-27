import type {
  PagerRecord,
  PaginationBarOptions,
  PaginationBarInstance,
  PagerItemDataset,
  CreatePaginationBar,
} from './interfaces/core'
import { ERRORS } from './ERRORS'
import { CONSTANTS } from './CONSTANTS'
import { addClass, css, removeClass } from './dom'
import PrevIconRaw from './icons/prev.svg?raw'
import NextIconRaw from './icons/next.svg?raw'
import MoreIconRaw from './icons/more.svg?raw'
import QuickArrow from './icons/quick-arrow.svg?raw'

export class PaginationBar implements PaginationBarInstance {
  options: Required<PaginationBarOptions> = {
    container: '#pagination-bar-container',
    theme: 'material',
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
    disabled: false,
    background: false,
    hideOnSinglePage: false,
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

  setTheme(themeName: string) {
    const containerEl = this.getContainerEl()

    for (const className of containerEl.classList.values()) {
      if (className.startsWith(CONSTANTS.themeClassNamePrefix)) {
        removeClass(containerEl, className)
      }
    }

    addClass(containerEl, `${CONSTANTS.themeClassNamePrefix}${themeName}`)
  }

  disabled(value: boolean, reRender: boolean = true): void {
    const containerEl = this.getContainerEl()
    this.options.disabled = value
    if (value) {
      addClass(containerEl, 'disabled')
    } else {
      removeClass(containerEl, 'disabled')
    }

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
    this.quickNextListener = this.quickNextListener.bind(this)
    this.quickPrevListener = this.quickPrevListener.bind(this)

    const container = this.getContainerEl()

    addClass(container, CONSTANTS.containerClassName)
    addClass(
      container,
      `${CONSTANTS.themeClassNamePrefix}${this.options.theme}`
    )

    if (this.options.disabled) {
      addClass(container, 'disabled')
    }

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

  get disabledAttrString() {
    return this.options.disabled ? 'disabled="disabled"' : ''
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

  isBackground() {
    return this.options.background ? 'is-background' : ''
  }

  generatePager() {
    const numbersHtml = this.finalPager.reduce((res, v) => {
      const quickBtnIcon = `
        <span class="pager-quick-btn-icon pager-quick-btn-icon--more ${v.type}">${MoreIconRaw}</span>
        <span class="pager-quick-btn-icon pager-quick-btn-icon--arrow ${v.type}">${QuickArrow}</span>
      `

      const text = this.isPagerNumberType(v.type) ? v.pageNumber : quickBtnIcon
      const isActive = this.options.currentPage === v.pageNumber ? 'active' : ''
      const role = this.isPagerNumberType(v.type)
        ? 'pager-number'
        : 'pager-quick-btn'

      res += `<li class="${CONSTANTS.pagerItemClassName} ${isActive} ${role}" 
        data-number="${v.pageNumber}" data-type="${v.type}" role="${role}">
        ${text}
      </li>`

      return res
    }, '')

    return `<ul class="${
      CONSTANTS.pagerWrapperClassName
    } ${this.isBackground()}">${numbersHtml}</ul>`
  }

  generatePrev() {
    const disabled =
      this.options.currentPage <= this.options.firstPageNumber ||
      this.options.disabled
        ? `disabled="disabled"`
        : ''
    const disabledClassName = disabled ? 'disabled' : ''

    const text = this.options.prevText ? this.options.prevText : PrevIconRaw

    return `<button type="button" class="${
      CONSTANTS.prevButtonClassName
    } ${disabledClassName} ${this.isBackground()}" ${disabled} role="prev-btn">${text}</button>`
  }

  generateNext() {
    const disabled =
      this.options.currentPage >= this.lastPageNumber || this.options.disabled
        ? `disabled="disabled"`
        : ''
    const disabledClassName = disabled ? 'disabled' : ''

    const text = this.options.nextText ? this.options.nextText : NextIconRaw

    return `<button type="button" class="${
      CONSTANTS.nextButtonClassName
    } ${disabledClassName} ${this.isBackground()}" ${disabled} role="next-btn">${text}</button>`
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
      <select class="${CONSTANTS.sizesClassName}__select" ${this.disabledAttrString}>${selectOptions}</select>
    </div>`
  }

  generateJumper() {
    return `<div class="${CONSTANTS.jumperClassName}">
      <span>${this.options.jumperPrefixText}</span>
      <div class="${CONSTANTS.jumperClassName}__input">
        <input ${this.disabledAttrString} type="number" value="${this.currentJumpNumber}"  autocomplete="off" min="${this.options.firstPageNumber}" max="${this.lastPageNumber}" class="${CONSTANTS.jumperClassName}__input-inner" />
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
    if (this.options.disabled) return

    const el = e.target as HTMLElement
    const role = el.getAttribute('role')

    if (role === 'pager-number') {
      const dataset = this.getPagerItemDataset(el)
      const newCurrPage = Number(dataset.number)
      this.setCurrentPage(newCurrPage)
    }
  }

  prevBtnListener() {
    if (this.options.disabled) return

    this.options.currentPage > 1 &&
      this.setCurrentPage(this.options.currentPage - 1)
  }

  nextBtnListener() {
    if (this.options.disabled) return

    this.options.currentPage < this.lastPageNumber &&
      this.setCurrentPage(this.options.currentPage + 1)
  }

  jumperListener(e: Event) {
    if (this.options.disabled) return

    const el = e.target as HTMLInputElement

    if (!el.value) {
      this.currentJumpNumber = ''
      return
    }

    this.currentJumpNumber = this.setCurrentPage(Number(el.value), false)
    this.render()
  }

  sizesListener(e: Event) {
    if (this.options.disabled) return

    const el = e.target as HTMLInputElement

    if (!el.value) {
      this.selectedPageSize = this.options.pageSize
      return
    }

    this.selectedPageSize = this.setPageSize(Number(el.value), false)

    if (this.options.currentPage > this.lastPageNumber) {
      this.setCurrentPage(this.lastPageNumber, false)
    }

    this.render()
  }

  quickNextListener() {
    if (this.options.disabled) return
    this.setCurrentPage(this.options.currentPage + this.mainPagerCount)
  }

  quickPrevListener() {
    if (this.options.disabled) return
    this.setCurrentPage(this.options.currentPage - this.mainPagerCount)
  }

  getQuickNextEl() {
    const el = this.getContainerEl().querySelector(
      `.${CONSTANTS.pagerWrapperClassName} .${CONSTANTS.pagerItemClassName}[data-type="next-ellipsis"]`
    )

    return el
  }

  getQuickPrevEl() {
    const el = this.getContainerEl().querySelector(
      `.${CONSTANTS.pagerWrapperClassName} .${CONSTANTS.pagerItemClassName}[data-type="prev-ellipsis"]`
    )

    return el
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

    this.getQuickNextEl()?.addEventListener('click', this.quickNextListener)
    this.getQuickPrevEl()?.addEventListener('click', this.quickPrevListener)
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

    this.getQuickNextEl()?.removeEventListener('click', this.quickNextListener)

    this.getQuickPrevEl()?.removeEventListener('click', this.quickPrevListener)
  }

  render() {
    const container = this.getContainerEl()

    if (this.options.hideOnSinglePage && this.options.total === 1) {
      css(container, { display: 'none' })
    } else {
      css(container, { display: 'flex' })
    }

    container.innerHTML = this.getLayoutHTML()

    this.registerListeners()
  }

  destory() {
    this.removeListeners()
  }
}

export const createPaginationBar: CreatePaginationBar = (opts) => {
  return new PaginationBar(opts)
}
