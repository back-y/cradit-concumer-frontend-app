import React from 'react'

// import { makeStyles } from '@mui/styles/styles'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Link from 'next/link'

const useStyles = {
  root: {
    position: 'sticky',
    top: '1rem',
    minWidth: '275'
  },

  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}

export default function OrderSummaryItem() {
  const classes = useStyles

  return (
    <Card className={classes.root} elevation={15}>
      <CardContent>
        <Typography className={classes.title} color='textSecondary' gutterBottom>
          Shopping Cart
        </Typography>
        <Typography variant='div' component='h1'>
          {' '}
          Order Summary
        </Typography>
        <Typography variant='subtitle2'>
          <hr />
        </Typography>
        <Grid container>
          <Grid item xs={11} sm={11} md={11} lg={11}>
            <Typography variant='body1' component='div'>
              Shipping
            </Typography>
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <Typography variant='h6' component='div'>
              €0
            </Typography>
          </Grid>
          <Grid item xs={11} sm={11} md={11} lg={11}>
            <Typography variant='body1' component='div'>
              Total
            </Typography>
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <Typography variant='h6' component='div'>
              €0
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Link href='/invoice'>
          <Button
            variant='outlined'
            size='small'
            color='secondary'
            sx={{
              py: 2.5,
              width: '100%',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              marginBottom: '1rem',

              // backgroundColor: '#d7a022',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0 1px 20px 1px black',
                backgroundColor: '#d7a022',
                color: 'white'
              }
            }}
          >
            Request Credit({1})
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}
