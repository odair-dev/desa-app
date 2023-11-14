"use client";
import React, { createContext, useState } from "react";

interface IGlobalProviderProps {
  children: React.ReactNode;
}

interface IGlobalContext {
  modalMobile: boolean;
  setModalMobile: React.Dispatch<React.SetStateAction<boolean>>;
  modalSchedules: boolean;
  setModalSchedules: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext({} as IGlobalContext);

export function GlobalProvider({ children }: IGlobalProviderProps) {
  const [modalMobile, setModalMobile] = useState<boolean>(false);
  const [modalSchedules, setModalSchedules] = useState<boolean>(false);
  return (
    <GlobalContext.Provider
      value={{ modalMobile, setModalMobile, modalSchedules, setModalSchedules }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
