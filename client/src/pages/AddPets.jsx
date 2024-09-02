import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getprofile } from '../utils/getProfile';

const NewPet = () => {

    const navigate = useNavigate();
    const [namePet, setName] = useState('');
    const [typePet, setType] = useState('');

    const createElement = async (ev) => {
        ev.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No user found. Please log in.",
            });
            return;
        }

        const result = await getprofile(token);
        if (!result.success) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to get user profile.",
            });
            return;
        }

        const userId = result.data._id;

        console.log(userId)

        const petData = {
            name: namePet,
            type: typePet,
        };

        try {

            const petResponse = await fetch(`http://localhost:5000/api/pets/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(petData),
            });

            const petDataResponse = await petResponse.json();

            if (!petDataResponse.success) {
                throw new Error(petDataResponse.data);
            }

            const petId = petDataResponse.data._id;

            const userResponse = await fetch(`http://localhost:5000/api/users/addPet/${userId}/${petId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });


            const userData = await userResponse.json();

            if (!userData.success) {
                throw new Error(userData.data || 'Unknown error occurred');
            }

            Swal.fire({
                title: "Elemento creado.",
                text: "¿Quieres ver el resultado?",
                icon: "success",
                showDenyButton: true,
                confirmButtonColor: "#3085d6",
                denyButtonColor: "#d33",
                confirmButtonText: "Sí, por favor."
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        if (petId) {
                            navigate(`/view/pets/${petId}`);
                        } else {
                            console.error("Pet ID is undefined");
                        }
                    } else if (result.isDenied) {
                        navigate('/profile');
                    }
                });

        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Algo ha ido mal!",
                footer: err.hasOwnProperty("message") ? err.message : err
            });
            console.log('There was an error', err);
        }
    };

    return (
        <div className="container my-5">
            <div className="content">
                <h1 className="mb-5">Creando nueva Mascota</h1>
                <Form method="post" onSubmit={createElement}>
                    <Form.Group as={Col} className="mb-3" controlId="name">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            value={namePet || ''}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="type">
                        <Form.Label>Tipo de Mascota</Form.Label>
                        <Form.Control
                            as="select"
                            value={typePet}
                            onChange={(e) => setType(e.target.value)}
                            required
                        >
                            <option value="">Selecciona un tipo</option>
                            <option value="cat">Gato</option>
                            <option value="dog">Perro</option>
                            <option value="rabbit">Conejo</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Crear nueva
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default NewPet;
