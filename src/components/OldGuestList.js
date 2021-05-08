import React from 'react'
import { useQueryParam, NumberParam, StringParam } from 'use-query-params'

export default class GuestList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
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
  }

  componentDidMount() {
    fetch('/api/guests?key=' + "xxx")
      .then(resp => resp.json())
      .then(data => this.setState({ data }))
  }

  render() {
    return (
      this.state.data && (
        <table>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Second name</th>
            <th>Email</th>
            <th>Mobile number</th>
            <th>Country</th>
            <th>City</th>
            <th>Post code</th>
            <th>Address</th>
            <th>Message</th>
          </tr>
          <Child data={this.state.data} />
        </table>
      ) || <p>data is empty</p>
    )
  }
}

const Child = ({ data }) =>
  data.map((guest, i) => (
    <tr>
      <td>{i + 1}</td>
      <td>{guest.name}</td>
      <td>{guest.secondName}</td>
      <td>{guest.email}</td>
      <td>{guest.mobileNumber}</td>
      <td>{guest.country}</td>
      <td>{guest.city}</td>
      <td>{guest.postCode}</td>
      <td>{guest.address}</td>
      <td>{guest.message}</td>
    </tr>
  ))
