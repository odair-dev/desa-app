"use client";
import styles from "./styles.module.scss";
import Image from "next/image";
import Logotipo from "../../img/Logo.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { GlobalContext } from "@/providers/GlobalContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/providers/UserContext";
import { ScheduleContext } from "@/providers/ScheduleContext";

export default function Email() {
  const { register, handleSubmit, reset } = useForm();
  const { setModalMobile } = useContext(GlobalContext);
  const { user } = useContext(UserContext);
  const { sendEmail } = useContext(ScheduleContext);
  const router = useRouter();

  async function handleSend(data: any) {
    const response = await sendEmail(data);
    if (response) {
      toast.success("E-mail enviado com sucesso.");
      reset({ name: "", email: "", text: "" });
      setModalMobile(false);
      router.push("/");
    } else {
      toast.error("Falha no envio, tente novamente");
    }
  }

  function goBack() {
    setModalMobile(false);
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
      />
      <div className={styles.blueBackground}></div>
      <form className={styles.formEmail} onSubmit={handleSubmit(handleSend)}>
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
          <div className={styles.divContacts}>
            <a
              href="https://wa.me/5551989768161"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-whatsapp"></i> WhatsApp
            </a>
            <a href="tel:+5551989768161">
              <i className="fa-solid fa-phone"></i> (51) 989.768.161
            </a>
          </div>
        </div>
        <label htmlFor="inpName" className={styles.lblEmail}>
          Nome:
        </label>
        <input
          type="text"
          id="inpName"
          required
          className={styles.email}
          placeholder="Digite seu nome"
          defaultValue={user?.name}
          {...register("name")}
        />
        <label htmlFor="inpEmail" className={styles.lblEmail}>
          E-mail:
        </label>
        <input
          type="email"
          id="inpEmail"
          required
          className={styles.email}
          defaultValue={user?.email}
          placeholder="Digite seu e-mail"
          {...register("email")}
        />
        <label htmlFor="textMail" className={styles.lblEmail}>
          Mensagem:
        </label>
        <textarea
          id="textMail"
          required
          placeholder="Digite sua mensagem"
          className={styles.txtEmail}
          {...register("text")}
        ></textarea>
        <button className={styles.btnSend} type="submit">
          Enviar e-mail
        </button>
      </form>
    </div>
  );
}
