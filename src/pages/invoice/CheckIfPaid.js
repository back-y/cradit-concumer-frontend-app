import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Approve from 'src/pages/pages/steper/Approve';
import Cookies from 'js-cookie';
import axios from 'axios';
import { getOrder } from 'src/redux/orderSlice';
import { useSelector } from 'react-redux';

const CheckIfPaid = () => {


    const [image, setImage] = useState('')
    const [userInfos, setUserInfos] = useState([])

    const order = useSelector(getOrder)

    const fetchData = async () => {

        const creditUrl = process.env.NEXT_PUBLIC_API_URL + 'credit/';

        try {

            const resp = await axios.get(creditUrl);
            const credit = resp.data.find(cred => cred.orderId === order._id);
            setImage(process.env.NEXT_PUBLIC_API_URL + 'file/' + credit.receipt);

            setUserInfos({
                name: credit.userName,
                email: credit.userEmail,

            })
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {

        fetchData();

    }, [])


    return (
        <div>
            {/* <div className='tm_container html' style={{ paddingRight: '10rem' }}>
                <div className='tm_invoice_wrap'>
                    <div className='tm_invoice tm_style1 tm_type1'>
                        <div className='tm_invoice_in'>
                            <div className='tm_invoice_head tm_top_head tm_mb15 tm_align_center'>
                                <div className='tm_invoice_left'>
                                    <div className='tm_logo tm_text_uppercase'>
                                        Check If Paid
                                    </div>
                                </div>
                                <div className='tm_invoice_right tm_text_right tm_mobile_hide'>
                                    <div className=' tm_text_uppercase tm_white_color'>Paiment Confirmation Documents</div>
                                </div>
                                <div className='tm_shape_bg tm_accent_bg tm_mobile_hide'></div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className=' tm_mb25' style={{ backgroundColor: 'white', padding: '10em', display: 'flex', width: '100%' }}>
                    <div className='tm_card_note tm_mobile_hide' style={{ width: '100%', display: 'block', justifyContent: 'space-between' }}>
                        <div className='tm_card_note tm_mobile_hide' style={{ display: 'flex' }} >
                            <h6 className='tm_primary_color'>Name: </h6> &nbsp;&nbsp; <span> <h6 style={{ color: 'red' }}> {userInfos.name}</h6></span>
                        </div>
                        <div className='tm_card_note tm_mobile_hide' style={{ display: 'flex' }} >
                            <h6 className='tm_primary_color'>Email: </h6>&nbsp;&nbsp; <span> <h6 style={{ color: 'red' }}> {userInfos.email}</h6></span>
                        </div>
                    </div>
                    <div className='tm_card_note tm_mobile_hide' style={{ width: '100%', display: 'block', justifyContent: 'space-ound' }}>
                        <div className='tm_card_note tm_mobile_hide' style={{ display: 'flex' }} >
                            <h6 className='tm_primary_color'>Phone number: </h6> &nbsp;&nbsp;<span> <h6 style={{ color: 'red' }}> {userInfos.phone}</h6></span>
                        </div>
                        <div className='tm_card_note tm_mobile_hide' style={{ display: 'flex' }} >
                            <h6 className='tm_primary_color'>Company: </h6>&nbsp;&nbsp; <span> <h6 style={{ color: 'red' }}> {userInfos.company}</h6></span>
                        </div>
                    </div>

                    <div className='tm_invoice_seperator tm_accent_bg'></div>
                </div>
            </div> */}
            <Grid container spacing={2}>
                {/* {images.map((image, key) => ( */}
                <Grid  >
                    <Card>
                        <CardContent>
                            <CardMedia
                                style={{ height: 600, width: 400, marginRight: 0, }}
                                component="img"
                                image={image}
                                sx={{ objectFit: "contain", display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                {/* ))} */}
                {/* <Approve /> */}
            </Grid>
        </div>
    )
}

export default CheckIfPaid