import { graphql, Link } from 'gatsby'
import React from 'react'
import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { isBrowser } from '../utils/effectful-fns'
import { rhythm, scale } from '../utils/typography'
import { fixIpfsHackRelative } from '../utils/pure-fns'

const BlogPostTemplate = (props: any) => {
  const post = props.data.markdownRemark
  const siteTitle = props.data.site.siteMetadata.title
  const { previous, next } = props.pageContext

  const pathname = post.fields.slug
  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        description={post.frontmatter.description || post.excerpt}
        pathname={pathname}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
      />
      <h1>{post.frontmatter.title}</h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: 'block',
          marginBottom: rhythm(1),
          marginTop: rhythm(-1),
        }}
      >
        {post.frontmatter.date}
      </p>
      <div
        dangerouslySetInnerHTML={{
          __html: isBrowser
            ? fixIpfsHackRelative(pathname, post.html)
            : post.html,
        }}
      />
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <Bio />

      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          listStyle: 'none',
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
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
      fields {
        slug
      }
    }
  }
`
