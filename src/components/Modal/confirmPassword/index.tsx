import { useContext, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { UserContext } from "@/providers/UserContext";
import { toast } from "react-toastify";

type Inputs = {
  password: string;
};

export default function ModalPassword() {
  const { user, updateUser, userToUpdate, setUserToUpdate, signIn } =
    useContext(UserContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  async function onSubmit(data: Inputs) {
    const dataFormated = { ...data, email: user!.email };
    setUserToUpdate(null);
    const statusOk = await signIn(dataFormated);
    if (statusOk) {
      const statusOk2 = await updateUser(userToUpdate, user!.id);
      if (statusOk2) {
        toast.success("Atualização realizada com sucesso");
        setTimeout(() => {
          window.location.reload();
        }, 1700);
      } else {
        toast.error("Este e-mail já existe.");
      }
      setUserToUpdate(null);
    } else {
      toast.error("Senha inválida");
    }
    reset({ password: "" });
  }

  // const modalRef = useRef<any>(null);
  // useEffect(() => {
  //   const handleOutclick = (event: { target: any }) => {
  //     if (!modalRef.current?.contains(event.target)) {
  //       setUserToUpdate(false);
  //     }
  //   };

  //   window.addEventListener("mousedown", handleOutclick);

  //   const handleKeyDown = (event: any) => {
  //     if (event.key === "Escape") {
  //       setUserToUpdate(false);
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //     window.removeEventListener("mousedown", handleOutclick);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (userToUpdate != null) {
    return (
      <div className={styles.modalPassword}>
        <form className={styles.formPassword} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="inpConfirmPassword">Informe a senha atual:</label>
          <input
            type="password"
            id="inpConfirmPassword"
            className={styles.inpConfirmPassword}
            required
            {...register("password")}
          />
          <button className={styles.btnConfirmPassword} type="submit">
            Enviar
          </button>
        </form>
      </div>
    );
  } else {
    return null;
  }
}
