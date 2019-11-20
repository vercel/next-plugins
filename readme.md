# Next.js Plugins

## Official Next.js plugins

- [@next/mdx](https://github.com/zeit/next.js/tree/canary/packages/next-mdx)
- [@next/bundle-analyzer](https://github.com/zeit/next.js/tree/canary/packages/next-bundle-analyzer)
- [@zeit/next-css](./packages/next-css)
- [@zeit/next-sass](./packages/next-sass)
- [@zeit/next-less](./packages/next-less)
- [@zeit/next-stylus](./packages/next-stylus)
- [@zeit/next-preact](./packages/next-preact)
- [@zeit/next-typescript](./packages/next-typescript)
- [@zeit/next-source-maps](./packages/next-source-maps)
- [@zeit/next-workers](./packages/next-workers)

## Community made plugins

- [next-compose-plugins](https://github.com/cyrilwanner/next-compose-plugins)
- [next-env](https://github.com/formatlos/next-env)
- [next-images](https://github.com/arefaslani/next-images)
- [next-inferno](https://github.com/queses/next-inferno)
- [next-offline](https://github.com/hanford/next-offline)
- [next-optimized-images](https://github.com/cyrilwanner/next-optimized-images)
- [next-pino](https://github.com/khaeransori/next-pino)
- [next-plugin-graphql](https://github.com/lfades/next-plugin-graphql)
- [next-testcafe-build](https://github.com/formatlos/next-testcafe-build)
- [next-runtime-dotenv](https://github.com/tusbar/next-runtime-dotenv)
- [next-progressbar](https://github.com/lucleray/next-progressbar)
- [next-purgecss](https://github.com/lucleray/next-purgecss)
- [next-plugin-transpile-modules](https://github.com/KeitIG/next-plugin-transpile-modules)
- [next-seo](https://github.com/garmeeh/next-seo)
- [next-mdx-blog](https://github.com/hipstersmoothie/next-mdx-blog)
- [next-fonts](https://github.com/rohanray/next-fonts)
- [next-size](https://github.com/lucleray/next-size)
- [next-react-svg](https://github.com/jeremybarbet/next-react-svg)
- [next-plugin-yaml](https://github.com/tomasz-sodzawiczny/next-plugin-yaml)
- [next-koa](https://github.com/xinpianchang/next-koa)

## Publishing

Note: this is for maintainers only and won't work if you're not a maintainer.

Replace `NPM_CONFIG_OTP` with the OTP generated by the authenticator.

### Publishing Canary

```
NPM_CONFIG_OTP=123456 yarn release-canary
```

### Publishing Stable

```
NPM_CONFIG_OTP=123456 yarn release-stable
```
