import styles from './styles.module.scss';
import { Montserrat, Tangerine } from 'next/font/google';


const tangerine = Tangerine({
    subsets: ['latin'],
    weight: '700'
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100','200', '300', '400', '500', '600', '700', '800', '900']
})

export default function Slogan() {
  return (
    <div className={styles.container}>
        <div className={styles.maxSize}>
            <h1 className={tangerine.className}>Residencial Lisboa</h1>
            <a className={montserrat.className} href="#detail">Descubra sua nova vida</a>
        </div>
    </div>
  )
}