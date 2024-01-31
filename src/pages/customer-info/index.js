// // ** MUI Imports
// import Grid from '@mui/material/Grid'

// // ** Styled Component Import
// import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// // ** Demo Components Imports
// import Typography from '@mui/material/Typography'
// import { useState } from 'react'

// // ** MUI Imports
// import Tab from '@mui/material/Tab'
// import TabList from '@mui/lab/TabList'
// import TabPanel from '@mui/lab/TabPanel'
// import TabContext from '@mui/lab/TabContext'

// // import Typography from '@mui/material/Typography'

// import CardContent from '@mui/material/CardContent'

// // import StatisticsCard from 'src/views/dashboard/StatisticsCard'
// import TableForCustomerList from 'src/views/tables/TableForCustomerList'

// // ========================================


// const credit = ({ subTitle, mainTitle, subTitle2, mainTitle2 }) => {

//     const [value, setValue] = useState('1')

//     const handleChange = (event, newValue) => {
//         setValue(newValue)
//     }

//     return (
//         <section>
//             <TabContext value={value}>
//                 <TabList onChange={handleChange} aria-label='card navigation example'>
//                     <Tab value='1' label='Customer Basic Info' />
//                     <Tab value='2' label='Customer Legal Info' />
//                     <Tab value='3' label='Customer history' />
//                 </TabList>

//                 <CardContent>
//                     {/* ============================================================== */}
//                     <TabPanel value='1' sx={{ p: 0 }}>
//                         <Typography variant='h6' sx={{ marginBottom: 2 }}>
//                             <ApexChartWrapper>
//                                 <Grid container spacing={6}>
//                                     {/* ==================================================== */}

//                                     basic info
//                                     <Grid item xs={12}>
//                                         <TableForCustomerList />
//                                     </Grid>
//                                 </Grid>
//                             </ApexChartWrapper>
//                         </Typography>
//                     </TabPanel>

//                     {/* ============================================================== */}
//                     <TabPanel value='2' sx={{ p: 0 }}>
//                         <ApexChartWrapper>
//                             <Grid item xs={12}>
//                                 <TableForCustomerList />
//                             </Grid>
//                         </ApexChartWrapper>
//                     </TabPanel>

//                     {/* ============================================================== */}
//                     <TabPanel value='3' sx={{ p: 0 }}>
//                         <ApexChartWrapper>
//                             <Grid item xs={12}>
//                                 <TableForCustomerList />
//                             </Grid>
//                         </ApexChartWrapper>
//                     </TabPanel>
//                 </CardContent>
//             </TabContext>
//         </section>
//     )
// }

// export default credit

import React, { useEffect, useState, useRef } from 'react';
import { Box, Grid, Typography, Card, CardContent, CardMedia, IconButton, Button } from "@mui/material";
import Cookies from 'js-cookie';
import axios from 'axios';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-medium-image-zoom/dist/styles.css';
import TableForCustomerInfo from 'src/views/tables/TableForCustomer-info'

import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import StatisticsCard from 'src/views/dashboard/StatisticsCard'

import BarsGraph from 'src/pages/credit/BarsGraph'

import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'

import TrendingUp from 'mdi-material-ui/TrendingUp'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import Avatar from '@mui/material/Avatar'

import ReactToPrint from 'react-to-print';

import { useReactToPrint } from 'react-to-print'

const salesData = [
    {
        stats: '0 ETB',
        title: 'Total Credit Given',
        color: 'primary',
        icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
    },
    {
        stats: '0 ETB',
        title: 'Total Credit Paid',
        color: 'success',
        icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
    },
    {
        stats: '0 ETB',
        color: 'warning',
        title: 'Total Credit Unpaid',
        icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
    },
    {
        stats: '0 ETB',
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

// ========================================

const CustomGallery = () => {

    const [images, setImages] = useState([])
    const [userInfos, setUserInfos] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);
    const imageRef = useRef();

    useEffect(() => {
        const getter = async () => {
            const id = Cookies.get('customer_id')
            console.log('customer_id:', id)
            const url = process.env.NEXT_PUBLIC_API_URL + 'customer/' + id
            await axios.get(url)
                .then(resp => {
                    const ID_name = resp.data.documents.ID
                    console.log('iiiidddd data', resp.data.documents)
                    const userInfo = resp.data
                    setUserInfos(userInfo)
                    console.log('iiiidddd resp userInfo', userInfo)
                    console.log('ID image name: ', ID_name)
                    const L_name = resp.data.documents.License
                    const T_name = resp.data.documents.TIN
                    const R_name = resp.data.documents.R_Cert

                    const imgUrl = process.env.NEXT_PUBLIC_API_URL + 'file/'

                    setImages([imgUrl + ID_name, imgUrl + T_name, imgUrl + L_name, imgUrl + R_name])

                })
                .catch(err => {
                    console.log(err)
                })

            console.log('Images urls: ', images)

        }
        getter()
    }, [])

    // const [currentIndex, setCurrentIndex] = useState(0);

    const handleSlide = (index) => {
        setCurrentIndex(index);
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = images[currentIndex];
        link.download = `image_${currentIndex + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print</title></head><body>');
        printWindow.document.write(`<img src="${images[currentIndex]}" style="max-width: 100%;" />`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    const componentRef = useRef();

    const handlePrints = useReactToPrint({
        content: () => componentRef.current
    })

    // const handleDownloadCSV = () => {
    //     const csvContent = "data:text/csv;charset=utf-8," +
    //         reqCredit.map(user => Object.values(user).join(',')).join('\n');
    //     const encodedUri = encodeURI(csvContent);
    //     const link = document.createElement("a");
    //     link.setAttribute("href", encodedUri);
    //     link.setAttribute("download", "users_data.csv");
    //     document.body.appendChild(link);
    //     link.click();
    // };

    return (
        <section>
            <ApexChartWrapper>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={12}>
                        <StatisticsCard
                            mainTitle={`${userInfos.name} Credit Status`}
                            TotalAllowedAmount='Total credit allowed 0 ETB'
                            emoji='😎 this month'
                            renderState={renderStats()}

                        // names={name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <BarsGraph />
                    </Grid>
                    <Box mt={2} textAlign="right">
                        <ReactToPrint
                            trigger={() => <Button style={{ margin: '10px' }} variant="outlined" color="primary" onClick={handlePrints}>Print</Button>}
                            content={() => componentRef.current}
                        />

                        {/* <Button style={{ margin: '10px' }} variant="outlined" color="primary" onClick={handleDownloadCSV}>Download CSV</Button> */}
                    </Box>
                    <Grid item xs={12} ref={componentRef}>
                        <Grid item xs={12} style={{ display: "none" }}>              <div className='tm_invoice_head tm_top_head tm_mb15 tm_align_center'>
                            <div className='tm_invoice_left'>
                                <div className='tm_logo'>
                                    <img src='/images/PBETH/pbethLogo.png' alt='Logo' style={{ width: '15rem' }} />
                                </div>
                            </div>
                            <div className='tm_invoice_right tm_text_right tm_mobile_hide'>
                                <div className='tm_f50 tm_text_uppercase tm_white_color'>Invoice</div>
                            </div>
                            <div className='tm_shape_bg tm_accent_bg tm_mobile_hide'></div>
                        </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <div className='tm_invoice_info tm_mb25' style={{ backgroundColor: 'white', padding: '10px', display: 'flex', width: '100%' }}>
                                    <div className='tm_card_note tm_mobile_hide' style={{ width: '100%', display: 'block', justifyContent: 'space-between' }}>
                                        <div className='tm_card_note tm_mobile_hide' style={{ display: 'flex' }} >
                                            <h6 className='tm_primary_color'>Name: </h6> &nbsp;&nbsp; <span> <h6 style={{ color: 'red' }}> {userInfos.name}</h6></span>
                                        </div>
                                        <div className='tm_card_note tm_mobile_hide' style={{ display: 'flex' }} >
                                            <h6 className='tm_primary_color'>Email: </h6>&nbsp;&nbsp; <span> <h6 style={{ color: 'red' }}> {userInfos.email}</h6></span>
                                        </div>
                                        <div className='tm_card_note tm_mobile_hide' style={{ display: 'flex' }} >
                                            <h6 className='tm_primary_color'>Approved by: </h6>&nbsp;&nbsp; <span> <h6 style={{ color: 'red' }}> {userInfos.approvedBy}</h6></span>
                                        </div>
                                    </div>
                                    <div className='tm_card_note tm_mobile_hide' style={{ width: '100%', display: 'block', justifyContent: 'space-between' }}>
                                        <div className='tm_card_note tm_mobile_hide' style={{ display: 'flex' }} >
                                            <h6 className='tm_primary_color'>Phone number: </h6> &nbsp;&nbsp;<span> <h6 style={{ color: 'red' }}> {userInfos.phone}</h6></span>
                                        </div>
                                        <div className='tm_card_note tm_mobile_hide' style={{ display: 'flex' }} >
                                            <h6 className='tm_primary_color'>Company: </h6>&nbsp;&nbsp; <span> <h6 style={{ color: 'red' }}> {userInfos.company}</h6></span>
                                        </div>
                                        {userInfos.updatedAt && (<div className='tm_card_note tm_mobile_hide' style={{ display: 'flex' }} >
                                            <h6 className='tm_primary_color'>Approval date: </h6>&nbsp;&nbsp; <span> <h6 style={{ color: 'red' }}> {userInfos.updatedAt.slice(0, 10)
                                            }</h6></span>
                                        </div>)}
                                    </div>

                                    <div className='tm_invoice_seperator tm_accent_bg'></div>
                                </div>

                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            {/* <Typography variant='h6' sx={{ marginBottom: 2 }}>
                            Customer Detail{' '}
                        </Typography> */}
                            <TableForCustomerInfo />
                        </Grid>
                    </Grid>
                    <br />
                    <br />
                    <br />
                    <Grid item xs={12}>
                        {images.length > 0 && (<Grid container spacing={2} style={{ width: '100%' }}>
                            <Gallery
                                style={{ width: '100%' }}
                                items={images.map((image) => ({
                                    original: image,
                                    thumbnail: image,
                                    width: '100%'

                                }))}
                                showNav={true}
                                showFullscreenButton={true}
                                showPlayButton={false}
                                startIndex={currentIndex}
                                onSlide={handleSlide}

                            />
                        </Grid>)}
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Button variant="contained" color="primary" onClick={handleDownload}>
                                Download
                            </Button>

                            <Button variant="contained" color="secondary" onClick={handlePrint} style={{ marginLeft: '10px' }}>
                                Print
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </ApexChartWrapper>
        </section>

    );
};

export default CustomGallery;


