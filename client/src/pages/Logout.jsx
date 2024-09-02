import React, { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';

function Logout() {

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            localStorage.removeItem('token');
            // Actualiza la página para eliminar el CartContext
            window.location.reload(false);
            navigate("/login");
        }, 1000);
    }, [navigate]);


    return (
        <div className="container content my-5">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h1>Haciendo logout...</h1>
        </div>)

}

export default Logout;