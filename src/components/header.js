import React from "react"
import { graphql, useStaticQuery } from "gatsby"

export default function Header() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          menu {
            title
            path
          }
        }
      }
    }`
  )

  return (
    <uofg-header>
      <template>
        {data.site.siteMetadata.menu?.map((item, i) => (
          <a key={item.path} href={item.path}>
            {item.title}
          </a>
        ))}
      </template>
    </uofg-header>
  )
}
