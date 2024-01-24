// // ** MUI Imports
// import Grid from '@mui/material/Grid'
// import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
// import Poll from 'mdi-material-ui/Poll'
// import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
// import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// // ** Custom Components Imports
// import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// // ** Styled Component Import
// import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// // ** Demo Components Imports
// import CreditTable from 'src/views/dashboard/CreditTable'
// import Trophy from 'src/views/dashboard/Trophy'
// import TrendingUp from 'mdi-material-ui/TrendingUp'
// import CellphoneLink from 'mdi-material-ui/CellphoneLink'
// import AccountOutline from 'mdi-material-ui/AccountOutline'
// import Box from '@mui/material/Box'
// import Avatar from '@mui/material/Avatar'
// import Typography from '@mui/material/Typography'

// import { useState } from 'react'

// // ** MUI Imports
// import Tab from '@mui/material/Tab'
// import TabList from '@mui/lab/TabList'
// import TabPanel from '@mui/lab/TabPanel'
// import Button from '@mui/material/Button'
// import TabContext from '@mui/lab/TabContext'

// // import Typography from '@mui/material/Typography'

// import EditProducts from 'src/views/form-layouts/EditProducts'
// import CardContent from '@mui/material/CardContent'
// import AddProducts from 'src/views/form-layouts/AddProducts'
// import StatisticsCard from 'src/views/dashboard/StatisticsCard'
// import Credit from 'src/views/tables/Credit'

// // import StatisticsCard from 'src/views/dashboard/StatisticsCard'

// import { getProducts, addProducts } from 'src/redux/productSlice'
// import { useSelector, useDispatch } from 'react-redux'
// import { useEffect } from 'react'
// import axios from 'axios'
// import { addAuthUsers, getAuthUsers } from 'src/redux/feature/authSlice'

// import Err404 from 'src/pages/404'

// import Cookie from 'js-cookie'


// // ========================================

// const salesData = [
//     {
//         stats: '245k',
//         title: 'Total Deliveries',
//         color: 'success',
//         icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
//     },
//     {
//         stats: '12.5k',
//         title: 'Total Returned',
//         color: 'warning',
//         icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
//     },
//     {
//         stats: '1.54k',
//         color: 'warning',
//         title: 'Total Credit Unpaid',
//         icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
//     },
//     {
//         stats: '$88k',
//         color: 'info',
//         title: 'Total Unpaid Credit With Interest',
//         icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
//     }
// ]

// const renderStats = () => {
//     return salesData.map((item, index) => (
//         <Grid item xs={12} sm={3} key={index}>
//             <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Avatar
//                     variant='rounded'
//                     sx={{
//                         mr: 3,
//                         width: 44,
//                         height: 44,
//                         boxShadow: 3,
//                         color: 'common.white',
//                         backgroundColor: `${item.color}.main`
//                     }}
//                 >
//                     {item.icon}
//                 </Avatar>
//                 <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                     <Typography variant='caption'>{item.title}</Typography>
//                     <Typography variant='h6'>{item.stats}</Typography>
//                 </Box>
//             </Box>
//         </Grid>
//     ))
// }

// // ========================================
// const Returned = () => {
//     const dispatch = useDispatch()

//     const getProduct = async () => {
//         const productUrl = process.env.NEXT_PUBLIC_API_URL + 'product'
//         const { data } = await axios.get(productUrl)
//         dispatch(addProducts(data))
//     }

//     useEffect(() => {
//         getProduct()
//     }, [])

//     const products = useSelector(getProducts)

//     // user info from authSlice
//     const user = useSelector(getAuthUsers)
//     console.log(user)
//     console.log('from user', user._id)
//     const name = user.name
//     const email = user.email

//     return role === "warehouse_manager" ? (
//         <section>
//             <Typography variant='h6' sx={{ marginBottom: 2 }}>
//                 Orders list table
//             </Typography>
//             <Grid item xs={12}>
//                 <Credit />
//             </Grid>{' '}
//         </section>
//     ) : (<Err404 />)
// }

// export default Returned

import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import axios from 'axios';
import html2canvas from 'html2canvas';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { useDispatch } from 'react-redux';
import { addOrder } from 'src/redux/orderSlice';
import Cookies from 'js-cookie';

// import React, { useEffect, useState } from 'react';
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

// import Button from '@mui/material/Button';
import Link from 'next/link';

// import IconButton from '@mui/material/IconButton';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { addOrder } from 'src/redux/orderSlice';
// import Cookies from 'js-cookie';

const statusObj = {
    REJECTED: { color: 'error' },
    PENDING: { color: 'warning' },
    PAID: { color: 'success' },
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

const MyTable = () => {
    const [reqCredit, setReqCredit] = useState([]);
    const [reqCreditUser, setReqCreditUser] = useState("");

    const token = Cookies.get('jwt')
    useEffect(() => {
        const getter = async () => {

            const id = Cookies.get('customer_id')

            // get all customers 
            const urlCustomer = process.env.NEXT_PUBLIC_API_URL + 'customer';

            const respCustomer = await axios.get(urlCustomer, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('respCustomer:', respCustomer.data)

            // filter customer similar with id
            if (respCustomer.data) {
                const filteredUser = respCustomer.data.filter(customer => (customer._id === id));
                console.log('filtered respCustomer', filteredUser);
                const ids = filteredUser[0].userId
                console.log('filtered respCustomer id', ids);
                console.log('filtered respCustomer', typeof (ids));

                setReqCreditUser(ids);
            }

            // get orders and filter by userId
            const url = process.env.NEXT_PUBLIC_API_URL + 'order';

            const resp = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Resp data/ orders: ", resp.data);

            if (resp.data) {
                const filtered = await resp.data.filter(order => (order.userId === reqCreditUser));
                console.log('filtered', filtered);

                setReqCredit(filtered);
            }

            console.log("Resp of get order request: ", resp)

        }
        getter()
    }, []);

    const [names, setNames] = useState([]);

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

    return reqCredit ? (
        <Card>
            <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Invoice Date</TableCell>
                            <TableCell>Total Price</TableCell>
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
                                <TableCell>{names[index]}</TableCell>
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
                                    <Link href={`/invoice/${row._id}`}>
                                        <Button variant="outlined" color="neutral">
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
    ) : (
        <>You have no history yet</>
    );
};

// export default TableForCustomerInfo;

export default MyTable;

