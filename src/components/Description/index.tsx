"use client";
import styles from "./styles.module.scss";
import Image from "next/image";
import Planta from "../../img/Planta.png";
import Sala from "../../img/sala.png";
import Sacada from "../../img/sacada.png";
import Cozinha from "../../img/cozinha.png";
import LogoBars from "../../img/LogoBars.png";
import { useContext, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Raleway } from "next/font/google";
import { GlobalContext } from "@/providers/GlobalContext";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Description() {
  const [slide, setSlide] = useState(1);
  const { setModalAllImages } = useContext(GlobalContext);

  useEffect(() => {
    Aos.init();
  }, []);

  function handleClickRight() {
    if (slide == 1) {
      setSlide(7);
    } else {
      setSlide(slide - 1);
    }
  }

  function handleClickLeft() {
    if (slide == 7) {
      setSlide(1);
    } else {
      setSlide(slide + 1);
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.maxSize} id="detail">
        <div
          className={styles.divText}
          data-aos="fade-right"
          data-aos-duration="1500"
        >
          <h2 className={`${raleway.className} ${styles.titleDefault}`}>
            <Image src={LogoBars} alt={"Logo"} className={styles.bars} />
            Conheça os detalhes
          </h2>
        </div>
        <div
          className={styles.divImg}
          data-aos="fade-left"
          data-aos-duration="1500"
        >
          {slide == 1
            ? styles.item_2
            : slide == 2
            ? styles.item_3
            : slide == 3
            ? styles.item_1
            : styles.none}
          <Image
            priority={true}
            src={Sala}
            alt="Sala"
            className={
              slide == 1
                ? styles.imgCarrousel1
                : slide == 2
                ? styles.imgCarrousel2
                : slide == 3
                ? styles.imgCarrousel3
                : slide == 4
                ? styles.imgCarrousel4
                : slide == 5
                ? styles.imgCarrousel5
                : slide == 6
                ? styles.imgCarrousel6
                : slide == 7
                ? styles.imgCarrousel7
                : styles.none
            }
            onClick={slide == 4 ? () => setModalAllImages(true) : () => null}
          />
          <Image
            priority={true}
            src={Sacada}
            alt="Sacada"
            className={
              slide == 1
                ? styles.imgCarrousel2
                : slide == 2
                ? styles.imgCarrousel3
                : slide == 3
                ? styles.imgCarrousel4
                : slide == 4
                ? styles.imgCarrousel5
                : slide == 5
                ? styles.imgCarrousel6
                : slide == 6
                ? styles.imgCarrousel7
                : slide == 7
                ? styles.imgCarrousel1
                : styles.none
            }
            onClick={slide == 3 ? () => setModalAllImages(true) : () => null}
          />
          <Image
            priority={true}
            src={Cozinha}
            alt="Cozinha"
            className={
              slide == 1
                ? styles.imgCarrousel3
                : slide == 2
                ? styles.imgCarrousel4
                : slide == 3
                ? styles.imgCarrousel5
                : slide == 4
                ? styles.imgCarrousel6
                : slide == 5
                ? styles.imgCarrousel7
                : slide == 6
                ? styles.imgCarrousel1
                : slide == 7
                ? styles.imgCarrousel2
                : styles.none
            }
            onClick={slide == 2 ? () => setModalAllImages(true) : () => null}
          />

          <Image
            priority={true}
            src={Sala}
            alt="Sala"
            className={
              slide == 1
                ? styles.imgCarrousel4
                : slide == 2
                ? styles.imgCarrousel5
                : slide == 3
                ? styles.imgCarrousel6
                : slide == 4
                ? styles.imgCarrousel7
                : slide == 5
                ? styles.imgCarrousel1
                : slide == 6
                ? styles.imgCarrousel2
                : slide == 7
                ? styles.imgCarrousel3
                : styles.none
            }
            onClick={slide == 1 ? () => setModalAllImages(true) : () => null}
          />

          <Image
            priority={true}
            src={Sacada}
            alt="Sacada"
            className={
              slide == 1
                ? styles.imgCarrousel5
                : slide == 2
                ? styles.imgCarrousel6
                : slide == 3
                ? styles.imgCarrousel7
                : slide == 4
                ? styles.imgCarrousel1
                : slide == 5
                ? styles.imgCarrousel2
                : slide == 6
                ? styles.imgCarrousel3
                : slide == 7
                ? styles.imgCarrousel4
                : styles.none
            }
            onClick={slide == 7 ? () => setModalAllImages(true) : () => null}
          />
          <Image
            priority={true}
            src={Cozinha}
            alt="Cozinha"
            className={
              slide == 1
                ? styles.imgCarrousel6
                : slide == 2
                ? styles.imgCarrousel7
                : slide == 3
                ? styles.imgCarrousel1
                : slide == 4
                ? styles.imgCarrousel2
                : slide == 5
                ? styles.imgCarrousel3
                : slide == 6
                ? styles.imgCarrousel4
                : slide == 7
                ? styles.imgCarrousel5
                : styles.none
            }
            onClick={slide == 6 ? () => setModalAllImages(true) : () => null}
          />
          <Image
            priority={true}
            src={Sacada}
            alt="Sacada"
            className={
              slide == 1
                ? styles.imgCarrousel7
                : slide == 2
                ? styles.imgCarrousel1
                : slide == 3
                ? styles.imgCarrousel2
                : slide == 4
                ? styles.imgCarrousel3
                : slide == 5
                ? styles.imgCarrousel4
                : slide == 6
                ? styles.imgCarrousel5
                : slide == 7
                ? styles.imgCarrousel6
                : styles.none
            }
            onClick={slide == 5 ? () => setModalAllImages(true) : () => null}
          />

          <button className={styles.btnRight} onClick={handleClickRight}>
            <i className="fa-solid fa-angle-right"></i>
          </button>
          <button className={styles.btnLeft} onClick={handleClickLeft}>
            <i className="fa-solid fa-angle-left"></i>
          </button>
        </div>
        <div
          className={styles.divMoreImages}
          onClick={() => setModalAllImages(true)}
        >
          <i className={`fa-solid fa-camera ${styles.camera}`}></i>
          <p className={styles.pImages}>Ver todas as fotos</p>
        </div>
        <div
          className={styles.divText}
          data-aos="fade-right"
          data-aos-duration="1500"
        >
          <h2 className={`${raleway.className} ${styles.titleDefault}`}>
            <Image src={LogoBars} alt={"Logo"} className={styles.bars} />
            Plantas
          </h2>
        </div>
        <div
          className={styles.divDescription}
          data-aos="fade-left"
          data-aos-duration="1500"
        >
          <div className={styles.left}>
            <p>
              <i className="fa-solid fa-bed"></i> 3 quartos, sendo um, suíte.
            </p>
            <p>
              <i className="fa-solid fa-couch"></i> Sala
            </p>
            <p>
              <i className="fa-solid fa-utensils"></i> Cozinha
            </p>
            <p>
              <i className="fa-solid fa-sun"></i> Sacada
            </p>
            <p>
              <i className="fa-solid fa-shower"></i> Banheiro
            </p>
            <p>
              <i className="fa-solid fa-faucet-drip"></i> Lavanderia
            </p>
            <p>
              <i className="fa-brands fa-gripfire"></i> Churrasqueira
            </p>
            <p>
              <i className="fa-solid fa-car"></i> Vaga de garagem
            </p>
            <p>
              <i className="fa-solid fa-temperature-high"></i> Espera de água
              quente
            </p>
            <p>
              <i className="fa-solid fa-snowflake"></i> Espera de arcondicionado
            </p>
            <p>
              <i className="fa-solid fa-car"></i>{" "}
              <i className="fa-solid fa-car"></i> Possibilidade de Vaga Extra
            </p>
            <p>
              <i className="fa-solid fa-elevator"></i> Prédio com Elevador
            </p>
          </div>
          <div
            className={styles.right}
            data-aos="fade-left"
            data-aos-duration="1500"
          >
            <Image
              src={Planta}
              alt="Planta"
              className={styles.imgPlanta}
              priority={true}
            />
          </div>
        </div>
        <div
          className={styles.divText}
          data-aos="fade-right"
          data-aos-duration="1500"
        >
          <h2 className={`${raleway.className} ${styles.titleDefault}`}>
            <Image src={LogoBars} alt={"Logo"} className={styles.bars} />
            Localização
          </h2>
        </div>
        <div
          className={styles.divMap}
          data-aos="fade-left"
          data-aos-duration="1500"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3457.7300466883203!2d-51.0825907281104!3d-29.92967295524526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951973c2f8f8d3d3%3A0x980c1b49fac7126e!2sR.%20Caruaru%2C%20160%20-%20Vila%20Vista%20Alegre%2C%20Cachoeirinha%20-%20RS%2C%2094945-120!5e0!3m2!1spt-BR!2sbr!4v1695218453162!5m2!1spt-BR!2sbr"
            className={styles.maps}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
