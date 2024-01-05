// ** MUI Imports
import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Link from 'next/link'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const rows = [
    {
        age: 27,
        status: 'Inactive',
        date: '09/27/2018',
        name: 'Sally Quinn',
        salary: '$19586.23',

        designation: 'Holtel'
    },
    {
        age: 61,
        date: '09/23/2016',
        salary: '$23896.35',
        status: 'Inactive',
        name: 'Margaret Bowers',

        designation: 'Holtel'
    },
    {
        age: 59,
        date: '10/15/2017',
        name: 'Minnie Roy',
        status: 'Active',
        salary: '$18991.67',

        designation: 'Telecom'
    },
    {
        age: 30,
        date: '06/12/2018',
        status: 'Active',
        salary: '$19252.12',
        name: 'Ralph Leonard',
        email: 'dfalloona@ifeng.com',
        designation: 'Telecom'
    },
    {
        age: 66,
        status: 'Inactive',
        date: '03/24/2018',
        salary: '$13076.28',
        name: 'Annie Martin',
        designation: 'Staff',
        email: 'sganderton2@tuttocitta.it'
    },
    {
        age: 33,
        date: '08/25/2017',
        salary: '$10909.52',
        name: 'Adeline Day',
        status: 'Active',
        designation: 'Staff'

    },
    {
        age: 61,
        status: 'Active',
        date: '06/01/2017',
        salary: '$17803.80',
        name: 'Lora Jackson',
        designation: 'Geologist'

    },
    {
        age: 22,
        date: '12/03/2017',
        salary: '$12336.17',
        name: 'Rodney Sharp',
        status: 'Active',
        designation: 'Cost Accountant'

    }
]

const statusObj = {
    // applied: { color: 'info' },
    // current: { color: 'primary' },
    // rejected: { color: 'error' },
    Inactive: { color: 'warning' },
    Active: { color: 'success' }
}

const CustomerTable = () => {

    // ============================

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // ============================
    return (
        <Card>
            <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer List</TableCell>
                            <TableCell> paid Date</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Item Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                                        <Typography variant='caption'>{row.designation}</Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.salary}</TableCell>
                                <TableCell>{row.age}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={row.status}
                                        color={statusObj[row.status].color}
                                        sx={{
                                            height: 24,
                                            fontSize: '0.75rem',
                                            textTransform: 'capitalize',
                                            '& .MuiChip-label': { fontWeight: 500 }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        label='Customer type'
                                        defaultValue=''
                                        id='form-layouts-separator-select'
                                        labelId='form-layouts-separator-select-label'
                                    >

                                        <MenuItem value=''>
                                            <Link href="/clients">

                                                <Button variant='contained' size='small' type='submit' sx={{
                                                    py: 2.5, width: '100%',
                                                    borderTopLeftRadius: 0,
                                                    borderTopRightRadius: 0,
                                                    backgroundColor: '#d7a022',
                                                    boxShadow: 'none',
                                                    '&:hover': {
                                                        boxShadow: '0 1px 20px 1px black',
                                                        backgroundColor: '#d7a022'
                                                    }
                                                }} onClick={handleClickOpen}>
                                                    Home
                                                </Button>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem value='Staff'>
                                            <Link href="/clients/history">

                                                <Button variant='contained' size='small' type='submit' sx={{
                                                    py: 2.5, width: '100%',
                                                    borderTopLeftRadius: 0,
                                                    borderTopRightRadius: 0,
                                                    backgroundColor: '#d7a022',
                                                    boxShadow: 'none',
                                                    '&:hover': {
                                                        boxShadow: '0 1px 20px 1px black',
                                                        backgroundColor: '#d7a022'
                                                    }
                                                }} onClick={handleClickOpen}>
                                                    History
                                                </Button>
                                            </Link>
                                        </MenuItem>
                                        {/* <MenuItem value='Germany'>Germany</MenuItem> */}

                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}

export default CustomerTable
