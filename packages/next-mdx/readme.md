# Next.js + mdx

Use [mdx](https://github.com/jamesknelson/mdxc) with [Next.js](https://github.com/zeit/next.js)

## Installation

```
npm install --save @zeit/next-mdx
```

or

```
yarn add @zeit/next-mdx
```

## Usage

Create a `next.config.js` in your project

```js
// next.config.js
const withMdx = require('@zeit/next-mdx')
module.exports = withMdx()
```

Optionally you can add your custom Next.js configuration as parameter

```js
// next.config.js
const withMdx = require('@zeit/next-mdx')
module.exports = withMdx({
  webpack(config, options) {
    return config
  }
})
```

Create `hello-world.mdx`:

```md
# Hello world

This is a paragraph
```

Create `pages/index.js`

```js
import Markdown from '../hello-world.mdx' // Markdown is a React component holding the compiled markdown code

export default () => <div>
  <Markdown />
</div>
```
