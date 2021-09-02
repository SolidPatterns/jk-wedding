import React from 'react'
import thankYouCaillou from '../images/thank-you.png'

class RsvpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {},
      misc: {
        submitted: false,
        disableSubmission: false,
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
    return fetch('/api/rsvps', {
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
    let misc = this.state.misc
    misc.disableSubmission = true
    this.setState({ misc })
    this.submitContactDetails(this.state.fields)
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <form
          method="post"
          action="#"
          id="rsvpForm"
          onSubmit={this.handleSubmit}
          className={
            !this.state.misc.submitted && !this.state.errors.hasErrors
              ? ''
              : 'hide'
          }
        >
          <div className="field">
            <input
              type="radio"
              name="rsvp"
              id="rsvp-yes"
              value={this.state.fields.rsvp || true}
              onChange={this.handleInputChange}
              required
            />
            <label htmlFor="rsvp-yes">Duh, of course I can make it!</label>
          </div>
          <div className="field">
            <input
              type="radio"
              name="rsvp"
              id="rsvp-no"
              value={this.state.fields.rsvp || false}
              onChange={this.handleInputChange}
              required
            />
            <label htmlFor="rsvp-no">
              I'll regret it my whole life, but I can't make it :'(
            </label>
          </div>
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
          <div className="field">
            <label htmlFor="song">Can't help but dance if you play:</label>
            <textarea
              name="song"
              id="song"
              rows="4"
              value={this.state.fields.song || ''}
              onChange={this.handleInputChange}
              maxlength="1000"
            ></textarea>
          </div>
          <div className="field">
            <label htmlFor="dietary">I don't eat the following (if any):</label>
            <textarea
              name="dietary"
              id="dietary"
              rows="4"
              value={this.state.fields.dietary || ''}
              onChange={this.handleInputChange}
              maxlength="1000"
            ></textarea>
          </div>
          <div className="field">
            <label htmlFor="message">I have something more to tell!</label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={this.state.fields.message || ''}
              onChange={this.handleInputChange}
              maxlength="1000"
            ></textarea>
          </div>
          <input
            type="submit"
            value="Submit"
            className="special"
            disabled={this.state.misc.disableSubmission}
          />
        </form>
        <div className={this.state.misc.submitted ? '' : 'hide'}>
          <p>{this.state.misc.successfullMessage}</p>
          <img src={thankYouCaillou} alt="thank you by Caillou" />
        </div>
        <p className={this.state.errors.hasErrors ? '' : 'hide'}>
          {this.state.errors.errorMessage}
        </p>
      </div>
    )
  }
}

export default RsvpForm
