const path = require("path")
const fs = require("fs")
const { findOne } = require("gatsby/dist/schema/resolvers")
const { requirementToSlug } = require("./src/utils/requirementToSlug.js")

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

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "AdmissionRequirementsYaml") {
    createNodeField({
      node,
      name: "slug",
      value: requirementToSlug({
        studentType: node["student-type"],
        location: node.location,
        degreeType: node["degree-type"],
        fieldOfStudy: node["field-of-study"]
      })
    })
  }
}

exports.createResolvers = ({ createResolvers }) => {
  const getRequirementCategories = async (source, context) => {
    return {
      location: await context.nodeModel.findOne({
        query: {
          filter: { id: source.location },
        },
        type: "AdmissionRequirementsLocationsYaml",
      }),
      studentType: await context.nodeModel.findOne({
        query: {
          filter: { id: source.student_type },
        },
        type: "AdmissionRequirementsStudentTypesYaml",
      }),
      degreeType: await context.nodeModel.findOne({
        query: {
          filter: { id: source.degree_type },
        },
        type: "AdmissionRequirementsDegreeTypesYaml",
      }),
      fieldOfStudy: await context.nodeModel.findOne({
        query: {
          filter: { id: source.field_of_study },
        },
        type: "AdmissionRequirementsFieldsOfStudyYaml",
      }),
    }
  }

  const resolvers = {
    AdmissionRequirementsYaml: {
      title: {
        type: "String",
        resolve: async (source, args, context, info) => {
          return "test"
        },
      },
      parents: {
        type: ["AdmissionRequirementsYaml"],
        resolve: async (source, args, context, info) => {
          const parents = []
          let current = source.fields.slug

          while (current !== "") {
            parents.unshift(current)
            current = current.substring(0, current.lastIndexOf("/"))
          }

          parents.pop()

          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: { fields: { slug: { in: parents } } },
            },
            type: "AdmissionRequirementsYaml",
          })

          return entries
        },
      },
    },
  }

  createResolvers(resolvers)
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Building requirements pages
  const activity = reporter.activityTimer(`Building undergraduate admission requirements pages.`)
  activity.start()

  const requirementsQuery = await graphql(`
    query {
      requirements: allAdmissionRequirementsYaml {
        nodes {
          id
          fields {
            slug
          }
          parents {
            id
          }
        }
      }
    }
  `)

  if (requirementsQuery.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for admission undergraduate requirements.`)
    return
  }

  const template = path.resolve("./src/templates/admission/requirements.js")

  for (const requirement of requirementsQuery.data.requirements.nodes) {
    createPage({
      path: `admission/requirements/${requirement.fields.slug}`,
      component: template,
      context: {
        ids: [...requirement.parents.map(parent => parent.id), requirement.id],
        title: "test"
      },
    })
  }

  activity.end()
}
