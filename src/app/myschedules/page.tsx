"use client";
import styles from "./styles.module.scss";
import { GlobalContext } from "@/providers/GlobalContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { ScheduleContext } from "@/providers/ScheduleContext";
import Image from "next/image";
import Logotipo from "../../img/Logo.png";

export default function Agenda() {
  const { setModalMobile } = useContext(GlobalContext);
  const router = useRouter();
  const {
    mySchedules,
    free,
    date,
    setHour,
    confirmSchedule,
    setConfirmSchedule,
  } = useContext(ScheduleContext);

  function goBack() {
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.divLogo}>
        <Image
          src={Logotipo}
          alt="Logotipo"
          className={styles.imgLogo}
          onClick={() => goBack()}
        />
      </div>
      <div className={styles.divBtn}>
        <div className={styles.btn} onClick={() => goBack()}>
          Home
        </div>
        <div className={styles.btn} onClick={() => router.push("/agenda")}>
          Agendar
        </div>
      </div>
      {mySchedules != null ? (
        mySchedules.map((i) => (
          <div className={styles.card} key={i.id}>
            <p className={styles.pName}>Residencial Lisboa</p>
            <div className={styles.divDateTime}>
              {/* <p className={styles.pDay}>
                  {`${new Date(
                    Date.parse(i.date.toString().slice(0, 10))
                  ).toLocaleDateString()}`}
                </p> */}
              <p className={styles.pDay}>
                {`${
                  new Date(
                    Date.parse(i.date.toString().slice(0, 10))
                  ).getDate() + 1
                }/${
                  new Date(
                    Date.parse(i.date.toString().slice(0, 10))
                  ).getMonth() + 1
                }/${new Date(
                  Date.parse(i.date.toString().slice(0, 10))
                ).getFullYear()}`}
              </p>
              <p className={styles.pHour}>{i.hour}</p>
            </div>
            <div className={styles.divObservation}>
              <p>Obs.: {i.observation}</p>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.card}>
          <p className={styles.pName}>Nenhum agendamento encontrado</p>
        </div>
      )}
    </div>
  );
}
