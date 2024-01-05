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
import TableForCustomerList from 'src/views/tables/TableForCustomerList'
import TableForRequestedCrdits from 'src/views/tables/TableForReqestedCredit'
import Credit from 'src/views/tables/Credit'

// ========================================

const salesData = [
    {
        stats: '245k',
        title: 'Total Credit Given',
        color: 'primary',
        icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
    },
    {
        stats: '12.5k',
        title: 'Total Credit Paid',
        color: 'success',
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

const credit = ({ subTitle, mainTitle, subTitle2, mainTitle2 }) => {
    const [value, setValue] = useState('1')

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <section>
            <TabContext value={value}>
                <TabList onChange={handleChange} aria-label='card navigation example'>
                    <Tab value='1' label='Corporate Customer List' />
                    <Tab value='2' label='Indivisual Customer List' />
                </TabList>
                <CardContent>
                    {/* ============================================================== */}
                    <TabPanel value='1' sx={{ p: 0 }}>
                        <Typography variant='h6' sx={{ marginBottom: 2 }}>
                            <ApexChartWrapper>
                                <Grid container spacing={6}>
                                    <Grid item xs={12} md={12}>
                                        <StatisticsCard
                                            TotalAllowedAmount={subTitle}
                                            mainTitle={mainTitle}
                                            renderState={renderStats()}
                                        />
                                    </Grid>
                                    {/* ==================================================== */}
                                    <Grid item xs={12}>
                                        <TableForCustomerList />
                                    </Grid>
                                </Grid>
                            </ApexChartWrapper>
                        </Typography>
                    </TabPanel>

                    {/* ============================================================== */}
                    <TabPanel value='2' sx={{ p: 0 }}>
                        <ApexChartWrapper>
                            <Grid item xs={12} md={12}>
                                <StatisticsCard
                                    TotalAllowedAmount={subTitle2}
                                    mainTitle={mainTitle2}
                                    renderState={renderStats()}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TableForCustomerList />
                            </Grid>
                        </ApexChartWrapper>
                    </TabPanel>
                </CardContent>
            </TabContext>
        </section>
    )
}

export default credit
