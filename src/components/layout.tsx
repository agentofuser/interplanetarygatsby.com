import React from 'react'
import { Link } from 'gatsby'
import { rhythm, scale } from '../utils/typography'

declare var __PATH_PREFIX__: string

const Layout = ({ location, title, children }: any) => {
  // `__PATH_PREFIX__` is a Gatsby global
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: 'none',
            textDecoration: 'none',
            color: 'inherit',
          }}
          to="/"
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: 'Montserrat, sans-serif',
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: 'none',
            textDecoration: 'none',
            color: 'inherit',
          }}
          to="/"
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <footer>
        Agent of User © {new Date().getFullYear()} ·{' '}
        <a href="https://blueoakcouncil.org/license/1.0.0">BlueOak-1.0.0</a> ·{' '}
        <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0</a> ·{' '}
        <a href="https://support.brave.com/hc/en-us/articles/360021123971-How-do-I-tip-websites-and-Content-Creators-in-Brave-Rewards-">
          Patronage Appreciated
        </a>
      </footer>
    </div>
  )
}

export default Layout
