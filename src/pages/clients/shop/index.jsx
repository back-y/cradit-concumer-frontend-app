// // ** MUI Imports

// import Grid from '@mui/material/Grid'
// import Link from 'next/link'
// import Cart from 'mdi-material-ui/Cart'

// // ** Custom Components Imports
// import CardAppleWatch from '../../../views/cards/CardAppleWatch'
// import CardNavigation from '../../../views/cards/CardNavigation'

// // ** Styled Component Import
// import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
// import { useState } from 'react'

// // ** MUI Imports
// import Tab from '@mui/material/Tab'
// import Card from '@mui/material/Card'
// import TabList from '@mui/lab/TabList'
// import TabPanel from '@mui/lab/TabPanel'
// import Button from '@mui/material/Button'
// import TabContext from '@mui/lab/TabContext'
// import Typography from '@mui/material/Typography'
// import CardContent from '@mui/material/CardContent'
// import YourCart from '../../../@core/components/yourCart/YourCart'

// // import Invoice from '../../../@core/components/invoice/Invoice'

// // ** Icons Imports

// import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
// import CellphoneLink from 'mdi-material-ui/CellphoneLink'
// import AccountOutline from 'mdi-material-ui/AccountOutline'

// // ** Demo Components Imports
// import Table from 'src/views/dashboard/Table'
// import StatisticsCard from 'src/views/dashboard/StatisticsCard'
// import TrendingUp from 'mdi-material-ui/TrendingUp'
// import Box from '@mui/material/Box'
// import Avatar from '@mui/material/Avatar'

// import { getProducts, addProducts } from 'src/redux/productSlice'
// import { getItemsInCart } from 'src/redux/cartSlice'
// import { useSelector, useDispatch } from 'react-redux'
// import { useEffect } from 'react'
// import axios from 'axios'

// // ** Layout Import
// import BlankLayout from 'src/@core/layouts/BlankLayout'
// import Err404 from 'src/pages/404'

// import Cookie from 'js-cookie'

// // ========================================

// const role = Cookie.get('role')
// const jwt = Cookie.get('jwt')

// // ========================================

// const Products = props => {
//   if (!props.products) {
//     return <></>
//   } else {
//     return props.products.map((item, index) => (
//       <Grid item xs={6} lg={3} key={index}>
//         <CardAppleWatch
//           pic={process.env.NEXT_PUBLIC_API_URL + 'file/' + item.image}
//           stats='$25.6k'
//           icon={<Cart />}
//           color='success'
//           price={item.price}
//           stockAmount={item.quantity}
//           title={item.name}
//           id={item._id}
//           description={item.description}
//           stock={item.quantity}
//           unit={item.unit}
//         />
//       </Grid>
//     ))
//   }
// }

// const Shop = () => {
//   const [value, setValue] = useState('1')
//   const [currentPage, setCurrentPage] = useState(1)

//   const handleChange = (event, newValue) => {
//     setValue(newValue)
//   }

//   const dispatch = useDispatch()

//   const getProduct = async () => {
//     // const productUrl = process.env.NEXT_PUBLIC_API_URL + 'product'
//     const productUrl = process.env.NEXT_PUBLIC_API_URL + `product?page=${currentPage}&limit=12`
//     const { data } = await axios.get(productUrl)
//     console.log(data)
//     dispatch(addProducts(data))
//   }

//   useEffect(() => {
//     getProduct()
//   }, [])

//   const products = useSelector(getProducts)
//   const itemsInCart = useSelector(getItemsInCart)

//   return role === 'customer' ? (
//     <section>
//       <TabContext value={value}>
//         <TabList onChange={handleChange} aria-label='card navigation example'>
//           <Tab value='1' label='Your Shop' />
//           <Tab value='2' label={itemsInCart.length + ' item(s) in cart'} icon={<Cart />} />
//         </TabList>
//         <CardContent>
//           <TabPanel value='1' sx={{ p: 0 }}>
//             <Typography variant='h6' sx={{ marginBottom: 2 }}>
//               Your Shop
//             </Typography>
//             <ApexChartWrapper>
//               <Grid container spacing={6}>
//                 <Grid item xs={12} md={12} lg={12}>
//                   <Grid container spacing={6}>
//                     <Products products={products} />
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </ApexChartWrapper>
//           </TabPanel>

//           {/* ================================================================ */}

//           <TabPanel value='2' sx={{ p: 0 }}>
//             <Typography variant='body2' sx={{ marginBottom: 4 }}>
//               Here are your selected Items
//             </Typography>
//             <YourCart />
//           </TabPanel>
//         </CardContent>
//       </TabContext>
//     </section>
//   ) : (
//     <Err404 />
//   )
// }

// // shop.getLayout = page => <BlankLayout>{page}</BlankLayout>

// export default Shop

import Grid from '@mui/material/Grid'
import Cart from 'mdi-material-ui/Cart'
import CardAppleWatch from '../../../views/cards/CardAppleWatch'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import CardContent from '@mui/material/CardContent'
import YourCart from '../../../@core/components/yourCart/YourCart'

// import Invoice from '../../../@core/components/invoice/Invoice'

// ** Icons Imports
// ** Layout Import
import { Pagination, PaginationItem } from '@mui/material'
import { getProducts, addProducts } from 'src/redux/productSlice'
import { getItemsInCart } from 'src/redux/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import Search from '../shopindividual/Search'
import Cookies from 'js-cookie'
import Error401 from 'src/pages/401'

// ** Layout Import
import Err404 from 'src/pages/404'

import Cookie from 'js-cookie'

// ========================================

const role = Cookie.get('role')
const jwt = Cookie.get('jwt')

const Products = ({ data, searchQuery }) => {
  const [filteredData, setFilteredData] = useState(data)

  const filterBySearchQuery = query => {
    const result = data.filter(obj => obj.name.toLowerCase().includes(query.toLowerCase()))
    setFilteredData(result)
  }

  useEffect(() => {
    if (searchQuery.trim() === '') {
      // If the search query is empty, show all products
      setFilteredData(data)
    } else {
      // Otherwise, filter the data based on the search query
      filterBySearchQuery(searchQuery)
    }
  }, [searchQuery, data])

  if (!{ data }) {
    return <></>
  } else {
    return filteredData.map((item, index) => (
      <Grid item xs={12} lg={3} key={index}>
        <CardAppleWatch
          pic={item.image}
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
}

const Shop = () => {
  const [value, setValue] = useState('1')
  const [currentPage, setCurrentPage] = useState(1)
  const [productCount, setProductCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage)
  }

  const handleSearchChange = event => {
    const newSearchQuery = event.target.value
    setSearchQuery(newSearchQuery)
  }

  const dispatch = useDispatch()

  const getProduct = async () => {
    const productCountUrl = process.env.NEXT_PUBLIC_API_URL + 'individual/product/count'
    await axios
      .get(productCountUrl)
      .then(resp => {
        setProductCount(resp.data)
        console.log('Product Count: ', resp.data)
      })
      .catch(err => {
        console.log('Error in fetching productCount', err)
      })
    const productUrl = process.env.NEXT_PUBLIC_API_URL + `individual/product?page=${currentPage}&limit=12`
    const { data } = await axios.get(productUrl)
    dispatch(addProducts(data))
    console.log('Product Data: ', data)

    // ** Example of filtering data by category name
    const filterByCategoryName = (dataArray, categoryName) => {
      return dataArray.filter(obj => obj.categories.some(category => category.name === categoryName))
    }

    // Example usage: Filter objects with category name "Vegetables & Fruits"
    const filteredData = filterByCategoryName(data, 'Groceries')
    console.log('filteredData', filteredData)

    // Extract all categories from the data
    const allCategories = data.flatMap(obj => obj.categories)

    // Remove duplicate categories based on their name
    const uniqueCategories = Array.from(new Set(allCategories.map(category => category.name)))

    // Count the number of unique categories
    const numberOfCategories = uniqueCategories.length

    // Log the list of categories and the number of categories
    console.log('List of Categories:', uniqueCategories)
    console.log('Number of Categories:', numberOfCategories)
  }

  useEffect(() => {
    getProduct()
  }, [currentPage])

  const products = useSelector(getProducts)
  const itemsInCart = useSelector(getItemsInCart)

  // const customer = Cookies.get('customerType')
  const role = Cookies.get('role')

  console.log('Product Count for pagination: ', productCount)

  return role === 'customer' ? (
    <section>
      <Search searchQuery={searchQuery} handleSearchChange={handleSearchChange} sx={{ innerWidth: '50%' }} />
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='card navigation example'>
          <Tab value='1' label='Your Shop' />
          <Tab value='2' label={itemsInCart.length + ' item(s) in cart'} icon={<Cart />} />
          {/* <Tab value='3' label='Item Three' /> */}
        </TabList>
        <CardContent>
          <TabPanel value='1' sx={{ p: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <Pagination
                count={Math.ceil(productCount / 12)}
                page={currentPage}
                onChange={handlePageChange}
                color='secondary'
                style={{ fontSize: '3em', color: '#d7a122' }}
                renderItem={item => (
                  <PaginationItem
                    {...item}
                    // Customize the appearance of each button based on item.page
                    className={item.page === currentPage ? 'pbeth' : 'custom-inactive-page'}
                  />
                )}
              />
            </div>
            <br />
            <br />
            <ApexChartWrapper>
              <Grid container spacing={6}>
                <Grid item xs={12} md={12} lg={12}>
                  <Grid container spacing={6}>
                    <Products data={products} searchQuery={searchQuery} />
                  </Grid>
                </Grid>
              </Grid>
            </ApexChartWrapper>
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Pagination
                count={Math.ceil(productCount / 12)}
                page={currentPage}
                onChange={handlePageChange}
                color='secondary'
                style={{ fontSize: '3em', color: '#d7a122' }}
                renderItem={item => (
                  <PaginationItem
                    {...item}
                    // Customize the appearance of each button based on item.page
                    className={item.page === currentPage ? 'pbeth' : 'custom-inactive-page'}
                  />
                )}
              />
            </div>
          </TabPanel>
          {/* ================================================================ */}
          <TabPanel value='2' sx={{ p: 0 }}>
            <YourCart />
          </TabPanel>
        </CardContent>
      </TabContext>
    </section>
  ) : (
    <Error401 />
  )
}

export default Shop
