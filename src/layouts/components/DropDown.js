// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import CogOutline from 'mdi-material-ui/CogOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import ProvideCredit from 'src/views/form-layouts/ProvideCredit'

import Link from 'next/link'
import Button from '@mui/material/Button'

import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { addAuthUsers, getAuthUsers } from 'src/redux/feature/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'js-cookie'


const jwt = Cookies.get('jwt')
const id = Cookies.get('id')
const name = Cookies.get('name')
const email = Cookies.get('email')
const roles = Cookies.get('role')
const phone = Cookies.get('phone')

const customerType = false


const label = { inputProps: { 'aria-label': 'Switch demo' } };

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));


// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = ({ icon2, icon1, iconTitle1, iconTitle2, handleClick, show }) => {

    // usercomtent

    const products = useSelector(getAuthUsers)

    // console.log(products)
    // console.log('from user', products._id)

    // const roles = products.role

    // ** States
    const [anchorEl, setAnchorEl] = useState(null)

    // ** Hooks
    const router = useRouter()

    const handleDropdownOpen = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleDropdownClose = url => {
        if (url) {
            router.push(url)
        }
        setAnchorEl(null)
    }

    const styles = {
        py: 2,
        px: 4,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        color: 'text.primary',
        textDecoration: 'none',
        '& svg': {
            fontSize: '1.375rem',
            color: 'text.secondary'
        }
    }

    return (
        <Fragment>
            <DotsVertical
                overlap='circular'
                onClick={handleDropdownOpen}
                sx={{ ml: 2, cursor: 'pointer' }}
            />
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleDropdownClose()}
                sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {roles === 'credit_manager' && !show && <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                    <Box sx={styles}>
                        {/* <AccountOutline sx={{ marginRight: 2 }} /> */}
                        <Link href="/clients">

                            <Button variant='outlined' size='small' type='submit' sx={{
                                py: 2.5, width: '100%',
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                                marginBottom: '1rem',

                                // backgroundColor: '#d7a022',
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: '0 1px 20px 1px black',
                                    backgroundColor: '#d7a022'
                                }
                            }} >
                                {icon1}  {iconTitle1}
                            </Button>
                        </Link>
                    </Box>
                </MenuItem>}
                {roles === 'credit_manager' && !show && <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                    <Box sx={styles}>
                        {/* <EmailOutline sx={{ marginRight: 2 }} /> */}
                        <Link href="/clients/history">

                            <Button variant='outlined' size='small' type='submit' sx={{
                                py: 2.5, width: '100%',
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                                marginBottom: '1rem',

                                // backgroundColor: '#d7a022',
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: '0 1px 20px 1px black',
                                    backgroundColor: '#d7a022'
                                }
                            }} >
                                {icon2}  {iconTitle2}
                            </Button>
                        </Link>
                    </Box>
                </MenuItem>}
                {roles === 'credit_manager' && !show && <MenuItem sx={{ p: 0 }} >
                    <Box sx={styles}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography style={{ color: 'red' }} >Inactive</Typography>
                            <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                            <Typography style={{ color: 'green' }}>Active</Typography>
                        </Stack>
                    </Box>
                </MenuItem>}
                {roles === 'cashier' && <MenuItem sx={{ p: 0 }} >
                    <Box sx={styles}>
                        {/* <MessageOutline sx={{ marginRight: 2 }} /> */}
                        <ProvideCredit classNme='pbeth' iconTitle=' Provide' />

                    </Box>
                </MenuItem>}
                {roles === 'credit_manager' && show && <MenuItem sx={{ p: 0 }} >
                    <Link href="/newCustomer">
                        <Box sx={styles}>
                            <Button onClick={handleClick} classNme='pbeth' variant='outlined' size='small' type='submit' sx={{
                                py: 2.5, width: '100%',
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                                marginBottom: '1rem',

                                // backgroundColor: '#d7a022',
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: '0 1px 20px 1px black',
                                    backgroundColor: '#d7a022'
                                }
                            }}>
                                Watch Detail
                            </Button>

                        </Box>
                    </Link>
                </MenuItem>}

            </Menu>
        </Fragment>
    )
}

export default UserDropdown
