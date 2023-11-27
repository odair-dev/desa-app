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
  const { mySchedules, getMySchedule, removeSchedule } =
    useContext(ScheduleContext);
  const [reloading, setReloading] = useState(false);

  function goBack() {
    router.push("/");
  }

  function deleteVisible(date: string, schedule: string) {
    if (
      date == new Date(new Date().toDateString()).toISOString().slice(0, 10)
    ) {
      let addOneHour = new Date().getTime() + 60 * 60 * 1000;
      let newTime = new Date(addOneHour);
      let hour = newTime.getHours();
      let min = newTime.getMinutes();

      const refTime = `${hour.toString().padStart(2, "0")}:${min
        .toString()
        .padStart(2, "0")}`;
      if (schedule >= refTime) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

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

  async function removeOneSchedule(id: string) {
    setReloading(true);
    const deleteSchedule = await removeSchedule(id);
    if (deleteSchedule) {
      setReloading(false);
      toast.success("Agendamento removido com sucesso");
      refresh();
    } else {
      setReloading(false);
      toast.error("Falha ao remover o agendamento");
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
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
          <i className="fa-solid fa-house"></i>
          <p>Home</p>
        </div>
        <div className={styles.btn} onClick={() => router.push("/agenda")}>
          <i className="fa-solid fa-calendar-days"></i>
          <p>Agendar</p>
        </div>
        <div className={styles.btn} onClick={() => refresh()}>
          <i className="fa-solid fa-rotate"></i>
          <p>Atualizar</p>
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
                <h3 className={styles.pName}>
                  {i.property.name}{" "}
                  <span onClick={() => removeOneSchedule(i.id)}>
                    {deleteVisible(
                      `${new Date(
                        Date.parse(i.date.toString().slice(0, 10))
                      ).getFullYear()}-${
                        new Date(
                          Date.parse(i.date.toString().slice(0, 10))
                        ).getMonth() + 1
                      }-${new Date(
                        Date.parse(i.date.toString().slice(0, 10))
                      ).getDate()}`,
                      i.hour
                    ) ? (
                      <i className="fa-regular fa-trash-can"></i>
                    ) : null}
                  </span>
                </h3>
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
