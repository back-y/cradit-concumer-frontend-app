// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import Button from '@mui/material/Button'
import Link from 'next/link'

const rows = [
    {
        age: 27,
        status: 'unpaid',
        date: '09/27/2018',
        name: 'Sally Quinn',
        salary: '$19586.23',

        designation: 'Human Resources Assistant'
    },
    {
        age: 61,
        date: '09/23/2016',
        salary: '$23896.35',
        status: 'unpaid',
        name: 'Margaret Bowers',

        designation: 'Nuclear Power Engineer'
    },
    {
        age: 59,
        date: '10/15/2017',
        name: 'Minnie Roy',
        status: 'rejected',
        salary: '$18991.67',

        designation: 'Environmental Specialist'
    },
    {
        age: 30,
        date: '06/12/2018',
        status: 'paid',
        salary: '$19252.12',
        name: 'Ralph Leonard',
        email: 'dfalloona@ifeng.com',
        designation: 'Sales Representative'
    },
    {
        age: 66,
        status: 'rejected',
        date: '03/24/2018',
        salary: '$13076.28',
        name: 'Annie Martin',
        designation: 'Operator',
        email: 'sganderton2@tuttocitta.it'
    },
    {
        age: 33,
        date: '08/25/2017',
        salary: '$10909.52',
        name: 'Adeline Day',
        status: 'unpaid',
        designation: 'Senior Cost Accountant'

    },
    {
        age: 61,
        status: 'paid',
        date: '06/01/2017',
        salary: '$17803.80',
        name: 'Lora Jackson',
        designation: 'Geologist'

    },
    {
        age: 22,
        date: '12/03/2017',
        salary: '$12336.17',
        name: 'Rodney Sharp',
        status: 'paid',
        designation: 'Cost Accountant'

    }
]

const statusObj = {
    // applied: { color: 'info' },
    // current: { color: 'primary' },
    rejected: { color: 'error' },
    unpaid: { color: 'warning' },
    paid: { color: 'success' }
}

const DashboardTable = () => {
    return (
        <Card>
            <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Invoice</TableCell>
                            <TableCell> paid Date</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Item Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                                        <Typography variant='caption'>{row.designation}</Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.salary}</TableCell>
                                <TableCell>{row.age}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={row.status}
                                        color={statusObj[row.status].color}
                                        sx={{
                                            height: 24,
                                            fontSize: '0.75rem',
                                            textTransform: 'capitalize',
                                            '& .MuiChip-label': { fontWeight: 500 }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>

                                    <Link href='/comment'>
                                        <Button className='tm_invoice_btn tm_color3' size='small' style={{ color: 'black', width: '100%' }}>
                                            comment<span className='tm_btn_text'>comment</span>
                                        </Button>
                                    </Link>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}

export default DashboardTable
