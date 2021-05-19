import React, { useContext, createContext, useState } from "react";
import { useStopwatch } from "react-timer-hook";

//Context
export const AppContext = createContext(null);

//Provider
export const AppContextProvider = ({ children }) => {
  const [dummy, setDummy] = useState("test");

  const values = React.useMemo(
    () => ({
      dummy, // Funciones que son exportadas para manejo externo.
    }),
    [dummy]
  ); // States que serán visibles en el contexto.

  // Interface donde será expuesto como proveedor y envolverá la App.
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

//
export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    console.error("Error deploying App Context!!!");
  }

  return context;
}

export default useAppContext;
