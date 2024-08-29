import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
//import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import getAllElements from '../utils/getAllElements';

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

    const handleClick = (ev) => {
        const id = ev.target.id;
        navigate(`/view/cities/${id}`);
    }

    return (
        <div className="container">
            <div className="d-flex flex-wrap my-5 justify-content-between">
                {cities.map((city, index) => {
                    return (
                        <Card key={index} style={{ width: '20rem' }}>
                            <Card.Img variant="top" src={city.image} />
                            <Card.Body>
                                <Card.Title>{city.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{city.description}</Card.Subtitle>
                                <Accordion defaultActiveKey="1">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Actions</Accordion.Header>
                                        <Accordion.Body>
                                            <div className='action-buttons'>
                                                <Button className="btn btn-secondary" id={city._id} onClick={handleClick} >Ver detalle</Button>
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