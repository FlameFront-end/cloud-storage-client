import { FC, PropsWithChildren } from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import styles from '@/styles/Home.module.scss'

interface LayoutProps {
  title: string
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <Header />
        <div className={styles.main}>
          <div className={styles.layout}>{children}</div>
        </div>
      </main>
    </>
  )
}

export default Layout
