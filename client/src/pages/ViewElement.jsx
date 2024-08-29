import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getElementbyId from '../utils/getElementbyId';
import Spinner from 'react-bootstrap/Spinner';

const ViewElement = () => {
    const { id, collection } = useParams();

    const [data, setData] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            var res = getElementbyId(id, collection);
            res.then((info) => {
                setData(info.data);
            })
                .catch((error) => {
                    console.error(`Could not get data: ${error}`);
                })
        }, 2000);
    }, [collection, id]);

    if (!data) {
        return (
            <div className="container content my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h1>Searching for element...</h1>
            </div>)
    }

    const returnedData = (collection === 'cities') ? (
        <div className="container content my-5">
            <div className="row g-0">
                <div className="col-md-6">
                    <img src={data.image} className="rounded" alt="Element" style={{ maxHeight: '400px', maxWidth: '500px' }} />
                </div>
                <div className="col-md-6">
                    <div className="card-body ms-5">
                        <h1>{data.name}</h1>
                        <br></br>
                        <p>{data.description}</p>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        // Aquí podemos poner else if por cada tipo de contenido ;)
        <div className="container content">
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <br></br>
            <h4>Whatever:</h4>
            <ul>
                {data.philosophers.map((philo, key) => {
                    return <li key={key}>{philo.name}</li>
                })}
            </ul>
        </div>
    );

    return returnedData;

};

export default ViewElement;