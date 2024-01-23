import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import StatisticsCard from 'src/views/dashboard/StatisticsCard'

import TrendingUp from 'mdi-material-ui/TrendingUp'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Credits from 'src/views/tables/Credit'

import { addAuthUsers, getAuthUsers } from 'src/redux/feature/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import Err404 from 'src/pages/404'

import BarsGraph from 'src/pages/credit/BarsGraph'

import Cookie from 'js-cookie'

import axios from 'axios'

// ========================================

const role = Cookie.get('role')
const jwt = Cookie.get('jwt')
const id = Cookie.get('id')
console.log('first', id)

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

const Clients = () => {
  const products = useSelector(getAuthUsers)

  const [userInfo, setUsetInfo] = useState([])

  useEffect(async () => {
    const url = process.env.NEXT_PUBLIC_API_URL + 'customer/' + id

    const resp = await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      .then(resp => {
        const ID_name = resp.data.documents.ID
        const userInfo = resp.data
        setUserInfo(userInfo)
        console.log(userInfo)
      })
      .catch(err => {
        console.log(err)
      })
  }, [jwt])
  console.log(products)
  console.log('from user', products._id)

  const name = products.name
  const email = products.email

  return role === 'customer' ? (
    <section>
      <ApexChartWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12} md={12}>
            <StatisticsCard
              mainTitle='Your Credit Status'
              TotalAllowedAmount='Total credit allowed 0 ETB'
              emoji='😎 this month'
              renderState={renderStats()}
              names={name}
            />
          </Grid>
          <Grid item xs={12}>
            <BarsGraph />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Credit List{' '}
            </Typography>
            <Credits />
          </Grid>
        </Grid>
      </ApexChartWrapper>
    </section>
  ) : (
    <Err404 />
  )
}

export default Clients

// import React, { useEffect, useState } from 'react'
// import Grid from '@mui/material/Grid'
// import Typography from '@mui/material/Typography'
// import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
// import StatisticsCard from 'src/views/dashboard/StatisticsCard'
// import TrendingUp from 'mdi-material-ui/TrendingUp'
// import CellphoneLink from 'mdi-material-ui/CellphoneLink'
// import AccountOutline from 'mdi-material-ui/AccountOutline'
// import Box from '@mui/material/Box'
// import Avatar from '@mui/material/Avatar'
// import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
// import Cookies from 'js-cookie'
// import Err404 from 'src/pages/404'
// import axios from 'axios'

// const Clients = () => {
//   const [salesData, setSalesData] = useState([
//     {
//       stats: '0 ETB',
//       title: 'Total Credit Given',
//       color: 'primary',
//       icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
//     },
//     {
//       stats: '0 ETB',
//       title: 'Total Credit Paid',
//       color: 'success',
//       icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
//     },
//     {
//       stats: '0 ETB',
//       color: 'warning',
//       title: 'Total Credit Unpaid',
//       icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
//     },
//     {
//       stats: '0 ETB',
//       color: 'info',
//       title: 'Total Unpaid Credit With Interest',
//       icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
//     }
//   ])

//   const role = Cookies.get('role')
//   const jwt = Cookies.get('jwt')
//   const id = Cookies.get('id')
//   console.log('first', id)

//   useEffect(() => {
//     const fetchSalesData = async () => {
//       try {
//         const url = process.env.NEXT_PUBLIC_API_URL + 'customer/'

//         // Replace 'your_api_endpoint' with the actual endpoint for fetching salesData
//         const response = await axios.get(url + id, {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${jwt}`
//           }
//         })

//         console.log('responce', response)

//         const data = response.data // Assuming the API returns an array similar to salesData structure
//         setSalesData(data)
//       } catch (error) {
//         console.error('Error fetching salesData:', error)
//       }
//     }

//     fetchSalesData()
//   }, [jwt])

//   const renderStats = () => {
//     return salesData.map((item, index) => (
//       <Grid item xs={12} sm={3} key={index}>
//         <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
//           <Avatar
//             variant='rounded'
//             sx={{
//               mr: 3,
//               width: 44,
//               height: 44,
//               boxShadow: 3,
//               color: 'common.white',
//               backgroundColor: `${item.color}.main`
//             }}
//           >
//             {item.icon}
//           </Avatar>
//           <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//             <Typography variant='caption'>{item.title}</Typography>
//             <Typography variant='h6'>{item.stats}</Typography>
//           </Box>
//         </Box>
//       </Grid>
//     ))
//   }

//   return role === 'customer' ? (
//     <section>
//       <ApexChartWrapper>
//         <Grid container spacing={6}>
//           <Grid item xs={12} md={12}>
//             <StatisticsCard
//               mainTitle='Your Credit Status'
//               TotalAllowedAmount='Total credit allowed 0 ETB'
//               emoji='😎 this month'
//               renderState={renderStats()}
//               names={name}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <BarsGraph />
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant='h6' sx={{ marginBottom: 2 }}>
//               Credit List{' '}
//             </Typography>
//             <Credits />
//           </Grid>
//         </Grid>
//       </ApexChartWrapper>
//     </section>
//   ) : (
//     <Err404 />
//   )
// }

// export default Clients
