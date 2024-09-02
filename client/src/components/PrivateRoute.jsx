// PrivateRoute.js
import React, { useEffect, useState } from 'react';
import '../styles/styles.css';
import { useNavigate } from 'react-router-dom';
import { getprofile } from '../utils/getProfile';
import Spinner from 'react-bootstrap/Spinner';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



function PrivateRoute({ children, role }) {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    const [userRole, setUserRole] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token !== null) {
            var res = getprofile(token);
            res.then((info) => {
                setUserRole(info.data);
            })
                .catch((error) => {
                    console.error(`Could not get data: ${error}`);
                })
        }
    }, [token])

    if (token === null) {
        MySwal.fire({
            title: "No estás logeado",
            text: "Esta acción requiere de usuario",
            icon: "error",
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ve a login"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/login');
            } else if (result.isDenied) {
                navigate('/login');
            }
        });
        navigate("/login");
        return (
            <div className="container content my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h1>Cargando elemento...</h1>
            </div>)
    } else if (userRole === null) {
        return (
            <div className="container content my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h1>Cargando elemento...</h1>
            </div>)
    } else {
        if (userRole === '') {
            console.log('Error: Your user has no defined role.');
            navigate("/login");
        }
        if (userRole.role !== role && userRole.role !== 'admin') {
            MySwal.fire({
                title: "No tienes permisos",
                text: "Esta acción requiere de permisos de administración",
                icon: "error",
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ve a login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                } else if (result.isDenied) {
                    navigate('/login');
                }
            });
            navigate("/login");
        }
    }

    return children;

}

export default PrivateRoute;