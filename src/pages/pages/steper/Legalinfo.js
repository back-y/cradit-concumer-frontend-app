// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'

// import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'

// import MenuItem from '@mui/material/MenuItem'
// import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'

// import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// import { addAuthUsers, getAuthUsers } from 'src/redux/feature/authSlice'
import { addLegalInfo } from 'src/redux/candidateSlice'
import { useDispatch } from 'react-redux'

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

const LegalInformation = ({ activateParentButton }) => {

    // ** State for alert
    const [openAlert, setOpenAlert] = useState(false)
    const [openAlert2, setOpenAlert2] = useState(false)

    // ** State for identification paper
    const [imgIdentificationPaper, setImgIdentificationPaper] = useState('/images/PBETH/pbethLogo.png')
    const [viewID, setViewID] = useState('/images/PBETH/pbethLogo.png')

    const onIdentificationChange = file => {
        const reader = new FileReader()
        const { files } = file.target
        if (files && files.length !== 0) {
            reader.onload = () => {
                setImgIdentificationPaper(files[0])
                setViewID(reader.result)
            }
            reader.readAsDataURL(files[0])
        }
    }

    // ** State for registration paper
    const [imgRegistration, setImgRegistration] = useState('/images/PBETH/pbethLogo.png')

    const [viewRP, setViewRP] = useState('/images/PBETH/pbethLogo.png')

    const onRegistrationChange = file => {
        const reader = new FileReader()
        const { files } = file.target
        if (files && files.length !== 0) {
            reader.onload = () => {
                setImgRegistration(files[0])
                setViewRP(reader.result)
            }
            reader.readAsDataURL(files[0])
        }
    }

    // ** State for license
    const [imgLicense, setImgLicense] = useState('/images/PBETH/pbethLogo.png')

    const [viewLI, setViewLI] = useState('/images/PBETH/pbethLogo.png')

    const onLicenseChange = file => {
        const reader = new FileReader()
        const { files } = file.target
        if (files && files.length !== 0) {
            reader.onload = () => {
                setImgLicense(files[0])
                setViewLI(reader.result)
            }
            reader.readAsDataURL(files[0])
        }
    }

    // ** State for TinNumber
    const [imgTinNumber, setImgTinNumber] = useState('/images/PBETH/pbethLogo.png')
    const [hideButton, setHideButton] = useState(false)

    const [viewTI, setViewTI] = useState('/images/PBETH/pbethLogo.png')

    const onTinNumberChange = file => {
        const reader = new FileReader()
        const { files } = file.target
        if (files && files.length !== 0) {
            reader.onload = () => {
                setImgTinNumber(files[0])
                setViewTI(reader.result)
            }
            reader.readAsDataURL(files[0])
        }

    }

    const dispatch = useDispatch()

    const uploadFiles = async () => {

        imgIdentificationPaper !== '/images/PBETH/pbethLogo.png' && imgTinNumber !== '/images/PBETH/pbethLogo.png' && imgLicense !== '/images/PBETH/pbethLogo.png' && imgRegistration !== '/images/PBETH/pbethLogo.png' ? setOpenAlert2(true) : setOpenAlert2(false)
        imgIdentificationPaper === '/images/PBETH/pbethLogo.png' || imgTinNumber === '/images/PBETH/pbethLogo.png' || imgLicense === '/images/PBETH/pbethLogo.png' || imgRegistration === '/images/PBETH/pbethLogo.png' ? setOpenAlert(true) : setOpenAlert(false)



        dispatch(addLegalInfo({
            file1: imgIdentificationPaper,
            file2: imgTinNumber,
            file3: imgLicense,
            file4: imgRegistration,
        }))

        await activateParentButton();
        setHideButton(true)

    };

    return (
        <CardContent>
            <form>
                <Grid container spacing={7}>
                    <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                            <ImgStyled src={viewID} alt='Profile Pic' style={{ width: 400, marginRight: 0, }} />
                            <Box>
                                <ButtonStyled component='label' className='pbeth' variant='contained' htmlFor='upload-IdentificationPaper'>
                                    Upload Id Paper
                                    <input
                                        hidden
                                        type='file'
                                        onChange={onIdentificationChange}
                                        accept='image/png, image/jpeg'
                                        id='upload-IdentificationPaper'
                                    />
                                </ButtonStyled>
                                <br />
                                <br />

                                <ResetButtonStyled color='error' variant='outlined' onClick={() => {
                                    setImgIdentificationPaper('/images/PBETH/pbethLogo.png');
                                    setViewID('/images/PBETH/pbethLogo.png');
                                }}>
                                    Reset
                                </ResetButtonStyled>
                                <Typography variant='body2' sx={{ marginTop: 5 }}>
                                    Allowed PNG or JPEG. Max size of 800K.
                                </Typography>
                            </Box>
                        </Box>
                        <br />
                        <br />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                            <ImgStyled src={viewTI} alt='Profile Pic' style={{ width: 400, marginRight: 0, }} />
                            <Box>
                                <ButtonStyled component='label' className='pbeth' variant='contained' htmlFor='upload-TinNumber'>
                                    Upload TinNumber
                                    <input
                                        hidden
                                        type='file'
                                        onChange={onTinNumberChange}
                                        accept='image/png, image/jpeg'
                                        id='upload-TinNumber'
                                    />
                                </ButtonStyled>
                                <br />
                                <br />

                                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgTinNumber('/images/PBETH/pbethLogo.png')}>
                                    Reset
                                </ResetButtonStyled>
                                <Typography variant='body2' sx={{ marginTop: 5 }}>
                                    Allowed PNG or JPEG. Max size of 800K.
                                </Typography>
                            </Box>
                        </Box>
                        <br />
                        <br />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                            <ImgStyled src={viewLI} alt='Profile Pic' style={{ width: 400, marginRight: 0, }} />
                            <Box>
                                <ButtonStyled component='label' className='pbeth' variant='contained' htmlFor='upload-License'>
                                    Upload License
                                    <input
                                        hidden
                                        type='file'
                                        onChange={onLicenseChange}
                                        accept='image/png, image/jpeg'
                                        id='upload-License'
                                    />
                                </ButtonStyled>
                                <br />
                                <br />

                                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgLicense('/images/PBETH/pbethLogo.png')}>
                                    Reset
                                </ResetButtonStyled>
                                <Typography variant='body2' sx={{ marginTop: 5 }}>
                                    Allowed PNG or JPEG. Max size of 800K.
                                </Typography>
                            </Box>
                        </Box>
                        <br />
                        <br />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                            <ImgStyled src={viewRP} alt='Profile Pic' style={{ width: 400, marginRight: 0, }} />
                            <Box>
                                <ButtonStyled component='label' className='pbeth' variant='contained' htmlFor='upload-Registration'>
                                    Upload Registration
                                    <input
                                        hidden
                                        type='file'
                                        onChange={onRegistrationChange}
                                        accept='image/png, image/jpeg'
                                        id='upload-Registration'
                                    />
                                </ButtonStyled>
                                <br />
                                <br />

                                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgRegistration('/images/PBETH/pbethLogo.png')}>
                                    Reset
                                </ResetButtonStyled>
                                <Typography variant='body2' sx={{ marginTop: 5 }}>
                                    Allowed PNG or JPEG. Max size of 800K.
                                </Typography>
                            </Box>
                        </Box>
                        <br />
                        <br />
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

                    <Grid
                        item xs={12}
                        hidden={hideButton}
                    >
                        <Button variant='contained' className='pbeth' sx={{ marginRight: 3.5 }} onClick={uploadFiles}>
                            Save Changes
                        </Button>
                        <Button type='reset' color='error' variant='outlined' >
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </CardContent>
    )
}

export default LegalInformation
