import React, { useEffect, useState, useRef } from 'react';
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


import html2canvas from 'html2canvas';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import ReactToPrint from 'react-to-print';

import { useReactToPrint } from 'react-to-print'

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



const TableForCustomerInfo = () => {
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
                const filtered = resp.data.filter(order => (order.userId === reqCreditUser));
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
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })

    const handleDownloadCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8," +
            reqCredit.map(user => Object.values(user).join(',')).join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "users_data.csv");
        document.body.appendChild(link);
        link.click();
    };

    return reqCredit ? (
        <Card>
            <Box mt={2} textAlign="right">
                <ReactToPrint
                    trigger={() => <Button style={{ margin: '10px' }} variant="outlined" color="primary" onClick={handlePrint}>Print</Button>}
                    content={() => componentRef.current}
                />

                <Button style={{ margin: '10px' }} variant="outlined" color="primary" onClick={handleDownloadCSV}>Download CSV</Button>
            </Box>
            <TableContainer ref={componentRef}>
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
    ) : (<> You have no history yet</>);
};


export default TableForCustomerInfo;






// export default TableForCustomerInfo;


// import React, { useEffect, useState } from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Table from '@mui/material/Table';
// import TableRow from '@mui/material/TableRow';
// import TableHead from '@mui/material/TableHead';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import Typography from '@mui/material/Typography';
// import Chip from '@mui/material/Chip';
// import TableContainer from '@mui/material/TableContainer';
// import Button from '@mui/material/Button';
// import Link from 'next/link';
// import IconButton from '@mui/material/IconButton';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { addOrder } from 'src/redux/orderSlice';
// import Cookies from 'js-cookie';
// import html2canvas from 'html2canvas';
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';

// const statusObj = {
//     REJECTED: { color: 'error' },
//     PENDING: { color: 'warning' },
//     PAID: { color: 'success' },
//     ACCEPTED: { color: 'success' },
//     PROCESSED: { color: 'info' },
// };

// const fetchNames = async (orders) => {
//     const names = await Promise.all(
//         orders.map(async (order) => {
//             const url = process.env.NEXT_PUBLIC_API_URL + 'auth/' + order.userId;
//             const resp = await axios.get(url);
//             const user = resp.data;

//             return user.name;
//         })
//     );

//     return names;
// };

// const downloadAsCSV = (tableData) => {
//     const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//     const fileName = 'customer_data.xlsx';
//     const ws = XLSX.utils.json_to_sheet(tableData);
//     const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
//     const blob = XLSX.write(wb, { bookType: 'xlsx', mimeType: fileType });
//     FileSaver.saveAs(new Blob([blob], { type: fileType }), fileName);
// };

// const TableForCustomerInfo = () => {
//     const [reqCredit, setReqCredit] = useState([]);
//     const [reqCreditUser, setReqCreditUser] = useState("");

//     const token = Cookies.get('jwt')
//     useEffect(() => {
//         const getter = async () => {

//             const id = Cookies.get('customer_id')

//             // get all customers
//             const urlCustomer = process.env.NEXT_PUBLIC_API_URL + 'customer';

//             const respCustomer = await axios.get(urlCustomer, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             console.log('respCustomer:', respCustomer.data)

//             // filter customer similar with id
//             if (respCustomer.data) {
//                 const filteredUser = respCustomer.data.filter(customer => (customer._id === id));
//                 console.log('filtered respCustomer', filteredUser);
//                 const ids = filteredUser[0].userId
//                 console.log('filtered respCustomer id', ids);
//                 console.log('filtered respCustomer', typeof (ids));

//                 setReqCreditUser(ids);
//             }

//             // get orders and filter by userId
//             const url = process.env.NEXT_PUBLIC_API_URL + 'order';

//             const resp = await axios.get(url, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             console.log("Resp data/ orders: ", resp.data);

//             if (resp.data) {
//                 const filtered = resp.data.filter(order => (order.userId === reqCreditUser));
//                 console.log('filtered', filtered)

//                 setReqCredit(filtered);
//             }

//             console.log("Resp of get order requested: ", resp)

//         }

//         getter()
//     }, [token]);

//     const [names, setNames] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             const result = await fetchNames(reqCredit);
//             setNames(result);
//         };

//         fetchData();
//     }, [reqCredit]);

//     const dispatch = useDispatch()

//     const dispatchOrder = (orderId) => {
//         dispatch(addOrder(orderId))
//     }

//     const handleDownloadCSV = () => {
//         downloadAsCSV(reqCredit);
//     };

//     const handlePrint = () => {
//         const content = document.getElementById('table-container');
//         html2canvas(content).then((canvas) => {
//             const image = canvas.toDataURL('image/png');
//             const printWindow = window.open('', '_blank');
//             printWindow.document.open();
//             printWindow.document.write(`
//                 <html>
//                     <head>
//                         <title>Print Table</title>
//                         <style>
//                             body {
//                                 margin: 0;
//                                 display: flex;
//                                 align-items: center;
//                                 justify-content: center;
//                             }
//                         </style>
//                     </head>
//                     <body>
//                         <img src="${image}" style="width:100%" />
//                     </body>
//                 </html>
//             `);

//             printWindow.document.close();
//             printWindow.print();
//         });
//     };

//     return reqCredit ? (
//         <Card>
//             <TableContainer id="table-container">
//                 <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Customer Name</TableCell>
//                             <TableCell>Invoice Date</TableCell>
//                             <TableCell>Total Price</TableCell>
//                             <TableCell>Item Amount</TableCell>
//                             <TableCell>Status</TableCell>
//                             <TableCell>Action</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {reqCredit.map((row, index) => (
//                             <TableRow
//                                 hover
//                                 key={row._id}
//                                 sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
//                             >
//                                 <TableCell>{names[index]}</TableCell>
//                                 <TableCell>{row.createdAt.slice(0, 10)}</TableCell>
//                                 <TableCell>{row.totalPrice}</TableCell>
//                                 <TableCell>{row.orderItems.length}</TableCell>
//                                 <TableCell>
//                                     <Chip
//                                         label={row.status}
//                                         color={statusObj[row.status].color}
//                                         sx={{
//                                             height: 24,
//                                             fontSize: '0.75rem',
//                                             textTransform: 'capitalize',
//                                             '& .MuiChip-label': { fontWeight: 500 }
//                                         }}
//                                     />
//                                 </TableCell>
//                                 <TableCell>
//                                     <Link href={`/invoice/${row._id}`}>
//                                         <Button variant="outlined" color="neutral">
//                                             View
//                                         </Button>
//                                     </Link>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <br />
//             <br />
//             <Box mt={2} textAlign="right">
//                 <Button onClick={handleDownloadCSV} variant="outlined" color="primary" style={{ marginRight: '10px' }}>
//                     Download CSV
//                 </Button>
//                 <IconButton onClick={handlePrint} variant="outlined">
//                     Print
//                 </IconButton>
//             </Box>
//         </Card>
//     ) : (
//         <>You have no history yet</>
//     );
// };

// export default TableForCustomerInfo;

