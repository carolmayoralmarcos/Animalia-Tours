import React, { useState } from 'react';
import { createactivity } from '../utils/createactivity';

const NewActivity = () => {
    const [activity, setActivity] = useState({
        name: '',
        description: '',
        image: '',
        status: 'open',
        max_users: 3,
        date: '',
        price: 0,
        city_id: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActivity({
            ...activity,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await createactivity(activity);
        if (result.success) {
            setMessage(`Activity created successfully: ${result.data.name}`);
        } else {
            setMessage(`Error: ${result.error}`);
        }
    };

    return (
        <div className="container content">
            <h1>Create New Activity</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={activity.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Description</label>
                    <textarea name="description" value={activity.description} onChange={handleChange} required />
                </div>

                <div>
                    <label>Status</label>
                    <select name="status" value={activity.status} onChange={handleChange}>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                        <option value="full">Full</option>
                    </select>
                </div>
                <div>
                    <label>Max Users</label>
                    <input type="number" name="max_users" value={activity.max_users} onChange={handleChange} required />
                </div>
                <div>
                    <label>Date</label>
                    <input type="date" name="date" value={activity.date} onChange={handleChange} required />
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" name="price" value={activity.price} onChange={handleChange} required />
                </div>
                <div>
                    <label>City ID</label>
                    <input type="text" name="city_id" value={activity.city_id} onChange={handleChange} />
                </div>
                <button type="submit">Create Activity</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default NewActivity;
