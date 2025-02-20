// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Alert } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations'

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(13)
  }
}))

const TreeIllustration = styled('img')(({ theme }) => ({
  left: 0,
  bottom: '5rem',
  position: 'absolute',
  [theme.breakpoints.down('lg')]: {
    bottom: 0
  }
}))

const Error404 = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography variant='h1'>Success</Typography>

          <Alert icon={<CheckIcon fontSize='inherit' />} severity='success'>
            You will get a confirmation message as in a form of email or sms
          </Alert>
          <Typography variant='h5' sx={{ mb: 1, fontSize: '1.5rem !important' }}>
            Successfully Registerd
          </Typography>
          {/* <Typography variant='body2'>We couldn&prime;t find the page you are looking for.</Typography> */}
        </BoxWrapper>
        <Img style={{ height: '400px', width: '400px' }} alt='error-illustration' src='/images/pages/404.png' />
        <Link passHref href='/'>
          <Button
            component='a'
            style={{ color: 'white', backgroundColor: 'green' }}
            variant='contained'
            sx={{ px: 5.5 }}
          >
            Get Back
          </Button>
        </Link>
      </Box>
      <FooterIllustrations image={<TreeIllustration alt='tree' src='/images/pages/tree.png' />} />
    </Box>
  )
}

export default Error404

Error404.getLayout = page => <BlankLayout>{page}</BlankLayout>
