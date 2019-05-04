const _ = require('lodash')
const fp = require('lodash/fp')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

// # pure functions

function getCollection(mdEdge) {
  return mdEdge.node.fields.collection
}

// # effectful functions

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve('./src/templates/blog-post.tsx')
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                collection
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const mds = result.data.allMarkdownRemark.edges

    // create blog pages
    {
      const mdEdges = fp.filter(md => getCollection(md) === 'blog')(mds)
      mdEdges.forEach((mdEdge, index) => {
        const previous =
          index === mdEdges.length - 1 ? null : mdEdges[index + 1].node
        const next = index === 0 ? null : mdEdges[index - 1].node

        createPage({
          path: mdEdge.node.fields.slug,
          component: blogPost,
          context: {
            slug: mdEdge.node.fields.slug,
            collection: getCollection(mdEdge),
            previous,
            next,
          },
        })
      })
    }

    // create wiki pages
    {
      const mdEdges = fp.filter(md => getCollection(md) === 'wiki')(mds)
      mdEdges.forEach((mdEdge, index) => {
        const previous =
          index === mdEdges.length - 1 ? null : mdEdges[index + 1].node
        const next = index === 0 ? null : mdEdges[index - 1].node

        createPage({
          path: mdEdge.node.fields.slug,
          component: blogPost,
          context: {
            slug: mdEdge.node.fields.slug,
            collection: getCollection(mdEdge),
            previous,
            next,
          },
        })
      })
    }

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: 'slug',
      node,
      value,
    })

    const parent = getNode(_.get(node, 'parent'))
    createNodeField({
      node,
      name: 'collection',
      value: _.get(parent, 'sourceInstanceName'),
    })
  }
}
