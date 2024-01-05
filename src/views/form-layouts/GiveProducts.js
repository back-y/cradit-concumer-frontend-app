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

const CustomInput = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Entry Date' autoComplete='off' />
})

const FormLayoutsSeparator = ({ btnCancel, btnSubmit, style }) => {
    // ** States
    const [Source, setSource] = useState([])
    const [date, setDate] = useState(null)

    // Handle Select
    const handleSelectChange = event => {
        setSource(event.target.value)
    }

    return (
        <Box>

            <Divider sx={{ margin: 0 }} />
            <form onSubmit={e => e.preventDefault()}>
                <CardContent>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                Products Info
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label='Product Name' placeholder='Onion' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label='Amount' placeholder='100 kg' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id='form-layouts-separator-select-label'>Product Grade</InputLabel>
                                <Select
                                    label='Customer type'
                                    defaultValue=''
                                    id='form-layouts-separator-select'
                                    labelId='form-layouts-separator-select-label'
                                >
                                    <MenuItem value='A'>A</MenuItem>
                                    <MenuItem value='A-'>A-</MenuItem>
                                    <MenuItem value='B'>B</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id='form-layouts-separator-multiple-select-label'>Source</InputLabel>
                                <Select
                                    multiple
                                    value={Source}
                                    onChange={handleSelectChange}
                                    id='form-layouts-separator-multiple-select'
                                    labelId='form-layouts-separator-multiple-select-label'
                                    input={<OutlinedInput label='Source' id='select-multiple-Source' />}
                                >
                                    <MenuItem value='Yehabesh'>Yehabesh</MenuItem>
                                    <MenuItem value='Yeferenj'>Yeferenj</MenuItem>
                                    <MenuItem value='North'>North</MenuItem>
                                    <MenuItem value='South'>South</MenuItem>
                                    <MenuItem value='West'>West</MenuItem>
                                    <MenuItem value='East'>East</MenuItem>
                                    <MenuItem value='Imported'>Imported</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DatePicker
                                selected={date}
                                showYearDropdown
                                showMonthDropdown
                                placeholderText='MM-DD-YYYY'
                                customInput={<CustomInput />}
                                id='form-layouts-separator-date'
                                onChange={date => setDate(date)}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider sx={{ margin: 0 }} />
                <CardActions>
                </CardActions>
            </form>
        </Box>
    )
}

export default FormLayoutsSeparator

