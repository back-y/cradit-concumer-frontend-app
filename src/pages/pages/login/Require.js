// import router from "next/router";
// import { useLocation, Navigate, Outlet } from "next/router";
// import { UseSelector } from "react-redux";
// import { selectCurrentToken } from "src/redux/feature/authSlice";
// // import {Navigate} from "next/router";

// const RequireAuth = () => {
//     const token = UseSelector(selectCurrentToken);
//     const location = useLocation();

//     return (
//         token
//             ? <Outlet />
//             : <Navigate to="/login" state={{ from: location }} replace />
//     )

//     // if (!token) {
//     //     return <NavigateBefore to="/login" state={{ from: location }} />
//     // }
//     // return <Outlet />
// }

// export default RequireAuth 

// components/ProtectedRoute.js
// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import jwtDecode from 'jwt-decode'
// import jwt from 'jsonwebtoken'
// import axios from 'axios'


// // import { selectUser } from '../redux/authSlice';
// import { useRouter } from 'next/router';

// import { addAuthUsers, getAuthUsers, login } from 'src/redux/feature/authSlice'

// const ProtectedRoute = ({ children }) => {
//     const user = useSelector(getAuthUsers);
//     const router = useRouter();
//     const dispatch = useDispatch()
//     const authUserUrl = process.env.NEXT_PUBLIC_API_URL + 'auth'

//     const getToken = async () => {
//         const authToken = localStorage.getItem('authToken')
//         console.log(authToken)

//         const decodedToken = jwt.decode(authToken)
//         console.log(decodedToken)

//         axios.get(authUserUrl).then(response => {
//             console.log(response.data)

//             for (let i = 0; i < response.data.length; i++) {
//                 if (response.data[i]._id === decodedToken.userId) {
//                     console.log('match')
//                     console.log(response.data[i])


//                     dispatch(addAuthUsers(response.data[i]))
//                     dispatch(login(response.data[i]))
//                 }
//             }
//         })

//     }
//     const products = useSelector(getAuthUsers)
//     console.log(products)


//     const data = products.role
//     console.log('data', typeof (data))
//     console.log('data',)

//     useEffect(() => {
//         getToken()
//     }, [])



//     return <>{children}</>;
// };

// export default ProtectedRoute;


import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useRouter } from 'next/router';

import { addAuthUsers, getAuthUsers, login } from 'src/redux/feature/authSlice';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const authUserUrl = process.env.NEXT_PUBLIC_API_URL + 'auth';

    const getToken = async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            console.log(authToken);

            if (authToken) {
                const decodedToken = jwtDecode(authToken);
                console.log(decodedToken);

                const response = await axios.get(authUserUrl);
                console.log(response.data);

                const matchingUser = response.data.find(user => user._id === decodedToken.userId);

                if (matchingUser) {
                    console.log('match');
                    console.log(matchingUser);

                    // Update Redux state
                    dispatch(addAuthUsers(matchingUser));
                    dispatch(login(matchingUser));
                } else {
                    console.log('User not found in the response');
                }
            }
        } catch (error) {
            console.error('Error fetching user data:', error);

            // Handle errors, e.g., redirect to login page
            // router.push('pages/login');
        }
    };

    useEffect(() => {
        getToken();
    }, []);

    return <>{children}</>;
};

export default ProtectedRoute;
