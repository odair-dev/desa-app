"use client";
import styles from "./styles.module.scss";
import styles2 from "@/sass/loadingSchedule.module.scss";
import Image from "next/image";
import Logotipo from "../../img/Logo.png";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GlobalContext } from "@/providers/GlobalContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ScheduleContext } from "@/providers/ScheduleContext";
import { UserContext } from "@/providers/UserContext";

export default function Agenda() {
  const [reloading, setReloading] = useState(true);
  const { handleSubmit } = useForm();
  const { setModalMobile } = useContext(GlobalContext);
  const { date, setDate, setFree } = useContext(ScheduleContext);
  const { user } = useContext(UserContext);
  const router = useRouter();
  let dateSistem = new Date(new Date().toDateString());
  if (dateSistem.getDay() == 0 || dateSistem.getDay() == 6) {
    dateSistem.setDate(dateSistem.getDate() + 1);
  }

  function handleDate(date: any) {
    setDate(date);
  }

  function confirmDate() {
    if (user) {
      setFree(null);
      router.push("/schedules");
    } else {
      router.push("/login");
    }
  }

  function goBack() {
    setModalMobile(false);
    router.push("/");
  }

  async function refresh() {
    setReloading(true);
    setTimeout(() => {
      setReloading(false);
    }, 1250);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <form className={styles.formEmail} onSubmit={handleSubmit(confirmDate)}>
      {reloading ? (
        <div className={styles2.loading}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
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
          </div>
          <div className={styles.divDateOn}>
            <p>Escolha uma data:</p>
            <Calendar onChange={handleDate} value={date} minDate={dateSistem} />
            <button className={styles.btnSend} type="submit">
              Confirmar
            </button>
          </div>
        </>
      )}
    </form>
  );
}
