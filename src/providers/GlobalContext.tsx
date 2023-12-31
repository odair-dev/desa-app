"use client";
import { api } from "@/services/api";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IGlobalProviderProps {
  children: React.ReactNode;
}

export interface IProperties {
  id: string;
  name: string;
  size: number;
  available: boolean;
  category: string;
  address: {
    id: string;
    cep: string;
    state: string;
    city: string;
    district: string;
    street: string;
    number: string;
    complement: string | null;
    property_id: string;
  };
}

interface IGlobalContext {
  modalMobile: boolean;
  setModalMobile: React.Dispatch<React.SetStateAction<boolean>>;
  modalSchedules: boolean;
  setModalSchedules: React.Dispatch<React.SetStateAction<boolean>>;
  property: IProperties | null;
  setProperty: React.Dispatch<React.SetStateAction<IProperties | null>>;
  modalEdit: boolean;
  setModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
  modalRegister: boolean;
  setModalRegister: React.Dispatch<React.SetStateAction<boolean>>;
  getProperties: () => Promise<boolean>;
  properties: IProperties[] | null;
  setProperties: React.Dispatch<React.SetStateAction<IProperties[] | null>>;
  modalRemove: boolean;
  setModalRemove: React.Dispatch<React.SetStateAction<boolean>>;
  propertyRemove: string | null;
  setPropertyRemove: React.Dispatch<React.SetStateAction<string | null>>;
  validProperty: IProperties[] | null;
  modalAllImages: boolean;
  setModalAllImages: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext({} as IGlobalContext);

export function GlobalProvider({ children }: IGlobalProviderProps) {
  const [modalMobile, setModalMobile] = useState<boolean>(false);
  const [modalAllImages, setModalAllImages] = useState<boolean>(false);
  const [modalSchedules, setModalSchedules] = useState<boolean>(false);
  const [property, setProperty] = useState<IProperties | null>(null);
  const [validProperty, setValidProperty] = useState<IProperties[] | null>(
    null
  );
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [modalRegister, setModalRegister] = useState<boolean>(false);
  const [modalRemove, setModalRemove] = useState<boolean>(false);
  const [propertyRemove, setPropertyRemove] = useState<string | null>(null);
  const [properties, setProperties] = useState<IProperties[] | null>(null);
  // const [idProperty, setIdProperty] = useState<string | null>(null);

  async function getProperties() {
    try {
      const response = await api.get(`/properties`);
      setProperties(response.data);
      return true;
    } catch (error) {
      toast.error("Erro ao buscar informações");
      return false;
    }
  }

  useEffect(() => {
    if (properties != null) {
      let justValid: IProperties[] = [];
      properties.map((i) => {
        if (i.available) {
          justValid.push(i);
        }
      });
      if (justValid.length > 0) {
        setValidProperty(justValid);
      }
    }
  }, [properties]);

  return (
    <GlobalContext.Provider
      value={{
        modalAllImages,
        setModalAllImages,
        validProperty,
        propertyRemove,
        setPropertyRemove,
        modalRemove,
        setModalRemove,
        properties,
        setProperties,
        getProperties,
        modalMobile,
        setModalMobile,
        modalSchedules,
        setModalSchedules,
        property,
        setProperty,
        modalEdit,
        setModalEdit,
        modalRegister,
        setModalRegister,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
