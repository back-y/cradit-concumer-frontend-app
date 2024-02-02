// ** MUI Imports
import Grid from '@mui/material/Grid'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'

// import Typography from '@mui/material/Typography'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'

// import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import TableForCreditHistory from 'src/views/tables/TableForCreditHistory'

// import Credit from 'src/views/tables/Credit'

import { addAuthUsers, getAuthUsers } from 'src/redux/feature/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import BarsGraph from './BarsGraph'
import Err404 from 'src/pages/404'

import Cookie from 'js-cookie'
import axios from 'axios'

// ========================================

const role = Cookie.get('role')

const renderStats = () => {
  const [salesData, setSalesData] = useState([])

  useEffect(() => {
    const getter = async () => {
      const url = process.env.NEXT_PUBLIC_API_URL + 'credit/totalCreditInfo'
      const resp = await axios.get(url)
      setSalesData(resp.data)
      console.log('resp ,data', resp.data)
    }
    getter()
  }, [])

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
          <Typography variant='h6'>{item.stats.toLocaleString()}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

// ========================================

const Credit = () => {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const products = useSelector(getAuthUsers)

  console.log(products)
  console.log('from user', products._id)

  const name = products.name
  const email = products.email

  const dispatch = useDispatch()

  return role === 'credit_manager' ? (
    <section>
      <Typography variant='h6' sx={{ marginBottom: 2 }}>
        <ApexChartWrapper>
          <Grid container spacing={6}>
            <Grid item xs={12} md={12}>
              <StatisticsCard
                TotalAllowedAmount='Total credit allowed 0 ETB'
                emoji='😎 this month'
                mainTitle='Your Corporate and Individuals Credit Status'
                renderState={renderStats()}
                names={name}
              />
            </Grid>

            {/* ==================================================== */}

            <Grid item xs={12} md={12}>
              <BarsGraph />
            </Grid>
            <Grid item xs={12}>
              <TableForCreditHistory />
            </Grid>
          </Grid>
        </ApexChartWrapper>
      </Typography>
    </section>
  ) : (
    <Err404 />
  )
}

// credit.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Credit
