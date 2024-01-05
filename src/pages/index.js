
import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useRouter } from 'next/router';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LandingPage = () => {

  // progress
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const goToShop = () => {
    setLoading(true);
    setTimeout(() => {
      // Finish the operation
      setLoading(false);
    }, 3000);
    Cookies.set('customerType', 'individual')
    router.push('clients/shopindividual');
  }

  const goToLogin = () => {
    setLoading(true);
    setTimeout(() => {
      // Finish the operation
      setLoading(false);
    }, 3000);
    Cookies.set('customerType', 'corporate')
    router.push('hero');
  }

  useEffect(() => {
    Cookies.remove('customerType')
  }, [])

  const bannerStyle = {
    backgroundImage: `url('/images/PBETH/farmer.jpg')`, // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    textAlign: 'center',
  };

  return (
    <div>
      {/* Banner Section */}
      <Grid container>
        <Grid item xs={12} style={bannerStyle}>
          <Grid style={{ paddingRight: '30rem', position: 'relative', }}>
            <Typography variant="h4" color="blacl" gutterBottom>
              <h1>Welcome to KCCM</h1>
            </Typography>
            <Typography variant="body1" color="textSecondary">
              <h3>Enjoy shoping with Kegeberew credit.</h3>
            </Typography>
          </Grid>
          <Grid container justifyContent="center" alignItems="center" style={{ padding: '20px' }}>
            <Grid item xs={12} md={6} style={{ padding: '10px' }}>

              <Button variant="contained" color="success" size="large" style={{ padding: '10px', margin: '20px' }}
                onClick={goToShop} disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : <Typography style={{ marginLeft: '10px' }} color="white" gutterBottom>
                  Get Products as Individual
                </Typography>}
                <FormatIndentDecreaseIcon />

              </Button>
            </Grid>
            <Grid item xs={12} md={6} style={{ padding: '10px' }}>

              <Button variant="contained" color="inherit" size="large" style={{ padding: '10px', background: 'black', margin: '20px' }}
                onClick={goToLogin} disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : <Typography style={{ marginRight: '10px' }} color="white" gutterBottom>
                  Login or Register as Corporate
                </Typography>}

                <FormatIndentIncreaseIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default LandingPage;


LandingPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
