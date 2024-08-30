// PrivateRoute.js
import React, { useEffect, useState } from 'react';
import '../styles/styles.css';
import { useNavigate } from 'react-router-dom';
import { getprofile } from '../utils/getprofile';
import Spinner from 'react-bootstrap/Spinner';

function PrivateRoute({ children, role }) {

    const navigate = useNavigate();

    const [userRole, setUserRole] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            var res = getprofile(token);
            res.then((info) => {
                setUserRole(info.data);
            })
                .catch((error) => {
                    console.error(`Could not get data: ${error}`);
                })
        }
    }, [])

    if (userRole === null) {
        return (
            <div className="container content my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h1>Cargando elemento...</h1>
            </div>)
    } else {

        if (!token) {
            console.log('Error: You are not authenticated.');
            navigate("/login");
        }

        if (!userRole) {
            console.log('Error: Your user has no role.');
            navigate("/login");
        }

        if (userRole.role !== role && userRole.role !== 'admin') {
            console.log('Error: You have no permissions.');
            navigate("/login");
        }
    }

    return children;

}

export default PrivateRoute;