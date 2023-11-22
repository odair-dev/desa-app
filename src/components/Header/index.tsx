"use client";
import styles from "./styles.module.scss";
import Image from "next/image";
import Logotipo from "../../img/Logo.png";
import Sandwich from "../Sandwich";
import { useContext } from "react";
import { GlobalContext } from "@/providers/GlobalContext";
import Link from "next/link";
import { UserContext } from "@/providers/UserContext";
import { destroyCookie } from "nookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ScheduleContext } from "@/providers/ScheduleContext";

export default function Header() {
  const { modalMobile, setModalMobile, modalSchedules, setModalSchedules } =
    useContext(GlobalContext);
  const { user, setUser, setToken, setUserId } = useContext(UserContext);
  const { getMySchedule, setMySchedules } = useContext(ScheduleContext);

  function logout() {
    destroyCookie(null, "nextauth.token");
    setUser(null);
    setToken(null);
    setUserId(null);
    toast.success("Logout realizado com sucesso");
    setModalMobile(false);
    setMySchedules(null);
  }

  return (
    <div className={!modalMobile ? styles.container : styles.container2}>
      <div className={styles.maxSize}>
        <div className={styles.divLogo}>
          <Image
            priority={true}
            src={Logotipo}
            alt="Logotipo"
            className={styles.imgLogo}
          />
        </div>
        {user ? <h3>Olá, {user.name.split(" ", 1)}</h3> : null}
        <Sandwich />
        <Link
          onClick={() => {
            setModalSchedules(false);
            setModalMobile(false);
            getMySchedule();
          }}
          href={`#`}
          className={
            modalMobile && modalSchedules
              ? styles.textMenu11
              : styles.textMenu101
          }
        >
          Meus Agendamentos
        </Link>
        <Link
          onClick={() => {
            setModalSchedules(false);
            setModalMobile(false);
          }}
          href={`/agenda`}
          className={
            modalMobile && modalSchedules
              ? styles.textMenu12
              : styles.textMenu102
          }
        >
          Novo Agendamento
        </Link>
        <Link
          href={`/email/`}
          className={
            modalMobile && !modalSchedules ? styles.textMenu3 : styles.textMenu
          }
        >
          Contato
        </Link>
        {!user ? (
          <>
            <Link
              href={`/agenda`}
              className={
                modalMobile && !modalSchedules
                  ? styles.textMenu1
                  : styles.textMenu
              }
            >
              Agendar Visita
            </Link>
            <Link
              href={`/login/`}
              className={
                modalMobile && !modalSchedules
                  ? styles.textMenu4
                  : styles.textMenu
              }
            >
              Login
            </Link>
            <Link
              href={`/registro/`}
              className={
                modalMobile && !modalSchedules
                  ? styles.textMenu2
                  : styles.textMenu
              }
            >
              Cadastrar
            </Link>
          </>
        ) : (
          <>
            <Link
              href={`#`}
              onClick={() => setModalSchedules(true)}
              className={
                modalMobile && !modalSchedules
                  ? styles.textMenu1
                  : styles.textMenu
              }
            >
              Agendamentos
            </Link>
            <button
              className={
                modalMobile && !modalSchedules
                  ? styles.btnAfter
                  : styles.btnBefore
              }
              onClick={() => logout()}
            >
              Logout
            </button>
            <Link
              href={`/user`}
              className={
                modalMobile && !modalSchedules
                  ? styles.textMenu2
                  : styles.textMenu
              }
            >
              Editar Usuário
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
