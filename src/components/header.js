import React from "react"
import { StaticQuery, graphql } from "gatsby"

const render = ({ pageSpecific }) => (
  <uofg-header>
    {pageSpecific?.map((item, i) => (
      <a key={item.path} href={item.path}>
        {item.title}
      </a>
    ))}
  </uofg-header>
)

const query = graphql`
  query {
    site {
      siteMetadata {
        menu {
          title
          path
        }
      }
    }
  }
`

export default function Header() {
  return (
    <StaticQuery
      query={query}
      render={({ site }) => render(site.siteMetadata)}
    />
  )
}
