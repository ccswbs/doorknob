import React from "react"
import classNames from "classnames"
import { useLocation } from "@reach/router"
import { Link } from "gatsby"

const LinkTab = ({ href, active, children }) => (
  <li className="nav-item nav-fill">
    <Link className={classNames("nav-link", { active: active })} to={href}>
      {children}
    </Link>
  </li>
)

export const LinkTabs = ({ tabs }) => {
  const location = useLocation()

  return (
    <ul className="nav nav-tabs">
      {tabs.map(({ href, content }) => (
        <LinkTab href={href} key={href} active={location.pathname === href}>
          {content}
        </LinkTab>
      ))}
    </ul>
  )
}
