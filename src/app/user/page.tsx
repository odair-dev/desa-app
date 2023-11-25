"use client";
import { useContext } from "react";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { UserContext } from "@/providers/UserContext";
import Image from "next/image";
import Logotipo from "../../img/Logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/providers/GlobalContext";
import ModalPassword from "@/components/Modal/confirmPassword";
import { destroyCookie } from "nookies";
import { ScheduleContext } from "@/providers/ScheduleContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    name: z.string().min(3, "Nome é obrigatório"),
    email: z
      .string()
      .min(6, "Email é obrigatório")
      .email("Formato inválido de e-mail"),
    phone: z.string().min(13, "Celular é obrigatório"),
    password: z
      .string()
      .min(8, "Senha é obrigatória com 8 digitos")
      .regex(/(?=.*?[A-Z])/, "É necessário ao menos uma letra maiúscula.")
      .regex(/(?=.*?[a-z])/, "É necessário ao menos uma letra minúscula.")
      .regex(/(?=.*?[0-9])/, "É necessário ao menos um número.")
      .regex(
        /(?=.*?[#?!@$%^&*-])/,
        "É necessário ao menos um caracter especial."
      ),
    confirmPassword: z.string().min(8, "Confirmação de senha é obrigatória"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Precisa ser idêntico a senha.",
    path: ["confirmPassword"],
  });

type Inputs = {
  email: string;
  name: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function User() {
  const { user, setUserToUpdate, removeUser, setUser, setToken, setUserId } =
    useContext(UserContext);
  const { setModalMobile } = useContext(GlobalContext);
  const { setMySchedules } = useContext(ScheduleContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: any) {
    delete data.confirmPassword;

    if (user) {
      setUserToUpdate(data);
    } else {
      toast.error("Para realizar atualização é necessário fazer login");
      router.push("/login");
    }
  }

  function goBack() {
    setModalMobile(false);
    router.push("/");
  }

  async function deleteUser(id: string) {
    const statusOk = await removeUser(id);
    if (statusOk) {
      destroyCookie(null, "nextauth.token");
      setUser(null);
      setToken(null);
      setUserId(null);
      setModalMobile(false);
      setMySchedules(null);
      toast.success("Conta removida com sucesso");
      router.push("/");
    } else {
      toast.error("Falha ao realizar esta operação.");
    }
  }

  return (
    <div className={styles.container}>
      <ModalPassword />
      <div className={styles.blueBackground}></div>
      <form className={styles.formLogin} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.divLogo}>
          <div className={styles.btnGoBack} onClick={() => goBack()}>
            <i className="fa-solid fa-house"></i>
          </div>
          <Image
            src={Logotipo}
            priority={true}
            alt="Logotipo"
            className={styles.imgLogo}
            onClick={() => goBack()}
          />
        </div>
        <label htmlFor="inpName" className={styles.lblLogin}>
          Nome:
        </label>
        <input
          type="text"
          id="inpName"
          className={styles.inpLogin}
          defaultValue={user?.name}
          {...register("name")}
        />
        {errors.name?.message != undefined ? (
          <p className={styles.redText}>{errors.name?.message}</p>
        ) : null}
        <label htmlFor="inpEmail" className={styles.lblLogin}>
          E-mail:
        </label>
        <input
          type="email"
          id="inpEmail"
          className={styles.inpLogin}
          defaultValue={user?.email}
          {...register("email")}
        />
        {errors.email?.message != undefined ? (
          <p className={styles.redText}>{errors.email?.message}</p>
        ) : null}
        <label htmlFor="inpPhone" className={styles.lblLogin}>
          Celular:
        </label>
        <input
          type="tel"
          id="inpPhone"
          className={styles.inpLogin}
          defaultValue={user?.phone}
          {...register("phone")}
        />
        {errors.phone?.message != undefined ? (
          <p className={styles.redText}>Celular é obrigatório</p>
        ) : null}
        <label htmlFor="inpPassword" className={styles.lblLogin}>
          Insira a senha atual ou sua nova senha:
        </label>
        <input
          type="password"
          id="inpPassword"
          className={styles.inpLogin}
          {...register("password")}
        />
        {errors.password?.message != undefined ? (
          <p className={styles.redText}>{errors.password?.message}</p>
        ) : null}
        <label htmlFor="inpPassword2" className={styles.lblLogin}>
          Digite novamente a senha:
        </label>
        <input
          type="password"
          id="inpPassword2"
          className={styles.inpLogin}
          {...register("confirmPassword")}
        />
        {errors.password?.message != undefined ? (
          <p className={styles.redText}>{errors.password?.message}</p>
        ) : null}
        <button className={styles.btnLogin} type="submit">
          Atualizar
        </button>
        <div className={styles.btnRemove} onClick={() => deleteUser(user!.id)}>
          Excluir Conta
        </div>
      </form>
    </div>
  );
}
