// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// const salesData = [
//   {
//     stats: '245k',
//     title: 'Total Credit Allowed',
//     color: 'primary',
//     icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
//   },
//   {
//     stats: '12.5k',
//     title: 'Total Credit Used',
//     color: 'success',
//     icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
//   },
//   {
//     stats: '1.54k',
//     color: 'warning',
//     title: 'Total Credit Unpaid',
//     icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
//   },
//   {
//     stats: '$88k',
//     color: 'info',
//     title: 'Total Unpaid Credit With Interest',
//     icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
//   }
// ]

// const renderStats = () => {
//   return salesData.map((item, index) => (
//     <Grid item xs={12} sm={3} key={index}>
//       <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
//         <Avatar
//           variant='rounded'
//           sx={{
//             mr: 3,
//             width: 44,
//             height: 44,
//             boxShadow: 3,
//             color: 'common.white',
//             backgroundColor: `${item.color}.main`
//           }}
//         >
//           {item.icon}
//         </Avatar>
//         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//           <Typography variant='caption'>{item.title}</Typography>
//           <Typography variant='h6'>{item.stats}</Typography>
//         </Box>
//       </Box>
//     </Grid>
//   ))
// }

const StatisticsCard = ({ names, mainTitle, TotalAllowedAmount, emoji, renderState }) => {
  return (
    <Card>
      < Typography container spacing={[5, 0]} variant='h6' sx={{ mb: 1.5, lineHeight: '2rem !important', letterSpacing: '0.15px !important' }}>
        {names}
      </Typography>
      <CardHeader
        title={mainTitle}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              {TotalAllowedAmount}
            </Box>{' '}
            {emoji}
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderState}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
