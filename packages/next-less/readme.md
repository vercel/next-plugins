# Next.js + Less

Import `.less` files in your Next.js project

## Installation

```
npm install --save @zeit/next-less less
```

or

```
yarn add @zeit/next-less less
```

## Usage

### Without CSS modules

Create a `next.config.js` in your project

```js
// next.config.js
const withLess = require('@zeit/next-less')
module.exports = withLess()
```

Create a Less file `styles.less`

```less
@font-size: 50px;
.example {
  font-size: @font-size;
}
```

Create a page file `pages/index.js`

```js
import "../styles.less"

export default () => <div className="test">Hello World!</div>
```

### With CSS modules

```js
// next.config.js
const withLess = require('@zeit/next-less')
module.exports = withLess({
  cssModules: true
})
```

Create a Less file `styles.less`

```less
@font-size: 50px;
.example {
  font-size: @font-size;
}
```

Create a page file `pages/index.js`

```js
import css from "../styles.less"

export default () => <div className={css.example}>Hello World!</div>
```

### Production usage

In production the stylesheet is compiled to `.next/static/style.css`. You have to include it into the page using either [`next/head`](https://github.com/zeit/next.js#populating-head) or a custom [`_document.js`](https://github.com/zeit/next.js#custom-document). The file will be served from `/_next/static/style.css`

```js
// pages/index.js
import Head from 'next/head'

export default () => {
  return <div>
    <Head>
      <link rel="stylesheet" href="/_next/static/style.css">
    </Head>
  </div>
}
```

```js
// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css">
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
```

### PostCSS plugins

Create a `next.config.js` in your project

```js
// next.config.js
const withLess = require('@zeit/next-less')
module.exports = withLess()
```

Create a `postcss.config.js`

```js
module.exports = {
  plugins: {
    // Illustrational
    'postcss-css-variables': {}
  }
}
```

Create a CSS file `styles.scss` the CSS here is using the css-variables postcss plugin.

```css
:root {
  --some-color: red;
}

.example {
  /* red */
  color: var(--some-color);
}
```

When `postcss.config.js` is not found `postcss-loader` will not be added and will not cause overhead.

### Configuring Next.js

Optionally you can add your custom Next.js configuration as parameter

```js
// next.config.js
const withLess = require('@zeit/next-less')
module.exports = withLess({
  webpack(config, options) {
    return config
  }
})
```
