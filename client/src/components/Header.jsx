import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from "../Animaliatour.png"
import '../styles/styles.css'
import '../styles/header.css'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';


function Header() {

    const token = localStorage.getItem("token");

    const returnedHeader = (token === null) ? (
        <div className="header">
            <Navbar className="container-header" expand="lg">
                <Navbar.Brand href="/">
                    <img
                        src={Logo}
                        className="logo"
                        height="50"
                        alt="Logo Animalia Tours"

                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto main-nav">

                        <Nav.Link className="main-nav-item" as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link className="main-nav-item" as={Link} to="/about">Sobre Nosotros</Nav.Link>
                        <Nav.Link className="main-nav-item" as={Link} to="/activities">Actividades</Nav.Link>
                        <Nav.Link className="main-nav-item" as={Link} to="/cities">Ciudades</Nav.Link>
                        <Nav.Link className="main-nav-item" as={Link} to="/contact">Contacto</Nav.Link>
                        <Nav.Link className="main-nav-item" as={Link} to="/login">Login</Nav.Link>
                    </Nav>
                    <Nav className="nav-icons">
                        <Nav.Link as={Link} to="/cart"><FaShoppingCart className="logos-header" /></Nav.Link>
                        <Nav.Link as={Link} to="/logout"><FaSignOutAlt className="logos-header" /></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    ) : (
        <div className="header">
            <Navbar className="container-header" expand="lg">
                <Navbar.Brand href="/">
                    <img
                        src={Logo}
                        className="logo"
                        height="50"
                        alt="Logo Animalia Tours"

                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto main-nav">

                        <Nav.Link className="main-nav-item" as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link className="main-nav-item" as={Link} to="/about">Sobre Nosotros</Nav.Link>
                        <Nav.Link className="main-nav-item" as={Link} to="/activities">Actividades</Nav.Link>
                        <Nav.Link className="main-nav-item" as={Link} to="/cities">Ciudades</Nav.Link>
                        <Nav.Link className="main-nav-item" as={Link} to="/contact">Contacto</Nav.Link>
                        <Nav.Link className="main-nav-item" as={Link} to="/profile">Perfil</Nav.Link>
                    </Nav>
                    <Nav className="nav-icons">
                        <Nav.Link as={Link} to="/cart"><FaShoppingCart className="logos-header" /></Nav.Link>
                        <Nav.Link as={Link} to="/logout"><FaSignOutAlt className="logos-header" /></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );

    return returnedHeader;
}

export default Header;
