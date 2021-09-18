import PropTypes from 'prop-types'
import React from 'react'
import pic01 from '../images/pic01.jpg'
import pic02 from '../images/pic02.jpg'
import pic03 from '../images/pic03.jpg'
import RsvpForm from './RsvpForm'
import ContactForm from './ContactForm'
class Main extends React.Component {
  render() {
    let close = (
      <div
        className="close"
        onClick={() => {
          this.props.onCloseArticle()
        }}
      ></div>
    )

    return (
      <div
        ref={this.props.setWrapperRef}
        id="main"
        style={this.props.timeout ? { display: 'flex' } : { display: 'none' }}
      >
        <article
          id="how-do-i-get-there"
          className={`${
            this.props.article === 'how-do-i-get-there' ? 'active' : ''
          } ${this.props.articleTimeout ? 'timeout' : ''}`}
          style={{ display: 'none' }}
        >
          <h2 className="major">How do I get there?</h2>
          <span className="image main">
            {/* <img src={pic01} alt="" /> */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.286856104298!2d4.777646715802383!3d52.383349979788555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5e39a7c086f75%3A0x52c0a036ece30cab!2shet%20Rijk%20van%20de%20Keizer!5e0!3m2!1sen!2str!4v1630532534979!5m2!1sen!2str"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </span>
          <p>
            It's super easy by car! Het Rijk van de Keizer is only 15 minutes from
            Amsterdam Central Station, and only 10 minutes from Amsterdam
            Sloterdijk Station by car. Easiest way to get there is to take an
            Uber or to hop on a taxi.
          </p>
          <p>
            You can click on the map above or hit{' '}
            <a target="_blank" href="https://g.page/hetRijkvandeKeizer?share">
              {' '}
              this link{' '}
            </a>{' '}
            to get directions.
          </p>
          {close}
        </article>

        <article
          id="work"
          className={`${this.props.article === 'work' ? 'active' : ''} ${
            this.props.articleTimeout ? 'timeout' : ''
          }`}
          style={{ display: 'none' }}
        >
          <h2 className="major">Work</h2>
          <span className="image main">
            <img src={pic02} alt="" />
          </span>
          <p>
            Adipiscing magna sed dolor elit. Praesent eleifend dignissim arcu,
            at eleifend sapien imperdiet ac. Aliquam erat volutpat. Praesent
            urna nisi, fringila lorem et vehicula lacinia quam. Integer
            sollicitudin mauris nec lorem luctus ultrices.
          </p>
          <p>
            Nullam et orci eu lorem consequat tincidunt vivamus et sagittis
            libero. Mauris aliquet magna magna sed nunc rhoncus pharetra.
            Pellentesque condimentum sem. In efficitur ligula tate urna.
            Maecenas laoreet massa vel lacinia pellentesque lorem ipsum dolor.
            Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis
            libero. Mauris aliquet magna magna sed nunc rhoncus amet feugiat
            tempus.
          </p>
          {close}
        </article>

        <article
          id="contact"
          className={`${this.props.article === 'contact' ? 'active' : ''} ${
            this.props.articleTimeout ? 'timeout' : ''
          }`}
          style={{ display: 'none' }}
        >
          <h2 className="major">Contact</h2>
          {/* <span className="image main">
            <img src={pic03} alt="" />
          </span> */}
          <p>
            In case you need to ask something that we weren't able to cover
            here, feel free to shoot a mail or give a ring to our lovely ceremony masters.
          </p>
          <p>
          <a href="mailto:ceremoniemeestersjoellekemal@gmail.com"> Head here</a> to shoot our ceremony masters an e-mail!
          </p>
          <p>
            Or give them a good old fashioned ring 😉<br/>
          </p>
          <p>
            Florrie Walraven 🇳🇱 🇬🇧<br/>
            <a href="tel:+31624138693">+31624138693</a><br/>
          </p>
          <p>
            Valentijn Geirnaert 🇳🇱 🇬🇧<br/>
            <a href="tel:+31634324443">+31634324443</a> <br/>
          </p>
          <p>
            Jamel Pee 🇬🇧 <br/>
            <a href="tel:+31641122173">+31641122173</a><br/>
          </p>
          {close}
        </article>

        <article
          id="save-the-date"
          className={`${
            this.props.article === 'save-the-date' ? 'active' : ''
          } ${this.props.articleTimeout ? 'timeout' : ''}`}
          style={{ display: 'none' }}
        >
          <h2 className="major">Your contact info</h2>
          <ContactForm></ContactForm>
          {close}
        </article>

        <article
          id="rsvp"
          className={`${this.props.article === 'rsvp' ? 'active' : ''} ${
            this.props.articleTimeout ? 'timeout' : ''
          }`}
          style={{ display: 'none' }}
        >
          <h2 className="major">RSVP</h2>
          <RsvpForm></RsvpForm>
          {close}
        </article>
      </div>
    )
  }
}

Main.propTypes = {
  route: PropTypes.object,
  article: PropTypes.string,
  articleTimeout: PropTypes.bool,
  onCloseArticle: PropTypes.func,
  timeout: PropTypes.bool,
  setWrapperRef: PropTypes.func.isRequired,
}

export default Main
