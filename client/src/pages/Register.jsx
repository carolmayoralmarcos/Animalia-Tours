import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/users/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();
            if (response.ok) {
                if (!response.success) {
                    throw new Error(response.data);
                }
                setSuccess(true);
                Swal.fire({
                    title: "¡Usuario creado correctamente!",
                    text: "Logeate para disfrutar al 100% de la web ;)",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    denyButtonColor: "#d33",
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`/login`);
                    } else if (result.isDenied) {
                        navigate('/login');
                    }
                })
                    .catch(err => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "¡Algo ha ido mal!",
                            footer: err.hasOwnProperty("message") ? err.message : err
                        });
                        console.log('There was an error', err);
                    })
            } else {
                setError(data.message || 'Error en el registro');
            }
        } catch (error) {
            setError('Error al conectar con el servidor');
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100">
            <div className="contact p-4  rounded shadow-sm" style={{ maxWidth: '600px', width: '100%' }}>
                <div className="register">

                    <div className="card-body-register">
                        <h2 className="text-center mb-3">Crea tu usuario</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">¡Se ha registrado correctamente! Redirigiendo al login...</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group m-3">
                                <label htmlFor="name">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control "
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group m-3 ">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group m-3">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group m-3">
                                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="form-control "
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-custom align-self-center">Registrarse</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Register;
