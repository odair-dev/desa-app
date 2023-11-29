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
import { Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const tangerine = Tangerine({
  subsets: ["latin"],
  weight: "700",
});

type Inputs = {
  observation: string;
};

export default function Modal() {
  const {
    date,
    hour,
    setConfirmSchedule,
    createSchedule,
    getMySchedule,
    idProperty,
  } = useContext(ScheduleContext);
  const { user } = useContext(UserContext);
  const { setModalMobile, validProperty } = useContext(GlobalContext);
  const router = useRouter();
  const nameProperty = validProperty?.find((i) => i.id == idProperty);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  async function onSubmit(data: any) {
    if (idProperty) {
      const dataFormated = {
        ...data,
        hour,
        date: date.toISOString().slice(0, 10),
      };
      const statusOk = await createSchedule(dataFormated, idProperty);
      if (statusOk) {
        toast.success("Agendamento realizado com sucesso");
        setModalMobile(false);
        setConfirmSchedule(false);
        getMySchedule();
      } else {
        toast.error(
          "Falha ao agendar, verifique se há um conflito na sua agenda ou tente novamente mais tarde."
        );
        setModalMobile(false);
        setConfirmSchedule(false);
        router.push("/myschedules");
      }
    } else {
      toast.error("O imóvel não foi escolhido");
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
            <p className={`${styles.pName} ${raleway.className}`}>
              {nameProperty?.name}
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
