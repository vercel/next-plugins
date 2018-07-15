# Next.js + Web Workers

Use [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) in your [Next.js](https://github.com/zeit/next.js) project using `import`.

## Installation

```
npm install --save @zeit/next-workers worker-loader
```

or

```
yarn add @zeit/next-workers worker-loader
```

## Usage

Create a `next.config.js` in your project

```js
// next.config.js
const withWorkers = require('@zeit/next-workers')
module.exports = withWorkers()
```

Optionally you can add your custom Next.js configuration as parameter

```js
// next.config.js
const withWorkers = require('@zeit/next-workers')
module.exports = withWorkers(
  webpack(config, options) {
    return config
  }
})
```

You can also pass overriding options to [worker-loader](https://github.com/webpack-contrib/worker-loader#options) using `workerLoaderOptions`

```js
// next.config.js
const withWorkers = require('@zeit/next-workers')
module.exports = withWorkers({
  workerLoaderOptions: { inline: true },
})
```

Web Worker files are identified by the `.worker.js` extension

Because Workers are transpiled with `worker-loader` you can `import` dependencies just like other project files. See the [worker-loader documentation for examples](https://github.com/webpack-contrib/worker-loader#examples)

```js
// example.worker.js
self.addEventListener('message', (event) => console.log('Worker received:', event.data))
self.postMessage('from Worker')
```

The Worker can then be imported like a normal module and instantiated

```js
// pages/example.js
import React from 'react';

import ExampleWorker from '../example.worker';

export default class extends React.Component {
  state = { latestMessage: null }
  componentDidMount() {
    // Instantiate the Worker
    this.worker = new ExampleWorker()
    this.worker.postMessage('from Host')
    this.worker.addEventListener('message', this.onWorkerMessage)
  }
  componentWillUnmount() {
    // Close the Worker thread
    this.worker.terminate()
  }
  onWorkerMessage = (event) => this.setState({ latestMessage: event.data })
  render() {
    return <h1>Message from Worker: {this.state.latestMessage}</h1>
  }
}
```