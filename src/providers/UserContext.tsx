"use client"
import { api } from "@/services/api";
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies';
import jwt, { JwtPayload } from "jsonwebtoken";


export interface IUserContext{
    signIn: ({ username, password }: signInData) => Promise<void>;
    user: IUserState | null;
    setUser: Dispatch<SetStateAction<IUserState | null>>;
    setToken: Dispatch<SetStateAction<string | null>>;
    setUserId: Dispatch<SetStateAction<null>>;
}

export const UserContext = createContext({} as IUserContext);

type signInData = {
    username: string;
    password: string;
}

type IDecodedToken = {
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
  user_id: string;
}

export interface IUserState {
    id: string;
    name: string;
    phone: string;
    email: string;
    username: string;
    is_superuser: boolean;
}

export interface IDecoded {
    decoded: IUserState;
}

export interface IDefaultProviderProps {
    children: React.ReactNode;
}

export function UserProvider({children}: IDefaultProviderProps){
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState<string|null>(null);
  const [user, setUser] = useState<IUserState | null>(null);

  function verifySigin() {
    const { 'nextauth.token': recoveredToken } = parseCookies();
    if(recoveredToken){
      setToken(recoveredToken);
      const { user_id } = jwt.decode(recoveredToken);
      if(user_id){
        setUserId(user_id);
      }
    }
  }

  useEffect(()=>{
    verifySigin();
  },[])

  useEffect(()=>{
    if(token!=null&&userId!=null){
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      getUser(userId);
    }
  },[token, userId])

  async function getUser(id:string){
    try {
      const response = await api.get(`accounts/${id}/`);
      setUser(response.data);    
    } catch (error) {
      console.log("Falha ao buscar dados do usuário, faça o login novamente \n", error);
    }
  }

  async function signIn({ username, password }: signInData){
    try {
      const response = await api.post('login/', {
        username,
        password,
      })
            
      const tokenReceived = response.data.access;
      setToken(tokenReceived);
      if(tokenReceived){
        const decoded = jwt.decode(tokenReceived);
        if(decoded!=null){
          const { user_id } = decoded;
          setUserId(user_id);
        }
      }
      setCookie(undefined, 'nextauth.token', tokenReceived, {
        maxAge: 60*60*1, //1 hour
      });
    } catch (error) {
      console.log("Não foi possível realizar o login. \n", error);
    }
  }

  return(
    <UserContext.Provider value={{ signIn, user, setUser, setToken, setUserId }}>
      {children}
    </UserContext.Provider>
  )
}