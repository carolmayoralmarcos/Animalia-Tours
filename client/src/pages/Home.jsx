import React from 'react';
import CarouselInterval from '../components/Hero';
import HomeActivities from '../components/HomeActivities';
import HomeCities from '../components/HomeCities';
import "../styles/home.css"
import { Link } from 'react-router-dom';



function Home() {
    return (
        <div className='home'>
            <div className='home-carousel'>
                <CarouselInterval />
            </div>
            <div className='activities-home'>
                <HomeActivities />
            </div>
            <div className='home-register container-home'>
                <Link to='/register' className="ml-2 custom-home">¡REGÍSTRATE PARA OBTENER 20% DE DESCUENTO EN TU PRIMERA RESERVA!</Link>
            </div>
            <div className='cities-home'>
                <HomeCities />
            </div>
        </div>
    );
}

export default Home;