"use client";
import styles from "./styles.module.scss";
import { useState } from "react";
import { GlobalContext } from "@/providers/GlobalContext";
import { useContext } from "react";

export default function Sandwich() {
  const { modalMobile, setModalMobile, setModalSchedules } =
    useContext(GlobalContext);
  const [change, setChange] = useState(0);

  function handleClickLeft() {
    if (modalMobile) {
      setModalMobile(false);
      setModalSchedules(false);
    } else {
      setModalMobile(true);
    }
  }

  return (
    <div className={styles.btnMenu} onClick={() => handleClickLeft()}>
      <div className={!modalMobile ? styles.line : styles.line1}></div>
      <div className={!modalMobile ? styles.line : styles.lineNone}></div>
      <div className={!modalMobile ? styles.line : styles.line2}></div>
    </div>
  );
}
