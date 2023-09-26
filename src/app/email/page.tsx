"use client"
import styles from './styles.module.scss';
import Image from 'next/image';
import Logotipo from '../../img/Logo.png';
import Link from 'next/link';
import { useForm } from "react-hook-form"
import emailjs from '@emailjs/browser'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Email() {
    const { register, handleSubmit, reset } = useForm();


    function handleSend(data:any){
        const templateParams = {
            from_name:data.name,
            from_email:data.email,
            message:data.text
        }
        emailjs.send("service_271lw37", "template_srqdu8u", templateParams, "ienNLETQKSSgbJrN8")
        .then((response)=>{
            toast.success('E-mail enviado com sucesso!');
            // console.log("Email enviado", response.status, response.text);
            reset({ name: "", email: "", text: "" })
        }, (err)=>{
            toast.error('Falha ao enviar o e-mail, tente mais tarde!');
            // console.log("Erro: ", err);
        })
    }

    return(
        <div className={styles.container}>
            <ToastContainer />
            <div className={styles.blueBackground}></div>
            <form className={styles.formEmail} onSubmit={handleSubmit(handleSend)}>
                <div className={styles.divLogo}>
                    <Link href={'/'}>Voltar</Link>
                    <Image src={Logotipo} alt='Logotipo' className={styles.imgLogo}/>
                </div>
                <label htmlFor="inpName" className={styles.lblEmail}>Nome:</label>
                <input 
                    type="text" 
                    id="inpName" 
                    required
                    className={styles.email} 
                    placeholder='Digite seu nome'
                    {...register('name')}
                />
                <label htmlFor="inpEmail" className={styles.lblEmail}>E-mail:</label>
                <input 
                    type="email" 
                    id="inpEmail" 
                    required
                    className={styles.email} 
                    placeholder='Digite seu e-mail'
                    {...register('email')}
                />
                <label htmlFor="textMail" className={styles.lblEmail}>Mensagem:</label>
                <textarea 
                    id="textMail"
                    required 
                    placeholder='Digite sua mensagem' 
                    className={styles.txtEmail}
                    {...register("text")}
                ></textarea>
                <button className={styles.btnSend} type="submit">ENVIAR</button>
            </form>
        </div>
    )
}