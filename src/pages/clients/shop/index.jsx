// ** MUI Imports
'use client'
import Grid from '@mui/material/Grid'
import Link from 'next/link'
import Cart from 'mdi-material-ui/Cart'

// ** Custom Components Imports
import CardAppleWatch from '../../../views/cards/CardAppleWatch'
import CardNavigation from '../../../views/cards/CardNavigation'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import YourCart from '../../../@core/components/yourCart/YourCart'

// import Invoice from '../../../@core/components/invoice/Invoice'

// ** Icons Imports

import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import TrendingUp from 'mdi-material-ui/TrendingUp'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'

import { getProducts, addProducts } from 'src/redux/productSlice'
import { getItemsInCart } from 'src/redux/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Err404 from 'src/pages/404'

import Cookie from 'js-cookie'

// ========================================

const role = Cookie.get('role')
const jwt = Cookie.get('jwt')

// ========================================

const Products = props => {
  if (!props.products) {
    return <></>
  } else {
    return props.products.map((item, index) => (
      <Grid item xs={6} lg={3} key={index}>
        <CardAppleWatch
          pic={process.env.NEXT_PUBLIC_API_URL + 'file/' + item.image}
          stats='$25.6k'
          icon={<Cart />}
          color='success'
          price={item.price}
          stockAmount={item.quantity}
          title={item.name}
          id={item._id}
          description={item.description}
          stock={item.quantity}
          unit={item.unit}
        />
      </Grid>
    ))
  }
}

const Shop = () => {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const dispatch = useDispatch()

  const getProduct = async () => {
    const productUrl = process.env.NEXT_PUBLIC_API_URL + 'product'
    const { data } = await axios.get(productUrl)
    dispatch(addProducts(data))
  }

  useEffect(() => {
    getProduct()
  }, [])

  const products = useSelector(getProducts)
  const itemsInCart = useSelector(getItemsInCart)

  return role === 'customer' ? (
    <section>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='card navigation example'>
          <Tab value='1' label='Your Shop' />
          <Tab value='2' label={itemsInCart.length + ' item(s) in cart'} icon={<Cart />} />
        </TabList>
        <CardContent>
          <TabPanel value='1' sx={{ p: 0 }}>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Your Shop
            </Typography>
            <ApexChartWrapper>
              <Grid container spacing={6}>
                <Grid item xs={12} md={12} lg={12}>
                  <Grid container spacing={6}>
                    <Products products={products} />
                  </Grid>
                </Grid>
              </Grid>
            </ApexChartWrapper>
          </TabPanel>

          {/* ================================================================ */}

          <TabPanel value='2' sx={{ p: 0 }}>
            <Typography variant='body2' sx={{ marginBottom: 4 }}>
              Here are your selected Items
            </Typography>
            <YourCart />
          </TabPanel>
        </CardContent>
      </TabContext>
    </section>
  ) : (
    <Err404 />
  )
}

// shop.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Shop
