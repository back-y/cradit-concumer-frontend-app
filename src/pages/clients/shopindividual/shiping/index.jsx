// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports

import FormLayout from './formLayout'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const ShippingInformation = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <FormLayout />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default ShippingInformation
