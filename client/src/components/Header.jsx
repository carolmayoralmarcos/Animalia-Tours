import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from "../Animaliatour.png"
import '../styles/styles.css'
import { Link } from 'react-router-dom'



function Header() {
    return (
        <Navbar bg="warning p-2 text-dark bg-opacity-25" expand="lg">
            <Navbar.Brand href="/home">
                <img
                    src={Logo}
                    width="90"
                    height="90"
                    className="logo"
                    alt=""

                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                    <Nav.Link as={Link} to="/about">Sobre Nosotros</Nav.Link>
                    <Nav.Link as={Link} to="/activities">Actividades</Nav.Link>
                    <Nav.Link as={Link} to="/cities">Ciudades</Nav.Link>
                    <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
                    <Nav.Link as={Link} to="/register">Registro</Nav.Link>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/profile">Perfil</Nav.Link>
                    <Nav.Link as={Link} to="/cart">Carrito</Nav.Link>


                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
