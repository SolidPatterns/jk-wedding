import React, { useRef } from 'react'
import thankYouCaillou from '../images/thank-you.png'

class PhotosForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {},
      misc: {
        submitted: false,
        disableSubmission: false,
        successfullMessage: "Lovely! We've got it, thank you ♡ Joëlle & Kemal",
        submit: 'Upload those goodies!',
      },
      errors: {
        hasErrors: false,
        errorMessage:
          'Oops.. Something wrong happened! Maybe you should try with less photos max 10-15 at a time? Thanks ;)',
      },
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fileInput = React.createRef()
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

  async submitPhotos() {
    console.log('submitPhotos():')
    var data = new FormData()
    for (let i = 0; i < this.fileInput.current.files.length; i++) {
      data.append('file' + i, this.fileInput.current.files[i])
    }
    return fetch('/api/photos', {
      method: 'POST',
      body: data,
      mode: 'cors',
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
    misc.submit = "Wait for it... Don't go anywhere until you see our cat."
    this.setState({ misc })
    this.submitPhotos(this.state.fields)
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <p className={
            !this.state.misc.submitted && !this.state.errors.hasErrors
              ? ''
              : 'hide'
          }>
          We know you have a gold mine of amazing photos. We'd love to have
          those too 😁 <br />
          It's super duper easy.
          <br />
          Hit the "choose files" link👇, select all those awesome goodies and
          hit upload!
          <br />
          Might take a while, <b>so please wait</b> till you see our 😻!
        </p>
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
              type="file"
              name="file"
              id="file"
              accept=".jpeg"
              onChange={this.handleInputChange}
              ref={this.fileInput}
              multiple
              required
            />
          </div>
          <input
            type="submit"
            value={this.state.misc.submit}
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

export default PhotosForm
