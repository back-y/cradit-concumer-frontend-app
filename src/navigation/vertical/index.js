// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import ListItemIcon from '@mui/material/ListItemIcon';
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import QueueIcon from '@mui/icons-material/Queue';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';
import LowPriorityOutlinedIcon from '@mui/icons-material/LowPriorityOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import ChairIcon from '@mui/icons-material/Chair';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LiquorIcon from '@mui/icons-material/Liquor';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import CableIcon from '@mui/icons-material/Cable';
import ConstructionIcon from '@mui/icons-material/Construction';
import CarRentalIcon from '@mui/icons-material/CarRental';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';


import { yellow } from '@mui/material/colors';

import { addAuthUsers, getAuthUsers } from 'src/redux/feature/authSlice'
import { useSelector, useDispatch } from 'react-redux'

import Cookies from 'js-cookie'
import { Cookie } from 'mdi-material-ui'

const navigation = () => {

  // usercomtent

  // const products = useSelector(getAuthUsers)

  const customerType = Cookies.get('customerType');
  const jwt = Cookies.get('jwt');
  const id = Cookies.get('id');
  const name = Cookies.get('name');
  const email = Cookies.get('email');
  const roles = Cookies.get('role');
  const phone = Cookies.get('phone');

  // console.log(products)
  // console.log('from user', products._id)

  // const name = products.name
  // const email = products.email
  // const roles = products.role
  // const success = products.success



  // if(true)

  return [

    {
      isAllowed: customerType === 'individual',
      sectionTitle: 'Catagories'
    },
    {
      isAllowed: customerType === 'individual',
      title: 'Kegeberew Special Packages',
      icon: InventoryIcon,
      path: '/clients/shopindividual/kegeberewfeed'
    },
    {
      isAllowed: customerType === 'individual',
      title: 'Baltina',
      icon: ShoppingBasketIcon,
      path: '/clients/shopindividual/baltina'
    },
    {
      isAllowed: customerType === 'individual',
      title: 'Groceries',
      icon: LocalGroceryStoreIcon,
      path: '/clients/shopindividual/groceries'
    },
    {
      isAllowed: customerType === 'individual',
      title: 'Dairyproducts',
      icon: ChairIcon,
      path: '/clients/shopindividual/dairyproducts'
    },
    {
      isAllowed: customerType === 'individual',
      title: 'Beverages',
      icon: LiquorIcon,
      path: '/clients/shopindividual/beverages'
    },
    {
      isAllowed: customerType === 'individual',
      title: 'Meatproducts',
      icon: KebabDiningIcon,
      path: '/clients/shopindividual/meatproducts'
    },
    {
      isAllowed: customerType === 'individual',
      title: 'Personalcare',
      icon: CableIcon,
      path: '/clients/shopindividual/personalcare'
    },
    {
      isAllowed: customerType === 'individual',
      title: 'Vegitables and Fruit',
      icon: CarRentalIcon,
      path: '/clients/shopindividual/vegitablesandfruit'
    },

    // {
    //   isAllowed: customerType === 'individual',
    //   title: 'Raiments',
    //   icon: CheckroomIcon,
    //   path: '#'
    // },
    // {
    //   isAllowed: customerType === 'individual',
    //   title: 'Tools',
    //   icon: ConstructionIcon,
    //   path: '#'
    // },
    // {
    //   isAllowed: customerType === 'individual',
    //   title: 'Account Settings',
    //   icon: AccountCogOutline,
    //   path: '/account-settings'
    // },
    {
      isAllowed: customerType === 'individual',
      sectionTitle: 'Departments/Roles'
    },
    {
      isAllowed: customerType === 'individual',
      title: 'Admin',
      icon: HomeOutline,
      path: '/admin'
    },
    {
      isAllowed: customerType === 'individual',
      title: 'CEO',
      icon: AccountCogOutline,
      path: '/ceo'
    },
    {
      isAllowed: roles === 'customer',
      sectionTitle: 'Clients'
    },
    {
      isAllowed: roles === 'customer',
      title: 'Clients',
      icon: HomeOutline,
      path: '/clients'
    },
    {
      isAllowed: roles === 'customer',
      title: 'Shop',
      icon: ShoppingCartCheckoutOutlinedIcon,
      path: '/clients/shop'
    },
    {
      isAllowed: roles === 'customer',
      title: 'History',
      icon: HistoryOutlinedIcon,
      path: '/clients/history'
    },
    {
      isAllowed: roles === 'warehouse_manager',
      sectionTitle: 'Warehouse Department'
    },
    {
      // isAllowed: roles === 'warehouse_manager',
      isAllowed: roles === 'warehouse_manager',
      title: 'Home',
      icon: HomeOutline,
      path: '/warehouse'
    },
    {
      isAllowed: roles === 'warehouse_manager',
      title: 'Every Orders List',
      icon: FactCheckOutlinedIcon,
      path: '/warehouse/everyOrdersList'
    },
    {
      isAllowed: roles === 'warehouse_manager',
      title: 'Add New Products',
      icon: QueueIcon,
      path: '/warehouse/addNewProducts'
    },
    {
      isAllowed: roles === 'warehouse_manager',
      title: 'Products List',
      icon: Table,
      path: '/warehouse/productlist'
    },
    {
      isAllowed: roles === 'warehouse_manager',
      title: 'Returned Products List',
      icon: LowPriorityOutlinedIcon,
      path: '/warehouse/returned'
    },
    {
      isAllowed: roles === 'credit_manager',
      sectionTitle: 'Credit Department'
    },
    {
      isAllowed: roles === 'credit_manager',
      title: 'Credit Department',
      icon: HomeOutline,
      path: '/credit'
    },
    {
      isAllowed: roles === 'credit_manager',
      title: 'Customer List',
      icon: RecentActorsIcon,
      path: '/credit/customerList'
    },
    {
      isAllowed: roles === 'credit_manager',
      title: 'New Users List',
      icon: RecentActorsOutlinedIcon,
      path: '/credit/newUsersList'
    },
    {
      isAllowed: roles === 'credit_manager',
      title: 'Add New Customer',
      icon: PersonAddAltIcon,
      path: '/credit/addCustomer'
    },
    {
      isAllowed: roles === 'credit_manager',
      title: 'Requested Credit',
      icon: QuizOutlinedIcon,
      path: '/credit/requested'
    },
    {
      isAllowed: roles === 'credit_manager',
      title: 'Credit',
      icon: AddCardOutlinedIcon,
      path: '/credit/credit'
    },
    {
      isAllowed: roles === 'credit_manager',
      title: 'History',
      icon: HistoryOutlinedIcon,
      path: '/credit/history'
    },
    {
      isAllowed: jwt,
      sectionTitle: 'Cashier Departments'
    },
    {
      isAllowed: jwt,
      title: 'cashier',
      icon: HomeOutline,
      path: '/cashier'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/pages/login',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    }
  ]
}


export default navigation
