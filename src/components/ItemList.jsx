import Item from "./Item";
import Spinner from "react-bootstrap/Spinner";
function ItemList({ products }) {
  return (
    <>
      {products.length > 0 ? (
        products.map((product) => {
          return <Item key={product.id} product={product} />;
        })
      ) : (
        <div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </>
  );
}

export default ItemList;
