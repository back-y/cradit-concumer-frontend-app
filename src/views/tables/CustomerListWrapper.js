// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Typography from '@mui/material/Typography'
import { useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

// import Typography from '@mui/material/Typography'

import CardContent from '@mui/material/CardContent'

// import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import TableForCustomerList from 'src/views/tables/TableForCustomerList'

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
                    <Tab value='2' label='Individual Customer List' />
                </TabList>
                <CardContent>
                    {/* ============================================================== */}
                    <TabPanel value='1' sx={{ p: 0 }}>
                        <Typography variant='h6' sx={{ marginBottom: 2 }}>
                            <ApexChartWrapper>
                                <Grid container spacing={6}>
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
