import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container containerForm">
      <h2 className="mt-5">Contacto</h2>
      <p>Si tienes alguna pregunta, no dudes en contactarnos</p>
      <p>Tel: 914-123-456 | info@misitio.com</p>
      <Form className="mt-5 mb-5" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Ingresá tu nombre" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Apellido</Form.Label>
            <Form.Control type="text" placeholder="Ingresá tu apellido" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Ingresá tu email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridTel">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control type="number" placeholder="Ingresá tu teléfono" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <button type="submit" className="btnContactSend">
          ENVIAR MENSAJE
        </button>
      </Form>
    </div>
  );
}

export default Contact;
