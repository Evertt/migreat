const production = !process.env.ROLLUP_WATCH

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nested'),
    require('autoprefixer'),
    production && require('cssnano'),
  ]
}
