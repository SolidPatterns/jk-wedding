import React from 'react'
import thankYouCaillou from '../images/thank-you.png'

class ContactForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {},
      misc: {
        submitted: false,
        successfullMessage: "Lovely! We've got it, thank you ♡ Joëlle & Kemal",
      },
      errors: {
        hasErrors: false,
        errorMessage:
          'Oops.. Something wrong happened! Maybe you should just text us your contact details, thanks ;)',
      },
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    let fields = this.state.fields
    fields[name] = value
    this.setState({ fields })
  }

  handleError(error) {
    console.error('Oops.. something wrong happened.. : ' + error)
    let errors = this.state.errors
    errors.hasErrors = true
    this.setState({ errors })
  }

  async submitContactDetails(newContact) {
    console.log('submitContactDetails(newContact):')
    console.log(newContact)
    return fetch('/api/guests', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    })
      .then(response => {
        if (!response.ok) {
          this.handleError(response)
        }
        if (response.ok) {
          let misc = this.state.misc
          misc.submitted = true
          this.setState({ misc })
        }
        return
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  handleSubmit(event) {
    console.log('Submitted: ' + JSON.stringify(this.state.fields))
    this.submitContactDetails(this.state.fields)
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <form
          method="post"
          action="#"
          id="contactForm"
          onSubmit={this.handleSubmit}
          className={
            !this.state.misc.submitted && !this.state.errors.hasErrors
              ? ''
              : 'hide'
          }
        >
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={this.state.fields.name || ''}
              onChange={this.handleInputChange}
              maxlength="75"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="secondName">Your +1's name (if applicable)</label>
            <input
              type="text"
              name="secondName"
              id="secondName"
              value={this.state.fields.secondName || ''}
              onChange={this.handleInputChange}
              maxlength="75"
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={this.state.fields.email || ''}
              onChange={this.handleInputChange}
              maxlength="100"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              id="mobileNumber"
              value={this.state.fields.mobileNumber || ''}
              onChange={this.handleInputChange}
              maxlength="50"
              required
            />
          </div>
          <div className="field half first">
            <label htmlFor="country">Country</label>
            <select
              name="country"
              id="country"
              value={this.state.fields.country || ''}
              onChange={this.handleInputChange}
              required
            >
              <option value=""></option>
              <option value="NL">Nederlands</option>
              <option value="TR">Turkey</option>
              <option value="FR">France</option>
              <option value="BE">Belgium</option>
              <option value="CA">Canada</option>
            </select>
          </div>
          <div className="field half">
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              value={this.state.fields.city || ''}
              onChange={this.handleInputChange}
              maxlength="100"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="postCode">Post Code</label>
            <input
              type="text"
              name="postCode"
              id="postCode"
              value={this.state.fields.postCode || ''}
              onChange={this.handleInputChange}
              maxlength="15"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="address">Address</label>
            <textarea
              name="address"
              id="address"
              rows="4"
              value={this.state.fields.address || ''}
              onChange={this.handleInputChange}
              maxlength="250"
              required
            ></textarea>
          </div>
          <div className="field">
            <label htmlFor="message">Have something to tell us?</label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={this.state.fields.message || ''}
              onChange={this.handleInputChange}
              maxlength="1000"
            ></textarea>
          </div>
          <input type="submit" value="Submit" className="special" />
        </form>
        <div className={this.state.misc.submitted ? '' : 'hide'}>
          <p>
            {this.state.misc.successfullMessage}
          </p>
          <img src={thankYouCaillou} alt="thank you by Caillou"/>
        </div>
        <p className={this.state.errors.hasErrors ? '' : 'hide'}>
          {this.state.errors.errorMessage}
        </p>
      </div>
    )
  }
}

export default ContactForm
