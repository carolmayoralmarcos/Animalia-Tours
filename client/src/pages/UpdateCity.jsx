import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2'
import handleGetbyId from '../utils/getElementbyId';

const UpdateCity = () => {
    const { id } = useParams();
    const collection = 'cities';
    const navigate = useNavigate();

    const [updatedCity, setCityData] = useState({});

    useEffect(() => {
        const data = handleGetbyId(id, collection);
        data.then((info) => {
            setCityData(info.data);
            delete updatedCity._v; // deleting version for error control
        })
            .catch((error) => {
                console.error(`Could not get data: ${error}`);
            })
    }, [id, collection, updatedCity._v]);

    const updateElement = (ev) => {
        ev.preventDefault();
        fetch(`http://localhost:5000/api/${collection}/update/${id}`, {
            method: "PUT",
            body: JSON.stringify(updatedCity),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => response.json())
            .then((info) => {
                if (!info.success) {
                    throw new Error(info.data);
                }
                var updatedID = info.data._id;

                Swal.fire({
                    title: "Ciudad actualizada correctamente",
                    text: "¿Quieres ver el resultado?",
                    icon: "success",
                    showDenyButton: true,
                    confirmButtonColor: "#3085d6",
                    denyButtonColor: "#d33",
                    confirmButtonText: "Sí, por favor."
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`/view/cities/${updatedID}`);
                    } else if (result.isDenied) {
                        navigate('/cities');
                    }
                });
            })

            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "¡Algo ha ido mal!",
                    footer: err.hasOwnProperty("message") ? err.message : err
                });
                console.log('There was an error', err);
            })
    };

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setCityData({ ...updatedCity, [key]: value })
    }

    return (
        <div className="container content my-5">
            <h1 className="mb-5">Actualizando Ciudad: {updatedCity.name}</h1>
            <Form method="get" onSubmit={updateElement} onChange={handleChange}>
                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" >
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control id="name" type="text" value={updatedCity.name} required />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" >
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" rows={3} id="description" type="text" value={updatedCity.description} required />
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit">
                    Actualizar datos
                </Button>
            </Form>
        </div>
    )
};

export default UpdateCity;