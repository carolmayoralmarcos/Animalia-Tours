import React, { useEffect, useState, useContext } from 'react';
import getAllElements from '../utils/getAllElements';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';


function Activities() {
    const collection = 'activities';
    const [activities, setActivities] = useState([]);
    const { addToCart } = useContext(CartContext);
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
    return (
        <div className="activities-container">
            <h1>Activities</h1>
            <div className="activities-grid">
                {Array.isArray(activities) && activities.length > 0 ? (
                    activities.map(activity => (
                        <div
                            key={activity._id}
                            className="activity-card"
                        >
                            <img src={activity.image} alt={activity.name} className="activity-image" />
                            <h3>{activity.name}</h3>
                            <p>{activity.description}</p>
                            <p>Status: {activity.status}</p>
                            <p>Price: ${activity.price}</p>
                            <p>Max Users: {activity.max_users}</p>
                            <button onClick={() => addToCart(activity)}>Añadir al Carrito</button>
                            <button onClick={() => handleClick(activity.id)}>Ver Detalles</button>
                        </div>
                    ))
                ) : (
                    <p>No activities available.</p>
                )}
            </div>
        </div>
    );

}

export default Activities;
