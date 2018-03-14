# Next.js + Stylus

Import `.styl` files in your Next.js project

## Installation

```
npm install --save @zeit/next-stylus stylus
```

or

```
yarn add @zeit/next-stylus stylus
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

Create a `next.config.js` in your project

```js
// next.config.js
const withStylus = require('@zeit/next-stylus')
module.exports = withStylus()
```

Create a Stylus file `styles.styl`

```css
$font-size = 50px
.example
  font-size $font-size
```

Create a page file `pages/index.js`

```js
import "../styles.styl"

export default () => <div className="example">Hello World!</div>
```

### With CSS modules

```js
// next.config.js
const withStylus = require('@zeit/next-stylus')
module.exports = withStylus({
  cssModules: true
})
```

Create a Stylus file  `styles.styl`

```css
$font-size = 50px
.example
  font-size $font-size
```

Create a page file `pages/index.js`

```js
import css from "../styles.styl"

export default () => <div className={css.example}>Hello World!</div>
```

### With CSS modules and options

You can also pass a list of options to the `css-loader` by passing an object called `cssLoaderOptions`.

For instance, [to enable locally scoped CSS modules](https://github.com/css-modules/css-modules/blob/master/docs/local-scope.md#css-modules--local-scope), you can write:

```js
// next.config.js
const withSass = require('@zeit/next-sass')
module.exports = withSass({
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

### With Stylus loader options

You can pass options from [Stylus](https://github.com/stylus/stylus/blob/dev/docs/js.md)

```js
// next.config.js
const nib = require('nib')
const withStylus = require('@zeit/next-stylus')
module.exports = withStylus({
  stylusLoaderOptions: {
    use: [nib()]
  }
})
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

For PostCSS support install [`PostStylus`](https://github.com/seaneking/poststylus) in your project.

Create a `postcss.config.js`

```js
module.exports = {
  plugins: {
    // Illustrational
    'postcss-css-variables': {}
  }
}
```

Create a `next.config.js` in your project.

Pass the plugin and the options to Stylus via `stylusLoaderOptions`.

```js
// next.config.js
const withStylus = require('@zeit/next-stylus')
const poststylus = require('poststylus')
const postCssPlugins = require('./postcss.config').plugins
module.exports = withStylus({
  stylusLoaderOptions: {
    use: [poststylus(Object.entries(postCssPlugins).map(([key, val]) => require(key(val)))]
  }
})
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
const withStylus = require('@zeit/next-stylus')
module.exports = withStylus({
  webpack(config, options) {
    return config
  }
})
```
