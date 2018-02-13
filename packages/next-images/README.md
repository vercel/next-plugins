# Next.js + Images

Import jpg, jpeg, png, svg and gif files in [Next.js](https://github.com/zeit/next.js)

## Installation

```
npm install --save @zeit/next-images
```

or

```
yarn add @zeit/next-images
```

## Usage

Create a `next.config.js` in your project

```js
// next.config.js
const withImages = require('@zeit/next-images')
module.exports = withImages()
```

Optionally you can add your custom Next.js configuration as parameter

```js
// next.config.js
const withImages = require('@zeit/next-images')
module.exports = withImages({
  webpack(config, options) {
    return config
  }
})
```

And in your components or pages simply import your images:

```js
export default () => <div>
  <img src={require('./my-image.jpg')} />
</div>
```
