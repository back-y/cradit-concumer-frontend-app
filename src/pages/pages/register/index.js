

// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

// import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import { styled, useTheme } from '@mui/material/styles'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import MuiCard from '@mui/material/Card'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

import { getUsers, addUsers } from 'src/redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Router } from 'mdi-material-ui'
import { useRouter } from 'next/router'

// auth
// import { useRegisterMutation } from 'src/redux/feature/authApi'



// auth

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
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))



const RegisterPage = () => {
  // ** States

  const theme = useTheme()

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    password: ''

    // showPassword: false
  })

  // auth

  // const [[signup], { isLoading, isSuccess, isError }] = useRegisterMutation();

  // auth

  const [confirmPassValues, setConfirmPassValues] = useState({
    password: '',
    showPassword: false
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
    console.log(event.target.name, ': ', event.target.value)
  }

  const handleConfirmPassChange = prop => event => {
    setConfirmPassValues({ ...confirmPassValues, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleClickConfirmPassShow = () => {
    setConfirmPassValues({ ...confirmPassValues, showPassword: !confirmPassValues.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const dispatch = useDispatch()

  const userUrl = process.env.NEXT_PUBLIC_API_URL + 'auth/signup';

  const router = useRouter();

  const handleSubmit = async (e) => {
    console.log(values)
    e.preventDefault()

    // const jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTFkODAzZDQ0YzJhYTA5ZjU4YjFhNTIiLCJpYXQiOjE2OTc5MDU2Mjd9.9QPtCGAP3lOqBqKRGP6zYTtjnVYwBIVKr7d8xjh-XZ8";


    await axios.post(userUrl, values)
      .then((response) => {
        console.log('Response Status: ', response.status, 'Response Data', response.data);
        router.push('/')
      })
      .catch(err => {
        console.log(err)
      });


    // .then((response) => {
    //   console.log(response.status, response.data.token);
    // });
    dispatch(addUsers(values))
  }

  // const handleSubmit = async (e) => {
  //   console.log(values)
  //   e.preventDefault()
  //   try {
  //     const response = await signup(values).unwrap()
  //     console.log(response)
  //   } catch (error) {
  //     console.log(error)
  //   }



  //   // const jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTFkODAzZDQ0YzJhYTA5ZjU4YjFhNTIiLCJpYXQiOjE2OTc5MDU2Mjd9.9QPtCGAP3lOqBqKRGP6zYTtjnVYwBIVKr7d8xjh-XZ8";


  //   // await axios.post(userUrl, values)
  //   //   .then((response) => {
  //   //     console.log(response.status, response.data);
  //   //   })
  //   //   .catch(err => {
  //   //     console.log(err)
  //   //   });


  //   // .then((response) => {
  //   //   console.log(response.status, response.data.token);
  //   // });
  //   dispatch(addUsers(values))
  // }


  const users = useSelector(getUsers);
  
  // console.log('from Signup:', users)

  return (
    <Box className='content-center' >
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{}}>
            <CardHeader title='Register' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <form onSubmit={e => e.preventDefault()}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TextField fullWidth value={values.name} name='name' label='Name' placeholder='Leonard Carter' onChange={handleChange('name')} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth value={values.phone} name='phone' label='Phone' placeholder='+1234567890' onChange={handleChange('phone')} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth value={values.role} name='role' label='Role' placeholder='User' onChange={handleChange('role')} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={values.email}
                      fullWidth
                      type='email'
                      name='email'
                      label='Email'
                      placeholder='carterleonard@gmail.com'
                      helperText='You can use letters, numbers & periods'
                      onChange={handleChange('email')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='form-layouts-basic-password'>Password</InputLabel>
                      <OutlinedInput
                        label='Password'
                        name='password'
                        value={values.password}
                        id='form-layouts-basic-password'
                        onChange={handleChange('password')}
                        type={values.showPassword ? 'text' : 'password'}
                        aria-describedby='form-layouts-basic-password-helper'
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              aria-label='toggle password visibility'
                            >
                              {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText id='form-layouts-basic-password-helper'>
                        Use 8 or more characters with a mix of letters, numbers & symbols
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='form-layouts-confirm-password'>Confirm Password</InputLabel>
                      <OutlinedInput
                        label='Confirm Password'
                        name='confirm_password'
                        value={confirmPassValues.password}
                        id='form-layouts-confirm-password'
                        onChange={handleConfirmPassChange('password')}
                        aria-describedby='form-layouts-confirm-password-helper'
                        type={confirmPassValues.showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickConfirmPassShow}
                              onMouseDown={handleMouseDownPassword}
                              aria-label='toggle password visibility'
                            >
                              {confirmPassValues.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText id='form-layouts-confirm-password-helper'>
                        Make sure to type the same password as above
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        gap: 5,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Button type='submit' variant='contained' size='large' style={{ backgroundColor: '#d7a022', color: 'black' }}
                        onClick={handleSubmit} >
                        Register
                      </Button>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ mr: 2 }}>Already have an account?
                        </Typography>
                        <Typography variant='body2'>
                          <Link passHref href='/' >
                            <LinkStyled>Log in</LinkStyled>
                          </Link>
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Box>
        </CardContent>
      </Card>

    </Box>
  )
}

RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage

