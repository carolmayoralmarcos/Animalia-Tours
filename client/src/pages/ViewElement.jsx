import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import getElementbyId from '../utils/getElementbyId';
import Spinner from 'react-bootstrap/Spinner';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import getActivitiesbyCity from '../utils/getActivitiesbyCity';
import { CartContext } from '../context/CartContext';
import { ActionButton } from '../components/ActionButton';

const ViewElement = () => {
    const { id, collection } = useParams();

    const [data, setData] = useState(null);
    const [activities, setActivities] = useState(null);
    const { cart, addToCart, removeFromCart } = useContext(CartContext);

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            var res = getElementbyId(id, collection);
            res.then((info) => {
                setData(info.data);
            })
                .catch((error) => {
                    console.error(`Could not get data: ${error}`);
                })
        }, 750);
    }, [collection, id]);

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

    const goToShop = () => {
        navigate('/cart');
    };

    const removeStickyCart = (indexToRemove) => {
        // Ensure you are using the correct method from CartContext
        removeFromCart(indexToRemove);
    };

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
    ) : (
        <div className="container-fluid ">
            {/* Sticky Cart */}
            <div className="position-fixed bottom-0 end-0 p-3" style={{ width: '300px', zIndex: 1050 }}>
                <div className="card">
                    <div className="card-header text-center">
                        <h5 className="mb-0">Carrito <FaShoppingCart /></h5>
                    </div>
                    <ul className="list-group list-group-flush">
                        {cart.length > 0 ? (
                            cart.map((item, index) => (
                                <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {item.name}
                                    <button className="btn btn-danger btn-sm" onClick={() => removeStickyCart(index)}>
                                        <FaTrash />
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="list-group-item">El carrito está vacío.</li>
                        )}
                    </ul>
                    <div className=" card-body text-center">
                        <button className="btn btn-primary" onClick={goToShop}> ir a carrito
                        </button>
                    </div>
                </div>
            </div>
            <div className="container content my-5">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img src={data.image} className="rounded" alt="Element" style={{ maxHeight: '400px', maxWidth: '500px' }} />
                        <button className="btn btn-primary me-2 mt-5" onClick={() => addToCart(data)}>Añadir al Carrito</button>
                    </div>
                    <div className="col-md-6">
                        <div className="card-body ms-5">
                            <h1>{data.name}</h1>
                            <h3>Precio - {data.price}€</h3>
                            <br></br>
                            <h4><Link to={`/view/cities/${data.city_id._id}`}>{data.city_id.name}</Link></h4>
                            <br></br>
                            <p>{data.description}</p>
                            <br></br>
                            <p><b>Fecha</b>: {new Date(data.date).toLocaleDateString()}</p>
                            <p><b>Status</b>: {data.status}</p>
                            <p><b>Max number of participants</b>: {data.max_users}</p>
                            <p><b>Current number of participants</b>: {data.current_users}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return returnedData;

};

export default ViewElement;