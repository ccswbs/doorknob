import React from "react"
import { StaticQuery, graphql } from "gatsby"

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
`;

export default function Header() {
  return (
    <StaticQuery
      query={query}
      render={({ site }) => (
        <uofg-header>
          {site.siteMetadata.map((item, i) => (
            <a key={item.path} href={item.path}>
              {item.title}
            </a>
          ))}
        </uofg-header>
      )}
    />
  )
}
