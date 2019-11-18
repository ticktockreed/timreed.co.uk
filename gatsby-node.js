exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /es5/,
            use: loaders.null()
          },
          {
            test: /hammer/,
            use: loaders.null()
          }
        ]
      }
    });
  }
};

exports.createPages = async ({ reporter, actions, graphql }) => {
  const { createPage } = actions;

  // Query our blog posts
  const result = await graphql(`
    {
      workPages: allPrismicWorkItem {
        edges {
          node {
            id
            uid
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic(result.errors);
  }

  result.data.workPages.edges.forEach(({ node }) => {
    // Create a page for each blog post
    createPage({
      type: "work-item", // Custom type of the document
      match: "/work/:uid", // Pages will be generated in this pattern
      path: `/work/${node.uid}`, // Pages will be generated in this pattern
      component: require.resolve("./src/templates/workPage.js"), // Template file
      context: {
        id: node.id
      }
    });
  });
};
