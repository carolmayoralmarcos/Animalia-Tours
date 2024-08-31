import React, { useEffect, useState, useContext } from 'react';
import getAllElements from '../utils/getAllElements';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { ActionButton } from '../components/ActionButton';

function Activities() {
    const collection = 'activities';
    const [activities, setActivities] = useState([]);
    const { cart, addToCart, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        getAllElements(collection)
            .then((info) => {
                setActivities(info.data);
            })
            .catch((error) => {
                console.error(`Could not get data: ${error}`);
            });
    }, [collection]);

    const handleClick = (id) => {
        navigate(`/view/activities/${id}`);
    };

    const removeStickyCart = (indexToRemove) => {
        removeFromCart(indexToRemove); // Elimina la actividad del carrito
    };

    return (
        <div className="container-fluid">
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
                    <Link to="/cart">
                        <Button variant="warning" className="mt-3">Ver carrito</Button>
                    </Link>

                </div>
            </div>

            <div className="row mt-5">
                <div className="col">
                    <h1 className="text-center mb-4">Activities</h1>
                    <div className="row">
                        {Array.isArray(activities) && activities.length > 0 ? (
                            activities.map(activity => (
                                <div key={activity._id} className="col-md-6 mb-4 d-flex align-items-stretch">
                                    <div className="card h-100 shadow-sm">
                                        <img src={activity.image} alt={activity.name} className="card-img-top" />
                                        <div className="card-body">
                                            <h5 className="card-title">{activity.name}</h5>
                                            <p className="card-text">{activity.description}</p>
                                            <p className="card-text">Status: {activity.status}</p>
                                            <p className="card-text">Price: ${activity.price}</p>
                                            <p className="card-text">Max Users: {activity.max_users}</p>

                                            <Button className="btn btn-danger" id={activity._id} onClick={addToCart} > + Añadir</Button>

                                            <ActionButton text="Ver detalles" path={'/view/activities/' + activity._id} delay={0} type="primary" />
                                            <ActionButton text="Modificar" path={'/update/activities/' + activity._id} delay={0} type="secondary" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No activities available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Activities;
