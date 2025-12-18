import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "@/providers/GlobalContext";
import Cookies from "js-cookie";
import { api } from "@/services/api";
import { toast } from "react-toastify";

const addressSchema = z.object({
  cep: z.string().min(8, "CEP é obrigatório"),
  state: z.string().min(2, "Estado é obrigatório"),
  city: z.string().min(4, "Cidade é obrigatório"),
  street: z.string().min(4, "Rua é obrigatório"),
  number: z.string().optional(),
  district: z.string().min(3, "Bairro é obrigatório"),
  complement: z.string().optional(),
});

const schema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  size: z.string().min(1, "Tamanho é obrigatório"),
  available: z.string().min(1, "Situação é obrigatória"),
  category: z.string().min(3, "Categoria é obrigatório"),
  address: addressSchema,
});

export type TSchemaRegisterForm = z.infer<typeof schema>;

export function ModalEditProperty() {
  const { property, setProperty, setModalEdit } = useContext(GlobalContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSchemaRegisterForm>({
    resolver: zodResolver(schema),
  });

  async function onEdit(data: any) {
    if (data.available == "true") {
      const dataFormated = {
        ...data,
        size: Number(data.size),
        available: true,
      };
      updateProperty(dataFormated);
    } else {
      const dataFormated = {
        ...data,
        size: Number(data.size),
        available: false,
      };
      updateProperty(dataFormated);
    }
  }

  async function updateProperty(data: any) {
    const recoveredToken = Cookies.get("nextauth.token");
    if (recoveredToken) {
      api.defaults.headers.common.Authorization = `Bearer ${recoveredToken}`;
      try {
        await api.patch(`/adresses/${property?.address.id}`, {
          ...data.address,
        });
        delete data.address;
        const response = await api.patch(`/properties/${property?.id}`, {
          ...data,
        });
        toast.success("Atualização realizada com sucesso");
      } catch (error) {
        toast.error("Falha ao atualizar");
        console.log("Erro: \n", error);
      } finally {
        setModalEdit(false);
      }
    } else {
      toast.error("É necessário estar logado");
    }
  }

  function closeModal() {
    setModalEdit(false);
    setProperty(null);
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
    <div className={styles.modal}>
      <form ref={modalRef} onSubmit={handleSubmit(onEdit)}>
        <div className={styles.divTitle}>
          <h3>Editar Imóvel</h3>
          <p onClick={() => closeModal()}>x</p>
        </div>
        <label htmlFor="name">Nome Empreendimento</label>
        <input
          className={styles.inpProperties}
          type="text"
          id="name"
          defaultValue={`${property!.name}`}
          {...register("name")}
        />
        {errors.name?.message != undefined ? (
          <p className={styles.redText}>{errors.name?.message}</p>
        ) : null}
        <div className={styles.divHalf}>
          <select
            className={styles.inpPropertiesHalf}
            defaultValue={`${property!.category}`}
            {...register("category")}
          >
            <option value="#" disabled>
              TIPO
            </option>
            <option value="casa">CASA</option>
            <option value="sobrado">SOBRADO</option>
            <option value="apartamento">APARTAMENTO</option>
            <option value="comercial">COMERCIAL</option>
          </select>
          {errors.category?.message != undefined ? (
            <p className={styles.redText}>{errors.category?.message}</p>
          ) : null}
          <select
            className={styles.inpPropertiesHalf}
            {...register("available")}
            defaultValue={`${property!.available}`}
          >
            <option value="true">ATIVO</option>
            <option value="false">INATIVO</option>
          </select>
          {errors.available?.message != undefined ? (
            <p className={styles.redText}>{errors.available?.message}</p>
          ) : null}
        </div>
        <div className={styles.divHalf}>
          <div className={styles.falseInput}>
            <label htmlFor="inpNumber">Tamanho</label>
            <input
              className={styles.inpPropertiesHalf}
              type="number"
              id="inpNumber"
              {...register("size")}
              defaultValue={`${property!.size}`}
            />
            {errors.size?.message != undefined ? (
              <p className={styles.redText}>{errors.size?.message}</p>
            ) : null}
          </div>
          <div className={styles.falseInput}>
            <label htmlFor="cep">CEP</label>
            <input
              className={styles.inpPropertiesHalf}
              type="number"
              id="cep"
              {...register("address.cep")}
              defaultValue={`${property!.address.cep}`}
            />
            {errors.address?.cep?.message != undefined ? (
              <p className={styles.redText}>{errors.address?.cep?.message}</p>
            ) : null}
          </div>
        </div>
        <label htmlFor="street">Logadouro</label>
        <input
          className={styles.inpProperties}
          type="text"
          id="street"
          {...register("address.street")}
          defaultValue={`${property!.address.street}`}
        />
        {errors.address?.street?.message != undefined ? (
          <p className={styles.redText}>{errors.address?.street?.message}</p>
        ) : null}
        <div className={styles.divHalf}>
          <div className={styles.falseInput}>
            <label htmlFor="numberAddress">Número</label>
            <input
              className={styles.inpProperties}
              type="number"
              id="numberAddress"
              {...register("address.number")}
              defaultValue={`${property!.address.number}`}
            />
            {errors.address?.number?.message != undefined ? (
              <p className={styles.redText}>
                {errors.address?.number?.message}
              </p>
            ) : null}
          </div>
          <div className={styles.falseInput}>
            <label htmlFor="district">Bairro</label>
            <input
              className={styles.inpProperties}
              type="text"
              id="district"
              {...register("address.district")}
              defaultValue={`${property!.address.district}`}
            />
            {errors.address?.district?.message != undefined ? (
              <p className={styles.redText}>
                {errors.address?.district?.message}
              </p>
            ) : null}
          </div>
        </div>
        <div className={styles.divHalf}>
          <div className={styles.falseInput}>
            <label htmlFor="city">Cidade</label>
            <input
              className={styles.inpProperties}
              type="text"
              id="city"
              {...register("address.city")}
              defaultValue={`${property!.address.city}`}
            />
            {errors.address?.city?.message != undefined ? (
              <p className={styles.redText}>{errors.address?.city?.message}</p>
            ) : null}
          </div>
          <div className={styles.falseInput}>
            <label htmlFor="state">Estado</label>
            <input
              className={styles.inpProperties}
              type="text"
              id="state"
              {...register("address.state")}
              defaultValue={`${property!.address.state}`}
            />
            {errors.address?.state?.message != undefined ? (
              <p className={styles.redText}>{errors.address?.state?.message}</p>
            ) : null}
            {errors.address?.complement?.message != undefined ? (
              <p className={styles.redText}>
                {errors.address?.complement?.message}
              </p>
            ) : null}
          </div>
        </div>
        <button className={styles.btnSave}>Salvar</button>
      </form>
    </div>
  );
}
