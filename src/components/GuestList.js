import React, { useState, useEffect } from 'react'
import { useQueryParam, NumberParam, StringParam } from 'use-query-params'

const ParentThatFetches = () => {
  const [data, updateData] = useState()
  const [key, setFoo] = useQueryParam('key', StringParam)

  useEffect(() => {
    const getData = async () => {
      const resp = await fetch('/api/guests?key=' + key)
      const json = await resp.json()
      updateData(json)
    }
    getData()
  }, [])

  return (
    (data && (
      <div>
        <p>
          There are {data.length} guests that has shared their contact details.
        </p>
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
          <Child data={data} />
        </table>
      </div>
    )) || <p>Hang on a sec, guests are being fetched.</p>
  )
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

export default ParentThatFetches
