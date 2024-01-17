// ** MUI Imports
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import DropDown from 'src/layouts/components/DropDown'

import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { getCandidates, addCandidates } from 'src/redux/candidateSlice'
import Cookies from 'js-cookie'

const statusObj = {
    // applied: { color: 'info' },
    // current: { color: 'primary' },
    // rejected: { color: 'error' },
    Inactive: { color: 'warning' },
    Active: { color: 'success' }
}


const TableForCustemerList = () => {
    const stat = useSelector(getCandidates)
    console.log('stat:', stat)

    const show = stat.map(user => user.pending)
    console.log('show:', show)


    const handleClick = (e, id) => {
        console.log('new-user_id:', id)
        Cookies.set('new-user_id', id)
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectChange = event => {
        setLanguage(event.target.value)
    }

    const [candidates, setCandidates] = useState(null)

    const filterData = async (usersData) => {
        const filteredData = usersData.filter(user => user.pending === true)

        console.log('hello from filter')

        return filteredData;
    }

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            const userUrl = process.env.NEXT_PUBLIC_API_URL + 'new-user';
            const users = await axios.get(userUrl)
            console.log('Users: ', users.data);

            const filteredData = await filterData(users.data)
            setCandidates(filteredData)
            console.log("FilteredData: ", filteredData)
            dispatch(addCandidates(filteredData))
        }

        fetchData();

    }, [])

    return (
        <Card>
            <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell> Phone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Company</TableCell>
                            {/* <TableCell>Remaining credit Amount</TableCell> */}
                            {/* <TableCell>Status</TableCell> */}
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(candidates !== null) ? candidates.map(row => (
                            <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                                        <Typography variant='caption'>{row.role}</Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.company}</TableCell>
                                {/* <TableCell>{row.RCA}</TableCell> */}
                                {/* <TableCell>
                                    <Chip
                                        label={'Inactive'}
                                        color={statusObj['Inactive'].color}
                                        sx={{
                                            height: 24,
                                            fontSize: '0.75rem',
                                            textTransform: 'capitalize',
                                            '& .MuiChip-label': { fontWeight: 500 }
                                        }}
                                    />
                                </TableCell> */}
                                <TableCell>

                                    <DropDown show={show} iconTitle1="Home" iconTitle2="History" handleClick={(e) => handleClick(e, row._id)} />
                                </TableCell>
                            </TableRow>
                        )) : (<></>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}

export default TableForCustemerList
