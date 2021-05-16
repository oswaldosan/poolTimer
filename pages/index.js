import axios from "axios";
import { useState, useEffect } from "react";
import Crono from "../components/Crono";
import Loader from "react-loader-spinner";

export default function Home() {
  const [time, setTime] = useState(0);
  const [mesas, setMesas] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(async () => {
    const data = await axios.get("/api/hello");
    setMesas(data.data);
    setLoading(false);
  }, []);

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
          <div className="supTable">
            <div className="slot">Numero de Mesa</div>
            <div className="slot">Tiempo que lleva</div>
            <div className="slot">Estado de la Mesa</div>
            <div className="slot">Cantidad a Pagar</div>
            <div className="slot">Acciones</div>
          </div>
          {mesas.map((mesa, i) => {
            return <Crono mesa={mesa.title} price={mesa.price} key={i}></Crono>;
          })}
        </div>
      )}
    </>
  );
}
