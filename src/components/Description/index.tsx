import styles from './styles.module.scss';
import Image from 'next/image';
import Planta from '../../img/Planta.png';
import Sala from '../../img/sala.png';
import Sacada from '../../img/sacada.png';
import Cozinha from '../../img/cozinha.png';

export default function Description(){
    return(
        <div className={styles.container}>
            <div className={styles.maxSize}>
                <div className={styles.divText}>
                    <h2>Conheça os detalhes</h2>
                </div>
                <div className={styles.divImg}>
                    <Image src={Sacada} alt='Sacada' className={styles.imgPlanta}/>
                    <Image src={Sala} alt='Sala' className={styles.imgPlanta}/>
                    <Image src={Cozinha} alt='Cozinha' className={styles.imgPlanta}/>
                    {/* <Image src={Planta} alt='Planta' className={styles.imgPlanta}/> */}
                </div>
                <div className={styles.divText}>
                    <h2>Localização</h2>
                </div>
                <div className={styles.divMap}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3457.7300466883203!2d-51.0825907281104!3d-29.92967295524526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951973c2f8f8d3d3%3A0x980c1b49fac7126e!2sR.%20Caruaru%2C%20160%20-%20Vila%20Vista%20Alegre%2C%20Cachoeirinha%20-%20RS%2C%2094945-120!5e0!3m2!1spt-BR!2sbr!4v1695218453162!5m2!1spt-BR!2sbr" className={styles.maps}></iframe>
                </div>
            </div>
        </div>
    )
}