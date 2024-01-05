// ** MUI Imports
'use client'
import React from 'react'
import Grid from '@mui/material/Grid'

// import Link from 'next/link'
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// import CardAppleWatch from 'src/views/cards/CardAppleWatch'
import CardNavigation from 'src/views/cards/CardNavigation'

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

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
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
import AlertDialog from '../cards/AlertDialog';

// ========================================

const salesData = [
    {
        stats: '245k',
        title: 'Products Sold',
        color: 'primary',
        icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
    },
    {
        stats: '12.5k',
        title: 'Products In Stock',
        color: 'success',
        icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
    },
    {
        stats: '54k',
        color: 'warning',
        title: 'Products Returned',
        icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
    },
    {
        stats: '8',
        color: 'info',
        title: 'Products out of Stock',
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


export const Products = (props) => {
    if (!props.products) {
        return <></>
    }
    else {
        return props.products.map((item, index) => (
            <Grid item xs={6} lg={3} key={index}>
                <AlertDialog
                    id={item._id}
                    icon={<Edit />}
                    icon2={<Delete />}
                    color='success'
                    price={item.price}
                    unit={item.unit}
                    title={item.name}
                    description={item.description}
                    iconTitle=' Update Product'
                    iconTitle2=' Delete '
                    quantity={item.quantity}
                    itemCode={item.itemCode}
                    imageUrl={process.env.NEXT_PUBLIC_API_URL + 'file/' + item.image}
                />
            </Grid>
        ))
    }

}


const EditProducts = (props) => {
    return (
        <div>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
            </Typography>
            <ApexChartWrapper>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={12}>
                        <StatisticsCard
                            TotalAllowedAmount='Total Products In Stock 48.5%'
                            emoji='😎 this month'
                            mainTitle='Your Products Status'
                            renderState={renderStats()}
                        />
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                        <Grid container spacing={6}>
                            <Products products={props.products} />
                        </Grid>
                    </Grid>
                </Grid>
            </ApexChartWrapper>
        </div>
    )
}

export default EditProducts