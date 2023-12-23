import { GetServerSidePropsContext, NextPage } from 'next'
import { checkAuth } from '@/utils/checkAuth'

const DashboardPage: NextPage = () => {
  return (
    <main>
      <div>DashboardPage</div>
    </main>
  )
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
