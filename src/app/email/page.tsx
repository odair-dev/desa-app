import styles from './styles.module.scss';
import Image from 'next/image';
import Logotipo from '../../img/Logo.png';
import Link from 'next/link';

export default async function Email() {
    return(
        <div className={styles.container}>
            <div className={styles.blueBackground}></div>
            <form className={styles.formEmail}>
                <div className={styles.divLogo}>
                    <Link href={'/'}>Voltar</Link>
                    <Image src={Logotipo} alt='Logotipo' className={styles.imgLogo}/>
                </div>
                <label htmlFor="inpEmail" className={styles.lblEmail}>E-mail:</label>
                <input type="email" name="email" id="inpEmail" className={styles.email} placeholder='Digite seu e-mail'/>
                <label htmlFor="textMail" className={styles.lblEmail}>Mensagem:</label>
                <textarea name="text" id="textMail" placeholder='Digite sua mensagem' className={styles.txtEmail}></textarea>
                <button className={styles.btnSend}>ENVIAR</button>
            </form>
        </div>
    )
}