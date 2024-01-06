// import React, { useState } from 'react';
// import Grid from '@mui/material/Grid'
// import Cart from 'mdi-material-ui/Cart'
// import CardAppleWatch from '../../../views/cards/CardAppleWatch'

// import InputAdornment from '@mui/material/InputAdornment'

// import Magnify from 'mdi-material-ui/Magnify'

// // import Select from '@mui/material/Select';

// import { TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

// const SearchAndFilter = ({ value, onChange }) => {
//     // const [searchQuery, setSearchQuery] = useState('');
//     // const [filteredData, setFilteredData] = useState(data);

//     // const filterByCategoryName = (categoryName) => {
//     //     const result = data.filter(obj =>
//     //         obj.categories.some(category => category.name.toLowerCase().includes(categoryName.toLowerCase()))
//     //     );
//     //     setFilteredData(result);
//     // };

//     // const filterBySearchQuery = (query) => {
//     //     const result = data.filter(obj =>
//     //         obj.name.toLowerCase().includes(query.toLowerCase())
//     //     );
//     //     setFilteredData(result);
//     // };

//     // const handleSearchChange = (event) => {
//     //     const newSearchQuery = event.target.value;
//     //     setSearchQuery(newSearchQuery);

//     //     // Uncomment the line below if you want to filter by search query in real-time
//     //     filterBySearchQuery(newSearchQuery);
//     // };

//     // const handleCategoryChange = (event) => {
//     //     const newCategoryName = event.target.value;
//     //     filterByCategoryName(newCategoryName);
//     // };

//     return (

//         // <div>
//         //     <input
//         //         type="text"
//         //         placeholder="Search by name"
//         //         value={searchQuery}
//         //         onChange={handleSearchChange}
//         //     />
//         //     <select onChange={handleCategoryChange}>
//         //         <option value="">All Categories</option>
//         //         <option value="Vegetables & Fruits">Vegetables & Fruits</option>
//         //         <option value="Groceries">Groceries</option>
//         //         <option value="Personal Care">Personal Care</option>
//         //         {/* Add more categories as needed */}
//         //     </select>

//         //     {/* Display the filtered data */}
//         //     {filteredData.map((item, index) => (
//         //         <Grid item xs={12} lg={3} key={index}>
//         //             <CardAppleWatch
//         //                 pic={item.image[0]}
//         //                 stats='$25.6k'
//         //                 icon={<Cart />}
//         //                 color='success'
//         //                 price={item.price}
//         //                 stockAmount={item.quantity}
//         //                 title={item.name}
//         //                 id={item._id}
//         //                 description={item.description}
//         //                 stock={item.quantity}
//         //                 unit={item.unit}
//         //             />

//         //         </Grid>
//         //     ))
//         //     }
//         // </div>
//         <>
//             <Grid item xs={12} sm={6}>
//                 <TextField
//                     fullWidth
//                     type="text"
//                     placeholder="Search by name"
//                     value={value}
//                     onChange={onChange}

//                     size='small'
//                     sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position='start'>
//                                 <Magnify fontSize='small' />
//                             </InputAdornment>
//                         )
//                     }}
//                 />
//             </Grid>
//             {/* <Grid item xs={12} sm={6}>

//                 <FormControl fullWidth>
//                     <InputLabel id="category-select-label">Category</InputLabel>
//                     <Select
//                         labelId="category-select-label"
//                         onChange={handleCategoryChange}
//                     >
//                         <MenuItem value="">All Categories</MenuItem>
//                         <MenuItem value="Vegetables &amp; Fruits">Vegetables & Fruits</MenuItem>
//                         <MenuItem value="Groceries">Groceries</MenuItem>
//                         <MenuItem value="Personal Care">Personal Care</MenuItem>
//                         <MenuItem value="Beverage">Beverage</MenuItem>
//                         {/* Add more categories as needed */}
//             {/* </Select> */}
//             {/* // </FormControl> */}
//             {/* // </Grid> */}

//             {/* Display the filtered data */}
//             {/* {filteredData.map((item, index) => (
//                 <Grid item xs={12} lg={3} key={index}>
//                     <CardAppleWatch
//                         pic={item.image[0]}
//                         stats='$25.6k'
//                         icon={<Cart />}
//                         color='success'
//                         price={item.price}
//                         stockAmount={item.quantity}
//                         title={item.name}
//                         id={item._id}
//                         description={item.description}
//                         stock={item.quantity}
//                         unit={item.unit}
//                     />

//                 </Grid>
//             ))
//             } */}
//         </>
//     );
// };

// export default SearchAndFilter;

// Search.js
import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Magnify from 'mdi-material-ui/Magnify';

const Search = ({ searchQuery, handleSearchChange }) => {
    return (
        <TextField
            // fullWidth
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
            color='warning'
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Magnify fontSize="small" />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default Search;
