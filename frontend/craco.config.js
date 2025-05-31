module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add fallbacks for Node.js modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        buffer: require.resolve('buffer'),
        util: require.resolve('util'),
        process: require.resolve('process/browser'),
      };

      // Add gray-matter-loader for .md files
      webpackConfig.module.rules.push({
        test: /\.md$/,
        use: [{ loader: "gray-matter-loader" }],
      });

      return webpackConfig;
    },
  },
};


