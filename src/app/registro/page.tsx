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
import { destroyCookie } from "nookies";
import { ScheduleContext } from "@/providers/ScheduleContext";

type Inputs = {
  email: string;
  name: string;
  phone: string;
  password: string;
};

export default function Register() {
  const { user, setUser, setToken, setUserId, registerUser, token } =
    useContext(UserContext);
  const { setMySchedules } = useContext(ScheduleContext);
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
      const statusOk = await registerUser(data);
      if (statusOk) {
        reset({ name: "", password: "", email: "", phone: "" });
        toast.success("Registro realizado com sucesso");
        setModalMobile(false);
        setTimeout(() => {
          router.push("/");
        }, 1700);
      } else {
        toast.error("Erro ao realizar o registro");
      }
    } else {
      toast.error("Para realizar cadastro é necessário fazer logout");
    }
  }

  function goBack() {
    setModalMobile(false);
    router.push("/");
  }

  function logout() {
    destroyCookie(null, "nextauth.token");
    setUser(null);
    setToken(null);
    setUserId(null);
    toast.success("Logout realizado com sucesso");
    setMySchedules(null);
  }

  if (user && token) {
    return (
      <div className={styles.container}>
        <div className={styles.blueBackground}></div>
        <form className={styles.formLogin}>
          <div className={styles.divLogo}>
            <div className={styles.btnGoBack} onClick={() => goBack()}>
              Home
            </div>
            <Image
              src={Logotipo}
              priority={true}
              alt="Logotipo"
              className={styles.imgLogo}
              onClick={() => goBack()}
            />
          </div>
          <p>
            É necessário desconectar da aplicação para realizar esta operação.
          </p>
          <button className={styles.btnLogin} onClick={() => logout()}>
            Desconectar
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.blueBackground}></div>
        <form className={styles.formLogin} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.divLogo}>
            <div className={styles.btnGoBack} onClick={() => goBack()}>
              Home
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
            required
            className={styles.inpLogin}
            placeholder="Pedro Silva"
            {...register("name")}
          />
          <label htmlFor="inpEmail" className={styles.lblLogin}>
            E-mail:
          </label>
          <input
            type="email"
            id="inpEmail"
            required
            className={styles.inpLogin}
            placeholder="pedro@gmail.com"
            {...register("email")}
          />
          <label htmlFor="inpPhone" className={styles.lblLogin}>
            Celular:
          </label>
          <input
            type="tel"
            id="inpPhone"
            required
            className={styles.inpLogin}
            placeholder="(51) 999.999.999"
            {...register("phone")}
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
            Cadastrar
          </button>
        </form>
      </div>
    );
  }
}
