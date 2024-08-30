import React, { useContext } from "react";             
import "../App.css";                 
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa"; 
import CalculateTotal from "../components/CalculateTotal";
import { CartContext } from "../context/CartContext";      



export default function Cart() {

  const { cart, addToCart, removeFromCart } = useContext(CartContext);
   
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
  </div>
  );
}