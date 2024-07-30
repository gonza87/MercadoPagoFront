import { createContext, useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { json } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from "../firebase/config";

export const CartContext = createContext();
const cartInitial = JSON.parse(localStorage.getItem("cart")) || [];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(cartInitial);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product, quantity) => {
    const productDoc = doc(db, "products", product.id);
    const productSnap = await getDoc(productDoc);

    if (productSnap.exists()) {
      const productData = productSnap.data();
      const availableStock = productData.stock;

      const existingCartItem = cart.find((item) => item.id === product.id);
      const existingQuantityInCart = existingCartItem
        ? existingCartItem.quantity
        : 0;

      if (availableStock >= existingQuantityInCart + quantity) {
        const productAdded = { ...product, quantity };
        const newCart = [...cart];
        const existInCart = newCart.find((item) => item.id === productAdded.id);
        if (existInCart) {
          existInCart.quantity =
            parseInt(existInCart.quantity) + parseInt(quantity);
        } else {
          newCart.push(productAdded);
        }
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Producto agregado exitosamente",
        });
        setCart(newCart);
      } else {
        Swal.fire({
          icon: "error",
          title: "Stock insuficiente",
          text: "No hay suficiente stock disponible para agregar este producto.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Producto no encontrado",
        text: "No se encontró el producto en la base de datos.",
      });
    }
  };

  const quantityInCart = () => {
    return cart.reduce((acc, prod) => acc + parseInt(prod.quantity), 0);
  };

  const totalPrice = () => {
    return cart.reduce(
      (acc, prod) => acc + parseInt(prod.price) * parseInt(prod.quantity),
      0
    );
  };

  const deleteProduct = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  const deleteCart = () => {
    Swal.fire({
      title: "Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Carrito vaciado!",
          icon: "success",
        });
        setCart([]);
      }
    });
  };

  const deleteCartCheckout = () => {
    setCart([]);
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const productDoc = doc(db, "products", productId);
    const productSnap = await getDoc(productDoc);

    if (productSnap.exists()) {
      const productData = productSnap.data();
      const availableStock = productData.stock;

      const existingCartItem = cart.find((item) => item.id === productId);
      const existingQuantityInCart = existingCartItem
        ? existingCartItem.quantity
        : 0;

      if (availableStock >= newQuantity) {
        const updatedCart = cart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        );

        setCart(updatedCart);
      } else {
        Swal.fire({
          icon: "error",
          title: "Stock insuficiente",
          text: "No hay suficiente stock disponible para la cantidad solicitada.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Producto no encontrado",
        text: "No se encontró el producto en la base de datos.",
      });
    }
  };

  const updateProductStock = async (productId, newStock) => {
    const productDoc = doc(db, "products", productId);
    await updateDoc(productDoc, {
      stock: newStock,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        quantityInCart,
        totalPrice,
        deleteCart,
        deleteProduct,
        updateQuantity,
        deleteCartCheckout,
        updateProductStock,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
