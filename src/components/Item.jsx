import React, { useContext } from "react";
import { useState } from "react";
import { CartContext } from "../context/CartContext";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "animate.css/animate.min.css";

function Item({ product }) {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  return (
    <Card
      className="cardProduct"
      style={{ width: "18rem", background: "#E6E6E9" }}
    >
      {product.featured && (
        <button
          type="button"
          className="btn btn-warning m-auto animate__animated animate__infinite infinite animate__swing fw-bold"
          style={{
            position: "absolute",
            top: "0",
            left: "30%",
          }}
        >
          En Oferta
        </button>
      )}
      <Link to={`/item/${product.id}`}>
        <Card.Img
          className="imgcardProduct"
          variant="top"
          src={product.image}
        />
      </Link>

      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.price}$</Card.Text>
        <span
          className="btnAddCart"
          onClick={() => {
            addToCart(product, quantity);
          }}
        >
          AÑADIR AL CARRITO
        </span>
      </Card.Body>
    </Card>
  );
}

export default Item;
