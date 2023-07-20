<p align="center">
  <a href="https://www.npmjs.org/package/paginationbar">
    <img src="https://img.shields.io/npm/v/paginationbar.svg">
  </a>
  <a href="https://npmcharts.com/compare/paginationbar?minimal=true">
    <img src="https://img.shields.io/npm/dm/paginationbar.svg">
  </a>
  <br>
</p>


> :construction: Under active development, no official release yet. :construction:

# paginationbar

A pagination bar for web app.

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

1. Import the style.

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
  // Some options ...
})
```

# Options
| Prop | Type | Required | Default value | Available values | Description |
| :---: | :---: | :---: | :---: | :---: | :---: |
| `container` | `string` <br /> `HTMLElement` | `true` | `#pagination-bar-container` | - | Specify this to change the container. |
| `firstPageNumber` | `number` | `false` | `1` | - | Specify this to change the minimum page number of pagination bar. |
| `pagerCount` | `number` | `false` | `7` | - | Specify this to change the number of page number buttons that will collapse when the total number of pages exceeds this value. |
| `currentPage` | `number` | `false` | `1` | - | Initialize current page number. |
| `pageSize` | `number` | `false` | `10` | - | Initialize the number of displayed entries per page. |
| `total` | `number` | `false` | `0` | - | Initialize total number of entries. |
| `layout` | `string` <br /> `string[]` | `false` | `prev,pager,next` | `total` <br /> `prev` <br/> `pager` <br /> `next` <br /> `jumper` <br/> `sizes` | Specify this to change the layout of controls. |
| `onCurrentPageChange` | `Function` | `false` | - | - | The callback function when the current page changes, passed in the current page number as a parameter. |
| `onPageSizeChange` | `Function` | `false` | - | - | The callback function when the page size changes, passed in the current page size as a parameter. |

# Change Logs

see [here](./CHANGELOG.md)