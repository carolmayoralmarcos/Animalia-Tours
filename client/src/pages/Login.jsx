// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleLogin = async () => {

       

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            

            if (!response.ok) {
                setError('Login failed. Please check your credentials.');
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log(data);
            
            localStorage.setItem('token', data.token);
            navigate('/user');                             
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <Container className="mt-5">
            <h1 className="mb-4">Login</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" onClick={handleLogin}>
                    Login
                </Button>
            </Form>
        </Container>
    );
}

export default Login;
