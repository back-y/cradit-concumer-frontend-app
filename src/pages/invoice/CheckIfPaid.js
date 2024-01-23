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

            <Grid container spacing={2}>
                {/* {images.map((image, key) => ( */}
                <Grid style={{ width: '100%' }} >
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