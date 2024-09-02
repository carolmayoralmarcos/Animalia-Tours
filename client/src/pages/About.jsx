import React from 'react';
import "../styles/about.css";

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
                        ¡Esperamos que disfrutes de la experiencia!
                    </p>
                </div>
                <div className="about-image">
                    <img src="/assets/spa.jpg" alt="Animalia Tours" />
                </div>
            </div>

            <div className="about-team">
                <hr />
                <h2>Nuestro Equipo</h2>
                <p>
                    Nuestro equipo está compuesto por profesionales dedicados y apasionados por lo que hacen. Pero no solo vivimos para trabajar, ¡también nos encanta pasar tiempo libre en compañía de nuestros peludos!
                </p>
            </div>

            <div className="team-members">
                {teamData.map(member => (
                    <div className="team-member" key={member.name}>
                        <img src={member.imgSrc} alt={member.name} />
                        <h5>{member.name}</h5>
                        <p>{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

const teamData = [
    { name: "Haritz", role: "Desarrollador Fullstack y solucionador de problemas", imgSrc: "/assets/Haritz.jpeg" },
    { name: "Carolina", role: "Desarrolladora Fullstack y la armonía del equipo", imgSrc: "/assets/carol.jpg" },
    { name: "Mónica", role: "Desarrolladora Fullstack y documentadora profesional", imgSrc: "/assets/MONICA PENACHO.jpg" },
    { name: "Daniela", role: "Desarrolladora Fullstack y la que pone bonita la web", imgSrc: "/assets/danii.jpg" },
    { name: "Aleida", role: "Desarrolladora Fullstack y la que pone color a la web", imgSrc: "/assets/aleida.jpeg" }
];

export default About;
