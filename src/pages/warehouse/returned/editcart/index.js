import Link from 'next/link'
import ListRequestedCredits from 'src/views/form-layouts/ListRequestedCredits'
import { Button, IconButton, Snackbar, Typography, Box } from '@mui/material'
import { useState } from 'react'
import { getProducts, addProducts } from 'src/redux/productSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { Margin } from 'mdi-material-ui'
import CardMedia from '@mui/material/CardMedia'

import { getItemsInCart, addItemToCart, getOrderInCart, removeItemFromCart } from 'src/redux/editCartSlice'

// ====================spinner==============
import * as React from 'react'

// import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress'
import { green } from '@mui/material/colors'

// import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import CheckIcon from '@mui/icons-material/Check'
import SaveIcon from '@mui/icons-material/Save'
import select from 'src/@core/theme/overrides/select'

// ======================================

const fetchProducts = async (cartItems) => {
  const products = await Promise.all(
    cartItems.map(async (item) => {
      const url = process.env.NEXT_PUBLIC_API_URL + 'product/' + item._id;
      const resp = await axios.get(url);
      const product = resp.data;

      return product;
    })
  );

  return products;
}

const findByIdAndUpdate = (array, id, updatedProperties) => {
  const index = array.findIndex(item => item._id === id);

  if (index !== -1) {
    const updatedObject = { ...array[index], ...updatedProperties };

    const newArray = array.map((item, i) => (i === index ? updatedObject : item));

    return newArray;
  }

  return array;
};

const CartItem = props => {
  const [products, setProducts] = useState([])

  const dispatch = useDispatch();

  // const orderInCart = useSelector(getOrderInCart);
  const itemsInCart = useSelector(getItemsInCart);

  const onDecrease = (e, id, amount, stock) => {
    console.log("On - , id: ", id, " amount: ", amount, " stock: ", stock)

    if (amount > 1) {
      amount = amount - 1;
      const newItems = findByIdAndUpdate(itemsInCart, id, { quantity: amount })
      dispatch(addItemToCart(newItems))
    }
  }

  const onIncrease = (e, id, amount, stock) => {
    console.log("On + , id: ", id, " amount: ", amount, " stock: ", stock)

    if (amount < stock) {
      amount = amount + 1;
      const newItems = findByIdAndUpdate(itemsInCart, id, { quantity: amount })
      dispatch(addItemToCart(newItems))
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProducts(itemsInCart)
      console.log("Products: ", products);
      setProducts(products)
    }
    fetchData();
  }, [props])

  console.log("Items in editCart: ", props.items);

  if (!props.items) {
    return <></>
  }

  return products.map((item, index) => (
    <div key={index} className='row border-top border-bottom'>
      <div className='row main align-items-center'>
        <div className='col-2'>
          <CardMedia sx={{ height: '9.375rem' }} image={process.env.NEXT_PUBLIC_API_URL + 'file/' + item.image} />
        </div>
        <div className='col'>
          <div className='row text-muted'>{item.description}</div>
          <div className='row'>{item.name}</div>
        </div>
        <div className='col'>
          <IconButton
            aria-controls='customized-menu'
            color='inherit'
            aria-haspopup='true'
            value='Remove'
            name='Remove'
            onClick={e => onDecrease(e, itemsInCart[index]._id, itemsInCart[index].quantity, item.quantity)}
          >
            <b> - </b>
          </IconButton>
          <b style={{ margin: '1rem' }}> {itemsInCart[index].quantity} </b>
          <b style={{ margin: '1rem' }}> </b>
          {/* <IconButton
            color='inherit'
            aria-haspopup='true'
            value='Add'
            name={'Add'}
            onClick={e => onIncrease(e, itemsInCart[index]._id, itemsInCart[index].quantity, item.quantity)}
          >
            <b>+</b>
          </IconButton> */}
        </div>
        <div className='col'>
          ETB {item.price} / {item.unit}

        </div>

      </div>
    </div>
  ))
}


// ====================================================================================

const YourCart = () => {
  const [open, setOpen] = useState(true)
  const [products, setProducts] = useState([]);

  // const products = useSelector(getProducts)
  const itemsInCart = useSelector(getItemsInCart)

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProducts(itemsInCart)
      console.log("Products: ", products);
      setProducts(products)
    }
    fetchData();
  }, [])

  const handelClose = () => {
    setOpen(false)
  }

  const handelClick = () => {
    setOpen(true)
  }

  const sumTotal = () => {
    let total = 0
    products.map((item, index) => {
      total += item.price * itemsInCart[index].quantity;
    })

    return total
  }

  const delivery = () => {
    if (sumTotal() > 0) {
      const num = 0.05 * sumTotal()
      num = Math.round(num * 100) / 100

      return num
    } else return 0
  }

  // ===============spinner==============

  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const timer = React.useRef()

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700]
      }
    })
  }

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  const dispatch = useDispatch();

  const onRemoveAll = () => {

    // dispatch(addItemToCart([]))

  }

  const orderInCart = useSelector(getOrderInCart);

  const orderPrep = (attributes) => {
    const order = {
      orderItems: [],
    }

    const orderItems = itemsInCart.map(jsonObject => {
      const selectedJsonObject = {};
      for (const attribute of attributes) {
        if (attribute === "_id") {
          selectedJsonObject[attribute] = jsonObject["id"];
        }
        if (attribute === "quantity") {
          selectedJsonObject[attribute] = jsonObject["amount"];
        }
        if (attribute in jsonObject) {
          selectedJsonObject[attribute] = jsonObject[attribute];
        }
      }

      return selectedJsonObject;
    });

    return orderItems;
  }


  const baseUrl = process.env.NEXT_PUBLIC_API_URL + 'credit/status/'

  const handleCheckout = async () => {

    const orderItems = orderPrep(["_id", "name", "price", "quantity"])
    let sum = 0;
    orderItems.forEach(item => { sum = sum + item.price * item.quantity })

    const updatedOrder = {
      products: orderItems,
      orderId: orderInCart._id,
      editOrderId: Array(10).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join(''),
      userId: orderInCart.userId,
      userName: orderInCart.userName,
      userEmail: orderInCart.userEmail,
      totalPrice: sum,
      creditInfoId: orderInCart.creditInfoId,
    }

    console.log("Order *************** : ", updatedOrder)
    const orderUrl = process.env.NEXT_PUBLIC_API_URL + "credit"

    await axios.post(orderUrl, updatedOrder, { withCredentials: true })
      .then((resp) => {
        console.log('Order response:', resp.data);
        setTimeout(() => onRemoveAll(), 3000);

        const url = baseUrl + resp.data._id

        const body = {
          status: 'PROCESSED'
        }

        axios.patch(url, body,)
          .then(resp => {
            console.log('Request EDITED!')
            setOpenConfirm(false)
          })
          .catch(err => {
            console.log('request err', err)
          })
      })
      .catch((error) => {
        console.log('Order Error:', error);
        setTimeout(() => onRemoveAll(), 3000);
      });

    if (!loading) {
      setSuccess(false)
      setLoading(true)
      timer.current = window.setTimeout(() => {
        setSuccess(true)
        setLoading(false)
      }, 2000)
    }
    setOpen(true)
  }

  // ===============spinner==============

  return (
    <section className='bdy'>
      <div className='card'>
        <div className='row'>
          <div className='col-md-8 cart'>
            <div className='title'>
              <div className='row'>
                <div className='col'>
                  <h4>
                    <b>Edit Shopping Cart</b>
                  </h4>
                </div>
                <div className='col align-self-center text-right text-muted'>{itemsInCart.length} items</div>
              </div>
            </div>

            <CartItem items={itemsInCart} />

          </div>

          {/* ====================================================================== */}

          <div className='col-md-4 summary'>
            <div>
              <h5>
                <b>Summary</b>
              </h5>
            </div>
            <hr />
            <div className='row'>
              <div className='col' style={{ paddingLeft: '0' }}>
                ITEMS {itemsInCart.length}
              </div>
              <div className='col text-right'>ETB {sumTotal()}</div>
            </div>
            <form>
              <p>SHIPPING</p>
              <select>
                <option className='text-muted'>
                  Standard-Delivery- ETB {delivery()} {'(5%)'}
                </option>
              </select>
              {/* <p>GIVE CODE</p> */}
              {/* <input id='code' placeholder='Enter your code' /> */}
            </form>
            <div className='row' style={{ borderTop: '1px solid rgba(0,0,0,.1)', padding: '2vh 0' }}>
              <div className='col'>TOTAL PRICE</div>
              <div className='col text-right'>ETB {sumTotal() + delivery()}</div>
            </div>
            {/* ==============================================spinner============================================== */}

            <div className=' '>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ m: 1, position: 'relative' }}>
                  <Fab aria-label='send' color='primary' sx={buttonSx} onClick={handleCheckout}>
                    {success ? <CheckIcon /> : <SaveIcon />}
                  </Fab>
                  {loading && (
                    <CircularProgress
                      size={68}
                      sx={{
                        color: green[500],
                        position: 'absolute',
                        top: -6,
                        left: -6,
                        zIndex: 1
                      }}
                    />
                  )}
                </Box>
                <Box sx={{ m: 1, position: 'relative' }}>
                  <Button variant='contained' sx={buttonSx} disabled={loading} onClick={handleCheckout}>
                    Edit
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: green[500],
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px'
                      }}
                    />
                  )}
                </Box>
              </Box>
            </div>

            {/* ==============================================spinner============================================== */}

            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handelClose}
              message='request has been send successfully'

            />

          </div>
        </div>
      </div>
    </section>
  )
}

export default YourCart
