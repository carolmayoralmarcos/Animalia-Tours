import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';


const NewPet = () => {

    const navigate = useNavigate();

    const [namePet, setName] = useState('');
    const [typePet, setType] = useState('');



    const createElement = (ev) => {
        ev.preventDefault();

        const formData = new FormData();
        formData.append('name', namePet);
        formData.append('type', typePet);


        fetch(`http://localhost:5000/api/pets/new`, {
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
                        navigate(`/view/pets/${id}`);
                    } else if (result.isDenied) {
                        navigate('/profile');
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

    return (
        <div className="container my-5">
            <div className="content">
                <h1 className="mb-5">Creando nueva Mascota</h1>
                <Form method="get" onSubmit={createElement} >
                    <Form.Group as={Col} className="mb-3" controlId="name">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" value={namePet || ''} onChange={(e) => { setName(e.target.value) }} required />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="nationality">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" rows={3} value={typePet || ''} required onChange={(e) => { setType(e.target.value) }} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Crear nueva
                    </Button>
                </Form>
            </div>
        </div>
    )
};

export default NewPet;