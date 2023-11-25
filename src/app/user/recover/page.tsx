"use client";
import { useContext } from "react";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Logotipo from "../../../img/Logo.png";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/providers/GlobalContext";
import { api } from "@/services/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserContext } from "@/providers/UserContext";

const schema = z.object({
  email: z
    .string()
    .min(6, "Email é obrigatório")
    .email("Formato inválido de e-mail"),
});

type Inputs = {
  email: string;
};

export default function Login() {
  const { setModalMobile } = useContext(GlobalContext);
  const { recoverPassword } = useContext(UserContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: any) {
    await recoverPassword(data);
    reset({ email: "" });
    toast.success(
      "Se for um e-mail válido, você recebera o e-mail de recuperação."
    );
    setModalMobile(false);
    router.push("/");
  }

  function goBack() {
    setModalMobile(false);
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.blueBackground}></div>
      <form className={styles.formLogin} onSubmit={handleSubmit(onSubmit)}>
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
        <label htmlFor="inpEmail" className={styles.lblLogin}>
          E-mail:
        </label>
        <input
          type="email"
          id="inpEmail"
          className={styles.inpLogin}
          placeholder="Informe seu email"
          {...register("email")}
        />
        {errors.email?.message != undefined ? (
          <p className={styles.redText}>{errors.email?.message}</p>
        ) : null}
        <button className={styles.btnLogin} type="submit">
          RECUPERAR SENHA
        </button>
      </form>
    </div>
  );
}
