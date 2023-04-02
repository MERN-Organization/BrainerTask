import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUserToken = () => {
        const userToken = localStorage.getItem('access_token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/');
        } else {
            setIsLoggedIn(true);
        }
    };
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);
    return <React.Fragment>{isLoggedIn ? <Outlet /> : null}</React.Fragment>;
};
export default ProtectedRoute;
