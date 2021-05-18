import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import Link from "next/link";
import { DateTime } from "luxon";

export default function Ventas() {
  const [time, setTime] = useState(0);
  const [ventas, setVenta] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(async () => {
    const sells = await axios.get("/api/obtenerventa");
    setVenta(sells.data);
    setLoading(false);
  }, []);

  function parseDates(fecha) {
    const formatted = DateTime.fromISO(fecha)
      .setZone("America/Los_Angeles")
      .toLocaleString(DateTime.DATETIME_MED);

    return formatted;
  }

  function totalDelaVenta() {
    const allventas = [];

    for (let i = 0; i < ventas.length; i++) {
      allventas.push(ventas[i].venta);
    }
    const sumatotal = allventas.reduce((a, b) => a + b, 0);
    return sumatotal;
  }

  totalDelaVenta();

  return (
    <>
      {isLoading ? (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      ) : (
        <div className="App">
          <div className="header">
            <img src="/housebilliards.png" width="450px"></img>
          </div>
          <div className="totalventasGrid">
            <div className="ventasTotales">
              <h3>
                <strong>Ventas Totales: </strong>${totalDelaVenta()}
              </h3>
            </div>
            <div className="ventaSlot topBar">
              <div>
                <h4>Numero de Mesa</h4>
              </div>
              <div>
                <h4>Cantidad de Venta</h4>
              </div>
              <div>
                <h4>Fecha de Cobro</h4>
              </div>
            </div>

            {ventas.map((venta, i) => {
              return (
                <div className="ventaSlot" key={i}>
                  <div>
                    <h4>{venta.mesa}</h4>
                  </div>
                  <div>
                    <h4>${venta.venta}</h4>
                  </div>
                  <div>
                    <h4>{parseDates(venta.fecha)}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="footer">
        <Link href="/">Timer</Link>
        <Link href="/agregarmesa">Agregar o Editar Mesas</Link>
      </div>
    </>
  );
}
