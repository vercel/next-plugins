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

The stylesheet is compiled to `.next/static/css`. Next.js will automatically add the css file to the HTML. 
In production a chunk hash is added so that styles are updated when a new version of the stylesheet is deployed.

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
const withStylus = require('@zeit/next-stylus')
module.exports = withStylus({
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

Create a `next.config.js` in your project.

Pass the plugin and the options to Stylus via `stylusLoaderOptions`.

```js
// next.config.js
const nib = require('nib')
const rupture = require('rupture')
const withStylus = require('@zeit/next-stylus')
const poststylus = require('poststylus')
const autoprefixer = require('autoprefixer')

module.exports = withStylus({
  stylusLoaderOptions: {
    use: [
      nib(),
      rupture(),
      poststylus([
        autoprefixer({ flexbox: 'no-2009' }),
        require('postcss-css-variables'),
      ]),
  }
})
```

Create a Stylus file `styles.styl` the Stylus here is using the css-variables postcss plugin.

```css
:root 
  --some-color red


.example 
  /* red */
  color var(--some-color)

```
You can also pass a list of options to the `postcss-loader` by passing an object called `postcssLoaderOptions`.

For example, to pass theme env variables to postcss-loader, you can write:

```js
// next.config.js
const withStylus = require('@zeit/next-stylus')
module.exports = withStylus({
  postcssLoaderOptions: {
    parser: true,
    config: {
      ctx: {
        theme: JSON.stringify(process.env.REACT_APP_THEME)
      }
    }
  }
})
```


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
