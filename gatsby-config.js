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
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
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
    `gatsby-plugin-sass`,
    `gatsby-plugin-sharp`,
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
  ],
}
