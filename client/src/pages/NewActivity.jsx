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
            <h1>Crear Nueva Actividad</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input type="text" name="name" value={activity.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Descripción</label>
                    <textarea name="description" value={activity.description} onChange={handleChange} required />
                </div>

                <div>
                    <label>Estado</label>
                    <select name="status" value={activity.status} onChange={handleChange}>
                        <option value="open">Abierta</option>
                        <option value="closed">Cerrada</option>
                        <option value="full">Llena</option>
                    </select>
                </div>
                <div>
                    <label>Usuarios Máximos</label>
                    <input type="number" name="max_users" value={activity.max_users} onChange={handleChange} required />
                </div>
                <div>
                    <label>Fecha</label>
                    <input type="date" name="date" value={activity.date} onChange={handleChange} required />
                </div>
                <div>
                    <label>Precio</label>
                    <input type="number" name="price" value={activity.price} onChange={handleChange} required />
                </div>
                <div>
                    <label>ID de la Ciudad</label>
                    <input type="text" name="city_id" value={activity.city_id} onChange={handleChange} />
                </div>
                <button type="submit">Crear Actividad</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default NewActivity;
