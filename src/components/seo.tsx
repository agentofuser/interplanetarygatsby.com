/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

const deleteSubstrsFn = (...substrs: string[]) => {
  // FIXME hack to work with gatsby-plugin-ipfs hack
  return (str: string) => str.replace(substrs[0], '').replace(substrs[1], '')
}

function SEO({
  description,
  image,
  keywords,
  lang,
  meta,
  pathname,
  title,
}: any) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          pathPrefix
          siteMetadata {
            siteUrl
            title
            description
            author
          }
          fields {
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
    `
  )

  const {
    pathPrefix,
    siteMetadata: { siteUrl },
    fields: { image: siteCoverImage },
  } = site

  const gatsbyPluginIpfsPrefix = pathPrefix
  const relativeUpdirsPrefix = '../../..'
  const fixIpfsHack = deleteSubstrsFn(
    gatsbyPluginIpfsPrefix,
    relativeUpdirsPrefix
  )
  const canonicalUrl = fixIpfsHack(siteUrl + pathname)

  const metaTitle = title || site.siteMetadata.title
  const metaDescription = description || site.siteMetadata.description

  const coverImage = image || siteCoverImage
  const metaImage = coverImage && {
    url: `${siteUrl}${coverImage.publicURL}`,
    width: coverImage.childImageSharp.original.width,
    height: coverImage.childImageSharp.original.height,
  }
  metaImage.url = fixIpfsHack(metaImage.url)

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      defaultTitle={site.siteMetadata.title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:url',
          content: canonicalUrl,
        },
        {
          property: 'og:title',
          content: metaTitle,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:image',
          content: metaImage.url,
        },
        {
          property: 'og:image:width',
          content: metaImage.width,
        },
        {
          property: 'og:image:height',
          content: metaImage.height,
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.author,
        },
        {
          name: 'twitter:title',
          content: metaTitle,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'twitter:image',
          content: metaImage.url,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: 'keywords',
                content: keywords.join(', '),
              }
            : []
        )
        .concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
  description: '',
}

export default SEO
