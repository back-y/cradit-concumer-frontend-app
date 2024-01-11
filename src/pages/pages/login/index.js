// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ======


import { getUsers, addUsers } from 'src/redux/userSlice';
import { addAuthUsers, getAuthUsers } from 'src/redux/feature/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useFetchUser } from 'src/lib/authContext'

import CircularProgress from '@mui/material/CircularProgress';

// ======

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))


const LoginComp = () => {

  // progress
  const [loading, setLoading] = useState(false);

  // ** State
  const [values, setValues] = useState({
    email: '',
    password: '',

    // showPassword: false
  })

  const [showPassword, setShowPassword] = useState(false)

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  //* handle keydown event
  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission or other default behavior
      handleSubmit();
    }
  };


  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setShowPassword({ ...values })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }


  const dispatch = useDispatch();

  const userUrl = process.env.NEXT_PUBLIC_API_URL + 'auth/login';

  useEffect(() => {
    console.log("Login Page")
  }, [])

  const handleSubmit = async (e) => {
    console.log(values)
    setLoading(true)

    // setTimeout(() => { setLoading(false); }, 3000)

    // e.preventDefault()

    axios.post(userUrl, values, { withCredentials: true })
      .then((response) => {
        Cookies.set('jwt', response.data.jwt)
        Cookies.set('id', response.data._id)
        Cookies.set('name', response.data.name)
        Cookies.set('email', response.data.email)
        Cookies.set('role', response.data.role)
        Cookies.set('phone', response.data.phone)

        console.log(response)

        if (response) {
          dispatch(addAuthUsers(response.data))
        }

        // const token = dispatch(response.data)
        const userId = response.data._id;
        const user = response.data.role

        // console.log(user);
        // console.log(userId)
        if (user === 'credit_manager') {
          router.push('/credit')
        } else if (user === 'warehouse_manager') {
          router.push('/warehouse')
        }
        else if (user === 'customer') {
          router.push('/clients')
        }
        else {
          router.push('/pages/signup')
        }

        if (response.status === 200) {
          setTimeout(() => {
            // Finish the operation
            setLoading(false);
          }, 3000);
        } else {
          alert(response.data.message)
          setTimeout(() => {
            // Finish the operation
            setLoading(false);
          }, 3000);
        }

      })
      .catch((error) => {
        console.log(error);
        alert(error)
        setTimeout(() => {
          // Finish the operation
          setLoading(false);
        }, 3000);
      })


    dispatch(addUsers(values))



  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent >
          <Box >

            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField autoFocus fullWidth id='email' label='Email' sx={{ marginBottom: 4 }}
              value={values.email}
              type='email'
              placeholder='carterleonard@gmail.com'
              helperText='You can use letters, numbers & periods'
              onChange={handleChange('email')}

            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                onKeyDown={handleEnterKey}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='Remember Me' />
              <Link passHref href='#'>
                <LinkStyled onClick={e => e.preventDefault()}>Forgot Password?</LinkStyled>
              </Link>
            </Box>
            <Button
              className='pbeth'
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login '}

            </Button>
            <Divider >or</Divider>
            {/* <Divider sx={{ my: 5 }}>or</Divider> */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/steper'>
                  <LinkStyled>Create an account</LinkStyled>
                </Link>
              </Typography>
            </Box>

          </form>
        </CardContent>
      </Card>
      {/* <FooterIllustrationsV1 /> */}
    </Box>
  )
}


const LoginPage = ({ userId }) => {

  // =============

  const { user, loading } = useFetchUser();
  console.log('The user', user)
  const role = Cookies.get('role')
  console.log('Role', role)
  const router = useRouter()
  useEffect(() => {
    Cookies.set('customerType', 'corporate')
  }, [])

  return (

    <LoginComp />
  )
}

// LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage

