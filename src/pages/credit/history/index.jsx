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
import AddCustomer from 'src/views/form-layouts/AddCustomer'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import CustomerTable from 'src/views/dashboard/CustomersTable'

// import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import TableForCreditHistory from 'src/views/tables/TableForCreditHistory'
import CustomerListWrapper from 'src/views/tables/CustomerListWrapper'
import TableForRequestedCrdits from 'src/views/tables/TableForReqestedCredit'
import Credit from 'src/views/tables/Credit'

import { addAuthUsers, getAuthUsers } from 'src/redux/feature/authSlice'
import { useSelector, useDispatch } from 'react-redux'

import Err404 from 'src/pages/404'

import Cookies from 'js-cookie'


const History = () => {
  const role = Cookies.get('role')
  return role === "credit_manager" ?  (
    <div>
      <Typography variant='h6' sx={{ marginBottom: 2 }}>
        Crdit History
      </Typography>
      <Grid item xs={12}>
        <TableForCreditHistory />
      </Grid>
    </div>
  ): (<Err404 />)
}

export default History
