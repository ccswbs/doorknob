const path = require("path")
const indexTemplate = path.resolve(`./src/templates/index.jsx`)
const indexContentFilePath = path.resolve(`./src/content/index.mdx`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors)
  }

  // ---------------
  // Create home page
  //
  createPage({
    path: "/",
    component: `${indexTemplate}?__contentFilePath=${indexContentFilePath}`,
  })


}