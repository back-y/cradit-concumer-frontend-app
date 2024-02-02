// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { addBasicInfo } from 'src/redux/candidateSlice'
import { useSelector, useDispatch } from 'react-redux'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

const ImgStyled = styled('img')(({ theme }) => ({
    width: 120,
    height: 120,
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius
}))

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

const TabAccount = ({ activateParentButton }) => {
    // const newUsers = useSelector(getAuthUsers)
    const [newUser, setNewUser] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
        profilePicture: '/images/avatars/1.png'
    })

    // ** State
    const [openAlert, setOpenAlert] = useState(false)
    const [openAlert2, setOpenAlert2] = useState(false)
    const [hideButton, setHideButton] = useState(false)

    // const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

    // const onChange = file => {
    //     const reader = new FileReader()
    //     const { files } = file.target
    //     if (files && files.length !== 0) {
    //         reader.onload = () => setNewUser(newUser => ({
    //             ...newUser,
    //             profilePicture: reader.result
    //         }))
    //         reader.readAsDataURL(files[0])
    //     }
    // }

    const handleChange = (e) => {
        console.log(e.target.name, ': ', e.target.value)
        setNewUser({ ...newUser, [e.target.name]: e.target.value })


    }

    const dispatch = useDispatch();

    const onClick = async () => {

        !newUser.name || !newUser.phone || !newUser.email || !newUser.company ? setOpenAlert(true) : setOpenAlert(false)
        newUser.name && newUser.phone && newUser.email && newUser.company ? setOpenAlert2(true) : setOpenAlert2(false)
        dispatch(addBasicInfo(newUser))

        await activateParentButton();
        setHideButton(true)

    }

    return (
        <CardContent>
            <form>
                <Grid container spacing={7}>
                    <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ImgStyled src={newUser.profilePicture} alt='Profile Pic' />
                            <Box>
                                <ButtonStyled className='pbeth' component='label' variant='contained' htmlFor='account-settings-upload-image'>
                                    Upload Your Photo
                                    <input
                                        hidden
                                        type='file'
                                        onChange={handleChange}
                                        accept='image/png, image/jpeg'
                                        id='account-settings-upload-image'
                                        name='profilePicture'
                                    />
                                </ButtonStyled>
                                <br />
                                <br />

                                <ResetButtonStyled color='error' variant='outlined' onClick={() => setNewUser(newUser => ({
                                    ...newUser,
                                    profilePicture: '/images/avatars/1.png'
                                }))}>
                                    Reset
                                </ResetButtonStyled>
                                <Typography variant='body2' sx={{ marginTop: 5 }}>
                                    Allowed PNG or JPEG. Max size of 800K.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField name="name" fullWidth label='Username' placeholder='Your Name' onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="phone" fullWidth label='Phone' type="number" placeholder='Phone' onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="email"
                            fullWidth
                            type='email'
                            label='Email'
                            placeholder='youmail@host.com'
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="company" fullWidth label='Company' placeholder='ABC Pvt. Ltd.' defaultValue='ABC Pvt. Ltd.' onChange={handleChange} />
                    </Grid>

                    {openAlert || openAlert2 ? (
                        <Grid item xs={12} sx={{ mb: 3 }}>
                            {openAlert && <Alert
                                autoHideDuration={3000}
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
                            </Alert>}
                            {openAlert2 && <Alert
                                autoHideDuration={3000}
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
                            </Alert>}
                        </Grid>
                    ) : null}

                    <Grid item xs={12}
                        hidden={hideButton}
                    >
                        <Button className='pbeth' variant='contained' sx={{ marginRight: 3.5 }} onClick={onClick}>
                            Save Changes
                        </Button>
                        <Button type='reset' variant='outlined' color='secondary'>
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </CardContent>
    )
}

export default TabAccount
