'use client';
import styles from './styles.module.scss';
import Image from 'next/image';
import Logotipo from '../../img/Logo.png';
import Sandwich from '../Sandwich';
import { useContext } from "react";
import { GlobalContext } from "@/providers/GlobalContext";
import Link from "next/link";
import { UserContext } from '@/providers/UserContext';
import { destroyCookie } from 'nookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Header(){
    const { modalMobile, setModalMobile } = useContext(GlobalContext);
    const { user, setUser, setToken, setUserId } = useContext(UserContext)

    function logout(){
        destroyCookie(null, 'nextauth.token');
        setUser(null);
        setToken(null);
        setUserId(null);
        toast.success("Logout realizado com sucesso");
        setTimeout(() => {
            setModalMobile(false);
        }, 2250);
    }

    return(
        <div className={!modalMobile ? styles.container : styles.container2}>
            <ToastContainer position="bottom-right" autoClose={1250}/>
            <div className={styles.maxSize}>
                <div className={styles.divLogo}>
                    <Image src={Logotipo} alt='Logotipo' className={styles.imgLogo}/>
                </div>
                {user ? <h3>Olá, {user.name}</h3> : null}
                <Sandwich />
                <Link href={`/agenda/`} className={!modalMobile ? styles.textMenu : styles.textMenu1}>Agendar Visita</Link>
                {/* <div className={!modalMobile ? styles.divLine : styles.divLine1}></div> */}
                <Link href={`/email/`} className={!modalMobile ? styles.textMenu : styles.textMenu2}>Contato</Link>
                {!user ? 
                    <Link href={`/login/`} className={!modalMobile ? styles.textMenu : styles.textMenu3}>Login</Link>
                : 
                    <button className={!modalMobile ? styles.btnBefore : styles.btnAfter} onClick={()=>logout()}>Logout</button>
                }
            </div>
        </div>
    )
}