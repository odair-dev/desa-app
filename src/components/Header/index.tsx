'use client';
import styles from './styles.module.scss';
import Image from 'next/image';
import Logotipo from '../../img/Logo.png';
import Sandwich from '../Sandwich';
import { useContext } from "react";
import { GlobalContext } from "@/providers/GlobalContext";
import Link from "next/link";

export default function Header(){
    const { modalMobile, setModalMobile } = useContext(GlobalContext);

    return(
        <div className={!modalMobile ? styles.container : styles.container2}>
            <div className={styles.maxSize}>
                <div className={styles.divLogo}>
                    <Image src={Logotipo} alt='Logotipo' className={styles.imgLogo}/>
                </div>
                <Sandwich />
                <Link href={`/schedules/`} className={!modalMobile ? styles.textMenu1 : styles.textMenu2}>Imóveis</Link>
                <Link href={`/schedules/`} className={!modalMobile ? styles.textMenu3 : styles.textMenu4}>Contato</Link>
                <Link href={`/schedules/`} className={!modalMobile ? styles.textMenu5 : styles.textMenu6}>Visitas</Link>
                <Link href={`/schedules/`} className={!modalMobile ? styles.textMenu7 : styles.textMenu8}>Login</Link>
            </div>
        </div>
    )
}