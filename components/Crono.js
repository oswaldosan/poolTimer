import React, { useState } from "react";
import LastModal from "./Modal";
import { useStopwatch } from "react-timer-hook";
import axios from "axios";
import { useAppContext } from "../context/context";

function MyStopwatch({ mesa, price }) {
  const [lastPrice, setPrice] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  const precioPorMinuto = price / 60;

  const totalMinutos = hours * 60 + minutes;

  const totalprice = precioPorMinuto * totalMinutos;

  function completeSale() {
    setModalShow(true);
  }

  async function cobrar() {
    /*ACCEPT FUNCTION ON MODAL*/
    const data = {
      mesa: mesa,
      venta: totalprice.toFixed(2),
    };
    const saved = axios.post("/api/savesell", data);
    console.log(saved);
    setModalShow(false);
    reset("", false);
  }

  return (
    <>
      <div className="mesaGrid">
        <div className="mesatitle">
          <h1>{mesa}</h1>
        </div>

        <div className="timer">
          <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>

        <div
          className="active"
          style={
            isRunning
              ? { background: "#06d6a0", color: "black" }
              : { background: "#9b0000", color: "white" }
          }
        >
          <p>{isRunning ? "Activo" : "Parado"}</p>
        </div>

        <div className="actualPrice">
          <span>${totalprice.toFixed(2)}</span>
        </div>

        <div className="botones">
          <button onClick={start}>Iniciar</button>
          <button onClick={pause}>Pausar</button>
          <button onClick={completeSale}>Terminar</button>
        </div>
      </div>
      <LastModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        accept={cobrar}
        mesa={mesa}
        totalCobrar={totalprice}
        totalMinutos={minutes}
        porHora={price}
      ></LastModal>
    </>
  );
}

export default function Crono({ mesa, price }) {
  return (
    <div>
      <MyStopwatch mesa={mesa} price={price} />
    </div>
  );
}
