import styles from "./styles.module.scss";
import Image from "next/image";
import LadoDireito from "../../img/frente.png";
import LadoEsquerdo from "../../img/10.png";
import Centro from "../../img/9.png";

export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container} id="home">
      <Image
        priority={true}
        src={LadoDireito}
        alt="Prédio"
        className={styles.bgFade}
      />
      <Image
        priority={true}
        src={LadoEsquerdo}
        alt="Prédio"
        className={styles.bgFade}
      />
      <Image
        priority={true}
        src={Centro}
        alt="Prédio"
        className={styles.bgFade}
      />
      <div className={styles.filter}>{children}</div>
    </div>
  );
}
