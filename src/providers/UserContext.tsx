"use client";
import { api } from "@/services/api";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export interface IUserContext {
  signIn: ({ email, password }: signInData) => Promise<boolean>;
  user: IUserState | null;
  setUser: Dispatch<SetStateAction<IUserState | null>>;
  setToken: Dispatch<SetStateAction<string | null>>;
  setUserId: Dispatch<SetStateAction<string | null>>;
  registerUser: (data: IRegisterUser) => Promise<boolean>;
  token: string | null;
  updateUser: (data: IRegisterUser, id: string) => Promise<boolean>;
  userToUpdate: any;
  setUserToUpdate: Dispatch<any>;
  removeUser: (id: string) => Promise<boolean>;
  recoverPassword: (data: any) => Promise<boolean>;
}

export const UserContext = createContext({} as IUserContext);

type signInData = {
  email: string;
  password: string;
};

export interface IUserState {
  id: string;
  name: string;
  email: string;
  phone: string;
  active: boolean;
  type: string;
}

export interface IRegisterUser {
  email: string;
  name: string;
  phone: string;
  password: string;
}

export interface IDecoded {
  decoded: IUserState;
}

export interface IDefaultProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: IDefaultProviderProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IUserState | null>(null);
  const [userToUpdate, setUserToUpdate] = useState<any | null>(null);

  function verifySigin() {
    const recoveredToken = Cookies.get("nextauth.token");
    if (recoveredToken) {
      setToken(recoveredToken);
      const decoded = jwt.decode(recoveredToken);
      if (decoded != null) {
        const id = decoded.sub;
        setUserId(`${id}`);
      }
    }
  }

  useEffect(() => {
    verifySigin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token != null && userId != null) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      getUser(userId);
    }
  }, [token, userId]);

  async function getUser(id: string) {
    try {
      const response = await api.get(`/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.log(
        "Falha ao buscar dados do usuário, faça o login novamente \n",
        error
      );
    }
  }

  async function signIn({ email, password }: signInData) {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      const tokenReceived = response.data.token;
      setToken(tokenReceived);
      if (tokenReceived) {
        const decoded = jwt.decode(tokenReceived);
        if (decoded != null) {
          const id = decoded.sub;
          setUserId(`${id}`);
        }
      }
      Cookies.set("nextauth.token", tokenReceived, {
        expires: 1/24, // 1 hour
        path: "/",
        sameSite: "lax",
      });
      return true;
    } catch (error) {
      console.log("Não foi possível realizar o login. \n", error);
      return false;
    }
  }

  async function registerUser(data: IRegisterUser) {
    try {
      const response = await api.post("/users", {
        ...data,
      });
      return true;
    } catch (error) {
      console.log("Não foi possível realizar o cadastro. \n", error);
      return false;
    }
  }

  async function updateUser(data: IRegisterUser, id: string) {
    try {
      const response = await api.patch(`/users/${id}`, {
        ...data,
      });
      console.log(response.data);
      setUser(response.data);
      return true;
    } catch (error) {
      console.log("Não foi possível realizar a atualização. \n", error);
      return false;
    }
  }

  async function removeUser(id: string) {
    try {
      const response = await api.delete(`/users/${id}`);
      return true;
    } catch (error) {
      console.log("Não foi possível realizar esta operação. \n", error);
      return false;
    }
  }

  async function recoverPassword(data: any): Promise<boolean> {
    try {
      await api.post("/users/reset", { ...data });
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <UserContext.Provider
      value={{
        recoverPassword,
        signIn,
        user,
        setUser,
        token,
        setToken,
        setUserId,
        registerUser,
        updateUser,
        userToUpdate,
        setUserToUpdate,
        removeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
