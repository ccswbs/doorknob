/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import Footer from "../components/footer"
import Header from "../components/header"
import "../styles/ug.scss"
import "../styles/global.css"
import "@fontsource/roboto"
import "@fontsource/roboto/700.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/100-italic.css"
import "@fontsource/roboto/400-italic.css"

const Layout = ({ children }) => {
  // Set a CSS variable to the width of the scrollbar, since 100vw includes the scrollbar width and can cause horizontal overflow on some browsers when the scrollbar is visible. This variable can be used to subtract the scrollbar width from 100vw to prevent this.
  React.useEffect(() => {
    document.body.style.setProperty(
      "--tw-scrollbar-width",
      `${window.innerWidth - document.documentElement.clientWidth}px`,
    )
  })

  return (
    <>
      <Header />
      <main id="content">{children}</main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
