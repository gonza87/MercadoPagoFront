import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaCartShopping } from "react-icons/fa6";

function ShoppingCart() {
  const { quantityInCart } = useContext(CartContext);
  console.log(quantityInCart());
  return (
    <>
      <div className="contCart">
        <Link to={"/cart"}>
          <FaCartShopping size={25} color="#F4F4F6" />
          <span className="numberCart">{quantityInCart()}</span>
        </Link>
      </div>
    </>
  );
}

export default ShoppingCart;
