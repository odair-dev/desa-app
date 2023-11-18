"use client";
import styles from "./styles.module.scss";
import Logotipo from "../../img/Logo_sem_sombra.png";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import Link from "next/link";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.maxSize}>
        <a className={styles.logo} href="#home">
          <Image
            priority={true}
            src={Logotipo}
            alt="Logotipo"
            className={styles.imgLogo}
          />
          <p>CNPJ: 29.015.972/0001-31</p>
        </a>
        <div className={styles.info}>
          <h3 className={montserrat.className}>Redes Sociais</h3>
          <div className={styles.divIcons}>
            <a
              href="https://www.facebook.com/desaincorporadora/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-square-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com/desaincorporacoes/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>
        <div className={styles.message}>
          <div className={styles.divContact}>
            <h2 className={montserrat.className}>Contato</h2>
            <Link href={`/email/`}>
              <i className="fa-regular fa-envelope"></i> E-mail
            </Link>
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
      </div>
    </div>
  );
}
