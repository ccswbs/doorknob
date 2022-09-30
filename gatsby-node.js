const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
            template
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
  // Create pages
  //

  result.data.allMdx.nodes.forEach(node => {
    let template = path.resolve(`./src/templates/${node.frontmatter.template}`);
    createPage({
      path: node.frontmatter.slug,
      component: `${template}?__contentFilePath=${node.internal.contentFilePath}`,
    })
  })

}