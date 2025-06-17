module.exports = {
  plugins: [
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production'
      ? [
          require('@fullhuman/postcss-purgecss')({
            content: [
              './src/**/*.js',
              './src/**/*.jsx',
              './public/index.html',
            ],
            defaultExtractor: content => content.match(/[^<>'"`\s]*[^<>'"`\s:]/g) || [],
          }),
        ]
      : []),
  ],
};
