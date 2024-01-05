// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from 'next/link'
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
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'

import TrendingUp from 'mdi-material-ui/TrendingUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

import { useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'

// import Typography from '@mui/material/Typography'

import CardContent from '@mui/material/CardContent'
import AddProducts from 'src/views/form-layouts/AddProducts'
import EditProducts from 'src/views/form-layouts/EditProducts'
import TableForCustomerList from 'src/views/tables/TableForCustomerList'

// import StatisticsCard from 'src/views/dashboard/StatisticsCard'

// ========================================

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

  return (
    <section>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='card navigation example'>
          <Tab value='1' label='Overview' />
          <Tab value='2' label='Client list' />
        </TabList>
        <CardContent>
          <TabPanel value='1' sx={{ p: 0 }}>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              <ApexChartWrapper>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={12}>
                    <StatisticsCard
                      TotalAllowedAmount='Recent Reviews'
                      emoji='😎 this month'
                      mainTitle='Your General Review'
                      renderState={renderStats()}
                    />
                  </Grid>
                  {/* <Grid item xs={12} md={12} lg={12}>
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
                  */}
                  <Grid item xs={12}>
                    <Typography variant='h6' sx={{ marginBottom: 2 }}>
                      Recent Clients List
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <CreditTable />
                  </Grid>
                </Grid>
              </ApexChartWrapper>
            </Typography>
          </TabPanel>

          {/* =================================== */}

          <TabPanel value='2' sx={{ p: 0 }}>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Clients List
            </Typography>
            <Grid item xs={12}>
              <TableForCustomerList />
            </Grid>
          </TabPanel>
        </CardContent>
      </TabContext>
    </section>
  )
}

export default WareHouse
