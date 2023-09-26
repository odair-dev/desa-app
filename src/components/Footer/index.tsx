'use client';
import styles from './styles.module.scss';
import Logotipo from '../../img/Logo_sem_sombra.png';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';
import Link from "next/link";


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100','200', '300', '400', '500', '600', '700', '800', '900']
})


export default function Footer(){
    return(
        <div className={styles.container}>
            <div className={styles.maxSize}>
                <div className={styles.logo}>
                    <Image src={Logotipo} alt='Logotipo' className={styles.imgLogo}/>
                    <p>CNPJ: 29.015.972/0001-31</p>
                </div>
                <div className={styles.info}>
                    <h3 className={montserrat.className}>Redes Sociais</h3>
                    <div className={styles.divIcons}>
                        <a href="https://www.facebook.com/desaincorporadora/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-square-facebook"></i> www.facebook.com/desaincorporadora/</a>
                        <a href="https://www.instagram.com/desaincorporacoes/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i> www.instagram.com/desaincorporacoes/</a>         
                    </div>
                </div>
                <div className={styles.message}>
                    <h2 className={montserrat.className}>Contato</h2>
                    <Link href={`/email/`}><i className="fa-regular fa-envelope"></i> Falar por e-mail</Link>
                    <a href="https://api.whatsapp.com/send?1=pt_BR&phone=5551989768161" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-whatsapp"></i> WhatsApp</a>
                    <h3><i className="fa-solid fa-phone"></i> (51) 989.768.161</h3>
                </div>
            </div>
        </div>
    )
}