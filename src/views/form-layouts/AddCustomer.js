// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';



const CustomInput = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Starting Date' autoComplete='off' />
})

const FormLayoutsSeparator = () => {
    // ** States
    const [language, setLanguage] = useState([])
    const [date, setDate] = useState(null)

    const handleSelectChange = event => {
        setLanguage(event.target.value)
    }

    return (
        <Box>
            {/* <CardHeader title='Multi Column with Form Separator' titleTypographyProps={{ variant: 'h6' }} /> */}
            <Divider sx={{ margin: 0 }} />
            <form onSubmit={e => e.preventDefault()}>
                <CardContent>
                    <Grid container spacing={5}>

                        <Grid item xs={12}>
                            <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                Clients Info
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label='Client Name' placeholder='Leonard' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label='Company Name' placeholder='Carter' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label='Desire Credit Amount' placeholder='1234' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id='form-layouts-separator-select-label'>Customer type</InputLabel>
                                <Select
                                    label='Customer type'
                                    defaultValue=''
                                    id='form-layouts-separator-select'
                                    labelId='form-layouts-separator-select-label'
                                >
                                    <MenuItem value='Indivisual'>Indivisual</MenuItem>
                                    <MenuItem value='Corporate'>Corporate</MenuItem>
                                    <MenuItem value='Staff'>Staff</MenuItem>
                                    {/* <MenuItem value='Germany'>Germany</MenuItem> */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label='Phone No.' placeholder='+1-123-456-8790' />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth type='email' label='Email' placeholder='carterleonard@gmail.com' />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider sx={{ margin: 0 }} />
                <CardActions>
                    <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                        Submit
                    </Button>
                    <Button size='large' color='secondary' variant='outlined'>
                        Cancel
                    </Button>
                </CardActions>
            </form>
        </Box>
    )
}

export default FormLayoutsSeparator
