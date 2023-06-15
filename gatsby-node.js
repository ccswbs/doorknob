const path = require("path")


exports.createSchemaCustomization = ({ actions, schema }) => {

  const { createTypes } = actions

  const typeDefs = [
    `
      type node__spotlight implements Node {
        drupal_id: String
        field_hero_image: node__spotlightField_hero_image
        field_spotlight_rank: Int
        field_spotlight_url: node__spotlightField_spotlight_url
      }
      type node__spotlightField_spotlight_url implements Node {
        uri: String
        url: String
        title: String
      }
      type WpEventToEventsCategoryConnection implements Node {
        nodes: [WpEventsCategory]
      }
      type WpEventsCategory implements Node {
        name: String
      }
    `,

    schema.buildObjectType({
      name: `WpEvent`,
      interfaces: [`Node`],
      fields: {
        endDate: `String`,
        startDate: `String`,
        title: `String`,
        url: `String`,
        eventsCategories: `WpEventToEventsCategoryConnection`,
        isPast: {
          type: `Boolean`,
          resolve: (source) => new Date(source.startDate) < new Date(),
        },
      },
    }),
  ]
  createTypes(typeDefs)
}

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