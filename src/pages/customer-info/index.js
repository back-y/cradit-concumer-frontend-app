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
import CloseIcon from "@mui/icons-material/Close";
import Approve from 'src/pages/pages/steper/Approve';
import Cookies from 'js-cookie';
import axios from 'axios';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const CustomGallery = () => {

    const [images, setImages] = useState([])
    const [userInfos, setUserInfos] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);
    const imageRef = useRef();

    useEffect(async () => {
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

    return (
        <Box>

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
                        <div className='tm_card_note tm_mobile_hide' style={{ display: 'flex' }} >
                            <h6 className='tm_primary_color'>Approval date: </h6>&nbsp;&nbsp; <span> <h6 style={{ color: 'red' }}> {userInfos.updatedAt.slice(0, 10)
                            }</h6></span>
                        </div>
                    </div>

                    <div className='tm_invoice_seperator tm_accent_bg'></div>
                </div>

            </Grid>
            <Grid container spacing={2}>
                <Gallery
                    items={images.map((image) => ({
                        original: image,
                        thumbnail: image,
                    }))}
                    showNav={true}
                    showFullscreenButton={true}
                    showPlayButton={false}
                    startIndex={currentIndex}
                    onSlide={handleSlide}
                />
            </Grid>
            {/* Download and Print Buttons */}
            <Grid container spacing={2}>
                <Button variant="contained" color="primary" onClick={handleDownload}>
                    Download
                </Button>

                <Button variant="contained" color="secondary" onClick={handlePrint} style={{ marginLeft: '10px' }}>
                    Print
                </Button>
            </Grid>
            {/* <Approve /> */}
        </Box>
    );
};

export default CustomGallery;


