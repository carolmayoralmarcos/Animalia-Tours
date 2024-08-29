import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchActivityById } from '../utils/getactivitybyid';

const ActivityById = () => {
    const { id } = useParams();
    const [activity, setActivity] = useState(null);

    useEffect(() => {
        const loadActivity = async () => {
            try {
                const fetchedActivity = await fetchActivityById(id);
                setActivity(fetchedActivity);
            } catch (error) {
                console.error("Error fetching activity:", error);
            }
        };

        loadActivity();
    }, [id]);

    if (!activity) return null;

    return (
        <div className="container content">
            <h1>{activity.name}</h1>
            <img src={activity.image} alt={activity.name} />
            <p>{activity.description}</p>
            <p>Status: {activity.status}</p>
            <p>Max Users: {activity.max_users}</p>
            <p>Current Users: {activity.current_users}</p>
            <p>Date: {activity.date}</p>
            <p>Price: ${activity.price}</p>
            <p>City: {activity.city_id.name}</p>
        </div>
    );
};

export default ActivityById;
