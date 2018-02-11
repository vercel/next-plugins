import * as AwesomeTypescriptLoaderInterfaces from 'awesome-typescript-loader/dist/interfaces'

export type AwesomeTypescriptOptons = {
  useCheckerPlugin?: boolean
  loaderOptions?: AwesomeTypescriptLoaderInterfaces.LoaderConfig
}

type NextConfiguration = any

export type WithAwesomeTypescript = (awesomeTypescriptOptons?: AwesomeTypescriptOptons, nextConfiguration?: NextConfiguration) => NextConfiguration

declare const withAwesomeTypescript: WithAwesomeTypescript

export default withAwesomeTypescript