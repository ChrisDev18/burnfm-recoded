'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import styles from "@/app/not-found.module.css";
import Link from "next/link";
import buttons from "@/app/styles/buttons.module.css";

export default function Error({
                                error,
                                reset,
                              }: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
      <div className={styles.Root}>
        <h1>Something went wrong!</h1>
        <p className={styles.Description}>There was an unexpected error.</p>
        <p className={styles.Message}>For more information about the error, see the console in developer tools.</p>
        <div className={styles.Buttons}>
          <button
              className={buttons.Button}
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
          >
            Try again
          </button>
          <Link className={buttons.Button} href="/">Return Home</Link>
        </div>
      </div>
  )
}