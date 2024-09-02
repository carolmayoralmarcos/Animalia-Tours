import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getElementbyId from '../utils/getElementbyId';
import Spinner from 'react-bootstrap/Spinner';
import getActivitiesbyCity from '../utils/getActivitiesbyCity';
import { ActionButton } from '../components/ActionButton';

const ViewElement = () => {
    const { id, collection } = useParams();

    const [data, setData] = useState(null);
    const [activities, setActivities] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            var res = getElementbyId(id, collection);
            res.then((info) => {
                if (collection === 'pets') {
                    switch (info.data.type) {
                        case 'cat':
                            setData({ ...info.data, 'tipo': 'Gato' });
                            break;
                        case 'dog':
                            setData({ ...info.data, 'tipo': 'Perro' });
                            break;
                        case 'rabbit':
                            setData({ ...info.data, 'tipo': 'Conejo' });
                            break;
                        default:
                            setData({ ...info.data, 'tipo': 'Mascota' });
                            break;
                    }
                } else {
                    setData(info.data);
                }
            })
                .catch((error) => {
                    console.error(`Could not get data: ${error}`);
                })
        }, 750);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (collection === 'cities' && data !== null) {
                var res = getActivitiesbyCity(data._id);
                res.then((info) => {
                    setActivities(info.data);
                })
                    .catch((error) => {
                        console.error(`Could not get data: ${error}`);
                    })
            }
        }, 1000);
    }, [collection, data]);

    if (collection === 'cities') {
        if (!data || !activities) {
            return (
                <div className="container content my-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </Spinner>
                    <h1>Buscando elemento...</h1>
                </div>)
        }
    } else {
        if (!data) {
            return (
                <div className="container content my-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </Spinner>
                    <h1>Buscando elemento...</h1>
                </div>)
        }
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
            {/* AQUÍ VAN LAS ACTIVIDADES */}
            <div className="container content my-5">
                <h2>Actividades disponibles en {data.name}</h2>
                {activities.map((activity, index) =>
                (
                    <div key={index} className="row g-0 my-5">
                        <div className="col-md-3">
                            <img src={activity.image} className="rounded" alt="Element" style={{ maxHeight: '200px', maxWidth: '250px' }} />
                        </div>
                        <div className="col-md-9">
                            <div className="card-body ms-5">
                                <h3>{activity.name}</h3>
                                <h5>Precio - {activity.price}€</h5>
                                <p>{activity.description}</p>
                                <ActionButton text="Ver detalles" path={'/view/activities/' + activity._id} delay={0} type="primary" />
                            </div>
                        </div>
                    </div>
                )
                )}
            </div>
        </div>
    ) : (collection === 'pets') ? (
        <div>
            <div className="container content">
                <div className="row g-0">
                    <div className="col-md-6">
                        <div className="card-body ms-5">
                            <h1>{data.name}</h1>
                            <p>{data.tipo}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="container content my-5">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={data.activity.image} className="rounded" alt="Element" style={{ maxHeight: '400px', maxWidth: '400px' }} />
                </div>
                <div className="col-md-8">
                    <div className="card-body ms-5">
                        <h1>Reserva #{data._id}</h1>
                        <br></br>
                        <h3>{data.activity.name}</h3>
                        <br></br>
                        <p><b>Estado:</b> {data.status}</p>
                    </div>
                </div>
            </div>
        </div>
    )



    return returnedData;

};

export default ViewElement;