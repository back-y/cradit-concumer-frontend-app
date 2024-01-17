'use client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'

const shop = () => {
  const router = useRouter();
  
  setTimeout(() => {
    router.push('/clients/shopindividual')
  }, 5000)
  return (
    <section>
      <Card>
        <CardContent>
          <Typography style={{ marginLeft: '10px', fontSize: '20px' }} >
            Your order ... 
          </Typography>
          <Typography style={{ marginLeft: '10px', fontWeight: 'bold', color: 'red', fontSize: '20px' }} >
            has failed 
          </Typography>
          <Typography style={{ marginLeft: '10px', fontSize: '20px' }} >
            Please try again 
          </Typography>
        </CardContent>
        
      </Card>
    </section>
  )
}

export default shop
