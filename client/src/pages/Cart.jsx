import React, { useContext } from "react";
import "../App.css";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import CalculateTotal from "../components/CalculateTotal";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


export default function Cart() {

  const { cart, removeFromCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleConfirmReservations = () => {

    // const userId = localStorage.getItem("token");

    if (!user) {
      console.error("No user found. Please log in.");
      return;
    }

    const userId = user.id;

    const reservationPromises = cart.map((item) => {    //const reservationData
      const reservationData = {
        name: `Reservation for ${item.name}`,
        status: "confirmed",
        user: userId,
        activity: item._id
      };

    console.log("Sending reservation data:", reservationData);

     return fetch("http://localhost:5000/api/reservations/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
     })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json()
        })

        .then(data => {
          if (!data.success) {
            console.error("Error creating reservation:", data.data);
            return null;
          } else {
            console.log("Reservation created:", data.data);
            return data.data;
          }
        })
        .catch(err => {
          console.error("Error with reservation request:", err);
          return null;
        });
    });

     // Wait for all reservations to be created before navigating
    Promise.all(reservationPromises).then((reservations) => {
      const successfulReservations = reservations.filter(res => res !== null);
      if (successfulReservations.length > 0) {
        console.log("All reservations confirmed:", successfulReservations);
        navigate("/profile");
      } else {
        console.error("Failed to create any reservations.");
      }
    });
};


  return (
    <div className="cart">

      <h2 className="carrito">
        <FaShoppingCart />
      </h2>

      <ul>
        {cart.map((item, index) => {

          return (
            <li
              key={index}>
            
              {item.name} - {item.quantity} x ${item.price} = ${item.quantity * item.price}
              <button className="btn btn-danger" onClick={() => removeFromCart(index)}>
                Eliminar <FaTrashAlt />
              </button>
            </li>
          );
        })}
      </ul>
      <div>
      <CalculateTotal cart={cart} />
      </div>
      <div>
        <button className="btn btn-primary" onClick={handleConfirmReservations}>
          Reserva Confirmada
        </button>
      </div>
    </div>
  );
}