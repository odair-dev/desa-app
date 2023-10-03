"use client"
import styles from './styles.module.scss';
import Image from 'next/image';
import Logotipo from '../../img/Logo.png';
import Link from 'next/link';
import { useForm } from "react-hook-form"
import emailjs from '@emailjs/browser'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContext } from '@/providers/GlobalContext';
import { useContext, useEffect } from "react";
import { useRouter } from 'next/navigation';


export default function Email() {
    const { register, handleSubmit, reset } = useForm();
    const { setModalMobile } = useContext(GlobalContext)
    const router = useRouter();


    function handleSend(data:any){
        const templateParams = {
            from_name:data.name,
            from_email:data.email,
            message:data.text
        }
        emailjs.send("service_271lw37", "template_srqdu8u", templateParams, "ienNLETQKSSgbJrN8")
        .then((response)=>{
            toast.success('Obrigado pela mensagem! Em breve entraremos em contato.');
            // console.log("Email enviado", response.status, response.text);
            reset({ name: "", email: "", text: "" })
            setModalMobile(false);
            setTimeout(() => {
                router.push('/');
            }, 2750);
        }, (err)=>{
            toast.error('Falha ao enviar o e-mail, tente mais tarde!');
            // console.log("Erro: ", err);
        })
    }

    function goBack(){
        setModalMobile(false);
        router.push('/');
    }

    return(
        <div className={styles.container}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
            <ToastContainer position="bottom-right" autoClose={2500}/>
            <div className={styles.blueBackground}></div>
            <form className={styles.formEmail} onSubmit={handleSubmit(handleSend)}>
                <div className={styles.divLogo}>
                    <div className={styles.btnGoBack} onClick={()=>goBack()}>Voltar</div>
                    <Image src={Logotipo} alt='Logotipo' className={styles.imgLogo}/>
                    <div className={styles.divContacts}>
                        <a href="https://api.whatsapp.com/send?1=pt_BR&phone=5551989768161" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-whatsapp"></i> WhatsApp</a>
                        <h3><i className="fa-solid fa-phone"></i> (51) 989.768.161</h3>
                    </div>
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
                <button className={styles.btnSend} type="submit">Enviar e-mail</button>
            </form>
        </div>
    )
}