import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";

function LastModal(props) {
  const { mesa, totalCobrar, totalMinutos, porHora } = props;
  const [cambio, setCambio] = useState(0);

  function handleChange(e) {
    const { value } = e.target;

    const cambioLast = value - totalCobrar;

    if (value < totalCobrar) {
      setCambio(0);
    } else {
      setCambio(cambioLast.toFixed(2));
    }
  }

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="modalTitle"
          >
            <h1>Total a pagar {mesa}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="cobroGrid">
            <div className="slots"> Numero de Mesa </div>
            <div className="slots"> Cantitdad de Minutos </div>
            <div className="slots"> Precio por Hora </div>
            <div className="slots"> Total </div>

            <div className="slots"> {mesa} </div>
            <div className="slots"> {totalMinutos} </div>
            <div className="slots"> {porHora} </div>
            <div className="slots"> ${totalCobrar.toFixed(2)} </div>
          </div>
          <br />
          <div className="payment">
            <span>Total a Pagar </span>
            <input type="text" value={totalCobrar.toFixed(2)}></input> <br />
            <span>Con Cuanto paga ? </span>
            <input type="text" onChange={handleChange}></input>
            <br />
            <span>Total Cambio: </span>
            <input type="text" value={cambio}></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} className="modalbutton">
            Volver
          </Button>
          <Button onClick={props.accept} className="modalbutton">
            Terminar Venta
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LastModal;
