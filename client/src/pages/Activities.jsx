import React, { useEffect, useState } from 'react';
import getAllElements from '../utils/getAllElements';
import { useNavigate } from 'react-router-dom';

function Activities() {
    const collection = 'activities';
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllElements(collection)
            .then((info) => {
                setActivities(info);
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

            {''}
            <div className="activities-grid">
                {activities.map(activity => (
                    <div
                        key={activity._id}
                        className="activity-card"
                        onClick={() => handleClick(activity._id)}
                    >
                        <img src={activity.image} alt={activity.name} className="activity-image" />
                        <h3>{activity.name}</h3>
                        <p>{activity.description}</p>
                        <p>Status: {activity.status}</p>
                        <p>Price: ${activity.price}</p>
                        <p>Max Users: {activity.max_users}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Activities;
