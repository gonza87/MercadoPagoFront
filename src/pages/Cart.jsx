import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { MdDelete } from "react-icons/md";

function Cart() {
  const {
    cart,
    deleteCart,
    totalPrice,
    quantityInCart,
    deleteProduct,
    updateQuantity,
  } = useContext(CartContext);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity >= 1) {
      await updateQuantity(productId, newQuantity);
    } else {
      await updateQuantity(productId, 1);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container ">
        <h2 className="textCarritoVacio">Carrito vacío</h2>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container ">
        <h2 className="textCarritoVacio">Carrito vacío</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-8 mt-1">
          <div className="contCartIzquierda">
            <h2>Carrito</h2>
            <hr />
            {cart.map((prod) => (
              <div key={prod.id} className="row mb-2">
                <div className="col-4">
                  <img className="imgCart" src={prod.image} alt="" />
                </div>
                <div className="col-8">
                  <div className="row">
                    <div className="col-md-3 col-6">
                      <p>{prod.name}</p>
                    </div>
                    <div className="col-md-3 col-6">
                      <input
                        className="ms-2"
                        type="number"
                        id="inputCantidad"
                        name="inputCantidad"
                        style={{ width: "60px" }}
                        value={prod.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            prod.id,
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div className="col-md-3 col-6">
                      <p>{prod.price * prod.quantity}$</p>
                    </div>
                    <div className="col-md-3 col-6">
                      <MdDelete
                        style={{ cursor: "pointer" }}
                        size={22}
                        color="#000000"
                        onClick={() => {
                          deleteProduct(prod.id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center">
              <span className="btnAddCart" onClick={deleteCart}>
                Vaciar Carrito
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-4 mt-1">
          <div className="contCartDerecha">
            <h2>Resumen de compra</h2>
            <hr />
            <div className="cartDerechaFlex">
              <div className="d-flex justify-content-between">
                <p>Productos({quantityInCart()})</p>
                <p>{totalPrice()}$</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Envio</p>
                <p>Gratis</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Total</p>
                <p>{totalPrice()}$</p>
              </div>
              <div className="text-center">
                <Link style={{ textDecoration: "none" }} to={"/checkout"}>
                  <span className="btnAddCart">Continuar Compra</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
