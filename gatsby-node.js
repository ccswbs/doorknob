const path = require("path")
const fs = require("fs")
const { findOne } = require("gatsby/dist/schema/resolvers")
const { slugify } = require("./src/utils/slugify.js")

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
  const query = await graphql(`
    query {
      locations: allAdmissionRequirementsLocationsYaml {
        nodes {
          yamlId
        }
      }
      studentTypes: allAdmissionRequirementsStudentTypesYaml {
        nodes {
          yamlId
        }
      }
      degreeTypes: allAdmissionRequirementsDegreeTypesYaml {
        nodes {
          yamlId
        }
      }
      fieldsOfStudy: allAdmissionRequirementsFieldsOfStudyYaml {
        nodes {
          yamlId
          degreeType: degree_type
        }
      }
      requirements: allAdmissionRequirementsYaml {
        nodes {
          id
          location
          studentType: student_type
          degreeType: degree_type
          fieldOfStudy: field_of_study
        }
      }
    }
  `)

  if (query.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for admission undergraduate requirements.`)
    return
  }

  const toMap = (acc, curr) => {
    acc.set(curr.yamlId, { ...curr, applicableRequirements: [] })
    return acc
  }

  const activity = reporter.activityTimer(`Building undergraduate admission requirements pages.`)

  activity.start()

  const requirements = query.data.requirements.nodes;



  /*
  const locations = query.data.locations.nodes.reduce(toMap, new Map())
  const studentTypes = query.data.studentTypes.nodes.reduce(toMap, new Map())
  const degreeTypes = query.data.degreeTypes.nodes.reduce(toMap, new Map())
  const fieldsOfStudy = query.data.fieldsOfStudy.nodes.reduce(toMap, new Map())

  const updateApplicableRequirements = (requirement, key, map) => {
    if (requirement[key] !== "any") {
      map.get(requirement[key])?.applicableRequirements?.push(requirement)
    }
  }

  // First pass
  for (const requirement of query.data.requirements.nodes) {
    updateApplicableRequirements(requirement, "location", locations)
    updateApplicableRequirements(requirement, "studentType", studentTypes)
    updateApplicableRequirements(requirement, "degreeType", degreeTypes)
    updateApplicableRequirements(requirement, "fieldOfStudy", fieldsOfStudy)
  }

  const processRequirementPart = (requirement, key, map, array, slug) => {
    if (requirement[key] !== "any") {
      array.push(...(map.get(requirement[key])?.applicableRequirements ?? []))
      return slug + `/${requirement[key]}`
    }

    return slug
  }

  const template = path.resolve("./src/templates/admission/requirements.js")

  // Second pass
  for (const requirement of query.data.requirements.nodes) {
    let slug = "/admission/requirements/undergraduate"
    let requirements = []

    slug = processRequirementPart(requirement, "location", locations, requirements, slug)
    slug = processRequirementPart(requirement, "studentType", studentTypes, requirements, slug)
    slug = processRequirementPart(requirement, "degreeType", degreeTypes, requirements, slug)
    slug = processRequirementPart(requirement, "fieldOfStudy", fieldsOfStudy, requirements, slug)

    requirements = [...new Set(requirements)].map(val => val.id);

    actions.createPage({
      path: slug,
      component: require.resolve(template),
      context: { requirements: requirements },
    })
  }

   */


  activity.end()
}
