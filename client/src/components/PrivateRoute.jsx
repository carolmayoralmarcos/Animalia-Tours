// PrivateRoute.js
import React, { useEffect, useState } from 'react';
import '../styles/styles.css';
import { Navigate } from 'react-router-dom';
import { getprofile } from '../utils/getprofile';

function PrivateRoute({ children, role }) {

    const [userRole, setUserRole] = useState('');
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            var res = getprofile(token);
            res.then((info) => {
                const newRole = info.data.role
                setUserRole(newRole);
            })
                .catch((error) => {
                    console.error(`Could not get data: ${error}`);
                })
        }
    }, [token])

    if (!token) {
        console.log('Error: No token');
        return <Navigate to="/login" />;
    }

    // if (!userRole) {
    //     console.log('Error: Not defined role');
    //     return <Navigate to="/login" />;
    // }

    // if (userRole !== role && userRole !== 'admin') {
    //     console.log('Error: bad role');
    //     return <Navigate to="/login" />;
    // }

    return children;

}

export default PrivateRoute;