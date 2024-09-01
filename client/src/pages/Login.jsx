import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { ActionButton } from '../components/ActionButton';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevenir la recarga de la página
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.data || 'Login failed. Please check your credentials.');
                throw new Error('Login failed');
            }

            if (data.token) {
                localStorage.setItem('token', data.token);
                navigate('/profile');
            } else {
                setError('Token not provided. Please try again.');
            }

        } catch (error) {
            console.error('Login failed', error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100">
            <div className="contact p-4 rounded shadow-sm" style={{ maxWidth: '600px', width: '100%' }}>
                <div className="login">
                    <div className="card-body-login">
                        <h2 className="text-center mb-3">Iniciar Sesión</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <Form onSubmit={handleLogin}>
                            <div className="form-group m-3">
                                <Form.Label htmlFor="email">E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group m-3">
                                <Form.Label htmlFor="password">Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="d-flex justify-content-center mt-4">
                                <Button variant="primary" type="submit" className="btn btn-custom">
                                    Iniciar Sesión
                                </Button>
                            </div>
                        </Form>
                        <div className="mt-4 text-center">
                            <p>¿No estás registrado?</p>
                            <ActionButton text="Regístrate aquí" path="/register" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
