import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./pages/Cart";
import NotFound404 from "./pages/pageError/NotFound404";
import { CartProvider } from "./context/CartContext";
import Checkout from "./pages/Checkout";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<Home />} />
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>

        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
