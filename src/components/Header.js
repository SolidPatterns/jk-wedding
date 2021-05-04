import PropTypes from 'prop-types'
import React from 'react'

const Header = props => (
  <header id="header" style={props.timeout ? { display: 'none' } : {}}>
    <div className="logo">
      <span className="icon fa-diamond"></span>
    </div>
    <div className="content">
      <div className="inner">
        <h1>Save the Date</h1>
        <p>We are getting married!</p>
        <p>
          <b><time datetime="2021-11-13">13•November•2021</time></b>
          <div>Amsterdam</div>
        </p>
        <p></p>
      </div>
    </div>
    <nav>
      <ul>
        {/* <li>
          <button
            onClick={() => {
              props.onOpenArticle('intro')
            }}
          >
            Joëlle & Kemal
          </button>
        </li> */}
        {/* <li>
          <button
            onClick={() => {
              props.onOpenArticle('work')
            }}
          >
            Work
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('about')
            }}
          >
            About
          </button>
        </li> */}
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('contact')
            }}
          >
            Please click & share your address
          </button>
        </li>
      </ul>
    </nav>
  </header>
)

Header.propTypes = {
  onOpenArticle: PropTypes.func,
  timeout: PropTypes.bool,
}

export default Header
