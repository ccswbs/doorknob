import React from "react"
import { useLocation } from "@reach/router"
import { Link } from "gatsby"
import Nav from 'react-bootstrap/Nav';

export const LinkTabs = ({ tabs }) => {
  const location = useLocation()

  return (
    <Nav fill variant="tabs" defaultActiveKey={location.pathname} as="ul">
      {tabs.map(({ href, content }) => (
        <Nav.Item  key={href} as="li">
          <Nav.Link eventKey={href} to={href} as={Link}>{content}</Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  )
}
