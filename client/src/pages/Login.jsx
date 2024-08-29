// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

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
                setError(errorData.data ||'Login failed. Please check your credentials.');
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
        <Container className="mt-5">
            <h1 className="mb-4">Login</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    );
}

export default Login;
