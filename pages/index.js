import axios from "axios";
import { useState, useEffect } from "react";
import Crono from "../components/Crono";
import Loader from "react-loader-spinner";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default function Home({ data }) {
  const [time, setTime] = useState(0);
  const [mesas, setMesas] = useState(data);
  const [isLoading, setLoading] = useState(false);

  console.log(data);

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
          <div className="supTable">
            <div className="slot">Numero de Mesa</div>
            <div className="slot">Tiempo que lleva</div>
            <div className="slot">Estado de la Mesa</div>
            <div className="slot">Cantidad a Pagar</div>
            <div className="slot">Acciones</div>
          </div>
          {mesas.length > 0 ? (
            ""
          ) : (
            <div className="noMesas">
              <h1>No Hay Mesas Agregadas...</h1>
            </div>
          )}
          {mesas.map((mesa, i) => {
            return (
              <Crono mesa={mesa.nombre} price={mesa.precioHora} key={i}></Crono>
            );
          })}
        </div>
      )}
      <div className="footer">
        <Link href="/agregarmesa">Agregar o Editar Mesas</Link>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const mesas = await prisma.mesasDisponibles.findMany();
  return {
    props: {
      data: mesas,
    },
  };
}
