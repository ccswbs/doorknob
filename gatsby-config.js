module.exports = {
  siteMetadata: {
    title: `University of Guelph`,
    description: `The University of Guelph, and everyone who studies here, explores here, teaches here and works here is committed to one simple purpose: To Improve Life.`,
    author: `University of Guelph`,
    ogImage: ``,
    ogImageAlt: ``,
    menu: [
      { title: "Choose U of G", path: "https://www.uoguelph.ca/choose-u-of-g" },
      { title: "Improve Life",path: "https://www.uoguelph.ca/improve-life/" },
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
        //skipFileDownloads: true,
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
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        catchLinks: false,
        url:
        // allows a fallback url if WPGRAPHQL_URL is not set in the env, this may be a local or remote WP instance.
          process.env.WPGRAPHQL_URL ||
          `https://live-ug-news.pantheonsite.io/graphql`,
        schema: {
          //Prefixes all WP Types with "Wp" so "Post and allPost" become "WpPost and allWpPost".
          typePrefix: `Wp`,
          perPage: 20,
          requestConcurrency: 5,
          previewRequestConcurrency: 2,
        },
        develop: {
          //caches media files outside of Gatsby's default cache an thus allows them to persist through a cache reset.
          hardCacheMediaFiles: true,
        },
        type: {
          Event: {
            limit:
              process.env.NODE_ENV === `development`
                ? // Lets just pull 25 posts in development to make it easy on ourselves (aka. faster).
                  25
                : // and we don't actually need more than 50 in production for this particular site
                  50,
          },
          Comment: {exclude: true},
          Menu: {exclude: true},
          MenuItem: {exclude: true},
          Taxonomy: {exclude: true},
          UserRole: {exclude: true},
          PostFormat: {exclude: true},
          Page: {exclude: true},
          Post:  {
            limit:
              process.env.NODE_ENV === `development`
                ? // Lets just pull 25 posts in development to make it easy on ourselves (aka. faster).
                  25
                : // and we don't actually need more than 50 in production for this particular site
                  50,
          },
          Tag: {exclude: true},
          User: {exclude: true},
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`,
  ],
}
