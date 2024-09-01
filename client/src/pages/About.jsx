import React from 'react';
import "../styles/styles.css"

function About() {
    return (
        <div className="about-container">

            <div className="about-content">
                <div className="about-text">
                    <h2>¿Qué es Animalia Tours?</h2>
                    <p>
                        Si estás buscando una experiencia única y emocionante, Animalia Tours es la opción perfecta para pasar tiempo de calidad con tu mascota.
                        Te proponemos un montón de planes para hacer con ella, desde paseos en barca hasta viajes al espacio.
                        Somos amantes de los animales y sabemos lo difícil que es encontrar actividades para hacer con ellos, por ello, te lo queremos poner un poco más fácil y proponerte diferentes opciones para que puedas elegir la que mejor se adapte a tus necesidades.
                        Esperamos que disfrutes de la experiencia!!
                    </p>
                </div>
                <div className="about-image">
                    <img src="/assets/spa.jpg" alt="Animalia Tours" />
                </div>
            </div>

            <div className="about-team">
                <hr></hr>
                <h2>Nuestro Equipo</h2>
                <p>
                    Nuestro equipo está compuesto por profesionales dedicados y apasionados por lo que hacen. Pero no solo vivimos para trabajar, ¡también nos encanta pasar tiempo libre en compañía de nuestros peludos!
                </p>
            </div>

            <div className="team-members">
                <div className="team-member">
                    <img src="/assets/Haritz.jpeg" alt="Haritz" />
                    <h5>Haritz</h5>
                    <p>Desarrollador Fullstack y solucionador de problemas</p>
                </div>
                <div className="team-member">
                    <img src="/assets/carol.jpg" alt="Carolina" />
                    <h5>Carolina</h5>
                    <p>Desarrolladora Fullstack y la armonía del equipo</p>
                </div>
                <div className="team-member">
                    <img src="/assets/MONICA PENACHO.jpg" alt="Mónica" />
                    <h5>Mónica</h5>
                    <p>Desarrolladora Fullstack y documentadora profesional</p>
                </div>
                <div className="team-member">
                    <img src="/assets/danii.jpg" alt="Daniela" />
                    <h5>Daniela</h5>
                    <p>Desarrolladora Fullstack y la que pone bonita la web</p>
                </div>
                <div className="team-member">
                    <img src="/assets/aleida.jpeg" alt="Aleida" />
                    <h5>Aleida</h5>
                    <p>Desarrolladora Fullstack y la que pone color a la web</p>
                </div>
            </div>
        </div>
    );
}

export default About;
