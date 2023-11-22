"use client";
import { useContext } from "react";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { UserContext } from "@/providers/UserContext";
import Image from "next/image";
import Logotipo from "../../img/Logo.png";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/providers/GlobalContext";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { signIn, user, setUser, setToken, setUserId } =
    useContext(UserContext);
  const { setModalMobile } = useContext(GlobalContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  async function onSubmit(data: any) {
    if (!user) {
      const statusOk = await signIn(data);
      if (statusOk) {
        reset({ email: "", password: "" });
        toast.success("Login realizado com sucesso");
        setModalMobile(false);
        router.push("/");
      } else {
        toast.error("Usuário ou senha inválidos");
      }
    }
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
            Voltar
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
          required
          className={styles.inpLogin}
          placeholder="Informe seu email"
          {...register("email")}
        />
        <label htmlFor="inpPassword" className={styles.lblLogin}>
          Senha:
        </label>
        <input
          type="password"
          id="inpPassword"
          required
          className={styles.inpLogin}
          placeholder="Digite sua senha"
          {...register("password")}
        />
        <button className={styles.btnLogin} type="submit">
          LOGIN
        </button>
      </form>
    </div>
  );
}
