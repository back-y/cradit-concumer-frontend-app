import React from 'react'
import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Table from 'src/views/dashboard/Table'

//
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
import StatisticsCard from 'src/views/dashboard/StatisticsCard'

// ============================

import TrendingUp from 'mdi-material-ui/TrendingUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import TableForCreditHistory from 'src/views/tables/TableForCreditHistory'
import Credits from 'src/views/tables/Credit'
import Err404 from 'src/pages/404'

import Cookie from 'js-cookie'

// ========================================

const role = Cookie.get('role')
const jwt = Cookie.get('jwt')

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

const History = () => {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return role === 'customer' ? (
    <section>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='card navigation example'>
          <Tab value='1' label='Your Order list' />
          <Tab value='2' label='Your Credit list' />
        </TabList>
        <CardContent>
          <TabPanel value='1' sx={{ p: 0 }}>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              <ApexChartWrapper>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={12}>
                    <StatisticsCard
                      TotalAllowedAmount='Total credit allowed 0 ETB'
                      emoji='😎 this month'
                      mainTitle='Your Credit History'
                      renderState={renderStats()}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='h6' sx={{ marginBottom: 2 }}>
                      Credit List{' '}
                    </Typography>
                    <Credits />
                  </Grid>
                </Grid>
              </ApexChartWrapper>
            </Typography>
          </TabPanel>
          <TabPanel value='2' sx={{ p: 0 }}>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Credit History
            </Typography>
            <TableForCreditHistory />

            {/* <Grid item xs={12}>
              <TableForCreditHistory />
            </Grid> */}
          </TabPanel>
        </CardContent>
      </TabContext>
    </section>
  ) : (
    <Err404 />
  )
}

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// history.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default History
