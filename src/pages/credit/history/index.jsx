// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import Typography from '@mui/material/Typography'

// import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import TableForCreditHistory from 'src/views/tables/TableForCreditHistory'
import Err404 from 'src/pages/404'
import Cookies from 'js-cookie'

const History = () => {
  const role = Cookies.get('role')

  return role === 'credit_manager' ? (
    <div>
      <Typography variant='h6' sx={{ marginBottom: 2 }}>
        Credit History
      </Typography>
      <Grid item xs={12}>
        <TableForCreditHistory />
      </Grid>
    </div>
  ) : (
    <Err404 />
  )
}

export default History
