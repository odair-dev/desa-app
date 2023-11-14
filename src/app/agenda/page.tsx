"use client";
import styles from "./styles.module.scss";
import Image from "next/image";
import Logotipo from "../../img/Logo.png";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { GlobalContext } from "@/providers/GlobalContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { ScheduleContext } from "@/providers/ScheduleContext";
import { UserContext } from "@/providers/UserContext";

export default function Agenda() {
  const { handleSubmit } = useForm();
  const { setModalMobile } = useContext(GlobalContext);
  const { getSchedule, date, setDate, schedules } = useContext(ScheduleContext);
  const { user, token } = useContext(UserContext);
  const router = useRouter();
  let dateSistem = new Date();
  if (dateSistem.getDay() == 0 || dateSistem.getDay() == 6) {
    dateSistem.setDate(dateSistem.getDate() + 1);
  }

  function findSchedules(date: string) {
    schedules.map(async (i) => {
      await getSchedule(date, i);
    });
    router.push("/agenda/schedules");
  }

  function handleDate(date: any) {
    setDate(date);
  }

  function confirmDate() {
    findSchedules(date.toISOString().slice(0, 10));
  }

  function goBack() {
    setModalMobile(false);
    router.push("/");
  }

  if (user && token) {
    return (
      <form className={styles.formEmail} onSubmit={handleSubmit(confirmDate)}>
        <div className={styles.divLogo}>
          <div className={styles.btnGoBack} onClick={() => goBack()}>
            Voltar
          </div>
          <Image
            src={Logotipo}
            alt="Logotipo"
            className={styles.imgLogo}
            onClick={() => goBack()}
          />
        </div>
        <div className={styles.divDateOn}>
          <p>Escolha uma data:</p>
          <Calendar onChange={handleDate} value={date} minDate={dateSistem} />
          <button className={styles.btnSend} type="submit">
            Confirmar
          </button>
        </div>
      </form>
    );
  } else {
    return (
      <form className={styles.formEmail}>
        <div className={styles.divLogo}>
          <div className={styles.btnGoBack} onClick={() => goBack()}>
            Voltar
          </div>
          <Image
            src={Logotipo}
            alt="Logotipo"
            className={styles.imgLogo}
            onClick={() => goBack()}
          />
        </div>
        <p>
          É necessário estar logado na aplicação para realizar esta operação.
        </p>
        <div className={styles.divBtns}>
          <div
            className={styles.btnLogin}
            onClick={() => router.push("/registro")}
          >
            Registrar
          </div>
          <div
            className={styles.btnLogin}
            onClick={() => router.push("/login")}
          >
            Fazer Login
          </div>
        </div>
      </form>
    );
  }
}
