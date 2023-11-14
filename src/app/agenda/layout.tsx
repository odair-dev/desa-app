import styles from "./styles.module.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.blueBackground}></div>
      {children}
    </div>
  );
}
