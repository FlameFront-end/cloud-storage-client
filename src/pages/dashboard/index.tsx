import { GetServerSidePropsContext, NextPage } from 'next'
import { checkAuth } from '@/utils/checkAuth'
import { ReactNode } from 'react'
import Layout from '@/layouts/Layout'
import { NextPageWithLayout } from '@/pages/_app'

const DashboardPage: NextPageWithLayout = () => {
  return (
    <main>
      <div>DashboardPage</div>
    </main>
  )
}

DashboardPage.getLayout = (page: ReactNode) => {
  return <Layout title="Dashboard / Главная">{page}</Layout>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx)

  if ('redirect' in authProps) {
    return authProps
  }

  return {
    props: {},
  }
}

export default DashboardPage
