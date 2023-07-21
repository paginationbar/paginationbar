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

A pagination bar for web app. See [example](https://paginationbar.github.io/paginationbar/) here.

# Features

- Built-in themes(element , material) design.
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

1. Import the style of default theme.

```ts
import 'paginationbar/lib/style.css'
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
| `prevText` | `string` |  `''` | - | Replace **prev icon** with custom text. |
| `nextText` | `string` |  `''` | - | Replace **next icon** with custom text. |
| `firstPageNumber` | `number` |  `1` | - | Specify this to change the minimum page number of pagination bar. |
| `pagerCount` | `number` |  `7` | - | Specify this to change the number of page number buttons that will collapse when the total number of pages exceeds this value. |
| `currentPage` | `number` |  `1` | - | Initialize current page number. |
| `pageSize` | `number` |  `10` | - | Initialize the number of displayed entries per page. |
| `total` | `number` |  `0` | - | Initialize total number of entries. |
| `layout` | `string` <br /> `string[]` |  `prev,pager,next` | `total` <br /> `prev` <br/> `pager` <br /> `next` <br /> `jumper` <br/> `sizes` | Specify this to change the layout of controls. |
| `onCurrentPageChange` | `Function` | - | - | The **callback function** when the **current page** changes, passed in the `currentPage` as a parameter. |
| `onPageSizeChange` | `Function` | - | - | The **callback function** when the **page size** changes, passed in the current `pageSize` as a parameter. |

# CHANGE LOGS

See [CHANGE LOG](./CHANGELOG.md).