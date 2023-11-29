"use client";
import styles2 from "@/sass/loading.module.scss";
import styles from "./styles.module.scss";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Logotipo from "../../img/Logo.png";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/providers/GlobalContext";
import { ModalEditProperty } from "@/components/Modal/properties/edit";
import { UserContext } from "@/providers/UserContext";
import ModalRegisterProperty from "@/components/Modal/properties/register";
import ModalRemoveProperty from "@/components/Modal/properties/remove";

export default function Properties() {
  const { user } = useContext(UserContext);
  const {
    setProperty,
    modalEdit,
    setModalEdit,
    setModalMobile,
    modalRegister,
    setModalRegister,
    properties,
    getProperties,
    modalRemove,
    setModalRemove,
    setPropertyRemove,
  } = useContext(GlobalContext);
  const router = useRouter();

  function deleteProperty(id: string) {
    setPropertyRemove(id);
    setModalRemove(true);
  }

  async function reload() {
    try {
      await getProperties();
      toast.success("Imóveis atualizados com sucesso");
    } catch (error) {
      toast.error("Erro ao buscar informações");
    }
  }

  function goBack() {
    setModalMobile(false);
    router.push("/");
  }

  function setModal(data: any) {
    setProperty(data);
    setModalEdit(true);
  }

  useEffect(() => {
    if (user) {
      if (user.type == "admin") {
        getProperties();
      } else {
        router.push("/");
      }
    } else {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (modalEdit == false) {
      getProperties();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalEdit]);

  if (user?.type == "admin") {
    return (
      <div className={styles.container}>
        {modalEdit ? <ModalEditProperty /> : null}
        {modalRegister ? <ModalRegisterProperty /> : null}
        {modalRemove ? <ModalRemoveProperty /> : null}
        <div className={styles.divLogo}>
          <Image
            src={Logotipo}
            alt="Logotipo"
            width={100}
            height={100}
            className={styles.imgLogo}
            onClick={() => goBack()}
            priority={true}
          />
        </div>
        <h2>Imóveis</h2>
        <div className={styles.divBtn}>
          <div className={styles.btn} onClick={() => goBack()}>
            <i className="fa-solid fa-house"></i>
            <p>Home</p>
          </div>
          <div className={styles.btn} onClick={() => setModalRegister(true)}>
            <i className="fa-solid fa-circle-plus"></i>
            <p>Imóvel</p>
          </div>
          <div className={styles.btn} onClick={() => reload()}>
            <i className="fa-solid fa-rotate"></i>
            <p>Atualizar</p>
          </div>
        </div>
        <div className={styles.containerCard}>
          {properties != null
            ? properties.map((i) => (
                <div
                  className={i.available ? styles.card : styles.cardOff}
                  key={i.id}
                >
                  {i.available ? (
                    <p className={styles.activated}>ATIVO</p>
                  ) : (
                    <p className={styles.disabled}>INATIVO</p>
                  )}
                  <i
                    className={`fa-regular fa-trash-can ${styles.remove}`}
                    onClick={() => deleteProperty(i.id)}
                  ></i>
                  <i
                    className={`fa-solid fa-pencil ${styles.edit}`}
                    onClick={() => setModal(i)}
                  ></i>
                  <p className={styles.pTitle}>{i.name}</p>
                  <div className={styles.description}>
                    <p className={styles.pCategory}>
                      {i.category[0].toUpperCase() + i.category.substring(1)}
                    </p>
                    <p className={styles.pSize}>{i.size}m²</p>
                  </div>
                  <div className={styles.address}>
                    <p>
                      {i.address.street}, {i.address.number} -{" "}
                      {i.address.district}
                    </p>
                    <p>
                      {i.address.city}/{i.address.state} - CEP: {i.address.cep}
                    </p>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles2.loading}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}
