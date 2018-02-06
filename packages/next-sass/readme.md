# Next.js + Sass

Import `.scss` and `.sass` files in your Next.js project

## Installation

```
npm install --save @zeit/next-sass node-sass
```

or

```
yarn add @zeit/next-sass node-sass
```

## Usage

### Without CSS modules

Create a `next.config.js` in your project

```js
// next.config.js
const withSass = require('@zeit/next-sass')
module.exports = withSass()
```

Create a Sass file `styles.scss`

```css
$font-size: 50px;
.example {
  font-size: $font-size;
}
```

Create a page file `pages/index.js`

```js
import "../styles.scss"

export default () => <div className="example">Hello World!</div>
```

### With CSS modules

```js
// next.config.js
const withSass = require('@zeit/next-sass')
module.exports = withSass({
  cssModules: true
})
```

Create a Sass file `styles.scss`

```css
$font-size: 50px;
.example {
  font-size: $font-size;
}
```

Create a page file `pages/index.js`

```js
import css from "../styles.scss"

export default () => <div className={css.example}>Hello World!</div>
```


### PostCSS plugins

Create a `next.config.js` in your project

```js
// next.config.js
const withSass = require('@zeit/next-sass')
module.exports = withSass()
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
const withCSS = require('@zeit/next-sass')
module.exports = withCSS({
  webpack(config, options) {
    return config
  }
})
```
