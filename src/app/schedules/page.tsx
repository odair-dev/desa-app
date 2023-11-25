"use client";
import styles from "./styles.module.scss";
import Image from "next/image";
import Logotipo from "../../img/Logo.png";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ScheduleContext } from "@/providers/ScheduleContext";
import styles2 from "@/sass/loadingSchedule.module.scss";
import Modal from "@/components/Modal";
import { UserContext } from "@/providers/UserContext";
import { toast } from "react-toastify";

export default function Schedules() {
  const [reloading, setReloading] = useState(true);
  const [free2, setFree2] = useState<string[] | null>(null);
  const { user } = useContext(UserContext);
  const router = useRouter();
  const {
    schedules,
    getSchedule,
    date,
    free,
    setFree,
    setHour,
    setConfirmSchedule,
    confirmSchedule,
  } = useContext(ScheduleContext);

  function goBack() {
    router.push("/");
  }

  useEffect(() => {
    setFree2(free);
  }, [free]);

  // useEffect(() => {
  //   console.log(free2);
  // }, [free2]);

  async function refresh() {
    setReloading(true);
    schedules.map(async (i) => {
      await getSchedule(date.toISOString().slice(0, 10), i);
    });
    setTimeout(() => {
      setReloading(false);
    }, 1500);
  }

  function handleTime(hour: string) {
    if (user) {
      setHour(hour);
      setConfirmSchedule(true);
    } else {
      setConfirmSchedule(false);
      toast.warn("É necessário estar logado para esta operação.");
      router.push("/login");
    }
  }

  useEffect(() => {
    setFree2(null);
    setFree(null);
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      {confirmSchedule ? <Modal /> : null}
      <div className={styles.blueBackground}></div>
      {reloading ? (
        <div className={styles2.loading}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <form className={styles.formSchedules}>
          <div className={styles.divLogo}>
            <div className={styles.btnGoBack} onClick={() => goBack()}>
              <i className="fa-solid fa-house"></i>
            </div>
            <Image
              src={Logotipo}
              alt="Logotipo"
              className={styles.imgLogo}
              onClick={() => goBack()}
              priority={true}
            />
            <p>{date.toLocaleDateString()}</p>
          </div>
          <div className={styles.divHourOn}>
            {free2 ? <p>Escolha um horário:</p> : null}
            <div className={styles.divSchedules}>
              {free2 != null ? (
                free2.map((hour: string) => (
                  <div
                    className={styles.cardSchedule}
                    key={hour}
                    onClick={() => handleTime(hour)}
                  >
                    <p className={styles.pHour}>{hour}</p>
                  </div>
                ))
              ) : (
                <h4>Infelizmente esta data não possui mais horários.</h4>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
