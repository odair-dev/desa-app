import styles from "./styles.module.scss";
import { Tangerine, Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const tangerine = Tangerine({
  subsets: ["latin"],
  weight: ["700", "400"],
});

export default function Slogan() {
  return (
    <div className={styles.container}>
      <div className={styles.maxSize}>
        <p className={`${raleway.className} ${styles.pName}`}>
          Residencial Lisboa
        </p>
        <p className={`${raleway.className} ${styles.pSlogan}`}>
          Descubra sua nova vida
        </p>
        <a className={raleway.className} href="#detail">
          SAIBA MAIS
        </a>
      </div>
    </div>
  );
}
