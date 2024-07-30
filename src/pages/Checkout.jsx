import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
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

  const comprar = async (data) => {
    const pedido = {
      cliente: { ...data, paymethod: paymentMethod },
      productos: cart,
      total: totalPrice(),
      fecha: Timestamp.now(),
    };

    const pedidosRef = collection(db, "pedidos");

    try {
      const docRef = await addDoc(pedidosRef, pedido);
      setDocId(docRef.id);

      for (let prod of cart) {
        const productRef = doc(db, "products", prod.id);
        const newStock = prod.stock - prod.quantity;
        await updateDoc(productRef, {
          stock: newStock,
        });
      }

      deleteCartCheckout();
    } catch (error) {
      console.error("Error al realizar la compra: ", error);
    }
  };

  // if (docId) {
  //   return (
  //     <>
  //       <h1 className="text-center mt-5 mb-3">Muchas gracias por tu compra</h1>
  //       <p className="text-center textcheckout">
  //         Para hacer el seguimiento de tu pedido, el identificador es este:{" "}
  //         <strong>{docId}</strong>
  //       </p>
  //     </>
  //   );
  // }

  return (
    <div className="container mt-5">
      {/* <form onSubmit={handleSubmit(comprar)}> */}
      <div className="row">
        {/* <div className="col-lg-6">
            <h2>Información de Contacto</h2>
            <div className="mb-3">
              <label htmlFor="email">Dirección de correo electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Ingresa tu correo electrónico"
                {...register("email", { required: "Email es requerido" })}
              />
            </div>
            <h2>Información de Envío</h2>
            <div className="mb-3">
              <label htmlFor="firstName">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="Ingresa tu nombre"
                {...register("name", { required: "Nombre es requerido" })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName">Apellido</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                placeholder="Ingresa tu apellido"
                {...register("lastname", { required: "Apellido es requerido" })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="Ingresa tu dirección"
                {...register("address", { required: "Dirección es requerido" })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city">Ciudad</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                placeholder="Ingresa tu ciudad"
                {...register("city", { required: "Ciudad es requerido" })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country">País</label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                placeholder="Ingresa tu país"
                {...register("country", { required: "Pais es requerido" })}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone">Teléfono</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Ingresa tu número de teléfono"
                {...register("phone", { required: "Teléfono es requerido" })}
              />
            </div>
          </div> */}
        <div className="col-lg-6">
          {/* <div className="row">
            <div className="col">
              <h2>Pago</h2>
              <div className="mb-3">
                <label htmlFor="paymentMethod">Método de Pago</label>
                <select
                  className="form-select"
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                  required
                >
                  <option value="">Selecciona Método de Pago</option>
                  <option value="CreditCard">Tarjeta de Crédito</option>
                  <option value="PayPal">PayPal</option>
                  <option value="MercadoPago">Mercado Pago</option>
                </select>
              </div>
            </div>
          </div> */}
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
                    <dd className="col-sm-6">{prod.price * prod.quantity}$</dd>
                  </dl>
                ))}
              </dl>

              <dl className="row">
                <dd className="col-sm-6">
                  <span className="checkoutTotalPrice">{totalPrice()}$</span>
                </dd>
              </dl>
              {/* {<button className="btnAddCart" type="submit">
                  Finalizar Compra
                </button>} */}
              <button className="btnAddCart" onClick={handleBuy}>
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
        </div>
      </div>
      {/* </form> */}
    </div>
  );
}

export default Checkout;
