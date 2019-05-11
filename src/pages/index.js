import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Item from '../components/portfolioitems'
import Contact from '../components/contactform'

const IndexPage = ({ data }) => (
  <Layout location="home">
    <SEO title="Home" />
    <section className="section hero is-large has-text-centered">
      <Img sizes={data.heroImg.childImageSharp.sizes} />
      <div className="text">
        <h1 className="is-size-1">Web Developer.</h1>
        <p className="is-size-3">We are friends.</p>
        <AnchorLink
          href="#contact"
          className="button is-medium scroll"
          data-speed="1000"
        >
          Hire Me!
        </AnchorLink>
      </div>
    </section>

    <section className="portfolio-items columns is-multiline">
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Item
          key={node.frontmatter.title}
          name={node.frontmatter.title}
          tags={node.frontmatter.tags}
          url={node.fields.slug}
          img={node.frontmatter.thumbOne.childImageSharp.sizes}
        />
      ))}
    </section>
    <section className="section">
      <div className="columns is-centered">
        <div className="column is-6">
          <Contact buttonText="Hire Me!" />
        </div>
      </div>
    </section>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query {
    heroImg: file(relativePath: { eq: "blur.jpg" }) {
      childImageSharp {
        sizes(maxWidth: 1920) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    site {
      siteMetadata {
        description
        keywords
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { type: { eq: "projects" } } }
      limit: 6
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            tags
            thumbOne {
              childImageSharp {
                sizes(maxWidth: 1200) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`
