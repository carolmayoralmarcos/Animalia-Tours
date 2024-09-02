import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import getElementbyId from '../utils/getElementbyId';
import Spinner from 'react-bootstrap/Spinner';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import '../styles/viewActivities.css'

function ViewActivity() {
    const { id } = useParams();
    const collection = 'activities';

    const [data, setData] = useState(null);
    const { cart, addToCart, removeFromCart } = useContext(CartContext);

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            var res = getElementbyId(id, collection);
            res.then((info) => {
                setData(info.data);
            })
                .catch((error) => {
                    console.error(`Could not get data: ${error}`);
                })
        }, 750);
    }, [collection, id]);

    if (!data) {
        return (
            <div className="container content my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
                <h1>Buscando elemento...</h1>
            </div>)
    }

    const goToShop = () => {
        navigate('/cart');
    };

    const removeStickyCart = (indexToRemove) => {
        // Ensure you are using the correct method from CartContext
        removeFromCart(indexToRemove);
    };

    return (
        <div className="container-fluid ">
            {/* Sticky Cart */}
            <div className="position-fixed bottom-0 end-0 p-3" style={{ width: '300px', zIndex: 1050 }}>
                <div className="card-viewActivities">
                    <div className="card-header-view text-center">
                        <h5 className="mb-0">Carrito <FaShoppingCart /></h5>
                    </div>
                    <ul className="list-group-viewActivities list-group-flush">
                        {cart.length > 0 ? (
                            cart.map((item, index) => (
                                <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {item.name}
                                    <button className="btn-remove btn-sm" onClick={() => removeStickyCart(index)}>
                                        <FaTrash />
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="list-group-item">El carrito está vacío.</li>
                        )}
                    </ul>
                    <div className=" card-body-view text-center">
                        <button className="btn-view" onClick={goToShop}> Ir a carrito
                        </button>
                    </div>
                </div>
            </div>
            <div className="container content my-5">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img src={data.image} className="rounded" alt="Element" style={{ maxHeight: '400px', maxWidth: '500px' }} />
                        <button className="btn-view me-2 mt-5" onClick={() => addToCart(data)}>Añadir al Carrito</button>
                    </div>
                    <div className="col-md-6">
                        <div className="card-body ms-5">
                            <h1>{data.name}</h1>
                            <h3>Precio - {data.price}€</h3>
                            <br></br>
                            <h4><Link to={`/view/cities/${data.city_id._id}`}>{data.city_id.name}</Link></h4>
                            <br></br>
                            <p>{data.description}</p>
                            <br></br>
                            <p><b>Fecha</b>: {new Date(data.date).toLocaleDateString()}</p>
                            <p><b>Estado</b>: {data.status}</p>
                            <p><b>Número máximo de participantes</b>: {data.max_users}</p>
                            <p><b>Número actual de participantes</b>: {data.current_users}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewActivity;