"use client";
import styles from "./styles.module.scss";
import Image from "next/image";
import Family from "../../../../img/familia-feliz.jpg";
import Logo from "../../../../img/Logo.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { IUserState } from "@/providers/UserContext";
import { toast } from "react-toastify";
import styles2 from "@/sass/loading.module.scss";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "Senha é obrigatória com 8 digitos")
      .regex(/(?=.*?[A-Z])/, "É necessário ao menos uma letra maiúscula.")
      .regex(/(?=.*?[a-z])/, "É necessário ao menos uma letra minúscula.")
      .regex(/(?=.*?[0-9])/, "É necessário ao menos um número.")
      .regex(
        /(?=.*?[#?!@$%^&*-])/,
        "É necessário ao menos um caracter especial."
      ),
    confirmPassword: z.string().min(8, "Confirmação de senha é obrigatória"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Precisa ser idêntico a senha.",
    path: ["confirmPassword"],
  });

type Inputs = {
  password: string;
  confirmPassword: string;
};

interface IId {
  id: string;
}
interface IParams {
  params: IId;
}

export default function ResetPassword({ params }: IParams) {
  const [userReset, setUserReset] = useState<IUserState | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: any) {
    delete data.confirmPassword;
    try {
      const response = await api.patch(`/users/reset/${params.id}`, {
        ...data,
      });
      toast.success("Senha atualizada com sucesso");
      router.push("/login");
    } catch (error) {
      toast.error("Operação não realizada");
      console.log("Operação não realizada. \n", error);
    }
  }

  function goBack() {
    router.push("/");
  }

  async function getUserReset(token: string) {
    try {
      const response = await api.get(`/users/reset/${token}`);
      setUserReset(response.data);
    } catch (error) {
      toast.error("Este link não foi validado");
      router.push("/");
    }
  }

  useEffect(() => {
    getUserReset(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (userReset) {
    return (
      <div className={styles.container}>
        <Image
          className={styles.bkgFamily}
          src={Family}
          alt="Familía Feliz"
          height={2000}
          width={2000}
        />
        <div className={styles.divBlue}>
          <div className={styles.containerLogo}>
            <Image
              className={styles.logotipo}
              src={Logo}
              alt="logotipo"
              height={100}
              width={100}
              onClick={() => goBack()}
            />
          </div>
          <div className={styles.modal}>
            <div className={styles.divLogo}>
              <div className={styles.divText}>
                <p className={styles.pTitle}>Redefinição de Senha</p>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="resetPassword">Olá, {userReset?.name}</label>
              <input
                id="resetPassword"
                className={styles.inpPassword}
                type="password"
                placeholder="Insira a nova senha"
                {...register("password")}
              />
              {errors.password?.message != undefined ? (
                <p className={styles.redText}>{errors.password?.message}</p>
              ) : null}
              <input
                className={styles.inpPassword}
                type="password"
                placeholder="Digite a senha novamente"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword?.message != undefined ? (
                <p className={styles.redText}>
                  {errors.confirmPassword?.message}
                </p>
              ) : null}
              <button className={styles.btnConfirm}>CONFIRMAR</button>
            </form>
          </div>
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
