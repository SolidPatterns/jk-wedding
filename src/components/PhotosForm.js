import React from 'react'
import thankYouCaillou from '../images/thank-you.png'
import Loading from '../assets/Infinity-1s-200px.svg'

const MAX_CONTENT_LENGTH = 104857600
const ALLOWED_MIME_TYPES = ["image/jpeg", "video/3gpp", "video/mp4", "video/mpeg", "video/ogg", "video/quicktime"];
class PhotosForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initiateState()

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReloadClick = this.handleReloadClick.bind(this)
    this.fileInput = React.createRef()
  }

  initiateState = () => {
    return {
      fields: {},
      misc: {
        submitted: false,
        disableSubmission: false,
        successfullMessage: "Lovely! We've got it, thank you ♡ Joëlle & Kemal",
        submitButtonValue: 'Upload those goodies!',
        uploadProgress: '',
        uploading: false,
      },
      errors: {
        hasErrors: false,
        errorMessage:
          'Oops.. Something wrong happened! Maybe you should try with less photos max 10-15 at a time? Thanks ;)',
      },
    }
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    let fields = this.state.fields
    fields[name] = value
    this.setState({ fields })
  }

  handleReloadClick(event) {
    event.preventDefault()
    this.setState(this.initiateState())
    this.fileInput.current.value = ""
  }

  handleError(error) {
    console.error('Oops.. something wrong happened.. : ' + error)
    let errors = this.state.errors
    errors.hasErrors = true
    this.setState({ errors })
  }

  async submitPhotos() {
    console.log('submitPhotos():')

    if (this.fileInput.current.files.length === 0) {
      return
    }

    this.toggleUploadingState(true)

    for (let i = 0; i < this.fileInput.current.files.length; i++) {
      this.handleUploadUpdate(i + 1, this.fileInput.current.files.length)

      let currentFile = this.fileInput.current.files[i]
      if (currentFile.size >= MAX_CONTENT_LENGTH) {
        console.error('Max content limit exceeded.')
        continue
      }
      if (!ALLOWED_MIME_TYPES.includes(currentFile.type)) {
        console.error('unsupported content type.')
        continue
      }

      let data = new FormData()
      data.append('file' + i, currentFile)

      let response = await fetch('/api/photos', {
        method: 'POST',
        body: data,
        mode: 'cors',
      })
      if (!response.ok) {
        console.error(response)
        this.handleError(response)
        break
      } else {
        console.log(`file ${i + 1} uploaded successfully.`, currentFile)
      }
    }
    this.handleSuccess()
  }

  toggleUploadingState = toggle => {
    let misc = this.state.misc
    misc.uploading = toggle
    this.setState({ misc })
  }

  handleUploadUpdate = (current, total) => {
    let misc = this.state.misc
    misc.uploadProgress = `Uploading ${current} in ${total}...`
    this.setState({ misc })
  }

  handleSuccess = () => {
    this.toggleUploadingState(false)
    let misc = this.state.misc
    misc.submitted = true
    this.setState({ misc })
  }

  handleSubmit(event) {
    console.log('Submitted: ' + JSON.stringify(this.state.fields))
    let misc = this.state.misc
    misc.disableSubmission = true
    misc.submitButtonValue = 'Wait for it...'
    this.setState({ misc })
    this.submitPhotos(this.state.fields).catch(error => {
      this.handleError(error)
    })
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <p
          className={
            !this.state.misc.submitted && !this.state.errors.hasErrors
              ? ''
              : 'hide'
          }
        >
          We know you have a gold mine of amazing photos and videos. We'd love to have
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
              accept="video/*,image/*"
              onChange={this.handleInputChange}
              ref={this.fileInput}
              multiple
              required
            />
          </div>
          <input
            type="submit"
            value={this.state.misc.submitButtonValue}
            className="special"
            disabled={this.state.misc.disableSubmission}
          />
        </form>

        <div className={this.state.misc.uploading ? '' : 'hide'}>
          <p>
            <b>{this.state.misc.uploadProgress}</b>
          </p>
          <span role="img">
            <img src={Loading} alt="uploading..." />
          </span>
        </div>

        <div className={this.state.misc.submitted ? '' : 'hide'}>
          <p>{this.state.misc.successfullMessage}</p>
          <img src={thankYouCaillou} alt="thank you by Caillou" />
          <br/>
          <a href=""
            onClick={this.handleReloadClick}
          >
            Want to upload more?
          </a>
        </div>
        <div className={this.state.errors.hasErrors ? '' : 'hide'}>
          <p>{this.state.errors.errorMessage}</p>
          <br/>
          <a href=""
            onClick={this.handleReloadClick}
          >
            Shall we try again?
          </a>
        </div>
      </div>
    )
  }
}

export default PhotosForm
