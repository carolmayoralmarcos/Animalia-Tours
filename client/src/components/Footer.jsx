import React from 'react';
import "../styles/footer.css"
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer>
            <div className="footer-div" >
                <div className='social-icons'>
                    <FaFacebook className='icon' />
                    <FaInstagram className='icon' />
                    <FaYoutube className='icon' />
                    <FaWhatsapp className='icon' />
                </div>
                <div>Todos los derechos reservados a Animalia Tours © 2024 Copyright</div>
                <div className='nav-footer'>
                    <ul>
                        <li><Link className="nav-footer-link" to='/about'>Acerca de</Link></li>
                        <li><Link className="nav-footer-link" to='/contact'>Contacto</Link></li>
                        <li><Link className="nav-footer-link" to='/login'>Login</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
