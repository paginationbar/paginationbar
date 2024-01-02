<p align="center">
  <a href="https://www.npmjs.org/package/paginationbar">
    <img src="https://img.shields.io/npm/v/paginationbar.svg">
  </a>
  <a href="https://npmcharts.com/compare/paginationbar?minimal=true">
    <img src="https://img.shields.io/npm/dm/paginationbar.svg">
  </a>
  <br>
</p>


# paginationbar

A modern pagination bar library for web app.

- [Release Notes](./CHANGELOG.md).
- [Example](https://paginationbar.github.io/paginationbar/).

# Features

- Built-in themes(material, element) design and more.
- Does not depend on any **third-party** library.
- Support **Typescript**.

# Installation

```bash
# pnpm
$ pnpm add paginationbar

# yarn
$ yarn add paginationbar

# npm
$ npm i paginationbar
```

# Usage

1. Import the style for themes.

```ts
// Include all themes (Not recommended)
import 'paginationbar/lib/style.css'

// Alternatively, you can import only a certain theme style (Recommended).
// material theme
import 'paginationbar/lib/themes/material/index.css'
// element theme
import 'paginationbar/lib/themes/element/index.css'
```

2. Define a container.

```html
<div id="pagination-bar-container"></div>
```

3. Create a pagination bar instance.

```ts
import { createPaginationBar } from 'paginationbar'

const paginationBar = createPaginationBar({
  container: '#pagination-bar-container'
  // Some options ...
})
```

# Options
| Prop | Type | Default value | Available values | Description |
| :---: | :---: | :---: | :---: | :---: |
| `container` | `string` <br /> `HTMLElement` |  `#pagination-bar-container` | - | Specify this to change the container. |
| `theme` | `string` |  `material` | - | Specify this to change the theme. |
| `background` | `boolean` |  `false` | - | Specify this to Add a background color to the pagination button. |
| `hideOnSinglePage` | `boolean` |  `false` | - | Hide when there is only one page. |
| `prevText` | `string` |  `''` | - | Replace **prev icon** with custom text. |
| `nextText` | `string` |  `''` | - | Replace **next icon** with custom text. |
| `jumperPrefixText` | `string` |  `'Go to'` | - | Specify this to change the prefix text of the **jumper control**. |
| `jumperSuffixText` | `string` |  `''` | - | Specify this to change the suffix text of the **jumper control**. |
| `totalPrefixText` | `string` |  `'Total'` | - | Specify this to change the prefix text of the **total control**. |
| `totalSuffixText` | `string` |  `''` | - | Specify this to change the suffix text of the **total control**. |
| `firstPageNumber` | `number` |  `1` | - | Specify this to change the minimum page number of pagination bar. |
| `pagerCount` | `number` |  `7` | - | Specify this to change the number of page number buttons that will collapse when the total number of pages exceeds this value. |
| `currentPage` | `number` |  `1` | - | Initialize current page number. |
| `pageSize` | `number` |  `10` | - | Initialize the number of displayed entries per page. |
| `disabled` | `boolean` |  `false` | - | Initialize the **disabled status** of pagination bar. |
| `pageSizes` | `number[]` |  `[10,20,30,40,50,100]` | - | Define options of **sizes control**. |
| `sizesOptionLabel` | `(size: number) => string` | - | - | Customize the label content of sizes options. |
| `total` | `number` |  `0` | - | Initialize total number of entries. |
| `layout` | `string` <br /> `string[]` |  `prev,pager,next` | `total` <br /> `prev` <br/> `pager` <br /> `next` <br /> `jumper` <br/> `sizes` | Specify this to change the layout of controls. |
| `onCurrentPageChange` | `Function` | - | - | The **callback function** when the **current page** changes, passed in the `currentPage` as a parameter. |
| `onPageSizeChange` | `Function` | - | - | The **callback function** when the **page size** changes, passed in the current `pageSize` as a parameter. |

# APIs
## Instance methods
### setCurrentPage

You can use this to change `currentPage` after pagination bar initialization. and it will return a safty page number.

```ts
paginationBar.setCurrentPage(2)
```

### setPageSize

You can use this to change `pageSize` after pagination bar initialization. and it will also return a safty page size number.

```ts
paginationBar.setPageSize(20)
```

### setTotal

You can use this to change `total` after pagination bar initialization. 

```ts
paginationBar.setTotal(500)
```

### disabled

Pagination bar can be manually deactivated using the `disabled()` method. 

```ts
paginationBar.disabled(true) // deactivated
paginationBar.disabled(false) // activated
```

### destory

Destroys the pagination bar instance. For example, event listeners and so on.

```ts
paginationBar.destory()
```
### render

Manually re-render.

```ts
paginationBar.render()
```
