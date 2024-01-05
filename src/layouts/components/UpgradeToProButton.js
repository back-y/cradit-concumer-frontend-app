// ** React Import
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { usePopper } from 'react-popper'
import { right } from '@popperjs/core'

const BuyNowButton = () => {
  // ** States
  const [open, setOpen] = useState(false)
  const [popperElement, setPopperElement] = useState(null)
  const [referenceElement, setReferenceElement] = useState(null)

  const { styles, attributes, update } = usePopper(referenceElement, popperElement, {
    placement: 'top-end'
  })

  const handleOpen = () => {
    setOpen(true)
    update ? update() : null
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box
      className='upgrade-to-pro-button mui-fixed'
      sx={{ right: theme => theme.spacing(20), bottom: theme => theme.spacing(10), zIndex: 11, position: 'fixed' }}
    >
      <Button
        component='a'
        target='_blank'
        variant='contained'
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        ref={e => setReferenceElement(e)}
        href='/'
        sx={{
          backgroundColor: '#d7a022',
          boxShadow: '0 1px 20px 1px black',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#d7a022'
          }
        }}
      >
        Need Something?
      </Button>
      <Fade in={open} timeout={700} sx={{ display: 'flex', width: '15rem', zIndex: 10, position: right }} >
        <Box
          style={styles.popper}
          ref={setPopperElement}
          {...attributes.popper}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          sx={{ pb: 4, minWidth: theme => (theme.breakpoints.down('sm') ? 400 : 300) }}
        >
          <Paper elevation={9} sx={{ borderRadius: 1, overflow: 'hidden' }}>
            <a
              target='_blank'
              rel='noreferrer'
              href='https://purposeblacketh.com/'
            >
              <img width='100%' alt='materio-pro-banner' src='/images/logos/photo_pbeth-logo.jpg' />
            </a>
            <CardContent>
              <Typography sx={{ mb: 4 }} variant='h6'>
                PBETH - KEGEBEREW
              </Typography>
              <Typography sx={{ mb: 4 }} variant='body2'>
                Kegeberew is here to serve you kindly.
              </Typography>
              <Typography sx={{ mb: 4 }} variant='body2'>
                Click on below buttons to explore to get support and report a complain.
              </Typography>
              <Button
                className='pbeth'
                component='a'
                sx={{ mr: 4 }}
                target='_blank'
                variant='contained'
                href='/comment'
              >
                Comment
              </Button>
              {/* <Button
                className='pbeth'
                component='a'
                target='_blank'
                variant='outlined'
                href='/'
              >
                Need Help
              </Button> */}
            </CardContent>
          </Paper>
        </Box>
      </Fade>
    </Box>
  )
}

export default BuyNowButton
