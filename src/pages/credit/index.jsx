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

// ========================================

const role = Cookie.get('role')

// ========================================

const salesData = [
  {
    stats: '0 ETB',
    title: 'Total Credit Given',
    color: 'primary',
    icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '0 ETB',
    title: 'Total Credit Paid',
    color: 'success',
    icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '0 ETB',
    color: 'warning',
    title: 'Total Credit Unpaid',
    icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '0 ETB',
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
