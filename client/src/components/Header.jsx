import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from "../Animaliatour.png"

function Header() {
    return (
        <Navbar bg="info p-2 text-dark bg-opacity-25" expand="lg">
            <Navbar.Brand href="#home">
                <img
                    src={Logo}
                    width="80"
                    height="80"
                    className="d-inline-block align-top"
                    alt=""

                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <Nav.Link href="/">Inicio</Nav.Link>
                    <Nav.Link href="/about">Sobre Nosotros</Nav.Link>
                    <Nav.Link href="/activities">Actividades</Nav.Link>
                    <Nav.Link href="/cities">Ciudades</Nav.Link>
                    <Nav.Link href="/contact">Contacto</Nav.Link>
                    <Nav.Link href="/register">Registro</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/userProfile">Perfil</Nav.Link>
                    <Nav.Link href="/cart">Carrito</Nav.Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
