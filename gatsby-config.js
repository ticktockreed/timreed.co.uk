require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});
module.exports = {
  siteMetadata: {
    title: `Tim Reed`,
    description: `The Personal website of UI engineer and product designer Tim Reed.`,
    author: `@gatsbyjs`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: `${__dirname}/src/images` // See below to configure properly
        }
      }
    },

    `gatsby-plugin-transition-link`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/tr-logo.png` // This path is relative to the root of the site.
      }
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Open Sans:400,600,800", "Source Code Pro:600,700,900"]
        }
      }
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `timreedcouk`,
        accessToken: `${process.env.API_KEY}`,
        pages: [
          {
            type: "work-item", // Custom type of the document
            match: "/work/:uid", // Pages will be generated in this pattern
            path: "/work-preview", // Placeholder route for previews
            component: require.resolve("./src/templates/workPage.js") // Template file
          }
        ]
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ]
};
