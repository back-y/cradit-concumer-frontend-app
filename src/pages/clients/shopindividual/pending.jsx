// ** MUI Imports
'use client'
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useEffect } from 'react'
import axios from 'axios'


const Shop = () => {
  const [ebidirPage, setEbidirPage] = useState('<html><body>Ebidir Login Page</body></html>');
  
  const fetchEbidirLoginPage = async () => {
    await axios.get('https://asbeza.ebidir.net')
    .then(resp => {
        setEbidirPage(resp.data)
    })
    .catch(err => {
        console.log("Fetching Ebidir site error: ", err)
    })
  }

  useEffect(() => {
    fetchEbidirLoginPage()
    console.log("Ebidir Login Page: ", ebidirPage)

  }, [ebidirPage])

  return (
    <section>
      <Card >
        <CardContent>
          <iframe src='https://asbeza.ebidir.net' width="600" height="800" frameBorder="0"></iframe>
        </CardContent>
      </Card>
    </section>
  )
}

export default Shop
