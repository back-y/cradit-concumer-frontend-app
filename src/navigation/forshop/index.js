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
import ForumIcon from '@mui/icons-material/Forum';


import { yellow } from '@mui/material/colors';

import { addAuthUsers, getAuthUsers } from 'src/redux/feature/authSlice'
import { useSelector, useDispatch } from 'react-redux'

import Cookies from 'js-cookie'
import { Cookie } from 'mdi-material-ui'

const navigation = () => {


    const customerType = Cookies.get('customerType');
    const jwt = Cookies.get('jwt');
    const id = Cookies.get('id');
    const name = Cookies.get('name');
    const email = Cookies.get('email');
    const roles = Cookies.get('role');
    const phone = Cookies.get('phone');



    // if(true)

    return [

        {
            isAllowed: roles === 'customer',
            sectionTitle: 'Catagories'
        },
        {
            isAllowed: roles === 'customer',
            title: 'Kegeberew Special Packages',
            icon: InventoryIcon,
            path: '/clients/shopindividual/kegeberewfeed'
        },
        {
            isAllowed: roles === 'customer',
            title: 'Baltina',
            icon: ShoppingBasketIcon,
            path: '/clients/shopindividual/baltina'
        },
        {
            isAllowed: roles === 'customer',
            title: 'Groceries',
            icon: LocalGroceryStoreIcon,
            path: '/clients/shopindividual/groceries'
        },
        {
            isAllowed: roles === 'customer',
            title: 'Dairyproducts',
            icon: ChairIcon,
            path: '/clients/shopindividual/dairyproducts'
        },
        {
            isAllowed: roles === 'customer',
            title: 'Beverages',
            icon: LiquorIcon,
            path: '/clients/shopindividual/beverages'
        },
        {
            isAllowed: roles === 'customer',
            title: 'Meatproducts',
            icon: KebabDiningIcon,
            path: '/clients/shopindividual/meatproducts'
        },
        {
            isAllowed: roles === 'customer',
            title: 'Personalcare',
            icon: CableIcon,
            path: '/clients/shopindividual/personalcare'
        },
        {
            isAllowed: roles === 'customer',
            title: 'Vegitables and Fruit',
            icon: CarRentalIcon,
            path: '/clients/shopindividual/vegitableandfruit'
        },

    ]
}


export default navigation
