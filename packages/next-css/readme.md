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

The stylesheet is compiled to `.next/static/style.css`. You have to include it into the page using a custom [`_document.js`](https://github.com/zeit/next.js#custom-document). The file will be served from `/_next/static/style.css`

```js
// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
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

### Without CSS modules

Create a `next.config.js` in the root of your project (next to pages/ and package.json)

```js
// next.config.js
const withCSS = require('@zeit/next-css')
module.exports = withCSS()
```

Create a CSS file `style.css`

```css
.example {
  font-size: 50px;
}
```

Create a page file `pages/index.js`

```js
import "../style.css"

export default () => <div className="example">Hello World!</div>
```

### Separate CSS Files

Set `shouldMergeChunks` option to `false` in `next/config.js`.

```js
// next.config.js
const withCSS = require('@zeit/next-css')
module.exports = withCSS({ shouldMergeChunks: false })
```

The plugin will compile the stylesheets into:

* **development**
  * `.next/static/bundles/pages/[name].css`: All stylesheets is extracted for each pages because common chunks is disabled
* **production**
  * `.next/static/_app-[contenthash].css`: All stylesheets loaded in `_app.js` is extracted to this file
  * `.next/static/main-[contenthash].css`: Each pages common stylesheets is extracted to this file, excluding one which is imported dynamically
  * `.next/static/bundles/pages/[name]-[contenthash].css`: The rest stylesheets will go to this file

You have to include the stylesheets into the page using a custom [`_document.js`](https://github.com/zeit/next.js#custom-document).

```js
// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    const { css } = this.props.buildManifest;
    return (
      <html>
        <Head>
          {css.map(href => (
            <link key={href} rel="stylesheet" href={`/_next/${href}`} />
          ))}
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

### With CSS modules

```js
// next.config.js
const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  cssModules: true
})
```

Create a CSS file `style.css`

```css
.example {
  font-size: 50px;
}
```

Create a page file `pages/index.js`

```js
import css from "../style.css"

export default () => <div className={css.example}>Hello World!</div>
```

### With CSS modules and options

You can also pass a list of options to the `css-loader` by passing an object called `cssLoaderOptions`.

For instance, [to enable locally scoped CSS modules](https://github.com/css-modules/css-modules/blob/master/docs/local-scope.md#css-modules--local-scope), you can write:

```js
// next.config.js
const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  }
})
```

Create a CSS file `styles.css`

```css
.example {
  font-size: 50px;
}
```

Create a page file `pages/index.js` that imports your stylesheet and uses the hashed class name from the stylesheet

```js
import css from "../style.css"

const Component = props => {
  return (
    <div className={css.backdrop}>
      ...
    </div>
  )
}

export default Component
```

Your exported HTML will then reflect locally scoped CSS class names.

For a list of supported options, [refer to the webpack `css-loader` README](https://github.com/webpack-contrib/css-loader#options).

```js
// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
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

Create a CSS file `style.css` the CSS here is using the css-variables postcss plugin.

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
