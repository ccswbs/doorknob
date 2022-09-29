/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import Footer from "src/components/footer"
import Header from "src/components/header"
import 'src/styles/ug.scss'

const Layout = ({ children }) => {
  return (
    <>
        <Header />
        <main id="content">
          {children}
        </main>
        <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
