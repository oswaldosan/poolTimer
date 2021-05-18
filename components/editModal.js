import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";

function EditModal(props) {
  const [mesadata, setData] = useState([]);
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    const { nombre, precio } = data;
    const id = props.id;
    props.accept(id, nombre, precio);
    console.log(data);
  }

  console.log(props.id, props.nombre, props.precio);
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="modalTitle"
            >
              <h1>Editar Mesa</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="addForm">
              <label>Numero o nombre de la Mesa</label> <br />
              <input
                type="text"
                name="nombre"
                defaultValue={props.nombre}
                placeholder={props.nombre}
                {...register("nombre")}
              ></input>{" "}
              <br />
              <br />
              <label>Precio por hora de la mesa</label> <br />
              <input
                type="text"
                name="precio"
                defaultValue={props.precio}
                {...register("precio")}
                placeholder={props.precio}
              ></input>
            </div>
            <br />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide} className="modalbutton">
              Cerrar
            </Button>
            <input
              type="submit"
              value="Guardar Cambios"
              className="createBtn"
            />
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default EditModal;
