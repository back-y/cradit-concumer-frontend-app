// ** MUI Imports
import { useEffect, useState } from 'react'
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
import axios from 'axios'
import DropDown from 'src/layouts/components/DropDown'

// import Cookies from 'js-cookie'


// const jwt = Cookies.get('jwt')
// const id = Cookies.get('id')
// const name = Cookies.get('name')
// const email = Cookies.get('email')
// const roles = Cookies.get('role')
// const phone = Cookies.get('phone')

const authUserUrl = process.env.NEXT_PUBLIC_API_URL + 'auth';

const user = async () => {
    const response = await axios.get(authUserUrl);
    console.log('ghjhkdfjksdfhsdjkfhsjkdfsdkljfsjdfjsdjfh', response.data);

    for (let i = 0; i < response.data.length; i++) {
        console.log(i)
    };
};

// useEffect(() => {
user();

// }, []);

// import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { getCustomers, addCustomers } from 'src/redux/customerSlice'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const statusObj = {
    // applied: { color: 'info' },
    // current: { color: 'primary' },
    // rejected: { color: 'error' },
    Inactive: { color: 'warning' },
    Active: { color: 'success' }
}


const TableForCustemerList = () => {

    const router = useRouter()

    const handleClick = (e, id) => {
        console.log('customer_id:', id)
        Cookies.set('customer_id', id)
        router.push('/customer-info')
    }


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectChange = event => {
        setLanguage(event.target.value)
    }

    const dispatch = useDispatch()

    const [customers, setCustomers] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const userUrl = process.env.NEXT_PUBLIC_API_URL + 'customer';
            const cust = await axios.get(userUrl)
            setCustomers(cust.data)
            dispatch(addCustomers(cust.data))
        }

        fetchData();

    }, [])

    return (
        <Card>
            <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell> paid Date</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>email</TableCell>
                            <TableCell>Remaining credit Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map(row => (
                            <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                                        <Typography variant='caption'>{row.customerType}</Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>{row.updatedAt}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.creditInfo + ' ETB'}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={'Active'}
                                        color={statusObj['Active'].color}
                                        sx={{
                                            height: 24,
                                            fontSize: '0.75rem',
                                            textTransform: 'capitalize',
                                            '& .MuiChip-label': { fontWeight: 500 }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>

                                    <DropDown iconTitle1="View" iconTitle2="History" handleClick={(e) => handleClick(e, row._id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}

export default TableForCustemerList
