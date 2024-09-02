import { useEffect, useState } from "react";
import getAllElements from "../utils/getAllElements";
import { Link } from "react-router-dom";

function HomeActivities() {
    const collection = 'activities';
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        getAllElements(collection)
            .then((info) => {
                setActivities(info.data);
            })
            .catch((error) => {
                console.error(`Could not get data: ${error}`);
            });
    }, [collection]);

    return (
        <div className="container-home">
            <div className="activities-home">
                <h2 className="activities-title-home">Actividades Populares</h2>
                <hr></hr>
                <div className="activities-grid-home">
                    {Array.isArray(activities) && activities.length > 0 ? (
                        activities.map((activity, index) => {
                            if (index > activities.length - 4) {
                                return (
                                    <Link className="no-decoration link" to={`/view/activities/${activity._id}`}>
                                        <div key={activity._id} className="activity-card-home">

                                            <img src={activity.image} alt={activity.name} className="activity-image-home" />

                                            <div className="activity-details d-flex flex-column">
                                                <h3 className="activity-title">{activity.name}</h3>
                                                <p className="activity-description">{activity.description}</p>
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
                        <p className="no-activities">No hay actividades disponibles.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomeActivities;