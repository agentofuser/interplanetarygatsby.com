/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import { rhythm } from '../utils/typography'
import profilePic from '../../content/assets/profile-pic.jpg'

const bioQuery = graphql`
  query BioQuery {
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: 'flex',
              marginBottom: rhythm(2.5),
            }}
          >
            <img
              src={profilePic}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                flexShrink: 0,
              }}
            />
            <p>
              Written by <strong>{author}</strong> who lives and works on 🌎
              Earth building useful things.{' '}
              <a href={`https://twitter.com/${social.twitter}`}>
                You should follow them on Twitter
              </a>
            </p>
          </div>
        )
      }}
    />
  )
}

export default Bio
