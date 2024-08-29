import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
//import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Cities() {
    const [cities, setCities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/cities/all')
            .then((res) => res.json())
            .then((res) => setCities(res.data))
            .catch(err => {
                setError(err);
                console.log(error);
            });
    }, [error]);

    const navigate = useNavigate();

    const handleClick = (ev) => {
        const id = ev.target.id;
        navigate(`/view/city/${id}`);
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