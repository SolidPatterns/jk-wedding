import React, { useState, useEffect } from 'react'
import { useQueryParam, NumberParam, StringParam } from 'use-query-params'

const ParentThatFetches = () => {
  const [data, updateData] = useState()
  const [key, setFoo] = useQueryParam('key', StringParam)

  useEffect(() => {
    const getData = async () => {
      const resp = await fetch('/api/rsvps?key=' + key)
      const json = await resp.json()
      updateData(json)
    }
    getData()
  }, [])

  return (
    (data && (
      <div>
        <p>
          There are {data.length} RSVP responses.
        </p>
        <table>
          <tr>
            <th>#</th>
            <th>RSVP</th>
            <th>Name</th>
            <th>Second name</th>
            <th>Email</th>
            <th>Mobile number</th>
            <th>Song</th>
            <th>Dietary</th>
            <th>Message</th>
          </tr>
          <Child data={data} />
        </table>
      </div>
    )) || <p>Hang on a sec, RSVPs are being fetched.</p>
  )
}

const Child = ({ data }) =>
  data.map((rsvpResponse, i) => (
    <tr>
      <td>{i + 1}</td>
      <td>{rsvpResponse.rsvp ? '🟢' : '🔴'}</td>
      <td>{rsvpResponse.name}</td>
      <td>{rsvpResponse.secondName}</td>
      <td>{rsvpResponse.email}</td>
      <td>{rsvpResponse.mobileNumber}</td>
      <td>{rsvpResponse.song}</td>
      <td>{rsvpResponse.dietary}</td>
      <td>{rsvpResponse.message}</td>
    </tr>
  ))

export default ParentThatFetches
