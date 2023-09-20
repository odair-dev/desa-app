import styles from './styles.module.scss';
import { Tangerine } from 'next/font/google';

const tangerine = Tangerine({
    subsets: ['latin'],
    weight: '700'
})


export default function Slogan() {
  return (
    <div className={styles.container}>
        <div className={styles.maxSize}>
            <h1 className={tangerine.className}>Residencial Lisboa</h1>
            <div className={styles.borderText}>
                <h3>Descubra sua nova vida</h3>
            </div>
        </div>
    </div>
  )
}