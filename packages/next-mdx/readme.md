# Next.js + MDX

Use [MDX](https://github.com/mdx-js/mdx) with [Next.js](https://github.com/zeit/next.js)

## Installation

```
npm install --save @zeit/next-mdx @mdx-js/loader
```

or

```
yarn add @zeit/next-mdx @mdx-js/loader
```

## Usage

Create a `next.config.js` in your project

```js
// next.config.js
const withMDX = require('@zeit/next-mdx')()
module.exports = withMDX()
```

Optionally you can provide [MDX options](https://github.com/mdx-js/mdx#options):

```js
// next.config.js
const withMDX = require('@zeit/next-mdx')({
  options: {
    mdPlugins: [

    ],
    hastPlugins: [

    ]
  }
})
module.exports = withMDX()
```

Optionally you can add your custom Next.js configuration as parameter

```js
// next.config.js
const withMDX = require('@zeit/next-mdx')()
module.exports = withMDX({
  webpack(config, options) {
    return config
  }
})
```

Optionally you can match other file extensions for MDX compilation, by default only `.mdx` is supported

```js
// next.config.js
const withMDX = require('@zeit/next-mdx')({
  extension: /\.(md|mdx)$/
})
module.exports = withMDX()
```

## Top level .mdx pages

Define the `pagesExtensions` option to have Next.js handle `.mdx` files in the `pages` directory as pages:

```js
// next.config.js
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/
})
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx']
})
```
