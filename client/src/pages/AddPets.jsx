import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getprofile } from '../utils/getprofile';

const NewPet = ({ userId }) => {
    const navigate = useNavigate();

    const [namePet, setName] = useState('');
    const [typePet, setType] = useState('');

    const createElement = async (ev) => {
        ev.preventDefault();

        const formData = new FormData();
        formData.append('name', namePet);
        formData.append('type', typePet);

        const token = localStorage.getItem("token");
        const profileResult = await getprofile(token);

        try {

            const petResponse = await fetch(`http://localhost:5000/api/pets/new`, {
                method: "POST",
                body: formData,

            });

            const petData = await petResponse.json();

            if (!petData.success) {
                throw new Error(petData.data);
            }

            const newPetId = petData.data._id;


            const userResponse = await fetch(`http://localhost:5000/api/users/addPet/${userId}/${newPetId}`, {
                method: "PUT",
                // headers: {
                //     'Authorization': `Bearer ${token}`,
                // },
            });

            const userData = await userResponse.json();

            if (!userData.success) {
                throw new Error(userData.data);
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
                        navigate(`/view/pets/${newPetId}`);
                    } else if (result.isDenied) {
                        navigate('/profile');
                    }
                });

        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Algo ha ido mal!",
                footer: err.message
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
