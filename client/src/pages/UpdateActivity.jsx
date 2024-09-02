import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import getElementbyId from '../utils/getElementbyId';
import '../styles/NewActivity.css';

const UpdateActivity = () => {
    const { id } = useParams();
    const collection = 'activities';
    const navigate = useNavigate();

    const [updatedActivity, setActivityData] = useState({
        name: '',
        description: '',
        image: null,
        status: 'open',
        max_users: 3,
        date: '',
        price: 0,
        city_id: ''
    });

    const [cities, setCities] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const info = await getElementbyId(id, collection);
                    if (info && info.data) {
                        const { __v, ...rest } = info.data; 
                        setActivityData(rest);
                    }
                } catch (error) {
                    console.error(`Could not get data: ${error}`);
                }
            };
            fetchData();
        } else {
            console.error('Missing id parameter');
        }
    }, [id]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cities/all');
                const data = await response.json();
                if (data.success) {
                    setCities(data.data);
                } else {
                    setMessage('No se pudieron cargar las ciudades');
                }
            } catch (error) {
                setMessage('Error al obtener las ciudades');
            }
        };

        fetchCities();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActivityData({
            ...updatedActivity,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        setActivityData({
            ...updatedActivity,
            image: e.target.files[0]
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    const updateElement = (ev) => {
        ev.preventDefault();


        const formData = new FormData();
        formData.append('name', updatedActivity.name);
        formData.append('description', updatedActivity.description);
        if (updatedActivity.image) {
            formData.append('image', updatedActivity.image);
        }
        formData.append('status', updatedActivity.status);
        formData.append('max_users', updatedActivity.max_users);
        formData.append('date', updatedActivity.date);
        formData.append('price', updatedActivity.price);
        formData.append('city_id', updatedActivity.city_id);

        fetch(`http://localhost:5000/api/activities/update/${id}`, {
            method: "PUT",
            body: formData,
            headers: {
                // "Content-Type": "multipart/form-data", // No es necesario configurar esto con FormData
            }
        })
            .then(response => response.json())
            .then((info) => {
                if (!info.success) {
                    throw new Error(info.data);
                }
                var updatedID = info.data._id;

                Swal.fire({
                    title: "¡Actividad actualizada con éxito!",
                    text: "¿Quieres ver el resultado?",
                    icon: "success",
                    showDenyButton: true,
                    confirmButtonColor: "#3085d6",
                    denyButtonColor: "#d33",
                    confirmButtonText: "Sí, por favor.",
                    denyButtonText: "No, gracias."
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`/view/activities/${updatedID}`);
                    } else if (result.isDenied) {
                        navigate('/activities');
                    }
                });
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "¡Algo salió mal!",
                    footer: err.hasOwnProperty("message") ? err.message : err
                });
                console.log('There was an error', err);
            })
    };

    return (
        <div className="containerNewActivity mt-5 mb-5">
            <h1 className="mb-4">Actualizar Actividad</h1>
            <form onSubmit={updateElement}
            className="needs-validation" noValidate>
                <div className="form-group mb-3">
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={updatedActivity.name}
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
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Descripción</label>
                    <textarea
                        name="description"
                        value={updatedActivity.description}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Estado</label>
                    <select
                        name="status"
                        value={updatedActivity.status}
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
                        value={updatedActivity.max_users}
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
                        value={updatedActivity.date}
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
                        value={updatedActivity.price}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-4">
                    <label>Ciudad</label>
                    <select
                        name="city_id"
                        value={updatedActivity.city_id || (cities.length > 0 ? cities[0]._id : "")}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">Selecciona una ciudad</option>
                        {cities.map((city) => (
                            <option key={city._id} value={city._id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Actualizar Actividad</button>
            </form>
            {message && <div className="alert alert-info mt-4">{message}</div>}
        </div>
    );
    };

export default UpdateActivity;

