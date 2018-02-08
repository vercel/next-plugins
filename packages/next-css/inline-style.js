/* eslint-disable import/no-extraneous-dependencies, no-unused-vars, import/no-unresolved, */
import { Fragment } from 'react'
import Head from 'next/head'

export default ({ css, children }) => {
  return (
    <Fragment>
      {children}
      {css.map((single, index) => (
        <Head key={index}>
          <style>{single.toString()}</style>
        </Head>
      ))}
    </Fragment>
  )
}
