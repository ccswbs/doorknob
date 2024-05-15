import React from "react"
import ReactDOM from 'react-dom/client'
import Layout from "./src/components/layout"

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

export const replaceHydrateFunction = () => {
  return (element, container) => {
    const root = ReactDOM.createRoot(container)
    root.render(element)
  }
}