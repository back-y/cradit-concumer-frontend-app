
import React from 'react';
import ShowMoreText from './ShowMoreText';
import Approve from './Approve';
import Cookies from 'js-cookie'

const role = Cookies.get('role');
const jwt = Cookies.get('jwt');

const YourComponent = () => {
    return role ? (
        <>
            <Approve />

        </>) :
        (<>  <ShowMoreText /></>);
};

export default YourComponent;
