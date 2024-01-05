// ** MUI Imports
import Grid from '@mui/material/Grid'
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import CreditTable from 'src/views/dashboard/CreditTable'
import Trophy from 'src/views/dashboard/Trophy'
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

import { useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'

// import Typography from '@mui/material/Typography'

import CardContent from '@mui/material/CardContent'
import AddProducts from 'src/views/form-layouts/AddProducts'
import EditProducts from 'src/views/form-layouts/EditProducts'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import Credit from 'src/views/tables/Credit'

// import StatisticsCard from 'src/views/dashboard/StatisticsCard'

import { getProducts, addProducts } from 'src/redux/productSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { addAuthUsers, getAuthUsers } from 'src/redux/feature/authSlice'

// import guardLayout from 'src/layouts/guardLayout'
import ProtectedRoute from '../pages/login/Require'

import Err404 from 'src/pages/404'

import Cookie from 'js-cookie'

// ========================================

const role = Cookie.get('role')

const salesData = [
  {
    stats: '245k',
    title: 'Total Deliveries',
    color: 'success',
    icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '12.5k',
    title: 'Total Returned',
    color: 'warning',
    icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '1.54k',
    color: 'warning',
    title: 'Total Credit Unpaid',
    icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '$88k',
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

  return role === "warehouse_manager" ?  (
      <section>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          <ApexChartWrapper>
            <Grid container spacing={6}>
              <Grid item xs={12} md={12}>
                <StatisticsCard
                  TotalAllowedAmount='Total Orders 48.5%'
                  emoji='😎 this month'
                  mainTitle='Your Delivered and Returned Status'
                  renderState={renderStats()}
                  names={name}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Grid container spacing={6}>
                  <Grid item xs={6} lg={3}>
                    <CardStatisticsVerticalComponent
                      stats='$25.6k'
                      icon={<Poll />}
                      color='success'
                      trendNumber='+42%'
                      title='Currently Requested Credit  '
                      subtitle='Weekly Profit'
                    />
                  </Grid>
                  <Grid item xs={6} lg={3}>
                    <CardStatisticsVerticalComponent
                      stats='$78'
                      title='Recent Unpaid Credit'
                      trend='negative'
                      color='secondary'
                      trendNumber='-15%'
                      subtitle='Past Month'
                      icon={<CurrencyUsd />}
                    />
                  </Grid>
                  <Grid item xs={6} lg={3}>
                    <CardStatisticsVerticalComponent
                      stats='862'
                      trend='negative'
                      trendNumber='-18%'
                      title='Pending Credit'
                      subtitle='Yearly Project'
                      icon={<BriefcaseVariantOutline />}
                    />
                  </Grid>
                  <Grid item xs={6} lg={3}>
                    <CardStatisticsVerticalComponent
                      stats='15'
                      color='warning'
                      trend='negative'
                      trendNumber='-18%'
                      subtitle='Last Week'
                      title='Returned Request'
                      icon={<HelpCircleOutline />}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <CreditTable />
              </Grid>
            </Grid>
          </ApexChartWrapper>
        </Typography>
      </section>
  ): (<Err404 />)
}

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// WareHouse.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default WareHouse
