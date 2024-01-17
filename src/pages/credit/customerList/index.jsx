// ** MUI Imports
import Grid from '@mui/material/Grid'

// import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import CustomerListWrapper from 'src/views/tables/CustomerListWrapper'
import Err404 from 'src/pages/404'
import Typography from '@mui/material/Typography'
import Cookie from 'js-cookie'

// ========================================

const role = Cookie.get('role')

const CustomerList = () => {
  return role === 'credit_manager' ? (
    <div>
      <Typography variant='h6' sx={{ marginBottom: 2 }}>
        Customers List
      </Typography>
      <Grid item xs={12}>
        <CustomerListWrapper
          subTitle='Corporate credit Info'
          mainTitle='Corporate clients credit info'
          mainTitle2='Individual credit info'
          subTitle2='Individual info'
        />
      </Grid>
    </div>
  ) : (
    <Err404 />
  )
}

export default CustomerList
