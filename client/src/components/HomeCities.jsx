import { useEffect, useState } from "react";
import getAllElements from "../utils/getAllElements";
import { Link } from "react-router-dom";

function HomeCities() {
    const collection = 'cities';
    const [cities, setCities] = useState([]);

    useEffect(() => {
        getAllElements(collection)
            .then((info) => {
                setCities(info.data);
            })
            .catch((error) => {
                console.error(`Could not get data: ${error}`);
            });
    }, [collection]);

    return (
        <div className="container-home">
            <div className="activities-home">
                <h2 className="activities-title-home">Las ciudades más visitadas</h2>
                <hr></hr>
                <div className="activities-grid-home">
                    {Array.isArray(cities) && cities.length > 0 ? (
                        cities.map((city, index) => {
                            if (index < 3) {
                                return (
                                    <Link className="no-decoration link" to={`/view/cities/${city._id}`}>
                                        <div key={city._id} className="activity-card-home">

                                            <img src={city.image} alt={city.name} className="activity-image-home" />

                                            <div className="activity-details d-flex flex-column">
                                                <h3 className="activity-title">{city.name}</h3>
                                                <p className="activity-description">{city.description}</p>
                                            </div>

                                            <div className="overlay">
                                                <div className="detail-text">Ver detalle</div>
                                            </div>

                                        </div>
                                    </Link>
                                )
                            }
                        })
                    ) : (
                        <p className="no-activities">No hay ciudades disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomeCities;