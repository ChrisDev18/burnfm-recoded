import Link from 'next/link'
import buttons from './buttons.module.css'
import styles from './not-found.module.css'
import "@/app/icons.css"

export default function NotFound() {
  return (
    <div className={styles.Root}>
      <h1>Not Found</h1>
      <p className={styles.Description}>This page does not exist.</p>
      <p className={styles.Message}>This can happen if you enter the wrong url, or someone has mistyped their link to this website.</p>
      <Link className={buttons.Button} href="/">Return Home</Link>
    </div>
  )
}