const path = require("path")

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  const indexTemplate = path.resolve(`./src/templates/index.jsx`)
  const indexContentFilePath = path.resolve(`./src/content/index.mdx`)

  // ---------------
  // Create home page
  //
  createPage({
    path: "/",
    component: `${indexTemplate}?__contentFilePath=${indexContentFilePath}`,
  })
  
}