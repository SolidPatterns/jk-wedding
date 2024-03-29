require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Joëlle x Kemal | Wedding',
    author: 'Kemal Gültekin',
    description: 'Joëlle & Kemal are getting married!',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/jk-logo.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-sass',
    "gatsby-plugin-use-query-params",
  ],
}
