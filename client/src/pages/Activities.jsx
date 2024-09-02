import React, { useEffect, useState, useContext } from 'react';
import getAllElements from '../utils/getAllElements';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { ActionButton } from '../components/ActionButton';
import Button from 'react-bootstrap/Button';
import "../styles/activities.css"

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
        removeFromCart(indexToRemove);
    };

    return (
        <div className="container">
            {/* Sticky Cart */}
            <div className="sticky-cart">
                <div className="cart-card">
                    <div className="cart-header">
                        <h5>Carrito <FaShoppingCart /></h5>
                    </div>
                    <ul className="cart-list">
                        {cart.length > 0 ? (
                            cart.map((item, index) => (
                                <li key={item._id} className="cart-item">
                                    {item.name} - Cantidad: {item.quantity}
                                    <button className="remove-button" onClick={() => removeStickyCart(index)}>
                                        <FaTrash />
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="cart-item empty">El carrito está vacío.</li>
                        )}
                    </ul>
                    <Link to="/cart" className="view-cart-button">Ver carrito</Link>
                </div>
            </div>

            <div className="activities">
                <h1 className="activities-title">Actividades</h1>
                <hr></hr>
                <div className="activities-grid">
                    {Array.isArray(activities) && activities.length > 0 ? (
                        activities.map(activity => (
                            <div key={activity._id} className="activity-card">
                                <img src={activity.image} alt={activity.name} className="activity-image" />
                                <div className="activity-details d-flex flex-column">
                                    <h5 className="activity-title">{activity.name}</h5>
                                    <p className="activity-description">{activity.description}</p>
                                    <p className="activity-status">Estado: {activity.status}</p>
                                    <p className="activity-price">Precio: {activity.price}€</p>
                                    <p className="activity-users">Máximo de Usuarios: {activity.max_users}</p>

                                    <div className="activity-actions mt-auto d-flex justify-content-between">
                                        <Button
                                            className="btn-custom me-2"
                                            onClick={() => addToCart(activity)}
                                        >
                                            +carrito
                                        </Button>
                                        <ActionButton className="w-100 me-2" text="Ver detalles" path={'/view/activities/' + activity._id} />
                                        <ActionButton className="w-100 me-2" text="Modificar" path={'/update/activities/' + activity._id} />
                                        <ActionButton className="w-100" text="+actividad" path={'/new/activity/'} />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-activities">No hay actividades disponibles.</p>
                    )}
                </div>
            </div>
            <hr></hr>
        </div>
    );
}

export default Activities;
