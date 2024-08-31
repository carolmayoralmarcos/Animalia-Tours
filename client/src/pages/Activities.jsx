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
        <div className="container-fluid" style={{ backgroundColor: '#FFEFC1', minHeight: '100vh', padding: '2rem' }}>
            {/* Sticky Cart */}
            <div className="position-fixed bottom-0 end-0 p-3" style={{ width: '300px', zIndex: 1050 }}>
                <div className="card shadow-lg rounded border-0" style={{ backgroundColor: '#FFF9E3' }}>
                    <div className="card-header text-center bg-white text-dark border-0">
                        <h5 className="mb-0">Carrito <FaShoppingCart /></h5>
                    </div>
                    <ul className="list-group list-group-flush">
                        {cart.length > 0 ? (
                            cart.map((item, index) => (
                                <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center border-0" style={{ backgroundColor: '#FFEFC1' }}>
                                    {item.name}
                                    <button className="btn btn-outline-danger btn-sm" onClick={() => removeStickyCart(index)}>
                                        <FaTrash />
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="list-group-item border-0 text-center" style={{ backgroundColor: '#FFEFC1' }}>El carrito está vacío.</li>
                        )}
                    </ul>
                    <Link to="/cart">
                        <Button variant="outline-dark" className="mt-3 w-100">Ver carrito</Button>
                    </Link>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col">
                    <h1 className="text-center mb-4 text-dark">Actividades</h1>
                    <div className="row row-cols-1 row-cols-md-2 g-5">
                        {Array.isArray(activities) && activities.length > 0 ? (
                            activities.map(activity => (
                                <div key={activity._id} className="col mb-4 d-flex">
                                    <div className="card h-100 shadow-sm rounded border-0 d-flex flex-column" style={{ backgroundColor: '#FFF9E3' }}>
                                        <img src={activity.image} alt={activity.name} className="card-img-top rounded-top" style={{ objectFit: 'cover', height: '200px' }} />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title text-dark">{activity.name}</h5>
                                            <p className="card-text text-muted">{activity.description}</p>
                                            <p className="card-text text-dark">Estado: {activity.status}</p>
                                            <p className="card-text text-dark">Precio: ${activity.price}</p>
                                            <p className="card-text text-dark">Máximo de Usuarios: {activity.max_users}</p>

                                            <div className="mt-auto">
                                                <Button
                                                    className="btn btn-primary w-100 mb-2"
                                                    size="md"
                                                    id={activity._id}
                                                    onClick={() => addToCart(activity)}
                                                >
                                                    + Añadir al carrito
                                                </Button>

                                                <div className="d-flex justify-content-between">
                                                    <ActionButton text="Ver detalles" path={'/view/activities/' + activity._id} delay={0} type="outline-dark" size="md" />
                                                    <ActionButton text="Modificar" path={'/update/activities/' + activity._id} delay={0} type="outline-secondary" size="md" />
                                                    <ActionButton text="Añadir actividad" path={'/new/activity/'} delay={0} type="outline-secondary" size="md" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-dark">No hay actividades disponibles.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Activities;
