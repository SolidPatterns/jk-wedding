import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import GuestList from '../components/GuestList'
import ParentThatFetches from '../components/GuestList'

const Guests = () => (
  
  <Layout>
    <h1>Guests</h1>

    <GuestList />

    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Guests