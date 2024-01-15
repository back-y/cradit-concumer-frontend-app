
import React from 'react';
import ShowMoreText from './ShowMoreText';
import ApproveForAddCustomer from './ApproveForAddCustomer';
import Cookies from 'js-cookie'

const role = Cookies.get('role');
const jwt = Cookies.get('jwt');

const YourComponent = () => {
    return role ? (
        <>
            <ApproveForAddCustomer />

        </>) :
        (<>  <ShowMoreText /></>);
};

export default YourComponent;
