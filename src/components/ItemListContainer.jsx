import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import Form from "react-bootstrap/Form";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

function ItemListContainer() {
  const [products, setProducts] = useState([]);
  const [titleCategory, setTitleCategory] = useState("Productos");
  const { categoryId } = useParams();
  const [orderBy, setOrderBy] = useState("");

  const handleOrderBy = (e) => {
    setOrderBy(e.target.value);
  };
  console.log(orderBy);
  useEffect(() => {
    const productsRef = collection(db, "products");

    const q = categoryId
      ? query(productsRef, where("category.id", "==", categoryId))
      : productsRef;

    const categoriesRef = collection(db, "categories");

    let catQuery =
      categoryId && query(categoriesRef, where("id", "==", categoryId));

    getDocs(q).then((res) => {
      setProducts(
        res.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });

    if (catQuery) {
      getDocs(q).then((res) => {
        setTitleCategory(res.docs[0].data().category.nombre);
      });
    } else {
      setTitleCategory("Productos");
    }

    if (orderBy === "priceAsc") {
      const productsOrganized = [...products].sort((a, b) => b.price - a.price);
      setProducts(productsOrganized);
    } else if (orderBy === "priceDesc") {
      const productsOrganized = [...products].sort((a, b) => a.price - b.price);
      setProducts(productsOrganized);
    }
  }, [categoryId]);

  useEffect(() => {
    if (orderBy === "priceAsc") {
      const productsOrganized = [...products].sort((a, b) => b.price - a.price);
      setProducts(productsOrganized);
    } else if (orderBy === "priceDesc") {
      const productsOrganized = [...products].sort((a, b) => a.price - b.price);
      setProducts(productsOrganized);
    } else if (orderBy === "featured") {
      setProducts(products.filter((product) => product.featured === true));
    }
  }, [orderBy]);

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-5">{titleCategory}</h2>

      <Form.Select aria-label="Default select example" onChange={handleOrderBy}>
        <option>Ordenar por:</option>
        <option value="priceDesc">Precio: de más bajo a más alto</option>
        <option value="priceAsc">Precio: de más alto a más bajo</option>
        <option value="featured">Relevancia</option>
      </Form.Select>
      <div className=" containerListProducts">
        <ItemList products={products} />
      </div>
    </div>
  );
}

export default ItemListContainer;
