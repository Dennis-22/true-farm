import styles from '../styles/Layout.module.css'

export default function Layout({children}){
    return <div className={styles.layout}>
        {children}
    </div>
}

export function Container({children}){
    return <div className={styles.container}>
        {children}
    </div>
}