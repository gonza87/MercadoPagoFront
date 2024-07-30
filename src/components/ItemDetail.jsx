import { useState } from "react";
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ItemDetail({ product }) {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  return (
    <>
      <div className="col-md-6">
        <img className="imgItemDetail" src={product.image} alt="" />
      </div>
      <div className="col-md-6">
        <h1>{product.name}</h1>
        <p>{product.price} $</p>
        <p>DISPONIBILIDAD: {product.stock} DISPONIBLES</p>

        <label htmlFor="inputCantidad">Cantidad</label>
        <input
          className="ms-2"
          type="number"
          id="inputCantidad"
          name="inputCantidad"
          style={{ width: "60px" }}
          value={quantity}
          onChange={handleQuantityChange}
        />
        <div className="mt-2">
          <span
            className="btnAddCart"
            onClick={() => {
              addToCart(product, quantity);
            }}
          >
            AÑADIR AL CARRITO
          </span>
        </div>

        <hr />
        <p>Descripcion</p>
        <p>{product.description}</p>
        <hr />
      </div>
    </>
  );
}

export default ItemDetail;
