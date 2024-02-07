import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import BasicInfo from './BasicInfo'
import LegalInfo from './Legalinfo'
import TermsOfUse from './TermsOfUse'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { CardContent } from '@mui/material'
import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { getBasicInfo, getCreditInfo, getLegalInfo, addBasicInfo, getPofilePicture } from 'src/redux/candidateSlice'
import axios from 'axios'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import Close from 'mdi-material-ui/Close'
import { useRouter } from 'next/router'

const role = Cookies.get('role')

export default function VerticalLinearStepper() {
  useEffect(() => {
    // useEffect logic is required to not display the Approve button twice if the credit-manager is looking
    // at the Approve component through the new-users list table

    const role = Cookies.get('role')
    const newUserId = Cookies.get('new-user_id')
    if (role && newUserId) Cookies.remove('new-user_id')
  }, [])
  const [activeStep, setActiveStep] = useState(0)
  const [isParentButtonActive, setParentButtonActive] = useState(false)
  const [openAlert2, setOpenAlert2] = useState(false)
  const [openAlert1, setOpenAlert1] = useState(false)

  const activateParentButton = () => {
    setParentButtonActive(true)
  }

  const router = useRouter()

  const steps = [
    {
      label: 'BasicInfo',
      description: <BasicInfo activateParentButton={activateParentButton} />
    },
    {
      label: 'LegalInfo',
      description: <LegalInfo activateParentButton={activateParentButton} />
    },
    {
      label: 'TermsOfUse',
      description: <TermsOfUse />
    }
  ]

  const basicInfo = useSelector(getBasicInfo)
  const legalInfo = useSelector(getLegalInfo)
  const creditInfo = useSelector(getCreditInfo)
  const profilePicture = useSelector(getPofilePicture)

  const dispatch = useDispatch()

  const handleNext = async finished => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)

    setParentButtonActive(false)

    const baseUrl = process.env.NEXT_PUBLIC_API_URL

    if (finished) {
      // fetch all data necessary from redux and send to server
      const endPoint = role === 'credit_manager' ? 'customer' : 'new-user'

      // basic info:
      const url = baseUrl + endPoint
      let id = ''
      try {
        const resp = await axios.post(url, basicInfo)
        console.log('Resp: ', resp.data)

        if (resp.data) {
          Cookies.set('new-user_id', resp.data._id)
          id = resp.data._id
        }
      } catch (err) {
        console.log(err)
      }

      // legal info:
      const formData = new FormData()

      formData.append('file1', legalInfo.file1)
      formData.append('file2', legalInfo.file2)
      formData.append('file3', legalInfo.file3)
      formData.append('file4', legalInfo.file4)

      //  const id = Cookies.get('new-user_id')
      const uploadUrl = baseUrl + endPoint + '/upload/' + id
      console.log('Url: ', uploadUrl)
      console.log('Files ... : ', legalInfo)
      console.log('FormData content: ', formData)

      const profileURL = baseUrl + endPoint + '/profilePic/' + id
      const formdata1 = new FormData()
      formdata1.append('profilePicture', profilePicture)
      await axios.post(profileURL, formdata1, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      try {
        await axios.post(uploadUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        setOpenAlert2(true)

        // alert('Files uploaded successfully');
        console.log('Files uploaded successfully')
        Cookies.remove('new-user_id')
      } catch (error) {
        console.error('Error uploading files ... :', error)
        setOpenAlert1(true)
      }

      const creditInfoUpdateUrl = baseUrl + 'customer/' + id
      try {
        console.log('My Credit info', creditInfo)
        console.log('Role er', role)
        if (!role || role !== 'credit_manager') {
          router.push('/')
        } else {
          if (creditInfo) {
            const resp = await axios.patch(creditInfoUpdateUrl, creditInfo)
            console.log('Credit info update response: ', resp)
            setOpenAlert2(true)
          }
          router.push('/credit/customerList/')
        }
      } catch (err) {
        console.log('Credit info update error: ', err)
        setOpenAlert1(true)
      }
    }
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Box sx={{ width: '100%' }} className='content-center'>
      <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
        <Stepper activeStep={activeStep} orientation='vertical'>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel optional={index === 2 ? <Typography variant='caption'>Last step</Typography> : null}>
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      hidden={!isParentButtonActive && index !== steps.length - 1}
                      style={{ backgroundColor: 'green' }}
                      variant='contained'
                      onClick={() => handleNext(index === steps.length - 1)}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Box autoHideDuration={5000} square elevation={0} sx={{ p: 3 }}>
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
                <Link href='/' onClick={e => e.preventDefault()}>
                  You have sent all information successfully as soon as we review your info we will send you log in
                  password to access your account
                </Link>
              </Alert>
            )}
            {openAlert1 && (
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert1(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle> Sorry An Error Happened </AlertTitle>
                <Link href='/' onClick={e => e.preventDefault()}>
                  Please try again
                  <Button onClick={() => router.push('/')} sx={{ mt: 1, mr: 1 }}>
                    Get Back
                  </Button>
                </Link>
              </Alert>
            )}
            <Button hidden={steps.length - 1} onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
            <Button hidden={!steps.length - 1} onClick={() => router.push('/')} sx={{ mt: 1, mr: 1 }}>
              Get Back
            </Button>
          </Box>
        )}
      </CardContent>
    </Box>
  )
}

VerticalLinearStepper.getLayout = page => <BlankLayout>{page}</BlankLayout>
