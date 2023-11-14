"use client";
import styles from "../styles.module.scss";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import Logotipo from "../../../img/Logo.png";
import "react-toastify/dist/ReactToastify.css";
import "react-calendar/dist/Calendar.css";
import { GlobalContext } from "@/providers/GlobalContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { ScheduleContext } from "@/providers/ScheduleContext";
import Modal from "@/components/Modal";

export default function Agenda() {
  const { setModalMobile } = useContext(GlobalContext);
  const router = useRouter();
  const { free, date, setHour, confirmSchedule, setConfirmSchedule } =
    useContext(ScheduleContext);

  function goBack() {
    setModalMobile(false);
    router.push("/agenda");
  }

  function handleTime(hour: string) {
    setHour(hour);
    const data = { date: `${date.toISOString().slice(0, 10)}`, hour };
    setConfirmSchedule(true);
  }

  return (
    <>
      <ToastContainer />
      {confirmSchedule ? <Modal /> : null}
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
        <div className={styles.divHourOn}>
          <p>Escolha um horário:</p>
          <div className={styles.divSchedules}>
            {free.map((hour: string) => (
              <div
                className={styles.cardSchedule}
                key={hour}
                onClick={() => handleTime(hour)}
              >
                <p className={styles.pHour}>{hour}</p>
              </div>
            ))}
          </div>
        </div>
      </form>
    </>
  );
}
