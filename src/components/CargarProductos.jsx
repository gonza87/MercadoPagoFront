// import React from "react";
// import data from "../.././public/data/products.json";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../firebase/config";
// import { useEffect } from "react";
// export const CargarProductos = () => {
//   useEffect(() => {
//     const productosRef = collection(db, "products");

//     data.forEach((prod) => {
//       addDoc(productosRef, prod);
//     });
//   }, []);

//   return <div>CargarProductos</div>;
// };
