import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import CarouselImage from './HeroCarouselImage';

function CarouselIntervalAleatorio({activities}) {
 
  console.log(activities);
  
  return (  
 
    <Carousel className="carouselContainer">
      {activities.map((activity) => (
        <Carousel.Item key={activity.id} interval={1000}>
        <CarouselImage image={activity.image} text={activity.name} />
          <Carousel.Caption className="carousel-caption">
            <h3>{activity.name}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselIntervalAleatorio;
