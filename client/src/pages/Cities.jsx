import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ActionButton } from '../components/ActionButton';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import getAllElements from '../utils/getAllElements';
import deleteElement from '../utils/deleteElement';
import SearchBar from '../components/SearchBar';
import "../styles/cities.css"
import { getprofile } from '../utils/getProfile';

function Cities() {
    const collection = 'cities';
    const [cities, setCities] = useState([]);
    const [OGcities, setOGCities] = useState([]);
    const [cityNames, setCityNames] = useState([]);
    const [userRole, setUserRole] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token !== null) {
            var res = getprofile(token);
            res.then((info) => {
                setUserRole(info.data.role);
            })
                .catch((error) => {
                    console.error(`Could not get data: ${error}`);
                })
        }
    }, [token])

    const navigate = useNavigate();

    useEffect(() => {
        var res = getAllElements(collection);
        res.then((info) => {
            setCities(info.data);
            setOGCities(info.data);
            setCityNames(info.data.map((city) => city.name));
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

    const handleSearch = (ev) => {
        ev.preventDefault();
        const name = ev.target.search.value;
        const filteredCity = OGcities.filter((city) => city.name === name);
        if (name === '') {
            setCities(OGcities);
        } else {
            setCities(filteredCity);
        }
    }

    const returnedDiv = (userRole === 'admin') ? (
        <div className="container">
            <div className="d-flex flex-column align-items-left my-5">
                <Form method="get" onSubmit={handleSearch} className="d-flex justify-content-left">
                    <SearchBar suggestions={cityNames} />
                    <div class="input-group-append">
                        <Button variant="btn btn-custom" type="submit" className="ml-2">Buscar</Button>
                    </div>
                </Form>
            </div>
            <div className='d-flex flex-wrap my-4 mx-4'>
                <ActionButton text="CREAR NUEVO ELEMENTO" path={'/new/city'} delay={0} type="custom" className="ml-2" />
            </div>

            <div className="d-flex flex-wrap">
                {cities.map((city, index) => {
                    return (
                        <Card className="my-4 mx-4" key={index} style={{ width: '35rem' }}>
                            <Card.Img variant="top" src={city.image} style={{ maxHeight: '1000px' }} />
                            <Card.Body>
                                <Card.Title>{city.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{city.description.substring(0, 100) + "..."}</Card.Subtitle>
                                <Accordion defaultActiveKey="1">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Ver opciones</Accordion.Header>
                                        <Accordion.Body>
                                            <div className='action-buttons mb-3'>
                                                <ActionButton text="Ver detalles" path={'/view/cities/' + city._id} delay={0} type="primary" />
                                                <ActionButton text="Modificar" path={'/update/cities/' + city._id} delay={0} type="secondary" />
                                                <Button className="btn btn-custom" id={city._id} onClick={handleDelete} >Eliminar</Button>
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
    ) : (
        <div className="container">
            <div className="d-flex flex-column align-items-left my-5">
                <Form method="get" onSubmit={handleSearch} className="d-flex justify-content-left">
                    <SearchBar suggestions={cityNames} />
                    <div class="input-group-append">
                        <Button variant="btn btn-custom" type="submit" className="ml-2">Buscar</Button>
                    </div>
                </Form>
            </div>

            <div className="d-flex flex-wrap">
                {cities.map((city, index) => {
                    return (
                        <Card className="my-4 mx-4" key={index} style={{ width: '35rem' }}>
                            <Card.Img variant="top" src={city.image} style={{ maxHeight: '1000px' }} />
                            <Card.Body>
                                <Card.Title>{city.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{city.description.substring(0, 100) + "..."}</Card.Subtitle>
                                <ActionButton text="Ver detalles" path={'/view/cities/' + city._id} delay={0} type="primary" />
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
        </div>
    )

    return returnedDiv;
};

export default Cities;
