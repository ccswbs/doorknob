/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import PropTypes from "prop-types";
import Footer from "../components/footer";
import Header from "../components/header";
import "../styles/ug.scss";
import "../styles/global.css";
import "@fontsource/roboto";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/100-italic.css";
import "@fontsource/roboto/400-italic.css";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main id="content">{children}</main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
