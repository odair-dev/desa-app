"use client";
import Image from "next/image";
import Quarto01 from "../../../img/quarto01.png";
import Quarto02 from "../../../img/quarto02.png";
import Sala01 from "../../../img/sala01.png";
import Sala02 from "../../../img/sala02.png";
import Cozinha01 from "../../../img/cozinha01.png";
import Cozinha02 from "../../../img/cozinha02.png";
import Sacada01 from "../../../img/sacada01.png";
import Fachada01 from "../../../img/fachada01.png";
import Fachada02 from "../../../img/fachada02.png";
import Fachada03 from "../../../img/fachada03.png";
import Fachada04 from "../../../img/fachada04.png";
import Fachada05 from "../../../img/fachada05.png";
import Planta from "../../../img/Planta.png";
import styles from "./styles.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "@/providers/GlobalContext";

export default function ModalImages() {
  const { setModalAllImages } = useContext(GlobalContext);
  const [imgBig, setImgBig] = useState(1);

  const modalRef = useRef<any>(null);
  useEffect(() => {
    const handleOutclick = (event: { target: any }) => {
      if (!modalRef.current?.contains(event.target)) {
        setModalAllImages(false);
      }
    };

    window.addEventListener("mousedown", handleOutclick);

    const handleKeyDown = (event: any) => {
      if (event.key === "Escape") {
        setModalAllImages(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleOutclick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.divModal}>
      <div ref={modalRef} className={styles.container}>
        <div
          className={styles.btnClose}
          onClick={() => setModalAllImages(false)}
        >
          x
        </div>
        <Image
          className={imgBig == 1 ? styles.imgFocus : styles.imgOff}
          src={Cozinha01}
          priority={true}
          alt="Cozinha"
        />
        <Image
          className={imgBig == 2 ? styles.imgFocus : styles.imgOff}
          src={Cozinha02}
          priority={true}
          alt="Cozinha"
        />
        <Image
          className={imgBig == 3 ? styles.imgFocus : styles.imgOff}
          src={Sala01}
          priority={true}
          alt="Sala"
        />
        <Image
          className={imgBig == 4 ? styles.imgFocus : styles.imgOff}
          src={Sala02}
          priority={true}
          alt="Sala"
        />
        <Image
          className={imgBig == 5 ? styles.imgFocus : styles.imgOff}
          src={Quarto01}
          priority={true}
          alt="Quarto"
        />
        <Image
          className={imgBig == 6 ? styles.imgFocus : styles.imgOff}
          src={Quarto02}
          priority={true}
          alt="Quarto"
        />
        <Image
          className={imgBig == 7 ? styles.imgFocus : styles.imgOff}
          src={Sacada01}
          priority={true}
          alt="Sacada"
        />
        <Image
          className={imgBig == 8 ? styles.imgFocus : styles.imgOff}
          src={Fachada01}
          priority={true}
          alt="Fachada"
        />
        <Image
          className={imgBig == 9 ? styles.imgFocus : styles.imgOff}
          src={Fachada02}
          priority={true}
          alt="Fachada"
        />
        <Image
          className={imgBig == 10 ? styles.imgFocus : styles.imgOff}
          src={Fachada03}
          priority={true}
          alt="Fachada"
        />
        <Image
          className={imgBig == 11 ? styles.imgFocus : styles.imgOff}
          src={Fachada04}
          priority={true}
          alt="Fachada"
        />
        <Image
          className={imgBig == 12 ? styles.imgFocus : styles.imgOff}
          src={Fachada05}
          priority={true}
          alt="Fachada"
        />
        <Image
          className={imgBig == 13 ? styles.imgFocus : styles.imgOff}
          src={Planta}
          priority={true}
          alt="Planta"
        />
        <div className={styles.selector}>
          <Image
            className={imgBig == 1 ? styles.imgSmallOn : styles.imgSmallOff}
            src={Cozinha01}
            priority={true}
            alt="Cozinha"
            onClick={() => setImgBig(1)}
          />
          <Image
            className={imgBig == 2 ? styles.imgSmallOn : styles.imgSmallOff}
            src={Cozinha02}
            priority={true}
            alt="Cozinha"
            onClick={() => setImgBig(2)}
          />
          <Image
            className={imgBig == 3 ? styles.imgSmallOn : styles.imgSmallOff}
            src={Sala01}
            priority={true}
            alt="Sala"
            onClick={() => setImgBig(3)}
          />
          <Image
            className={imgBig == 4 ? styles.imgSmallOn : styles.imgSmallOff}
            src={Sala02}
            priority={true}
            alt="Sala"
            onClick={() => setImgBig(4)}
          />
          <Image
            className={imgBig == 5 ? styles.imgSmallOn : styles.imgSmallOff}
            src={Quarto01}
            priority={true}
            alt="Quarto"
            onClick={() => setImgBig(5)}
          />
          <Image
            className={imgBig == 6 ? styles.imgSmallOn : styles.imgSmallOff}
            src={Quarto02}
            priority={true}
            alt="Quarto"
            onClick={() => setImgBig(6)}
          />
          <Image
            className={imgBig == 7 ? styles.imgSmallOn : styles.imgSmallOff}
            src={Sacada01}
            priority={true}
            alt="Sacada"
            onClick={() => setImgBig(7)}
          />
          <Image
            className={imgBig == 8 ? styles.imgSmallOn : styles.imgSmallOff}
            src={Fachada01}
            priority={true}
            alt="Fachada"
            onClick={() => setImgBig(8)}
          />
          <Image
            className={imgBig == 9 ? styles.imgSmallOn : styles.imgSmallOff}
            src={Fachada02}
            priority={true}
            alt="Fachada"
            onClick={() => setImgBig(9)}
          />
          <Image
            className={imgBig == 10 ? styles.imgSmallOn : styles.imgSmallOff}
            src={Fachada03}
            priority={true}
            alt="Fachada"
            onClick={() => setImgBig(10)}
          />
          <Image
            className={imgBig == 11 ? styles.imgSmallOn : styles.imgSmallOff}
            src={Fachada04}
            priority={true}
            alt="Fachada"
            onClick={() => setImgBig(11)}
          />
          <Image
            className={imgBig == 12 ? styles.imgSmallOn : styles.imgSmallOff}
            src={Fachada05}
            priority={true}
            alt="Fachada"
            onClick={() => setImgBig(12)}
          />
          <Image
            className={imgBig == 13 ? styles.imgSmallOn : styles.imgSmallOff}
            src={Planta}
            priority={true}
            alt="Planta"
            onClick={() => setImgBig(13)}
          />
        </div>
      </div>
    </div>
  );
}
