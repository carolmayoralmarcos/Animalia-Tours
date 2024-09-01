import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from './HeroCarouselImage';

function CarouselInterval() {
  return (
    <Carousel className="carouselContainer"  >
      <Carousel.Item interval={1000}>

        <CarouselImage image="/image/Animal_Spa_Test3.jpg" text="Animal Spa" />

        <Carousel.Caption className="carousel-caption">
          <h3>Animal Spa</h3>
          {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>

        <CarouselImage image="/image/perrobarco.jpg" text="Paseo en barco con tu mascota" />

        <Carousel.Caption className="carousel-caption">
          <h3>Paseo en barco con tu mascota</h3>
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage image="/image/Viaje_a_la_estratosfera.jpg" text="Viaje a la estratosfera" />
        <Carousel.Caption className="carousel-caption">
          <h3>Viaje a la estratosfera</h3>
          {/* <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselInterval;


