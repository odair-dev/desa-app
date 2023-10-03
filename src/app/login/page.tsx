"use client"
import { useContext } from "react";
import styles from './styles.module.scss';
import { useForm } from "react-hook-form";
import { UserContext } from '@/providers/UserContext';
import Image from 'next/image';
import Logotipo from '../../img/Logo.png';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { GlobalContext } from "@/providers/GlobalContext";


type Inputs = {
    username: string
    password: string
}
 
export default function Login() {
    const  { signIn, user, setUser, setToken, setUserId } = useContext(UserContext);
    const { setModalMobile } = useContext(GlobalContext)
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()

    async function onSubmit(data:any){
        if(!user){
            await signIn(data);
            reset({ username: "", password: "" });
            toast.success("Login realizado com sucesso");
            setModalMobile(false);
            setTimeout(() => {
                router.push('/');
            }, 1700);
        }
    }

    function goBack(){
        setModalMobile(false);
        router.push('/');
    }

    return(
        <div className={styles.container}>
            <ToastContainer position="bottom-right" autoClose={1250}/>
            <div className={styles.blueBackground}></div>
            <form className={styles.formLogin} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.divLogo}>
                    <div className={styles.btnGoBack} onClick={()=>goBack()}>Voltar</div>
                    <Image src={Logotipo} alt='Logotipo' className={styles.imgLogo}/>
                </div>
                <label htmlFor="inpUsername" className={styles.lblLogin}>Usuário:</label>
                <input 
                    type="text" 
                    id="inpUsername" 
                    required
                    className={styles.inpLogin} 
                    placeholder='Digite seu usuário'
                    {...register('username')}
                />
                <label htmlFor="inpPassword" className={styles.lblLogin}>Senha:</label>
                <input 
                    type="password" 
                    id="inpPassword" 
                    required
                    className={styles.inpLogin} 
                    placeholder='Digite sua senha'
                    {...register('password')}
                />
                <button className={styles.btnLogin} type="submit">LOGIN</button>
            </form>
        </div>
    )
}