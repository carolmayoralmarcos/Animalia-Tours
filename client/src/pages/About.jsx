import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

function About() {
    return (
        <Container className="my-5">
            <Row className="mb-4">
                <Col>
                    <h1 className="text-center">Sobre Nosotros</h1>
                </Col>
            </Row>
            <Row className="mb-5">
                <Col md={6}>
                    <h2>¿Qué es Animalia Tours?</h2>
                    <p>
                        Si  estás buscando una experiencia única y emocionante, Animalia Tours es la opción perfecta para pasar tiempo de calidad con tu mascota.
                        Te proponemos un montón de planes para hacer con ella, desde paseos en barca hasta viajes al espacio.
                        Somos amantes de los animales y sabemos lo dificil que es encontrar actividades para hacer con ellos, por ello, te lo queremos poner un poco más fácil y proponerte diferentes opciones para que puedas elegir la que mejor se adapte a tus necesidades.
                        Esperamos que disfruteis de la experiencia!!



                    </p>
                </Col>
                <Col md={6}>
                    <Image src="/assets/spa.jpg" className="principabout" />
                </Col>
            </Row>



            <Row>
                <Col>
                    <h2 className="text-center">Nuestro Equipo</h2>
                    <p className="text-center">
                        Nuestro equipo está compuesto por profesionales dedicados y apasionados por lo que hacen. Pero no solo vivimos para trabajar, tambien nos encanta pasar tiempo libre en compañia de nuestros peludos!
                    </p>
                </Col>
            </Row>

            <Row className='equipo'>
                <Col md={3} className="text-center mb-4">
                    <Image src="/assets/Haritz.jpeg" roundedCircle fluid className="mb-3" />
                    <h5>Haritz</h5>
                    <p>Desarrollador Fullstack y solucionador de problemas</p>
                </Col>
                <Col md={3} className="text-center mb-4">
                    <Image src="/assets/carol.jpg" roundedCircle fluid className="mb-3" />
                    <h5>Carolina</h5>
                    <p>Desarrolladora Fullstack y la armonia del equipo </p>
                </Col>
                <Col md={3} className="text-center mb-4">
                    <Image src="/assets/MONICA PENACHO.jpg" roundedCircle fluid className="mb-3" />
                    <h5>Mónica</h5>
                    <p>Desarrolladora Fullstack y documentadora profesional</p>
                </Col>
                <Col md={3} className="text-center mb-4">
                    <Image src="/assets/daniela.jpg" roundedCircle fluid className="mb-3" />
                    <h5>Daniela</h5>
                    <p>Desarrolladora Fullstack y la que pone bonita la web</p>
                </Col>
                <Col md={3} className="text-center mb-4">
                    <Image src="/assets/aleida.jpeg" roundedCircle fluid className="mb-2" />
                    <h5>Aleida</h5>
                    <p>Desarrolladora Fullstack y la que pone color a la web</p>
                </Col>
            </Row>
        </Container>
    );
};

export default About;


