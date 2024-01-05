'use client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Typography } from '@mui/material'

const shop = () => {
  
  return (
    <section>
      <Card>
        <CardContent>
          <Typography>
            Your order has <b>failed. </b> Please try again. 
          </Typography>
        </CardContent>
        
      </Card>
    </section>
  )
}

export default shop
