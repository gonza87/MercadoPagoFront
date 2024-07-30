import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import ShoppingCart from "./ShoppingCart";
import { CgMenuLeft } from "react-icons/cg";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

function NavBar() {
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    const categoriasRef = collection(db, "categories");
    getDocs(categoriasRef).then((res) => {
      setCategories(
        res.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  }, []);

  return (
    <Navbar expand="lg" className="nav">
      <Container>
        <Navbar.Brand>
          <Link to={"/"}>
            <img className="logo" src="/img/logoArt.jpg" alt="logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <CgMenuLeft style={{ color: "#f4f4f6" }} />
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Dropdown>
              <Dropdown.Toggle
                className="menuNav"
                style={{ backgroundColor: "#000000" }}
              >
                Tienda
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {categories.map((category) => {
                  return (
                    <Dropdown.Item
                      key={category.id}
                      as={Link}
                      to={`/category/${category.id}`}
                    >
                      {category.name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>

            <Link className="menuNav" to="/about">
              Sobre Nosotros
            </Link>
            <Link className="menuNav menuContact" to="/contact">
              Contacto
            </Link>
          </Nav>
        </Navbar.Collapse>
        <ShoppingCart />
      </Container>
    </Navbar>
  );
}

export default NavBar;
