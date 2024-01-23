// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import Credit from 'src/views/tables/Credit'
import Err404 from 'src/pages/404'

import Cookie from 'js-cookie'

const role = Cookie.get('role')

const Credits = () => {
  return role === 'credit_manager' ? (
    <div>
      <Typography variant='h6' sx={{ marginBottom: 2 }}>
        Crdits
      </Typography>
      <Grid item xs={12}>
        <Credit />
      </Grid>
    </div>
  ) : (
    <Err404 />
  )
}

export default Credits
