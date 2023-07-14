var u = Object.defineProperty;
var h = (r, e, t) => e in r ? u(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var o = (r, e, t) => (h(r, typeof e != "symbol" ? e + "" : e, t), t);
var g = /* @__PURE__ */ ((r) => (r.getContainerElError = "Can not find container elemet.", r))(g || {}), n = /* @__PURE__ */ ((r) => (r.containerClassName = "pagination-bar-container", r.pagerWrapperClassName = "pagination-bar__pager", r.pagerItemClassName = "pagination-bar__pager__number", r))(n || {});
function l(r, e) {
  const t = typeof e == "string" ? [e] : e;
  r.classList.add(...t);
}
class c {
  constructor(e) {
    o(this, "options", {
      pagerCount: 7,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      container: "#pagination-bar-container",
      onCurrentPageChange: () => {
      },
      onPageSizeChange: () => {
      }
    });
    this.options = Object.assign(this.options, e), this.render();
  }
  setCurrentPage(e, t = !0) {
    var a;
    this.options.currentPage = e, (a = this.options) == null || a.onCurrentPageChange(this.options.currentPage), t && this.render();
  }
  setPageSize(e, t = !0) {
    var a;
    this.options.pageSize = e, (a = this.options) == null || a.onPageSizeChange(this.options.pageSize), t && this.render();
  }
  setTotal(e, t = !0) {
    this.options.total = e || 0, t && this.render();
  }
  setOptions(e, t = !1) {
    this.options = Object.assign(this.options, e), t && this.render();
  }
  get pageCount() {
    return Math.ceil(this.options.total / this.options.pageSize);
  }
  get lastPageNumber() {
    return this.pageCount;
  }
  get mainPagerCount() {
    const e = this.options.pagerCount - 2;
    return e <= 0 ? 0 : e;
  }
  get mainPagerGap() {
    return Math.floor(this.mainPagerCount / 2);
  }
  get mainPagerStart() {
    let e = this.mainPagerGap;
    const t = this.lastPageNumber - this.options.currentPage;
    t <= this.mainPagerGap && (e += this.mainPagerGap - t + 1);
    const a = this.options.currentPage - e;
    return a < 1 ? 1 : a;
  }
  get mainPagerEnd() {
    let e = this.mainPagerCount % 2 === 0 ? this.mainPagerGap - 1 : this.mainPagerGap;
    const t = this.options.currentPage - 1;
    t <= this.mainPagerGap && (e += this.mainPagerGap - t + 1);
    const a = this.options.currentPage + e;
    return a > this.pageCount ? this.pageCount : a;
  }
  get mainPager() {
    const e = [];
    for (let t = this.mainPagerStart; t <= this.mainPagerEnd; t++)
      e.push({
        pageNumber: t,
        type: "main"
      });
    return e;
  }
  get leftPager() {
    const e = [], t = this.mainPager[0];
    return t && t.pageNumber !== 1 && (e.push({
      pageNumber: 1,
      type: "first-page"
    }), this.pageCount > this.options.pagerCount && typeof t.pageNumber == "number" && t.pageNumber > 2 && e.push({
      pageNumber: null,
      type: "prev-ellipsis"
    })), e;
  }
  get rightPager() {
    const e = [], t = this.mainPager[this.mainPager.length - 1];
    return t && t.pageNumber !== this.pageCount && (e.unshift({
      pageNumber: this.pageCount,
      type: "last-page"
    }), this.pageCount > this.options.pagerCount && typeof t.pageNumber == "number" && t.pageNumber < this.pageCount - 1 && e.unshift({
      pageNumber: null,
      type: "next-ellipsis"
    })), e;
  }
  get finalPager() {
    return this.leftPager.concat(this.mainPager, this.rightPager);
  }
  getContainerEl() {
    if (typeof this.options.container == "string") {
      const e = document.querySelector(this.options.container);
      if (!e)
        throw new Error(g.getContainerElError);
      return e;
    }
    return this.options.container;
  }
  isPagerNumberType(e) {
    return !["prev-ellipsis", "next-ellipsis"].includes(e);
  }
  generatePager() {
    const e = this.finalPager.reduce((t, a) => {
      const s = this.isPagerNumberType(a.type) ? a.pageNumber : "...", i = this.options.currentPage === a.pageNumber ? "active" : "";
      return t += `<li class="${n.pagerItemClassName} ${i}" data-number="${a.pageNumber}" data-type="${a.type}">${s}</li>`, t;
    }, "");
    return `<ul class="${n.pagerWrapperClassName}">${e}</ul>`;
  }
  getPagerItemDataset(e) {
    return e.dataset;
  }
  registerPagerListener() {
    var e;
    (e = this.getContainerEl().querySelectorAll(
      `.${n.pagerWrapperClassName} .${n.pagerItemClassName}`
    )) == null || e.forEach((t) => {
      t.addEventListener("click", (a) => {
        const s = a.target, i = this.getPagerItemDataset(s);
        if (this.isPagerNumberType(i.type)) {
          const p = Number(i.number);
          this.setCurrentPage(p);
        }
      });
    });
  }
  render() {
    const e = this.getContainerEl();
    l(e, n.containerClassName);
    const a = `${this.generatePager()}`;
    e.innerHTML = a, this.registerPagerListener();
  }
}
const P = (r) => new c(r);
export {
  c as PaginationBar,
  P as createPaginationBar
};
