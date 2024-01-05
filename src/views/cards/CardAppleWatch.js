// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import React, { useState } from 'react'

import { getItemsInCart, addItemToCart, removeItemFromCart } from 'src/redux/cartSlice';
import { getCartStatus, setAdded } from 'src/redux/productSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { SetMealRounded } from '@mui/icons-material'


const CardAppleWatch = ({ id, title, price, description, icon, stock, unit, pic }) => {
  const dispatch = useDispatch();
  const prevData = useSelector(getItemsInCart)

  const newDataToAdd = [
    ...prevData,
    {
      id,
      name: title,
      price,
      unit,
      amount: 1,
      stock,
      description,
      imageUrl: pic,
    }
  ]

  const filterFunction = (jsonDataObject) => jsonDataObject.id != id;

  const newDataToRemove = prevData.filter(filterFunction);

  const isInCart = prevData.some(cartItem => cartItem.id === id);

  const addToCart = (e) => {

    if (!isInCart)
      dispatch(addItemToCart(newDataToAdd))
    else
      dispatch(removeItemFromCart(newDataToRemove))
  }
  const iconTitle = isInCart ? 'Remove from Cart' : 'Add to Cart';
  const buttonBackgroundColor = isInCart ? 'red' : '#d7a022';

  return (
    <Card>
      <CardMedia sx={{
        height: '9.375rem', '&:hover': {
          boxShadow: '0 1px 20px 1px black',
          backgroundColor: '#d7a022',

          //  height: '25.375rem',
        }
      }} image={pic} />
      <CardContent sx={{ padding: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          {title}
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>{price} birr</Typography>
        <Typography sx={{ marginBottom: 2 }}>{stock} available in stock</Typography>
        <Typography variant='body2'>
          {description}
        </Typography>
      </CardContent>
      <Button variant='contained'
        name='ATC Button'
        onClick={addToCart}
        style={{ backgroundColor: buttonBackgroundColor }}
        sx={{
          py: 2.5, width: '100%',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          backgroundColor: '#d7a022',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 1px 20px 1px black',
            backgroundColor: '#d7a022'
          }
        }}>
        {icon} &nbsp;&nbsp; {iconTitle}
      </Button>
    </Card>
  )
}

export default CardAppleWatch
