// PrivateRoute.js
import React, { useEffect, useState } from 'react';
import '../styles/styles.css';
import { Navigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { getprofile } from '../utils/getprofile';

function PrivateRoute({ children, role }) {

    const [userRole, setUserRole] = useState('');
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            var res = getprofile(token);
            res.then((info) => {
                setUserRole(info.data.role);
            })
                .catch((error) => {
                    console.error(`Could not get data: ${error}`);
                })
        }
    }, [token])

    if (!token) {
        return <Navigate to="/login" />;
    }

    setTimeout(() => {
        if (userRole !== role) {
            return <Navigate to="/login" />;
        }
    }, 250);

    if (!userRole) {
        return (
            <div className="container content">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h1>Loading...</h1>
            </div>)
    }
    return children;
}

export default PrivateRoute;