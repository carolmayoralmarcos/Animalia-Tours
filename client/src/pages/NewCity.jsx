import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2'

const NewCity = () => {

    const navigate = useNavigate();

    const [nameCity, setName] = useState('');
    const [descriptionCity, setDescription] = useState('');
    const [imageCity, setImage] = useState('');

    const createElement = (ev) => {
        ev.preventDefault();

        const formData = new FormData();
        formData.append('image', imageCity);
        formData.append('name', nameCity);
        formData.append('description', descriptionCity);


        fetch(`http://localhost:5000/api/cities/new`, {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then((info) => {
                if (!info.success) {
                    throw new Error(info.data);
                }
                var id = info.data._id;

                Swal.fire({
                    title: "Elemento creado.",
                    text: "¿Quieres ver el resultado?",
                    icon: "success",
                    showDenyButton: true,
                    confirmButtonColor: "#3085d6",
                    denyButtonColor: "#d33",
                    confirmButtonText: "Sí, por favor."
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`/view/cities/${id}`);
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

    const onFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="container my-5">
            <div className="content">
                <h1 className="mb-5">Creando nueva Ciudad</h1>
                <Form method="get" onSubmit={createElement} >
                    <Form.Group as={Col} className="mb-3" controlId="name">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" value={nameCity || ''} onChange={(e) => { setName(e.target.value) }} required />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="nationality">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" rows={3} value={descriptionCity || ''} required onChange={(e) => { setDescription(e.target.value) }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="photo">
                        <Form.Label>Imagen</Form.Label>
                        <Form.Control type="file" onChange={onFileChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Crear nueva
                    </Button>
                </Form>
            </div>
        </div>
    )
};

export default NewCity;