import { NextPageWithLayout } from '@/pages/_app'
import { ReactNode } from 'react'
import Layout from '@/layouts/Layout'
import styles from '@/styles/Profile.module.scss'
import { Button } from 'antd'
import { GetServerSidePropsContext } from 'next'
import { checkAuth } from '@/utils/checkAuth'
import * as Api from '@/api'
import { User } from '@/api/dto/auth.dto'

interface DashboardProfilePageProps {
  userData: User
}

const DashboardProfilePage: NextPageWithLayout<DashboardProfilePageProps> = ({ userData }) => {
  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      Api.auth.logout()
      location.href = '/dashboard/auth'
    }
  }

  return (
    <main>
      <main>
        <div className={styles.root}>
          <h1>Мой профиль</h1>
          <br />
          <p>
            ID: <b>{userData.id}</b>
          </p>
          <p>
            Полное имя: <b>{userData.fullName}</b>
          </p>
          <p>
            E-Mail: <b>{userData.email}</b>
          </p>
          <br />
          <Button onClick={onClickLogout} type="primary" danger>
            Выйти
          </Button>
        </div>
      </main>
    </main>
  )
}

DashboardProfilePage.getLayout = (page: ReactNode) => {
  return <Layout title="Dashboard / Профиль">{page}</Layout>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx)

  if ('redirect' in authProps) {
    return authProps
  }

  const userData = await Api.auth.getMe()

  return {
    props: {
      userData,
    },
  }
}

export default DashboardProfilePage
