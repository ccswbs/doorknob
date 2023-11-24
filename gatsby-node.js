const path = require("path")
const fs = require("fs")
const { SlugTree, SlugTreeNode } = require("./src/utils/slug-tree")
const { findOne } = require("gatsby/dist/schema/resolvers")

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  const typeDefs = [
    `
      type media__image implements Node {
        drupal_id: String
        name: String
        field_media_image: media__imageField_media_image
        relationships: media__imageRelationships
      }
      type media__imageField_media_image implements Node {
        alt: String
      }
      type media__imageRelationships implements Node {
        field_media_image: file__file @link(from: "field_media_image___NODE")
        node__spotlight: [node__spotlight] @link(from: "node__spotlight___NODE")
      }
      type node__spotlight implements Node {
        changed: Date
        drupal_id: String
        field_spotlight_alignment: String
        field_spotlight_button: String
        field_spotlight_caption: String
        field_spotlight_image_alignment: String
        field_spotlight_rank: Int
        field_spotlight_url: node__spotlightField_spotlight_url
        relationships: node__spotlightRelationships
        status: Boolean
        title: String
      }
      type node__spotlightRelationships implements Node {
        field_hero_image: media__image @link(from: "field_hero_image___NODE")
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
          resolve: source => new Date(source.startDate) < new Date(),
        },
      },
    }),
  ]
  createTypes(typeDefs)
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Building requirements pages
  const requirementsQuery = await graphql(`
    query {
      requirements: allRequirementsYaml {
        nodes {
          slug
        }
      }
    }
  `)

  if (requirementsQuery.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for admission undergraduate requirements.`)
    return
  }

  const activity = reporter.activityTimer(`Building undergraduate admission requirements pages.`)

  activity.start()

  const template = path.resolve("./src/templates/admission/undergraduate/requirements.js")
  const requirements = new SlugTree()

  // Parse all slugs from the query into a SlugTree
  requirements.addSlugs(...requirementsQuery.data.requirements.nodes.map(node => node.slug))

  // Traverse the SlugTree to create the pages
  requirements.traverse((node, parents) => {
    // Only create pages for leaf nodes
    if (node.isLeaf) {
      let path = ""
      let slug = ""
      const parentSlugs = []

      for (const parent of parents) {
        const part = parent.node?.part ?? parent.part

        if (part === "") {
          continue
        }

        path += `${part}/`
        slug += `${parent instanceof SlugTreeNode ? `${part}/` : "*/"}`

        parentSlugs.push(path.slice(0, -1))
      }

      path += node.part
      slug += node.part

      createPage({
        path: `admission/undergraduate/requirements/${path}`,
        component: template,
        context: {
          slug,
          parents: parentSlugs,
        },
      })
    }
  })

  activity.end()
}

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    RequirementsYaml: {
      html: {
        type: "Html",
        async resolve(source, args, context, info) {
          // Construct a query to find the corresponding HTML node
          const slug = source.slug.replace("*", "wildcard")

          const node = await context.nodeModel.findOne({
            type: `Html`,
            query: {
              filter: {
                relativePath: {
                  in: [
                    `admission/undergraduate/requirements/${slug}.html`,
                    `admission/undergraduate/requirements/${slug}/index.html`,
                  ],
                },
              },
            },
          })

          return node
        },
      },
    },
  })
}

exports.onCreateNode = async ({ node, actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  // Check if the node is a File and its extension is .html
  if (node.internal.type === "File" && path.extname(node.absolutePath) === ".html") {
    const content = fs.readFileSync(node.absolutePath, "utf-8")

    // Create a new node with HTML content
    const htmlNode = {
      id: createNodeId(`${node.id} >>> HTML`),
      parent: node.id,
      children: [],
      internal: {
        type: "Html",
        mediaType: "text/html",
        content,
        contentDigest: createContentDigest(content),
      },
      absolutePath: node.absolutePath,
      relativePath: node.relativePath,
    }

    // Create the new node
    createNode(htmlNode)
  }
}
