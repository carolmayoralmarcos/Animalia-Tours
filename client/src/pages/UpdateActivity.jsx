import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2';
import getElementbyId from '../utils/getElementbyId';

const UpdateActivity = () => {
    const { id, activities } = useParams();         //collection
    const navigate = useNavigate();
    const [updatedActivity, setActivityData] = useState({
        name: '',
        description: '',
        status: 'open',
        max_users: 3,
        date: '',
        price: 0,
        city_id: ''
    });

    useEffect(() => {
        if (id && activities) {                     //collection
        const fetchData = async () => {
            try {
                const info = await getElementbyId(id, activities); //collecton
                if (info && info.data) {
                    const { _v, ...rest } = info.data; 
                    setActivityData(rest);
                }
            } catch (error) {
                console.error(`Could not get data: ${error}`);
            }
        };

        fetchData();

        } else {
            console.error('Missing collection or id parameter');
        }

    }, [id, activities]);             //collection

    const updateElement = (ev) => {
        ev.preventDefault();
        fetch(`http://localhost:5000/api/${activities}/update/${id}`, {         //collection
            method: "PUT",
            body: JSON.stringify(updatedActivity),
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
                    title: "Activity updated successfully!",
                    text: "Do you want to see the result?",
                    icon: "success",
                    showDenyButton: true,
                    confirmButtonColor: "#3085d6",
                    denyButtonColor: "#d33",
                    confirmButtonText: "Yes, please."
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`/view/activity/${updatedID}`);
                    } else if (result.isDenied) {
                        navigate('/activities');
                    }
                });
            })

            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: err.hasOwnProperty("message") ? err.message : err
                });
                console.log('There was an error', err);
            })
    };

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setActivityData({ ...updatedActivity, [key]: value })
    }

    return (
        <div className="content">
            <h1 className="mb-5">Actualizando Actividad: {updatedActivity.name}</h1>
            <Form method="get" onSubmit={updateElement} onChange={handleChange}>
                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control id="name" type="text" value={updatedActivity.name} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" >
                        <Form.Label>Description</Form.Label>
                        <Form.Control id="description" type="text" value={updatedActivity.description} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" >
                        <Form.Label>Status</Form.Label>
                        <Form.Control id="status" type="text" value={updatedActivity.status} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" >
                        <Form.Label>Max_users</Form.Label>
                        <Form.Control id="max_users" type="number" value={updatedActivity.max_users} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" >
                        <Form.Label>Date</Form.Label>
                        <Form.Control id="date" type="date" value={updatedActivity.date} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" >
                        <Form.Label>Price</Form.Label>
                        <Form.Control id="price" type="number" value={updatedActivity.price} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" >
                        <Form.Label>City_id</Form.Label>
                        <Form.Control id="city_id" type="text" value={updatedActivity.city_id} onChange={handleChange} required />
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit">
                    Actualizar datos
                </Button>
            </Form>
        </div>
    )
};

export default UpdateActivity;