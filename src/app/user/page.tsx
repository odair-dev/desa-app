"use client";
import { useContext } from "react";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { UserContext } from "@/providers/UserContext";
import Image from "next/image";
import Logotipo from "../../img/Logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/providers/GlobalContext";
import ModalPassword from "@/components/Modal/confirmPassword";

type Inputs = {
  id: string;
  email: string;
  name: string;
  phone: string;
  password: string;
};

export default function User() {
  const { user, updateUser, userToUpdate, setUserToUpdate } =
    useContext(UserContext);
  const { setModalMobile } = useContext(GlobalContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  async function onSubmit(data: any) {
    if (data.password == "") {
      delete data.password;
    }
    if (data.name == "") {
      delete data.name;
    }
    if (data.email == "") {
      delete data.email;
    }
    if (data.phone == "") {
      delete data.phone;
    }

    if (user) {
      setUserToUpdate(data);
    } else {
      console.log("Para realizar atualização é necessário fazer login");
      toast.error("Para realizar atualização é necessário fazer login");
    }
  }

  function goBack() {
    setModalMobile(false);
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <ModalPassword />
      <ToastContainer position="bottom-right" autoClose={1250} />
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
          className={styles.inpLogin}
          defaultValue={user?.name}
          {...register("name")}
        />
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
        <label htmlFor="inpPassword" className={styles.lblLogin}>
          Senha:
        </label>
        <input
          type="password"
          id="inpPassword"
          className={styles.inpLogin}
          {...register("password")}
        />
        <button className={styles.btnLogin} type="submit">
          Atualizar
        </button>
      </form>
    </div>
  );
}
