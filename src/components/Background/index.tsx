import styles from './styles.module.scss';


export default function Background({children}: {children: React.ReactNode}){
    return(
        <div className={styles.container} id='home'>
            {children}
        </div>
    )
}