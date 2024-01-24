// ** MUI Imports
import Grid from '@mui/material/Grid'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Credit from 'src/views/tables/Credit'
import CreditHistory from 'src/views/tables/TableForCreditHistory'
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'

// import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import { getProducts, addProducts } from 'src/redux/productSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { addAuthUsers, getAuthUsers } from 'src/redux/feature/authSlice'
import Err404 from 'src/pages/404'
import Cookie from 'js-cookie'

// ========================================

const role = Cookie.get('role')

const salesData = [
  {
    stats: '0 Orders',
    title: 'Total Delivered Orders',
    color: 'success',
    icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '0 Orders',
    title: 'Total Edited Delivery',
    color: 'info',
    icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '0 Orders',
    color: 'primary',
    title: 'Total Delivery With Comment',
    icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '0 Orders',
    color: 'warning',
    title: 'Total Orders Not Processed',
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

const WareHouse = () => {
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

  // user info from authSlice
  const user = useSelector(getAuthUsers)
  console.log(user)
  console.log('from user', user._id)
  const name = user.name
  const email = user.email

  return role === 'warehouse_manager' ? (
    <section>
      <Typography variant='h6' sx={{ marginBottom: 2 }}>
        <ApexChartWrapper>
          <Grid container spacing={6}>
            <Grid item xs={12} md={12}>
              <StatisticsCard
                TotalAllowedAmount='Total Orders 48.5%'
                emoji='😎 this month'
                mainTitle='Your Delivery Status'
                renderState={renderStats()}

                // names={name}
              />
            </Grid>
            <Grid item xs={12}>
              <CreditHistory />
              {/* <Credit /> */}
            </Grid>
          </Grid>
        </ApexChartWrapper>
      </Typography>
    </section>
  ) : (
    <Err404 />
  )
}

export default WareHouse
