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

import * as React from 'react';

// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'

// import Typography from '@mui/material/Typography'

// import CardContent from '@mui/material/CardContent'


import TrendingUp from 'mdi-material-ui/TrendingUp'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import Avatar from '@mui/material/Avatar'

import GiveProducts from 'src/views/form-layouts/GiveProducts'

const CustomInput = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Entry Date' autoComplete='off' />
})

const ProvideCredit = ({ title, price, description, icon, iconTitle, stock }) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // ===============

    const [Source, setSource] = useState([])
    const [date, setDate] = useState(null)

    // Handle Select
    const handleSelectChange = event => {
        setSource(event.target.value)
    }

    // ========================================

    const salesData = [
        {
            stats: '245k',
            title: 'Total Credit Allowed',
            color: 'primary',
            icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
        },
        {
            stats: '12.5k',
            title: 'Total Credit Used',
            color: 'success',
            icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
        },
        {
            stats: '1.54k',
            color: 'warning',
            title: 'Total Credit Unpaid',
            icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
        },
        {
            stats: '$88k',
            color: 'info',
            title: 'Total Unpaid Credit With Interest',
            icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
        }
    ]


    const renderStats = () => {
        return salesData.map((item, index) => (
            <Grid item xs={12} sm={3} key={index}>
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        variant='rounded'
                        sx={{
                            mr: 3,
                            width: 44,
                            height: 44,
                            boxShadow: 3,
                            color: 'common.white',
                            backgroundColor: `${item.color}.main`
                        }}
                    >
                        {item.icon}
                    </Avatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='caption'>{item.title}</Typography>
                        <Typography variant='h6'>{item.stats}</Typography>
                    </Box>
                </Box>
            </Grid>
        ))
    }

    // ===============

    return (
        <div>
            {/* <Card> */}

            <Button variant='outlined' size='small' type='submit' sx={{
                py: 2.5, width: '100%',
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                marginBottom: '1rem',

                // backgroundColor: '#d7a022',
                boxShadow: 'none',
                '&:hover': {
                    boxShadow: '0 1px 20px 1px black',
                    backgroundColor: '#d7a022'
                }
            }} onClick={handleClickOpen}>
                {icon}  {iconTitle}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"User Name"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid item xs={12} md={12}>
                            <StatisticsCard
                                TotalAllowedAmount="Allowed Amount 25000 ETB"
                                mainTitle="Remaining Amount 2000 ETB"
                                renderState={renderStats()}
                            />
                        </Grid>
                    </DialogContentText>
                    {/* <GiveProducts /> */}
                    {/* =============== */}

                    <Box>

                        <Divider sx={{ margin: 0 }} />
                        <form onSubmit={e => e.preventDefault()}>
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                            Requested Products Price
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label='Current Requested Amount' placeholder='1324 ETB' />
                                    </Grid>
                                    {/* <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label='Amount' placeholder='100 kg' />
                                    </Grid> */}
                                    {/* <Grid item xs={12} sm={6}>
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
                                    </Grid> */}
                                    {/* <Grid item xs={12} sm={6}>
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
                                    </Grid> */}
                                    {/* <Grid item xs={12} sm={6}>
                                        <DatePicker
                                            selected={date}
                                            showYearDropdown
                                            showMonthDropdown
                                            placeholderText='MM-DD-YYYY'
                                            customInput={<CustomInput />}
                                            id='form-layouts-separator-date'
                                            onChange={date => setDate(date)}
                                        />
                                    </Grid> */}
                                </Grid>
                            </CardContent>
                            <Divider sx={{ margin: 0 }} />
                            <CardActions>
                                {/* <Button style={{ backgroundColor: '#d7a022', color: 'black' }}

        >
            {btnSubmit}
        </Button>
        <Button style={{ color: 'black' }}>
            {btnCancel}
        </Button> */}
                            </CardActions>
                        </form>
                    </Box>
                    {/* =============== */}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus size='large' className='pbeth' type='submit' sx={{
                        mr: 2
                    }} variant='contained'>
                        Provide
                    </Button>
                    <Button onClick={handleClose} size='large' color='secondary' className='pbetho' variant='outlined'>Cancel</Button>
                </DialogActions>
            </Dialog>
            {/* </Card> */}
        </div>
    );
}

export default ProvideCredit;