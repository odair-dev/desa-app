"use client";
import styles from "./styles.module.scss";
import styles2 from "@/sass/loadingSchedule.module.scss";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ScheduleContext } from "@/providers/ScheduleContext";
import Image from "next/image";
import Logotipo from "../../img/Logo.png";
import { toast } from "react-toastify";

export default function Agenda() {
  const router = useRouter();
  const { mySchedules, getMySchedule } = useContext(ScheduleContext);
  const [reloading, setReloading] = useState(false);

  function goBack() {
    router.push("/");
  }

  // function goUpdate() {
  //   setReloading(true);
  //   setTimeout(() => {
  //     getMySchedule();
  //     setReloading(false);
  //     // console.log("update", mySchedules);
  //   }, 1500);
  // }

  async function refresh() {
    setReloading(true);
    const refreshSchedule = await getMySchedule();
    if (refreshSchedule) {
      setReloading(false);
      toast.success("Agenda atualizada com sucesso");
    } else {
      router.push("/login");
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      {/* <ToastContainer position="bottom-right" autoClose={2000} /> */}
      <div className={styles.divLogo}>
        <Image
          src={Logotipo}
          alt="Logotipo"
          className={styles.imgLogo}
          onClick={() => goBack()}
          priority={true}
        />
      </div>
      <h2>Meus agendamentos</h2>
      <div className={styles.divBtn}>
        <div className={styles.btn} onClick={() => goBack()}>
          Home
        </div>
        <div className={styles.btn} onClick={() => router.push("/agenda")}>
          Agendar
        </div>
        <div className={styles.btn} onClick={() => refresh()}>
          Atualizar
        </div>
      </div>
      {reloading ? (
        <div className={styles2.loading}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div className={styles.allSchedules}>
          {mySchedules != null ? (
            mySchedules.map((i) => (
              <div className={styles.card} key={i.id}>
                <h3 className={styles.pName}>{i.property.name}</h3>
                <div className={styles.divDateTime}>
                  <p className={styles.pDay}>
                    {`${new Date(
                      Date.parse(i.date.toString().slice(0, 10))
                    ).getDate()}/${
                      new Date(
                        Date.parse(i.date.toString().slice(0, 10))
                      ).getMonth() + 1
                    }/${new Date(
                      Date.parse(i.date.toString().slice(0, 10))
                    ).getFullYear()}`}
                  </p>
                  <p className={styles.pHour}>{i.hour}</p>
                </div>
                <div className={styles.divNameUser}>
                  <p>{i.user.name}</p>
                </div>
                <div className={styles.divDefault}>
                  <p>Telefone: {i.user.phone}</p>
                </div>
                <div className={styles.divDefault}>
                  <p>{i.user.email}</p>
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
      )}
    </div>
  );
}
