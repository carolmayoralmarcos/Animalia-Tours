import React, { useContext } from "react";             
import "../App.css";                 
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa"; 
import CalculateTotal from "../components/CalculateTotal";
import { CartContext } from "../context/CartContext";      
import { useNavigate } from "react-router-dom"; 


export default function Cart() {

  const { cart, removeFromCart } = useContext(CartContext);
  
  const navigate = useNavigate();

  const handleConfirmReservations = () => {
    
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("No user ID found. Please log in.");
      return; 
    }

    cart.forEach((item) => {
      const reservationData = {
        name: `Reservation for ${item.name}`,
        status: "confirmed",
        user: userId,
        activity: item._id
      };

      fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log("Reservation created:", data.data);
        } else {
          console.error("Error creating reservation:", data.data);
        }
      })
      .catch(err => {
        console.error("Error with reservation request:", err);
      });
    });

    
    navigate("/profile"); 
  };
   
  return (
    <div className="cart">
 
      <h2 className="carrito">
        <FaShoppingCart /> 
      </h2>

      <ul>
        {cart.map((item, index) => (
          <li 
            key={index}>
            {item.name} - {item.quantity} x {item.price} = ${item.quantity * parseFloat(item.price.replace("$", ""))}
            <button className="btn btn-danger" onClick={() => removeFromCart(index)}>
              Eliminar <FaTrashAlt />
            </button>
          </li>
        ))}
      </ul>
        <CalculateTotal cart={cart}/>
        <button className="btn btn-primary" onClick={handleConfirmReservations}>
        Reserva Confirmada
      </button>
  </div>
  );
}