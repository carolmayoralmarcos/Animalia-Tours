import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Navigate } from 'react-router-dom';

function Logout() {

    const [token, setToken] = useState('');
    setToken(localStorage.getItem("token"));

    useEffect(() => {
        setTimeout(() => {
            localStorage.removeItem('token');
            setToken(localStorage.getItem("token"));
        }, 2000);
    }, [token]);

    if (token) {
        return (
            <div className="container content my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h1>Haciendo logout...</h1>
            </div>)
    }

    return <Navigate to="/login" />;
}

export default Logout;