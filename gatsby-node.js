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
