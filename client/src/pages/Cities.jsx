import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { ActionButton } from '../components/ActionButton';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import getAllElements from '../utils/getAllElements';
import deleteElement from '../utils/deleteElement';

function Cities() {
    const collection = 'cities';
    const [cities, setCities] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        var res = getAllElements(collection);
        res.then((info) => {
            setCities(info.data);
        })
            .catch((error) => {
                console.error(`Could not get data: ${error}`);
            })
    }, []);

    const handleDelete = (ev) => {
        const id = ev.target.id;
        Swal.fire({
            title: "¿Seguro que quieres eliminar el elemento?",
            text: "Esta acción no se puede revertir.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, ¡elimínalo!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteElement(id, "cities");
                Swal.fire({
                    title: "Eliminado",
                    text: "El elemento ha sido eliminado.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload(false);
                        navigate('/cities');
                    }
                })
            }
        });
    }

    return (
        <div className="container my-5">
            <ActionButton className="content" text="CREAR NUEVO ELEMENTO" path={'/new/city'} delay={0} type="success" />
            <div className="d-flex flex-wrap my-3">
                {cities.map((city, index) => {
                    return (
                        <Card className="my-4 mx-4" key={index} style={{ width: '20rem' }}>
                            <Card.Img variant="top" src={city.image} />
                            <Card.Body>
                                <Card.Title>{city.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{city.description}</Card.Subtitle>
                                <Accordion defaultActiveKey="1">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Acciones</Accordion.Header>
                                        <Accordion.Body>
                                            <div className='action-buttons'>
                                                <ActionButton text="Ver detalles" path={'/view/cities/' + city._id} delay={0} type="primary" />
                                                <ActionButton text="Modificar" path={'/update/cities/' + city._id} delay={0} type="secondary" />
                                                <Button className="btn btn-danger" id={city._id} onClick={handleDelete} >Eliminar</Button>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
};

export default Cities;