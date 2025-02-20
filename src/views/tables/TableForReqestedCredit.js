import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip'
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addOrder } from 'src/redux/orderSlice';
import Cookies from 'js-cookie';

const statusObj = {
    REJECTED: { color: 'error' },
    PENDING: { color: 'warning' },
    PAYED: { color: 'success' },
    ACCEPTED: { color: 'success' },
    PROCESSED: { color: 'info' },
};

const fetchNames = async (orders) => {
    const names = await Promise.all(
        orders.map(async (order) => {
            const url = process.env.NEXT_PUBLIC_API_URL + 'auth/' + order.userId;
            const resp = await axios.get(url);
            const user = resp.data;

            return user.name;
        })
    );

    return names;
};


const TableForRequestedCredits = () => {
    const [reqCredit, setReqCredit] = useState([]);

    useEffect(async () => {
        const token = Cookies.get('jwt')
        const url = process.env.NEXT_PUBLIC_API_URL + 'order';

        const resp = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(resp.data);
        const filtered = resp.data.filter(order => order.status === 'PENDING');
        console.log('filtered', filtered);

        setReqCredit(filtered);
    }, []);

    const [names, setNames] = useState([]); ([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchNames(reqCredit);
            setNames(result);
        };

        fetchData();
    }, [reqCredit]);

    const dispatch = useDispatch()

    const dispatchOrder = (orderId) => {
        dispatch(addOrder(orderId))
    }

    return (
        <Card>
            <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Invoice</TableCell>
                            <TableCell> Request Date</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Item Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reqCredit.map((row, index) => (
                            <TableRow
                                hover
                                key={row._id}
                                sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                            >
                                <TableCell
                                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                                >
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '0.875rem !important'
                                            }}
                                        >
                                            {names[index]}
                                        </Typography>
                                        {/* <Typography variant='caption'>
                                            {row.designation}
                                        </Typography> */}
                                    </Box>
                                </TableCell>

                                <TableCell>{row.createdAt.slice(0, 10)}</TableCell>
                                <TableCell>{row.totalPrice}</TableCell>
                                <TableCell>{row.orderItems.length}</TableCell>
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
                                    <Link href='/invoice'>
                                        <Button
                                            onClick={() => dispatchOrder(row)}
                                            slots={{ root: IconButton }}
                                            slotProps={{
                                                root: { variant: 'outlined', color: 'neutral' }
                                            }}
                                        >
                                            View
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

export default TableForRequestedCredits;