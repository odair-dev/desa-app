"use client";
import { useContext } from "react";
import styles from "./styles.module.scss";
import { useForm, Controller } from "react-hook-form";
import { UserContext } from "@/providers/UserContext";
import Image from "next/image";
import Logotipo from "../../img/Logo.png";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/providers/GlobalContext";
import { destroyCookie } from "nookies";
import { ScheduleContext } from "@/providers/ScheduleContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { TextField, Checkbox } from "@material-ui/core";

const schema = z
  .object({
    name: z.string().min(3, "Nome é obrigatório"),
    email: z
      .string()
      .min(6, "Email é obrigatório")
      .email("Formato inválido de e-mail"),
    phone: z.string().min(13, "Celular é obrigatório"),
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
  email: string;
  name: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const { user, setUser, setToken, setUserId, registerUser, token } =
    useContext(UserContext);
  const { setMySchedules } = useContext(ScheduleContext);
  const { setModalMobile } = useContext(GlobalContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: any) {
    delete data.confirmPassword;
    // console.log(data);
    if (!user) {
      const statusOk = await registerUser(data);
      if (statusOk) {
        reset({
          name: "",
          password: "",
          email: "",
          phone: "",
          confirmPassword: "",
        });
        toast.success("Registro realizado com sucesso");
        setModalMobile(false);
        router.push("/login");
      } else {
        toast.error("Erro ao realizar o registro");
      }
    } else {
      toast.error("Para realizar cadastro é necessário fazer logout");
    }
  }

  function goBack() {
    setModalMobile(false);
    router.push("/");
  }

  function logout() {
    destroyCookie(null, "nextauth.token");
    setUser(null);
    setToken(null);
    setUserId(null);
    toast.success("Logout realizado com sucesso");
    setMySchedules(null);
  }

  if (user && token) {
    return (
      <div className={styles.container}>
        <div className={styles.blueBackground}></div>
        <form className={styles.formLogin}>
          <div className={styles.divLogo}>
            <div className={styles.btnGoBack} onClick={() => goBack()}>
              <i className="fa-solid fa-house"></i>
            </div>
            <Image
              src={Logotipo}
              priority={true}
              alt="Logotipo"
              className={styles.imgLogo}
              onClick={() => goBack()}
            />
          </div>
          <p>
            É necessário desconectar da aplicação para realizar esta operação.
          </p>
          <button className={styles.btnLogin} onClick={() => logout()}>
            Desconectar
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.blueBackground}></div>
        <form className={styles.formLogin} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.divLogo}>
            <div className={styles.btnGoBack} onClick={() => goBack()}>
              <i className="fa-solid fa-house"></i>
            </div>
            <Image
              src={Logotipo}
              priority={true}
              alt="Logotipo"
              className={styles.imgLogo}
              onClick={() => goBack()}
            />
          </div>
          <label htmlFor="inpName" className={styles.lblLogin}>
            Nome:
          </label>
          <input
            type="text"
            id="inpName"
            className={styles.inpLogin}
            placeholder="Pedro Silva"
            {...register("name")}
          />
          {errors.name?.message != undefined ? (
            <p className={styles.redText}>{errors.name?.message}</p>
          ) : null}
          <label htmlFor="inpEmail" className={styles.lblLogin}>
            E-mail:
          </label>
          <input
            type="email"
            id="inpEmail"
            className={styles.inpLogin}
            placeholder="pedro@gmail.com"
            {...register("email")}
          />
          {errors.email?.message != undefined ? (
            <p className={styles.redText}>{errors.email?.message}</p>
          ) : null}
          <label htmlFor="inpPhone" className={styles.lblLogin}>
            Celular:
          </label>
          <Controller
            name="phone"
            control={control}
            // rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
              <PhoneInput
                {...field}
                inputProps={{
                  ref,
                  required: true,
                }}
                country={"br"}
                containerStyle={{
                  width: "100%",
                  padding: "0",
                }}
                inputStyle={{
                  width: "100%",
                  height: "40px",
                  border: "1px solid gray",
                  borderRadius: "8px",
                }}
              />
            )}
          />
          {errors.phone?.message != undefined ? (
            <p className={styles.redText}>Celular é obrigatório</p>
          ) : null}
          <label htmlFor="inpPassword" className={styles.lblLogin}>
            Senha:
          </label>
          <input
            type="password"
            id="inpPassword"
            className={styles.inpLogin}
            placeholder="Escolha uma senha"
            {...register("password")}
          />
          {errors.password?.message != undefined ? (
            <p className={styles.redText}>{errors.password?.message}</p>
          ) : null}
          <label htmlFor="inpPassword2" className={styles.lblLogin}>
            Repetir a senha:
          </label>
          <input
            type="password"
            id="inpPassword2"
            className={styles.inpLogin}
            placeholder="Digite a senha novamente"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message != undefined ? (
            <p className={styles.redText}>{errors.confirmPassword?.message}</p>
          ) : null}
          <button className={styles.btnLogin} type="submit">
            Cadastrar
          </button>
          <div className={styles.options}>
            <p className={styles.login} onClick={() => router.push("/login")}>
              Já tem uma conta?
            </p>
          </div>
        </form>
      </div>
    );
  }
}
