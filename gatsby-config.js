// App Armor ID: 162 (dev) 163 (prod), typically we shouldn't expose env variables like this, but since this is not a secret, it's fine.
process.env["GATSBY_APP_ARMOR_ALERT_ID"] = process.env.NODE_ENV === `development` ? `162` : `163`

module.exports = {
    
  assetPrefix: `/sitefiles`,
  prefixPaths: `true`,

  siteMetadata: {
    title: `University of Guelph`,
    description: `The University of Guelph, and everyone who studies here, explores here, teaches here and works here is committed to one simple purpose: To Improve Life.`,
    author: `University of Guelph`,
    ogImage: ``,
    ogImageAlt: ``,
    menu: [
      { title: "Choose U of G", path: "https://www.uoguelph.ca/choose-u-of-g" },
      { title: "Improve Life", path: "https://www.uoguelph.ca/improve-life/" },
      { title: "News", path: "https://news.uoguelph.ca" },
    ],
  },

  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `University of Guelph`,
        short_name: `U of G`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#000000`,
        display: `browser`,
        icon: `static/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-drupal`,
        options: {
        baseUrl: process.env.DRUPAL_BASEURL,
        apiBase: process.env.DRUPAL_APIBASE,
        basicAuth: {
          username: process.env.BASIC_AUTH_USERNAME,
          password: process.env.BASIC_AUTH_PASSWORD,
        },
        fastBuilds: true,
        disallowedLinkTypes: [
            `describedby`,
            `block--block`,
            `block_content--basic`,
            `block_content--widget_block`,
            `block_content--yaml_block`,
            `block_content_type--block_content_type`,
            `consumer--consumer`,
            `domain--domain`,
            `feeds_feed--event_categories_import`,
            `feeds_feed--testimonial_import`,
            `media--audio`,
            `media--file`,
            `media--remote_video`,
            `media--video`,
            `menu--menu`,
            `menu_link_content--menu_link_content`,
            `metatag_defaults--metatag_defaults`,
            `node--article`,
            `node--call_to_action`,
            `node--career`,
            `node--course`,
            `node--custom_footer`,
            `node--employer`,
            `node--event`,
            `node--page`,
            `node--program`,
            `node--testimonial`,
            `paragraph--accordion_block`,
            `paragraph--accordion_section`,
            `paragraph--block_widget`,
            `paragraph--button_widget`,
            `paragraph--call_to_action`,
            `paragraph--events_widget`,
            `paragraph--general_text`,
            `paragraph--image_overlay`,
            `paragraph--lead_paragraph`,
            `paragraph--link_item`,
            `paragraph--links_widget`,
            `paragraph--media_text`,
            `paragraph--modal_video_widget`,
            `paragraph--program_statistic`,
            `paragraph--program_variants`,
            `paragraph--section`,
            `paragraph--section_buttons`,
            `paragraph--section_tabs`,
            `paragraph--statistic_item`,
            `paragraph--statistic_widget`,
            `paragraph--stats_widget`,
            `paragraph--story_image_cutout_background`,
            `paragraph--story_modal_video`,
            `paragraph--story_quote`,
            `paragraph--story_widget`,
            `paragraph--tab_content`,
            `paragraph--testimonial_slider`,
            `paragraph--yaml_widget`,
            `paragraphs_type--paragraphs_type`,
            `path_alias--path_alias`,
            `redirect--redirect`,
            `self`,
            `taxonomy_term--alignment_styles`,
            `taxonomy_term--bg_colors`,
            `taxonomy_term--button_styles`,
            `taxonomy_term--colour_variables`,
            `taxonomy_term--degrees`,
            `taxonomy_term--editorial_access`,
            `taxonomy_term--event_categories`,
            `taxonomy_term--goals`,
            `taxonomy_term--image_overlay_styles`,
            `taxonomy_term--news_category`,
            `taxonomy_term--program_variant_type`,
            `taxonomy_term--programs`,
            `taxonomy_term--section_columns`,
            `taxonomy_term--special_regions`,
            `taxonomy_term--specializations`,
            `taxonomy_term--statistic_styles`,
            `taxonomy_term--statistic_type`,
            `taxonomy_term--tags`,
            `taxonomy_term--testimonial_type`,
            `taxonomy_term--units`,
            `taxonomy_vocabulary--taxonomy_vocabulary`,
        ],
        skipFileDownloads: true,
        requestTimeoutMS: 300000,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`,
  ],
}
