import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import PhotosForm from '../components/PhotosForm'

const SecondPage = () => (
  <Layout>
    <h1>Upload Photos</h1>

    <PhotosForm />

    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
