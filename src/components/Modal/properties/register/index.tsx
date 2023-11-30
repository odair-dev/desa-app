import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import { api } from "@/services/api";
import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "@/providers/GlobalContext";

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

export default function ModalRegisterProperty() {
  const { setModalRegister, getProperties } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSchemaRegisterForm>({
    resolver: zodResolver(schema),
  });

  async function registerProperty(data: any) {
    const { "nextauth.token": recoveredToken } = parseCookies();
    if (recoveredToken) {
      api.defaults.headers.common.Authorization = `Bearer ${recoveredToken}`;
      try {
        const response = await api.post("/properties", data);
        toast.success("Cadastro realizado com sucesso");
        reset({
          name: "",
          size: "",
          address: {
            cep: "",
            street: "",
            number: "",
            district: "",
            city: "",
            state: "",
          },
        });
      } catch (error) {
        toast.error("Falha ao cadastrar");
      } finally {
        setModalRegister(false);
        getProperties();
      }
    } else {
      toast.error("É necessário estar logado");
    }
  }

  async function onSubmit(data: any) {
    if (data.available == "true") {
      const dataFormated = {
        ...data,
        size: Number(data.size),
        available: true,
      };
      registerProperty(dataFormated);
    } else {
      const dataFormated = {
        ...data,
        size: Number(data.size),
        available: false,
      };
      registerProperty(dataFormated);
    }
  }

  function closeModal() {
    setModalRegister(false);
    reset({
      name: "",
      size: "",
      address: {
        cep: "",
        street: "",
        number: "",
        district: "",
        city: "",
        state: "",
      },
    });
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
      <form ref={modalRef} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.divTitle}>
          <h3>Cadastro de imóvel</h3>
          <p onClick={() => closeModal()}>x</p>
        </div>
        <label htmlFor="name">Nome Empreendimento</label>
        <input
          className={styles.inpProperties}
          type="text"
          id="name"
          {...register("name")}
        />
        {errors.name?.message != undefined ? (
          <p className={styles.redText}>{errors.name?.message}</p>
        ) : null}
        <div className={styles.divHalf}>
          <select
            className={styles.inpPropertiesHalf}
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
        <button className={styles.btnSave}>Cadastrar</button>
      </form>
    </div>
  );
}
