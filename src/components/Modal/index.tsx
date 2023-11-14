import { useContext } from "react";
import styles from "./styles.module.scss";
import { ScheduleContext } from "@/providers/ScheduleContext";
import { UserContext } from "@/providers/UserContext";
import { useForm } from "react-hook-form";
import { Tangerine } from "next/font/google";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContext } from "@/providers/GlobalContext";

const tangerine = Tangerine({
  subsets: ["latin"],
  weight: "700",
});

type Inputs = {
  observation: string;
};

export default function Modal() {
  const { date, hour, setConfirmSchedule, createSchedule, getMySchedule } =
    useContext(ScheduleContext);
  const { user } = useContext(UserContext);
  const { setModalMobile } = useContext(GlobalContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  async function onSubmit(data: any) {
    const id = "710db614-f0ff-4fe0-bd26-49437fd1b788";
    const dataFormated = {
      ...data,
      hour,
      date: date.toISOString().slice(0, 10),
    };
    const statusOk = await createSchedule(dataFormated, id);
    if (statusOk) {
      toast.success("Agendamento realizado com sucesso");
      setModalMobile(false);
      setTimeout(() => {
        setConfirmSchedule(false);
        getMySchedule();
      }, 2000);
    } else {
      toast.error("Falha ao agendar, tente novamente.");
      setModalMobile(false);
      setTimeout(() => {
        setConfirmSchedule(false);
        router.push("/");
      }, 1700);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.divObservation}>
        <p className={styles.pClose} onClick={() => setConfirmSchedule(false)}>
          x
        </p>
        <form className={styles.formSchedule} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.divName}>
            <p className={`${styles.pName} ${tangerine.className}`}>
              Residencial Lisboa
            </p>
          </div>
          {user ? (
            <div className={styles.divDateTime}>
              <p>{`Agendado por: ${user.name}`}</p>
            </div>
          ) : null}
          <div className={styles.divDateTime}>
            <p>{`Dia: ${date.toLocaleDateString()}`}</p>
            <p>{`Horário: ${hour}`}</p>
          </div>
          <h3>Gostaria de adicionar alguma observação?</h3>
          <textarea
            placeholder="Digite sua observação"
            {...register("observation")}
          ></textarea>
          <div className={styles.divBtn}>
            <button>Agendar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
