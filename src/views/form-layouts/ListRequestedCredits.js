import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// import Invoice from 'src/pages/invoice/index'
import Invoice from 'src/pages/invoice/[slug]'

const ListRequestedCredits = ({ title, price, description, icon, iconTitle, stock }) => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      {/* <Card> */}

      <Button
        variant='outlined'
        size='small'
        type='submit'
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
            backgroundColor: '#d7a022'
          }
        }}
        onClick={handleClickOpen}
      >
        {icon} {iconTitle}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{"Use Google's location service?"}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
          <Invoice />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} autoFocus size='large' className='pbeth' type='submit' sx={{
            mr: 2
          }} variant='contained'>
            Accept
          </Button>
          <Button onClick={handleClose} size='large' color='secondary' className='pbetho' variant='outlined'>Reject</Button>
        </DialogActions>
      </Dialog>
      {/* </Card> */}
    </div>
  );
}

export default ListRequestedCredits
