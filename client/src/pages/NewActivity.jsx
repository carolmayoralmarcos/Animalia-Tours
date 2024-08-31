import React, { useState } from 'react';
import { createactivity } from '../utils/createactivity';

const NewActivity = () => {
    const [activity, setActivity] = useState({
        name: '',
        description: '',
        image: null,
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

    const handleImageChange = (e) => {
        setActivity({
            ...activity,
            image: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', activity.name);
        formData.append('description', activity.description);
        formData.append('image', activity.image);
        formData.append('status', activity.status);
        formData.append('max_users', activity.max_users);
        formData.append('date', activity.date);
        formData.append('price', activity.price);
        formData.append('city_id', activity.city_id);

        const result = await createactivity(formData);

        if (result.success) {
            setMessage(`Activity created successfully: ${result.data.name}`);
        } else {
            setMessage(`Error: ${result.error}`);
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <h1 className="mb-4">Crear Nueva Actividad</h1>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="form-group mb-3">
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={activity.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Imagen</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Descripción</label>
                    <textarea
                        name="description"
                        value={activity.description}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Estado</label>
                    <select
                        name="status"
                        value={activity.status}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="open">Abierta</option>
                        <option value="closed">Cerrada</option>
                        <option value="full">Llena</option>
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label>Usuarios Máximos</label>
                    <input
                        type="number"
                        name="max_users"
                        value={activity.max_users}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Fecha</label>
                    <input
                        type="date"
                        name="date"
                        value={activity.date}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Precio</label>
                    <input
                        type="number"
                        name="price"
                        value={activity.price}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-4">
                    <label>ID de la Ciudad</label>
                    <input
                        type="text"
                        name="city_id"
                        value={activity.city_id}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear Actividad</button>
            </form>
            {message && <div className="alert alert-info mt-4">{message}</div>}
        </div>
    );
}

export default NewActivity;
