// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import axios from 'axios';
import Cookies from 'js-cookie'
import { useRef } from 'react'

const CustomInput = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Entry Date' autoComplete='off' />
})

const FormLayoutsSeparator = ({ btnCancel, btnSubmit, style }) => {
    // ** States
    const initialState = {
        name: '',
        unit: 'Kg',
        price: 0,
        quantity: 0,
        description: '',
        itemCode: '',
    }

    const [image, setImage] = useState(null)
    const [item, setItem] = useState(initialState)

    const handleChange = (e) => {
        let value = e.target.value
        if (e.target.name === 'price' || e.target.name === 'quantity'){
            value = parseInt(value);
        }
        setItem({ ...item, [e.target.name]: value })
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }
    const productUrl = process.env.NEXT_PUBLIC_API_URL + 'product';
    
    const fileInputRef = useRef(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", image);
        // if (fileInputRef.current && fileInputRef.current.files.length > 0) {
        //     formData.append('file', fileInputRef.current.files[0]);
        // } else {
        // console.error('No file selected');
        // return;
        // }
        console.log('Form data ', formData)
        
        const resp = await axios.post(productUrl, item, {
                withCredentials: true
            })
            // .then((response) => {
            // console.log('The resp:', response.data);

            // })
            // .catch((error) => {
            // console.log('The Error:', error);
            // });
        
        const imgUploadUrl = productUrl + '/upload/' + resp.data._id;    
        await axios.post(imgUploadUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((imgPostResponse) => {
            console.log('The Image Post resp: ', imgPostResponse.data.image);
        })
        .catch(err => {
            console.log('Error ', err)
        })

        console.log(imgUploadUrl)
    }

    return (
        <Box>

            <Divider sx={{ margin: 0 }} />
            <form onSubmit={e => e.preventDefault()}>
                <CardContent>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                Products Info
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label='Product Name' placeholder='Onion' name='name' value={item.name} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id='form-layouts-separator-select-label'>Product Unit</InputLabel>
                                <Select
                                    label='Product Unit'
                                    defaultValue='Kg'
                                    id='form-layouts-separator-select'
                                    labelId='form-layouts-separator-select-label'
                                    onChange={handleChange}
                                    name='unit'
                                    value={item.unit}
                                >
                                    <MenuItem value='Kg'>Kg</MenuItem>
                                    <MenuItem value='Dozen'>Dozen (Derzen)</MenuItem>
                                    <MenuItem value='Quintal'>Quintal (Kuntal)</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth type="number" label={'Unit Price'} placeholder='50' name='price' value={item.price} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth type="number" label={'Quantity'} placeholder='500' name='quantity' value={item.quantity} onChange={handleChange} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label={'Item Code (eg: #123)'} placeholder='#123' name='itemCode' value={item.itemCode} onChange={handleChange} />
                        </Grid>
                        <Grid item sy={12} xs={12} sm={6}>
                            <TextField fullWidth label={'Description'} placeholder='Fresh from the farmer!' name='description' value={item.description} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <input type="file" ref={fileInputRef} name="file" onChange={handleImage} />
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider sx={{ margin: 0 }} />
                <CardActions>
                    <Button style={{ backgroundColor: '#d7a022', color: 'black' }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                    {/* <Button style={{ color: 'black' }} >
                        Cancel
                    </Button> */}
                </CardActions>
            </form>
        </Box>
    )
}

export default FormLayoutsSeparator

