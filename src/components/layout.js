import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Header from './header'
import Footer from './footer'
library.add(fab, fas)

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      siteNav: [
        { label: 'About', href: '/about' },
        { label: 'Work', href: '/work' },
        { label: 'Blog', href: '/blog' },
      ],
      socialMedia: [
        // { icon: 'codepen', href: 'http://codepen.io//' },
        {
          icon: 'linkedin',
          href: 'https://www.linkedin.com/in/brennonborbon/',
        },
        { icon: 'twitter', href: 'https://twitter.com/brenborbon' },
        { icon: 'github', href: 'https://github.com/brenborbs' },
        // { icon: 'dev', href: 'https://dev.to/' },
      ],
    }
  }

  componentDidMount() {
    window.onscroll = () => {
      var top = window.pageYOffset
      var navbar = document.querySelector('.is-home .navbar')
      if (this.props.location === 'home') {
        if (top < 550) {
          navbar.classList.add('clear')
        } else {
          navbar.classList.remove('clear')
        }
      }
    }
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <div className={`is-${this.props.location}`}>
            <Header
              siteTitle={data.site.siteMetadata.title}
              navigation={this.state.siteNav}
              social={this.state.socialMedia}
            />
            <div className="content">{this.props.children}</div>
            <Footer
              navigation={this.state.siteNav}
              social={this.state.socialMedia}
            />
          </div>
        )}
      />
    )
  }
}

Layout.propTypes = {
  location: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
  location: 'page',
}

export default Layout
