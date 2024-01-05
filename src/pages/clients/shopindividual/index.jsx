// ** MUI Imports
'use client'
import Grid from '@mui/material/Grid'
import Cart from 'mdi-material-ui/Cart'
import CardAppleWatch from '../../../views/cards/CardAppleWatch'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import YourCart from '../../../@core/components/yourCart/YourCart'
import { getProducts, addProducts } from 'src/redux/productSlice'
import { getItemsInCart } from 'src/redux/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import Search from './Search'
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment'

import Magnify from 'mdi-material-ui/Magnify'

// import Select from '@mui/material/Select';

import { TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';



// ** Layout Import
import { Pagination } from '@mui/material'

// ========================================

const Products = ({data}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const filterByCategoryName = (categoryName) => {
      const result = data.filter(obj =>
          obj.categories.some(category => category.name.toLowerCase().includes(categoryName.toLowerCase()))
      );
      setFilteredData(result);
  };

  const filterBySearchQuery = (query) => {
      const result = data.filter(obj =>
          obj.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(result);
  };

  const handleSearchChange = (event) => {
      const newSearchQuery = event.target.value;
      setSearchQuery(newSearchQuery);
      
      // Uncomment the line below if you want to filter by search query in real-time
      filterBySearchQuery(newSearchQuery);
  };
  const handleSearchChange = (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
  
    // Update the filtered data based on the search query
    if (newSearchQuery.trim() === '') {
      // If the search query is empty, show all products
      setFilteredData(data);
    } else {
      // Otherwise, filter the data based on the search query
      filterBySearchQuery(newSearchQuery);
    }
  };
  
  const handleCategoryChange = (event) => {
      const newCategoryName = event.target.value;
      filterByCategoryName(newCategoryName);
  };

  // if (!props.products) {
  //   return <></>
  // } else {
  //   return props.products.map((item, index) => (
  //     <Grid item xs={12} lg={3} key={index}>
  //       <CardAppleWatch
  //         pic={item.image[0]}
  //         stats='$25.6k'
  //         icon={<Cart />}
  //         color='success'
  //         price={item.price}
  //         stockAmount={item.quantity}
  //         title={item.name}
  //         id={item._id}
  //         description={item.description}
  //         stock={item.quantity}
  //         unit={item.unit}
  //       />
        
  //     </Grid>
  //   ))
  // }
  return (
    <>
    <Grid item xs={12} sm={12}>    
        <TextField
    fullWidth
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
            
          size='small'
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Magnify fontSize='small' />
              </InputAdornment>
            )
          }}
        />
        </Grid>
        {/* <Grid item xs={12} sm={6}>

        <FormControl fullWidth>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
           labelId="category-select-label"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="Vegetables &amp; Fruits">Vegetables & Fruits</MenuItem>
            <MenuItem value="Groceries">Groceries</MenuItem>
            <MenuItem value="Personal Care">Personal Care</MenuItem>
            <MenuItem value="Beverage">Beverage</MenuItem>
            
          </Select>
        </FormControl>
        </Grid> */}

        {/* Display the filtered data */}
        {filteredData.map((item, index) => (
            <Grid item xs={12} lg={3} key={index}>
                <CardAppleWatch
                    pic={item.image[0]}
                    stats='$25.6k'
                    icon={<Cart />}
                    color='success'
                    price={item.price}
                    stockAmount={item.quantity}
                    title={item.name}
                    id={item._id}
                    description={item.description}
                    stock={item.quantity}
                    unit={item.unit}
                />

            </Grid>
        ))
        }
    </>
);
}

const Shop = () => {
  const [value, setValue] = useState('1')
  const [currentPage, setCurrentPage] = useState(1);
  const [productCount, setProductCount] = useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const dispatch = useDispatch()

  const getProduct = async () => {
    const productCountUrl = process.env.NEXT_PUBLIC_API_URL + 'individual/product/count'
    await axios.get(productCountUrl)
    .then(resp => {
      setProductCount(resp.data)
      console.log("Product Count: ", resp.data)
    })
    .catch(err => {
      console.log("Error in fetching productCount", err)
    })
    const productUrl = process.env.NEXT_PUBLIC_API_URL + `individual/product?page=${currentPage}&limit=12`
    const { data } = await axios.get(productUrl)
    dispatch(addProducts(data))
    console.log("Product Data: ", data)

    // ** Example of filtering data by category name
    const filterByCategoryName = (dataArray, categoryName) => {
      return dataArray.filter(obj =>
        obj.categories.some(category => category.name === categoryName)
      );
    };
    
    // Example usage: Filter objects with category name "Vegetables & Fruits"
    const filteredData = filterByCategoryName(data, "Groceries");
    console.log('filteredData', filteredData);

    
// Extract all categories from the data
const allCategories = data.flatMap(obj => obj.categories);

// Remove duplicate categories based on their name
const uniqueCategories = Array.from(new Set(allCategories.map(category => category.name)));

// Count the number of unique categories
const numberOfCategories = uniqueCategories.length;

// Log the list of categories and the number of categories
console.log("List of Categories:", uniqueCategories);
console.log("Number of Categories:", numberOfCategories);

  }

  useEffect(() => {
    getProduct()
  }, [currentPage])

  const products = useSelector(getProducts)
  const itemsInCart = useSelector(getItemsInCart)

  

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage)
    console.log("Current Page: ", newPage)
    console.log("Current page on state: ", currentPage)
  }

  return (
    <section>
      {/* <Search /> */}
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='card navigation example'>
          <Tab value='1' label='Your Shop' />
          <Tab value='2' label={itemsInCart.length + ' item(s) in cart'} icon={<Cart />} />
          {/* <Tab value='3' label='Item Three' /> */}
        </TabList>
        <CardContent>
          <TabPanel value='1' sx={{ p: 0 }}>
            {/* <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Your Shop
            </Typography> */}
            <br />
            <br />
            <ApexChartWrapper>
              <Grid container spacing={6}>
                <Grid item xs={12} md={12} lg={12}>
                  <Grid container spacing={6}>
                    <Products data={products} />
                  </Grid>
                </Grid>
              </Grid>
            </ApexChartWrapper>
            < div style={{ marginTop: 2, alignItems:'center'}}>            <Pagination  sx={{ marginTop: 2  }}
        count={Math.ceil(productCount/8)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      >
        
      </Pagination>
      </div>

          </TabPanel>
          {/* ================================================================ */}
          <TabPanel value='2' sx={{ p: 0 }}>

            <YourCart />
            
          </TabPanel>
        </CardContent>
      </TabContext>
      {/* <Pagination
        count={Math.ceil(productCount/8)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      >
        
      </Pagination> */}
    </section>
  )
}

// shop.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Shop
