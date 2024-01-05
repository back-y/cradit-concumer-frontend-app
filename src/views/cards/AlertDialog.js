import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import DatePicker from 'react-datepicker'
import Divider from '@mui/material/Divider'
import CardActions from '@mui/material/CardActions'

import { useSelector, useDispatch } from 'react-redux';
import { getProducts, addProducts } from 'src/redux/productSlice';
import axios from 'axios';

const AlertDialog = ({ id, title, price, unit, description, icon, iconTitle, quantity, itemCode, imageUrl }) => {
    const products = useSelector(getProducts);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        name: title,
        unit,
        price,
        quantity,
        description,
    })
    const [image, setImage] = useState(null)
    // Handle Select

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        // console.log(userData)
        console.log(e.target.name, ':', e.target.value)
        const value = e.target.value
        if (e.target.name == 'price' || e.target.name == 'quantity')
            value = Number(e.target.value)
        setUserData({ ...userData, [e.target.name]: value })
        // console.log(userData)
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        // tmp avocado image name = 4c5510a1038e.jpeg
    }

    const updateDone = () => {
        const index = products.findIndex(item => item._id === id)
        const updatedItem = {
            ...products[index],
            ...userData,
        }

        const updatedProducts = [
            ...products.slice(0, index),
            updatedItem,
            ...products.slice(index + 1),
        ]
        dispatch(addProducts(updatedProducts));
        // console.log(updatedProducts)
        handleClose();
    }

    const updateImgDone = (image) => {
        const index = products.findIndex(item => item._id === id)
        const updatedItem = {
            ...products[index],
            ...userData,
            image,
        }

        const updatedProducts = [
            ...products.slice(0, index),
            updatedItem,
            ...products.slice(index + 1),
        ]
        dispatch(addProducts(updatedProducts));
        // console.log(updatedProducts)
        handleClose();
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("file", image);

        const productUrl = process.env.NEXT_PUBLIC_API_URL + 'product/';
        const imgUploadUrl = productUrl + 'upload/';

        const response = await axios.patch(
            productUrl + id,
            userData,
        )

        if (response.data) {
            console.log('The first resp: ', response.data)
            updateDone()
        }

        const imgResp = await axios.post(imgUploadUrl + response.data._id, formData)

        if (imgResp.data) {
            console.log('The second resp: ', imgResp.data)
            updateImgDone(imgResp.data.image)
        }

    }

    const handleDelete = async () => {
        const index = products.findIndex(item => item._id === id)
        const deletedItem = {
            ...products[index]
        }

        const productUrl = process.env.NEXT_PUBLIC_API_URL + 'product/';
        const imgDeleteUrl = process.env.NEXT_PUBLIC_API_URL + 'file/' + deletedItem.image;

        const delResp = await axios.delete(productUrl + id)

        const updatedProducts = [
            ...products.slice(0, index),
            // deletedItem,
            ...products.slice(index + 1),
        ]
        if (delResp.data) {
            dispatch(addProducts(updatedProducts));
            // console.log(updatedProducts)
            handleClose()
        }


    }


    return (
        <div>
            <Card>
                <CardMedia sx={{ height: '9.375rem' }} image={imageUrl} />
                <CardContent sx={{ padding: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
                    <Typography variant='h6' sx={{ marginBottom: 2 }}>{title}</Typography>
                    <Typography sx={{ marginBottom: 2 }}>{price + ' ETB / 1' + unit}</Typography>
                    <Typography sx={{ marginBottom: 2 }}>{quantity + ' ' + unit + ' in stock'}</Typography>
                    <Typography variant='body2'>{description}</Typography>
                </CardContent>
                <Button variant='contained' sx={{
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
                    {icon} &nbsp;  {iconTitle}
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {description}
                        </DialogContentText>
                        <form onSubmit={e => e.preventDefault()}>
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                            Change Products Info (Optional)
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth name="name" label={'Product Name (' + title + ')'} placeholder={title} onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id='form-layouts-separator-select-label'>Product Unit</InputLabel>
                                            <Select
                                                name="unit"
                                                label='Product Unit'
                                                defaultValue={unit}
                                                id='form-layouts-separator-select'
                                                labelId='form-layouts-separator-select-label'
                                                onChange={handleChange}
                                            >
                                                <MenuItem value='Kg'>Kg</MenuItem>
                                                <MenuItem value='Dozen'>Dozen (Derzen)</MenuItem>
                                                <MenuItem value='Quintal'>Quintal (Kuntal)</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth name="price" type="number" label={'Unit Price (' + price + ')'} placeholder={price} onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth name="quantity" type="number" label={'Quantity (' + quantity + ')'} placeholder={quantity} onChange={handleChange} />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth name="itemCode" label={'Item Code (' + itemCode + ')'} placeholder={itemCode} onChange={handleChange} />
                                    </Grid>
                                    <Grid item sy={12} xs={12} sm={6}>
                                        <TextField fullWidth name="description" label={'Description (' + description + ')'} placeholder={description} onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <input type="file" name="file" onChange={handleImage} />
                                        </FormControl>
                                    </Grid>

                                </Grid>

                            </CardContent>

                            <Divider sx={{ margin: 0 }} />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDelete} autoFocus size='large' sx={{
                            mr: 65,
                            color: 'red',
                            alignSelf: 'left'
                        }} variant='outlined'>
                            Delete
                        </Button>
                        <Button onClick={handleSubmit} autoFocus size='large' className='pbeth' type='submit' sx={{
                            mr: 2
                        }} variant='contained'>
                            Update
                        </Button>
                        <Button onClick={handleClose} size='large' color='secondary' className='pbetho' variant='outlined'>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </div>
    );
}

export default AlertDialog;