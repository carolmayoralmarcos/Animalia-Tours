import React, { useContext, useState, useEffect } from "react";
import "../App.css";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import CalculateTotal from "../components/CalculateTotal";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { getprofile } from "../utils/getProfile";
import Swal from 'sweetalert2';
import "../styles/cart.css"


export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getprofile(token).then(userData => {
        if (userData.success) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }).catch(() => setIsLoggedIn(false));
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleConfirmReservations = async () => {
    // const token = localStorage.getItem("token");

    console.log("isLoggedIn:", isLoggedIn);
    if (!isLoggedIn) {
      console.error("No user found. Please log in.");
      Swal.fire({
        icon: "warning",
        title: "Not Logged In",
        text: "Please log in to confirm your reservation.",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    const token = localStorage.getItem("token");

    const userData = await getprofile(token);
    console.log("User Data:", userData);

    if (!userData.success) {
      console.error("Failed to get user profile:", userData.error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to get user profile.",
      });
      return;
    }

    const userId = userData.data._id;
    console.log("User ID:", userId);

    const reservationPromises = cart.map((item) => {    //const reservationData
      const reservationData = {
        // name: `Reservation for ${item.name}`,
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
          console.log("API response:", response);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (!data.success) {
            console.error("Error creating reservation:", data.data);
            Swal.fire({
              icon: "error",
              title: "Reserva Fallida",
              text: data.data || "Hubo un problema al crear la reserva.",
            });
            return null;
          } else {
            console.log("Reservation created:", data.data);
            return data.data;
          }
        })
        .catch(err => {
          console.error("Error with reservation request:", err);
          Swal.fire({
            icon: "error",
            title: "Error de Red",
            text: "Hubo un problema al conectar con el servidor. Por favor, intenta de nuevo más tarde.",
          });
          return null;
        });
    });

    Promise.all(reservationPromises).then((reservations) => {
      const successfulReservations = reservations.filter(res => res !== null);
      if (successfulReservations.length > 0) {
        console.log("All reservations confirmed:", successfulReservations);
        Swal.fire({
          icon: "success",
          title: "Reservations Confirmed",
          text: "All reservations have been successfully confirmed!",
        }).then(() => {
          navigate("/profile");
        });
      } else {
        console.error("Failed to create any reservations.");
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed to create any reservations. Please try again.",
        });
      }
    });
  };


  return (
    <div className="cart">

      <h2 className="carrito">
        <FaShoppingCart />
      </h2>

      <ul className="CartPage">
        {cart.map((item, index) => {

          return (
            <li className="carro"
              key={index}>
              {item.name} - {item.quantity} x ${item.price} = ${item.quantity * item.price}
              <button className="btn-remove" onClick={() => removeFromCart(index)}>
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
        <button className="btn-cart" onClick={handleConfirmReservations}>
          confirmar reserva
        </button>
      </div>
    </div>
  );
}