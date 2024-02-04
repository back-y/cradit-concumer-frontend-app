import React, { useState } from 'react';
import { FormControl, Radio, RadioGroup, FormControlLabel, Button, ListItemIcon, ListItemText } from '@mui/material';
import { Grid } from 'mdi-material-ui';

// import CreditCardIcon from '@mui/icons-material/CreditCard';

// import PayPalIconImage from '/images/PBETH/svgicons/paypal.jpg';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import PaymentIcon from '@mui/icons-material/Payment'; // Import the Payment icon from Material-UI

function CheckoutPage() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    const handleCheckout = () => {
        // Perform checkout logic here based on the selected payment method
        console.log('Selected Payment Method:', selectedPaymentMethod);

        // Example: Redirect to payment gateway or process payment
    };

    const bannerStyle = {
        display: 'flex',

    }

    const banStyle = {
        borderRadius: '50%',

    }

    return (
        <div>
            <h2>Checkout</h2>
            <FormControl component="fieldset">
                <RadioGroup
                    aria-label="payment-method"
                    name="payment-method"
                    value={selectedPaymentMethod}
                    onChange={handlePaymentMethodChange}
                >
                    <FormControlLabel
                        value="credit_card"
                        control={<Radio />}
                        label={
                            <ListItemText primary="Credit Card" />
                        }

                    // icon={<CreditCardIcon />}
                    />
                    <FormControlLabel
                        value="paypal"
                        control={<Radio />}
                        label={
                            <ListItemText primary="PayPal" />
                        }
                        icon={<img height='24' alt='paypal' src={bannerStyle} />}
                    />
                    <FormControlLabel
                        value="bank_transfer"
                        control={<Radio />}
                        label={
                            <ListItemText primary="Bank Transfer" />
                        }

                    // icon={<AccountBalanceIcon />}
                    />
                    <div style={bannerStyle} >
                        <span >
                            <img style={banStyle} src="/images/PBETH/svgicons/paypal.jpg" /></span>
                        <FormControlLabel
                            value="stripe"
                            control={<Radio />}
                            label={
                                <ListItemText primary="Stripe" />
                            }
                        />
                    </div>
                </RadioGroup>
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                onClick={handleCheckout}
                disabled={!selectedPaymentMethod}
            >
                Checkout
            </Button>
        </div>
    );
}

export default CheckoutPage;
