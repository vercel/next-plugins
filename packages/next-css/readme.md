# Next.js + CSS

Import `.css` files in your Next.js project

## Installation

```
npm install --save @zeit/next-css
```

or

```
yarn add @zeit/next-css
```

## Usage

### Without CSS modules

Create a `next.config.js` in your project

```js
// next.config.js
const withCSS = require('@zeit/next-css')
module.exports = withCSS()
```

Create a CSS file `styles.css`

```css
.example {
  font-size: 50px;
}
```

Create a page file `pages/index.js`

```js
import "../styles.css"

export default () => <div className="example">Hello World!</div>
```

### With CSS modules

```js
// next.config.js
const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  cssModules: true
})
```

Create a CSS file `styles.css`

```css
.example {
  font-size: 50px;
}
```

Create a page file `pages/index.js`

```js
import css from "../styles.css"

export default () => <div className={css.example}>Hello World!</div>
```

### Server rendering / styled-jsx like behavior

```js
// next.config.js
const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  cssModules: true,
  cssToString: true
})
```

Create a CSS file `styles.css`

```css
.example {
  font-size: 50px;
}
```

Create a page file `pages/index.js`

```js
import Head from 'next/head'
import css from '../style.css'

export default () => <div className={css.locals.example}>
  Hello World!
  <Head>
    <style>{css.toString()}</style>
  </Head>
</div>

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
const withCSS = require('@zeit/next-css')
module.exports = withCSS()
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

Create a CSS file `styles.css` the CSS here is using the css-variables postcss plugin.

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
const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  webpack(config, options) {
    return config
  }
})
```