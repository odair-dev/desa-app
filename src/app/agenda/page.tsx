"use client"
import styles from './styles.module.scss';
import Image from 'next/image';
import Logotipo from '../../img/Logo.png';
import Link from 'next/link';
import { useForm } from "react-hook-form"
import emailjs from '@emailjs/browser'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { useEffect } from 'react';
import { GlobalContext } from '@/providers/GlobalContext';
import { useContext } from "react";
import { useRouter } from 'next/navigation';


export default function Agenda() {
    const { register, handleSubmit, reset } = useForm();
    const [date, setDate] = useState(new Date());
    const [choicedate, setChoiceDate] = useState(false);
    const { setModalMobile } = useContext(GlobalContext)
    const router = useRouter();


    function handleDate(date:any){
        setDate(date);
    }

    function confirmDate(){
        setChoiceDate(true);
        console.log(date.toISOString().slice(0, 10));
    }

    function goBack(){
        setModalMobile(false);
        router.push('/');
    }

    return(
        <div className={styles.container}>
            <ToastContainer />
            <div className={styles.blueBackground}></div>
            <form className={styles.formEmail} onSubmit={handleSubmit(confirmDate)}>
                <div className={styles.divLogo}>
                    <div className={styles.btnGoBack} onClick={()=>goBack()}>Voltar</div>
                    <Image src={Logotipo} alt='Logotipo' className={styles.imgLogo} onClick={()=>goBack()}/>
                </div>
                <div className={!choicedate ? styles.divDateOn : styles.divDateOff}>
                    <p>Escolha uma data:</p>
                    <Calendar onChange={handleDate} value={date} minDate={new Date()}/>
                    <button className={styles.btnSend} type="submit">Confirmar</button>
                </div>
                <div className={choicedate ? styles.divHourOn : styles.divHourOff}>
                    <p>Escolha um horário:</p>

                    <button className={styles.btnSend} type="submit">Confirmar</button>
                </div>
            </form>
        </div>
    )
}