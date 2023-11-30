import { parseCookies } from "nookies";
import styles from "./styles.module.scss";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "@/providers/GlobalContext";
import { UserContext } from "@/providers/UserContext";
import { useRouter } from "next/navigation";

export default function ModalRemoveProperty() {
  const { setUser, setUserId } = useContext(UserContext);
  const { getProperties, setModalRemove, propertyRemove, setPropertyRemove } =
    useContext(GlobalContext);
  const router = useRouter();

  async function deleteProperty() {
    const { "nextauth.token": recoveredToken } = parseCookies();
    if (recoveredToken) {
      api.defaults.headers.common.Authorization = `Bearer ${recoveredToken}`;
      try {
        await api.delete(`/properties/${propertyRemove}`);
        toast.success("Propriedade removida com sucesso");
      } catch (error) {
        toast.error("Falha ao remover");
      } finally {
        setModalRemove(false);
        setPropertyRemove(null);
        getProperties();
      }
    } else {
      toast.error("É necessário estar logado");
      setUser(null);
      setUserId(null);
      setModalRemove(false);
      setPropertyRemove(null);
      router.push("/login");
    }
  }

  function closeModal() {
    setModalRemove(false);
    setPropertyRemove(null);
  }

  const modalRef = useRef<any>(null);
  useEffect(() => {
    const handleOutclick = (event: { target: any }) => {
      if (!modalRef.current?.contains(event.target)) {
        closeModal();
      }
    };

    window.addEventListener("mousedown", handleOutclick);

    const handleKeyDown = (event: any) => {
      if (event.key === "Escape") {
        closeModal();
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
    <div className={styles.modalDelete}>
      <div className={styles.askDelete}>
        <h3 className={styles.titleDelete}>
          Deseja realmente excluir este imóvel?
        </h3>
        <div className={styles.divBtns}>
          <button className={styles.btnDelete} onClick={() => deleteProperty()}>
            Excluir
          </button>
          <button className={styles.btnCancel} onClick={() => closeModal()}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
