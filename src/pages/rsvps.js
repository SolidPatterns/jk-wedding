import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import RsvpList from '../components/RsvpList'

const Rsvps = () => (
  
  <Layout>
    <h1>RSVPs</h1>

    <RsvpList />

    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Rsvps