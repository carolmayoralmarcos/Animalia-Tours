import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

function About() {
    return (
        <Container className="my-5">
            <Row className="mb-4">
                <Col>
                    <h1 className="text-center">About Us</h1>
                    <p className="text-center">Learn more about our company, mission, and values.</p>
                </Col>
            </Row>

            <Row className="mb-5">
                <Col md={6}>
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to provide the best services to our customers and ensure their satisfaction.
                        We believe in quality, innovation, and customer-centricity as the core values that drive us forward.
                    </p>
                </Col>
                <Col md={6}>
                    <Image src="https://via.placeholder.com/500x300" rounded fluid />
                </Col>
            </Row>

            <Row className="mb-5">
                <Col md={4} className="text-center">
                    <Image src="https://via.placeholder.com/100" roundedCircle fluid className="mb-3" />
                    <h4>Quality</h4>
                    <p>We provide the highest quality products and services to our customers.</p>
                </Col>
                <Col md={4} className="text-center">
                    <Image src="https://via.placeholder.com/100" roundedCircle fluid className="mb-3" />
                    <h4>Innovation</h4>
                    <p>We continuously innovate to stay ahead in the market and offer the best solutions.</p>
                </Col>
                <Col md={4} className="text-center">
                    <Image src="https://via.placeholder.com/100" roundedCircle fluid className="mb-3" />
                    <h4>Customer-Centric</h4>
                    <p>Our customers are at the heart of everything we do, and we strive to meet their needs.</p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h2 className="text-center">Our Team</h2>
                    <p className="text-center">
                        Meet the people behind our success. Our team is composed of dedicated professionals who are passionate about what they do.
                    </p>
                </Col>
            </Row>

            <Row>
                <Col md={3} className="text-center mb-4">
                    <Image src="https://via.placeholder.com/150" roundedCircle fluid className="mb-2" />
                    <h5>John Doe</h5>
                    <p>CEO</p>
                </Col>
                <Col md={3} className="text-center mb-4">
                    <Image src="https://via.placeholder.com/150" roundedCircle fluid className="mb-2" />
                    <h5>Jane Smith</h5>
                    <p>CTO</p>
                </Col>
                <Col md={3} className="text-center mb-4">
                    <Image src="https://via.placeholder.com/150" roundedCircle fluid className="mb-2" />
                    <h5>Mike Johnson</h5>
                    <p>Head of Marketing</p>
                </Col>
                <Col md={3} className="text-center mb-4">
                    <Image src="https://via.placeholder.com/150" roundedCircle fluid className="mb-2" />
                    <h5>Emily Davis</h5>
                    <p>Lead Designer</p>
                </Col>
            </Row>
        </Container>
    );
};

export default About;


