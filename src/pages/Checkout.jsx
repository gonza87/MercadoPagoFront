import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

function Checkout() {
  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago(import.meta.env.VITE_SDK_MERCADOPAGO_PUBLIC_KEY, {
    locale: "es-UY",
  });
  const createPreference = async () => {
    try {
      const items = cart.map((item) => ({
        title: item.name,
        quantity: item.quantity,
        unit_price: item.price,
      }));
      const response = await axios.post(
        "http://localhost:3000/create_preference",
        {
          items,
        }
      );
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  const { cart, deleteCartCheckout, totalPrice, updateProductStock } =
    useContext(CartContext);

  const { register, handleSubmit } = useForm();
  let [docId, setDocId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col mt-5">
          {cart.length > 0 ? (
            <div className="row mt-3">
              <div className="col">
                <h2 className="mb-3">Resumen del Pedido</h2>
                <dl className="row">
                  {cart.map((prod, index) => (
                    <dl className="row" key={index}>
                      <dt className="col-sm-2">
                        <img className="imgCheckout" src={prod.image} alt="" />
                      </dt>
                      <dt className="col-sm-4">
                        {prod.name} x {prod.quantity}
                      </dt>
                      <dd className="col-sm-6">
                        {prod.price * prod.quantity}$
                      </dd>
                    </dl>
                  ))}
                </dl>

                <dl className="row">
                  <dd className="col-sm-6">
                    <span className="checkoutTotalPrice">{totalPrice()}$</span>
                  </dd>
                </dl>

                <button className="btnAddCart mb-5" onClick={handleBuy}>
                  Finalizar compra
                </button>
                {preferenceId && (
                  <Wallet
                    initialization={{ preferenceId: preferenceId }}
                    customization={{ texts: { valueProp: "smart_option" } }}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2>No hay nada para pagar</h2>
              <Link to={"/"}>
                <button className="btnAddCart mb-5">Volver a Inicio</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
