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
import CardContent from '@mui/material/CardContent'
import YourCart from '../../../@core/components/yourCart/YourCart'
import { getProducts, addProducts } from 'src/redux/productSlice'
import { getItemsInCart } from 'src/redux/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import Search from './Search'
import Cookies from 'js-cookie'
import Error401 from 'src/pages/401'

// ** Layout Import
import { Pagination, PaginationItem } from '@mui/material'

// ========================================

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

    console.log(filteredData)
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
  const customer = Cookies.get('customerType')
  const role = Cookies.get('role')

  console.log('Product Count for pagination: ', productCount)

  return !role && customer === 'individual' ? (
    <section>
      <Search searchQuery={searchQuery} handleSearchChange={handleSearchChange} sx={{ innerWidth: '50%' }} />
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='card navigation example'>
          <Tab value='1' label='Your Shop test' />
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

// shop.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Shop
