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
          <b>
            <time dateTime="2021-11-13">13•November•2021</time>
          </b>
        </p>
        <p>Het Rijk van de Keizer</p>
        <p>Amsterdam</p>
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
            RSVP Here!
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('how-do-i-get-there')
            }}
          >
            How do I get there?
          </button>
        </li>
        {/* <li>
          <button
            onClick={() => {
              props.onOpenArticle('photos')
            }}
          >
            Upload photos
          </button>
        </li> */}
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('contact')
            }}
          >
            Gotta contact us?
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
