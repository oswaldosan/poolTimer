import axios from "axios";
import { useState, useEffect } from "react";
import AddModal from "../components/addModal";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import Loader from "react-loader-spinner";
import EditModal from "../components/editModal";
import { set } from "react-hook-form";

export default function Home({ data }) {
  const [mesas, setMesas] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [modalShow, setShow] = useState(false);
  const [editShow, setEditmodal] = useState(false);

  async function crearMesa(nombre, precio) {
    const theprice = parseInt(precio);

    const data = {
      nombre: nombre,
      precioHora: theprice,
    };

    const saveMesa = await axios.post("/api/crearmesa", data);
    console.log(saveMesa);
    setShow(false);
    setLoading(true);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchingData();
    setLoading(false);
  }, [isLoading]);

  async function fetchingData() {
    const nuevaData = await axios.get("/api/obtenermesas");
    setMesas(nuevaData.data);
  }

  async function eliminar(id) {
    const alerta = confirm("Seguro que quieres elminar esta mesa ?");
    console.log(alerta);

    if (!alerta) {
      return alerta;
    } else {
      const data = {
        id: id,
      };
      const eliminarMesa = await axios.post("/api/eliminarmesa", data);
      setLoading(true);
    }
  }

  async function editar(nombre, precio, id) {
    const theprice = parseInt(precio);
    const data = {
      id: id,
      nombre: nombre,
      precioHora: theprice,
    };
    const editarMesa = await axios.post("/api/eliminarmesa", data);
    setEditmodal(false);
    setLoading(true);
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="header">
            <img src="/housebilliards.png" width="450px"></img>
          </div>
          <div className="lasMesas">
            <Button className="primary addBtn" onClick={() => setShow(true)}>
              + Agregar Mesa de Billar
            </Button>
            <AddModal
              show={modalShow}
              onHide={() => setShow(false)}
              accept={crearMesa}
            ></AddModal>
            <div className="editMesasGrid">
              {mesas.map((mesa, i) => {
                return (
                  <div className="mesaCard" key={i}>
                    <h2>Numero: {mesa.nombre}</h2>
                    <h4>Precio de la mesa: {mesa.precioHora}</h4>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setEditmodal.bind(true);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminar(mesa.id)}
                    >
                      Elminar
                    </button>

                    <EditModal
                      onHide={() => setEditmodal(false)}
                      show={editShow}
                      accept={editar}
                      id={mesa.id}
                      nombre={mesa.nombre}
                      precio={mesa.precioHora}
                    ></EditModal>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="footer">
            <Link href="/">Timer</Link>
          </div>
        </div>
      )}
    </>
  );
}
