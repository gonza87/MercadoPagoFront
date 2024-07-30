import { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

function ItemDetailContainer() {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const docRef = doc(db, "products", itemId);
    getDoc(docRef)
      .then((res) => {
        if (res.exists()) {
          setProduct({ ...res.data(), id: res.id });
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.error("Error al obtener el documento:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemId]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <Alert variant="danger">
          Error: Producto no encontrado o hubo un problema al obtener el
          producto.
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <ItemDetail product={product} />
      </div>
    </div>
  );
}

export default ItemDetailContainer;
