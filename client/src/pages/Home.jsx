import React from 'react';
import CarouselInterval from '../components/Hero';
import HomeActivities from '../components/HomeActivities';
import "../styles/home.css"


function Home() {
    return (
        <div className='home'>
            <div className='home-carousel'>
                <CarouselInterval />
            </div>
            <div className='home-activities'>
                <HomeActivities />
            </div>
            <div className='home-register my-5'>
                <h2>Aquí va el registro</h2>
            </div>
            <div className='home-register my-5'>
                <h2>Aquí va el apartado de Ciudades con el buscador</h2>
            </div>
        </div>
    );
}

export default Home;