// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// import { addAuthUsers, getAuthUsers } from 'src/redux/feature/authSlice'
import { getLegalInfo } from 'src/redux/candidateSlice'
import { getBasicInfo } from 'src/redux/candidateSlice'
import { addCreditInfo, getCreditInfo } from 'src/redux/candidateSlice'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { useRouter } from 'next/router'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

import Cookies from 'js-cookie'

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const ApproveForAddCustomer = () => {
  const basicInfo = useSelector(getBasicInfo)
  const legalInfo = useSelector(getLegalInfo)

  // ** State
  const [show, setShow] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [openAlert2, setOpenAlert2] = useState(false)
  const [openAlert3, setOpenAlert3] = useState(false)
  const [openAlertVal, setOpenAlertVal] = useState('')
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  const router = useRouter()

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  const [creditInfo, setCreditInfo] = useState({})

  const handleChange = e => {
    setCreditInfo({ creditInfo: e.target.value })
    setOpenAlertVal(e.target.value)
  }

  const dispatch = useDispatch()

  const handleSave = () => {
    !openAlertVal ? setOpenAlert(true) : setOpenAlert(false)
    openAlertVal ? setOpenAlert2(true) : setOpenAlert2(false)

    // openAlertVal ? setOpenAlert2(true) : setOpenAlert1(false)

    dispatch(addCreditInfo(creditInfo))
    openAlertVal ? setShow(true) : setShow(false)

    setTimeout(() => {
      setOpenAlert(false)
      setOpenAlert2(false)
      setOpenAlert3(false)
    }, 3000)
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  const handleApprove = async () => {
    setOpenAlert3(true)

    setTimeout(() => {
      setOpenAlert3(false)
    }, 3000)

    const createCustomerUrl = baseUrl + 'customer'

    console.log('New User basicInfo: ', basicInfo)

    // signUp
    const signupUrl = baseUrl + 'auth/signup'

    const user = {
      name: basicInfo.name,
      email: basicInfo.email,
      phone: basicInfo.phone,
      password: '123'
    }

    console.log('User to signup: ', user)

    const signupResp = await axios.post(signupUrl, user)

    if (signupResp.data._id) {
      console.log('SignUp successful')
      console.log(`Id for ${signupResp.data.name}: ${signupResp.data._id}`)
    } else {
      console.log('SignUp failed')
    }

    const newCustomer = {
      name: basicInfo.name,
      email: basicInfo.email,
      phone: basicInfo.phone,
      company: basicInfo.company,
      businessType: basicInfo.businessType,
      numberOfBranches: basicInfo.numberOfBranches,
      numberOfEmployees: basicInfo.numberOfEmployees,
      expectedCredit: basicInfo.expectedCredit,
      documents: legalInfo.documents,

      userId: signupResp.data._id,
      approvedBy: `${Cookies.get('name')}, ${Cookies.get('email')} `
    }
    console.log('New Customer: ', newCustomer)

    const createCustomerResp = await axios.post(createCustomerUrl, newCustomer)
    const id = createCustomerResp.data._id
    const url = process.env.NEXT_PUBLIC_API_URL + 'customer/' + id
    try {
      const resp = await axios.patch(url, creditInfo)

      const creditInfoUrl = baseUrl + 'credit-info'

      const creditInfoData = {
        creditAmt: Number(resp.data.creditInfo),
        userId: signupResp.data._id
      }

      const creditInfoResp = await axios.post(creditInfoUrl, creditInfoData, { withCredentials: true })
      if (creditInfoResp.data._id) {
        console.log(`User ${signupResp.data.name} is now officially a customer of PB Credit`)
      }

      console.log('Transferring new-user to customer is successful')
      router.push('/credit/customerList/')
    } catch (err) {
      console.log('Credit info update error: ', err)
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name='creditAmount'
              label='credit amount'
              placeholder='100000'
              onChange={handleChange}
            />
          </Grid>

          {openAlert || openAlert2 || openAlert3 ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              {openAlert && (
                <Alert
                  severity='warning'
                  sx={{ '& a': { fontWeight: 400 } }}
                  action={
                    <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                      <Close fontSize='inherit' />
                    </IconButton>
                  }
                >
                  <AlertTitle> Please fill all information</AlertTitle>
                  <Link href='#' onClick={e => e.preventDefault()}>
                    All information is required, please check if you have fill all information
                  </Link>
                </Alert>
              )}
              {openAlert2 && (
                <Alert
                  severity='success'
                  sx={{ '& a': { fontWeight: 400 } }}
                  action={
                    <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert2(false)}>
                      <Close fontSize='inherit' />
                    </IconButton>
                  }
                >
                  <AlertTitle> All information are provided</AlertTitle>
                  <Link href='#' onClick={e => e.preventDefault()}>
                    You have sent all information successfully
                  </Link>
                </Alert>
              )}
              {openAlert3 && (
                <Alert
                  severity='success'
                  sx={{ '& a': { fontWeight: 400 } }}
                  action={
                    <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert2(false)}>
                      <Close fontSize='inherit' />
                    </IconButton>
                  }
                >
                  <AlertTitle> All information are provided</AlertTitle>
                  <Link href='#' onClick={e => e.preventDefault()}>
                    You have finished providing all information successfully
                  </Link>
                </Alert>
              )}
            </Grid>
          ) : null}

          <Grid item xs={12} hidden={show}>
            <Button className='pbeth' variant='contained' sx={{ marginRight: 3.5 }} onClick={handleSave}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>

          {/* {newUserId ? ( */}
          <Button
            hidden={!show}
            style={{ backgroundColor: 'green' }}
            variant='contained'
            onClick={handleApprove}
            sx={{ mt: 10, ml: 7 }}
          >
            Approve
          </Button>

          {/* ) : null} */}
        </Grid>
      </form>
    </CardContent>
  )
}

export default ApproveForAddCustomer
