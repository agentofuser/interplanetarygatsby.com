const _ = require('lodash')
const fp = require('lodash/fp')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const sizeOf = require('image-size')

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
                image {
                  publicURL
                  childImageSharp {
                    original {
                      width
                      height
                    }
                  }
                }
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
  const nodeInternalType = node.internal.type

  if (nodeInternalType === 'Site') {
    // HACK: mimic gatsby-remark-image schema
    // image {
    //   publicURL
    //   childImageSharp {
    //     original {
    //       width
    //       height
    //     }
    //   }
    // }
    const { coverImageStaticPath } = node.siteMetadata
    const siteCoverImage = coverImageStaticPath && {
      publicURL: `/${coverImageStaticPath}`,
      childImageSharp: {
        original: sizeOf(path.resolve('static', coverImageStaticPath)),
      },
    }
    createNodeField({
      node,
      name: 'image',
      value: siteCoverImage,
    })
  }

  if (nodeInternalType === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: 'slug',
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
