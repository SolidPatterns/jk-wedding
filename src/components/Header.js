import PropTypes from 'prop-types'
import React from 'react'

const Header = props => (
  <header id="header" style={props.timeout ? { display: 'none' } : {}}>
    <div className="logo">
      <span className="icon fa-diamond"></span>
    </div>
    <div className="content">
      <div className="inner">
        <h1>Joëlle & Kemal</h1>
        <p>Invite you to celebrate their love and wedding</p>
        <p>
          <b><time datetime="2021-11-13">13•November•2021</time></b>
          <div>Het Rijk van de Keizer</div>
          <div>Amsterdam</div>
        </p>
        <p></p>
      </div>
    </div>
    <nav>
      <ul>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('rsvp')
            }}
          >
            RSVP
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('how-to-get-there')
            }}
          >
            How to get there?
          </button>
        </li>
        {/* <li>
          <button
            onClick={() => {
              props.onOpenArticle('work')
            }}
          >
            Work
          </button>
        </li> */}
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('contact')
            }}
          >
            Contact
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
