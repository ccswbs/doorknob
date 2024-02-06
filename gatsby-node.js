const path = require("path");

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

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
  ];
  createTypes(typeDefs);
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Building program search pages
  const programSearchTimer = reporter.activityTimer(`Building programs search pages.`);
  programSearchTimer.start();

  const programsSeachQuery = await graphql(`
    query {
      allProgramsYaml {
        nodes {
          level_of_education
        }
      }
    }
  `);

  if (programsSeachQuery.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for program search pages.`);
    return;
  }

  const programSearchTemplate = path.resolve("./src/templates/programs-search.js");
  const levelSet = new Set();

  for (const node of programsSeachQuery.data.allProgramsYaml.nodes) {
    levelSet.add(node.level_of_education);
  }

  const levels = Array.from(levelSet);

  for (const level of levels) {
    createPage({
      path: `/programs/${level}`,
      component: programSearchTemplate,
      context: {
        level,
        all_levels: levels,
      },
    });
  }

  programSearchTimer.end();
};
