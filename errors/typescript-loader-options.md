# `typescriptLoaderOptions` in next.config.js is no longer supported.

#### Why This Error Occurred

`@zeit/next-typescript` no longer uses `ts-loader` to transpile Typescript to Javascript. Instead it uses `@babel/preset-typescript`.

#### Possible Ways to Fix It

Remove `typescriptLoaderOptions` from the `next.config.js` in your project.
