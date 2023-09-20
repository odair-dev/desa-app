import styles from './styles.module.scss';


export default function Filter({children}: {children: React.ReactNode}) {
  return (
    <div className={styles.container}>
        {children}
    </div>
  )
}
