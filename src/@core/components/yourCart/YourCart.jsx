import Link from 'next/link'
import { Button, IconButton, Snackbar, Typography, Box } from '@mui/material'
import { useState } from 'react'
import { getProducts, addProducts } from 'src/redux/productSlice'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Margin } from 'mdi-material-ui'
import CardMedia from '@mui/material/CardMedia'

// import React, { useState } from 'react';
import { FormControl, Radio, RadioGroup, FormControlLabel, ListItemIcon, ListItemText } from '@mui/material'
import CreditCardIcon from '@mui/icons-material/CreditCard'

// import PayPalIcon from '@mui/icons-material'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import PaymentIcon from '@mui/icons-material/Payment'

import { getItemsInCart, addItemToCart, removeItemFromCart } from 'src/redux/cartSlice'

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
import { route } from 'next/dist/server/router'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

// ======================================

const CartItem = props => {
  const dispatch = useDispatch()
  const itemsInCart = useSelector(getItemsInCart)
  if (!props.items) {
    return <></>
  } else {
    const onRemove = id => {
      const filterFunction = jsonDataObject => jsonDataObject.id != id
      const itemsAfterRemove = itemsInCart.filter(filterFunction)
      console.log(itemsAfterRemove)
      dispatch(addItemToCart(itemsAfterRemove))
    }

    const onDecrease = (e, id, amount) => {
      const index = itemsInCart.findIndex(item => item.id === id)
      const itemToUpdate = itemsInCart[index]
      if (amount > 1) amount = amount - 1

      const updatedItem = {
        ...itemToUpdate,
        amount
      }
      const newItems = [...itemsInCart.slice(0, index), updatedItem, ...itemsInCart.slice(index + 1)]
      dispatch(addItemToCart(newItems))

      // console.log("On Decrease ", id, amount, index, itemToUpdate, updatedItem, newItems)
    }

    const onIncrease = (e, id, amount, stock) => {
      const index = props.items.findIndex(item => item.id === id)
      const itemToUpdate = props.items[index]
      if (amount < stock) amount = amount + 1

      const updatedItem = {
        ...itemToUpdate,
        amount
      }
      const newItems = [...props.items.slice(0, index), updatedItem, ...props.items.slice(index + 1)]
      dispatch(addItemToCart(newItems))

      // console.log("On Decrease ", id, amount, index, itemToUpdate, updatedItem, newItems, 'stock=', stock)
    }

    // useEffect(() => {}, [props.items])

    return props.items.map((item, index) => (
      <div key={index} className='row border-top border-bottom'>
        <div className='row main align-items-center'>
          <div className='col-2'>
            <CardMedia sx={{ height: '9.375rem' }} image={item.imageUrl} />
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
              onClick={e => onDecrease(e, item.id, item.amount)}
            >
              <b> - </b>
            </IconButton>
            <b style={{ margin: '1rem' }}> {item.amount} </b>
            <b style={{ margin: '1rem' }}> </b>
            <IconButton
              color='inherit'
              aria-haspopup='true'
              value='Add'
              name={'Add'}
              onClick={e => onIncrease(e, item.id, item.amount, item.stock)}
            >
              <b>+</b>
            </IconButton>
          </div>
          <div className='col'>
            ETB {item.price * item.amount} / {item.unit}
            <IconButton className='close' onClick={() => onRemove(item.id)}>
              &#10005;
            </IconButton>
          </div>
        </div>
      </div>
    ))
  }
}

// ====================================================================================

const YourCart = () => {
  const [open, setOpen] = useState(true)

  // ===============

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')

  const handlePaymentMethodChange = event => {
    setSelectedPaymentMethod(event.target.value)
  }

  // ===============

  const handelClose = () => {
    setOpen(false)
  }

  const handelClick = () => {
    setOpen(true)
  }

  // const products = useSelector(getProducts)
  const itemsInCart = useSelector(getItemsInCart)

  const sumTotal = () => {
    let total = 0
    itemsInCart.map(item => {
      total += item.price * item.amount
    })

    return total
  }

  const delivery = () => {
    if (sumTotal() > 0) {
      let num = 0.05 * sumTotal()
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

  const orderPrep = attributes => {
    const order = {
      orderItems: [],
      editOrderId: Array(10)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('')
    }

    const orderItems = itemsInCart.map(jsonObject => {
      const selectedJsonObject = {}
      for (const attribute of attributes) {
        if (attribute === '_id') {
          selectedJsonObject[attribute] = jsonObject['id']
        }
        if (attribute === 'quantity') {
          selectedJsonObject[attribute] = jsonObject['amount']
        }
        if (attribute in jsonObject) {
          selectedJsonObject[attribute] = jsonObject[attribute]
        }
      }

      return selectedJsonObject
    })
    order.orderItems = orderItems

    return order
  }

  const onRemoveAll = () => {
    // const filterFunction = (jsonDataObject) => jsonDataObject.id != id;
    // const itemsAfterRemove = itemsInCart.filter(filterFunction);
    // console.log(itemsAfterRemove)
    dispatch(addItemToCart([]))
  }

  const dispatch = useDispatch()

  const router = useRouter()

  const handleCheckout = async () => {
    console.log('Selected Payment Method:', selectedPaymentMethod)

    // console.log("Items in Cart: ", itemsInCart)
    const order = orderPrep(['_id', 'itemCode', 'name', 'price', 'quantity'])
    console.log('Order: ', order)
    const customerType = Cookies.get('customerType')
    const jwt = Cookies.get('jwt')

    if (customerType === 'corporate') {
      console.log(order)
      const orderUrl = process.env.NEXT_PUBLIC_API_URL + 'order'

      await axios
        .post(orderUrl, order, { withCredentials: true })
        .then(response => {
          console.log('Response', response)
          console.log('Order response:', response.data)

          setTimeout(() => onRemoveAll(), 3000)

          if (!jwt) {
            route.push('/clients/shopindividual')
          } else if (response.data.status === 'success' && jwt) {
            route.push('/clients/shop')
          }
        })
        .catch(error => {
          console.log('Order Error:', error)
          setTimeout(() => onRemoveAll(), 3000)
        })
    } else {
      const orderUrl = process.env.NEXT_PUBLIC_API_URL + 'individual/order'

      const individualOrder = {
        orderItems: order.orderItems
      }
      await axios
        .post(orderUrl, individualOrder)
        .then(response => {
          console.log('Order response:', response.data)
          const respUrl = response.data.response_url

          // if (response.data.message === 'Data received successfully!'){
          // router.push('/clients/shopindividual/pending')
          router.push(respUrl)

          // }

          setTimeout(() => onRemoveAll(), 3000)

          // if (!jwt) {
          //   route.push('/clients/shopindividual')
          // } else if (response.data.status === "success" && jwt) {
          //   route.push('/clients/shop')
          // }
        })
        .catch(error => {
          console.log('Order Error:', error)
          setTimeout(() => onRemoveAll(), 3000)
        })
    }

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

  const bannerStyle = {
    display: 'flex'
  }

  const banStyle = {
    borderRadius: '50%',
    margin: '10px'
  }

  return itemsInCart.length > 0 ? (
    <section className='bdy'>
      <div className='card'>
        <div className='row'>
          <div className='col-md-8 cart'>
            <div className='title'>
              <div className='row'>
                <div className='col'>
                  <h4>
                    <Typography variant='body2' sx={{ marginBottom: 4 }}>
                      Here are your selected Item(s)
                    </Typography>
                  </h4>
                </div>
                <div className='col align-self-center text-right text-muted'>{itemsInCart.length} items</div>
              </div>
            </div>

            <CartItem items={itemsInCart} />

            {/* <div className='back-to-shop'>
              <Link href='/clients/shop'> &leftarrow; </Link> <span className='text-muted'>Back to shop</span>
            </div> */}
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

            {/* ==============================================spinner============================================== */}

            <div className=' '>
              <FormControl component='fieldset'>
                <RadioGroup
                  aria-label='payment-method'
                  name='payment-method'
                  value={selectedPaymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <div style={bannerStyle}>
                    <span>
                      <img style={banStyle} src='/images/PBETH/svgicons/paypal.jpg' alt='KCCM' />
                    </span>
                    <FormControlLabel value='KCCM' control={<Radio />} label='Use KCCM' />
                  </div>
                  <div style={bannerStyle}>
                    <span>
                      <img style={banStyle} src='/images/PBETH/svgicons/e-bidr.png' alt='e-Bidr' />
                    </span>
                    <FormControlLabel value='eBidr' control={<Radio />} label='Use eBidr' />
                  </div>
                  <div style={bannerStyle}>
                    <span>
                      <img style={banStyle} src='/images/PBETH/svgicons/master.gif' alt='Master Card' />
                    </span>
                    <FormControlLabel value='credit_card' control={<Radio />} icon={<CreditCardIcon />} />
                  </div>
                  <div style={bannerStyle}>
                    <span>
                      <img style={banStyle} src='/images/PBETH/svgicons/paypal.jpg' alt='PayPal' />
                    </span>
                    <FormControlLabel value='paypal' control={<Radio />} label={<ListItemText primary='PayPal' />} />
                  </div>
                  <div style={bannerStyle}>
                    <span>
                      <img style={banStyle} src='/images/PBETH/svgicons/bank.png' alt='Bank Transfer' />
                    </span>
                    <FormControlLabel
                      value='bank_transfer'
                      control={<Radio />}
                      label={<ListItemText primary='Bank Transfer' />}
                      icon={<AccountBalanceIcon />}
                    />
                  </div>
                  <div style={bannerStyle}>
                    <span>
                      <img style={banStyle} src='/images/PBETH/svgicons/telebirr.png' alt='Tele Birr' />
                    </span>
                    <FormControlLabel
                      value='telebirr'
                      control={<Radio />}
                      label={<ListItemText primary='Tele Birr' />}
                      icon={<PaymentIcon />} // Use the Payment icon for Stripe
                    />
                  </div>
                </RadioGroup>
              </FormControl>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ m: 1, position: 'relative' }}>
                  <Fab
                    aria-label='send'
                    color='primary'
                    sx={buttonSx}
                    onClick={handleCheckout}
                    disabled={!selectedPaymentMethod}
                  >
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
                  <Button
                    variant='contained'
                    sx={buttonSx}
                    disabled={!selectedPaymentMethod || loading}
                    onClick={handleCheckout}
                  >
                    CHECKOUT
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

              // action={action}
            />
            {/* <ListRequestedCredits iconTitle=' CHECKOUT' /> */}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <>
      <h2>Your cart is empty please select an Item</h2>
    </>
  )
}

export default YourCart
