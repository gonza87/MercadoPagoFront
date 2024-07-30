import CaruselHome from "../components/CarouselHome";
import ItemListContainer from "../components/ItemListContainer";

function Home() {
  return (
    <>
      <CaruselHome />
      <ItemListContainer />
      <div className="container">
        <div className="contenedorImgPagos">
          <img className="imgpagos" src="/img/Metodos_Tarjetas.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default Home;
