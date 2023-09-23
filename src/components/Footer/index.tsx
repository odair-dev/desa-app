'use client';
import styles from './styles.module.scss';
import Logotipo from '../../img/Preferencial.png';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';


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
                </div>
                <div className={styles.info}>
                    <h3 className={montserrat.className}>Redes Sociais</h3>
                    <div className={styles.divIcons}>
                        <i className="fa-brands fa-square-facebook"></i>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-whatsapp"></i>
                    </div>
                    <h4>de Sá Incorporações</h4>
                    <p>desaincorporacoes@desaincorporacoes.com.br</p>
                </div>
                <div className={styles.message}>
                    <div>
                        <h3 className={montserrat.className}>Fale conosco:</h3>
                    </div>
                    <form>
                        <input type="text" />
                        <textarea name="" id=""></textarea>
                        <button>ENVIAR</button>
                    </form>
                </div>
            </div>
        </div>
    )
}