import { GetServerSidePropsContext } from 'next'
import { ReactNode } from 'react'
import Layout from '@/layouts/Layout'
import { NextPageWithLayout } from '@/pages/_app'
import FileList from '@/components/FileList'
import { checkAuth } from '@/utils/checkAuth'
import { FileItem } from '@/api/dto/files.dto'
import * as Api from '@/api/index'

import { DashboardLayout } from '@/layouts/DashboardLayout'
import Files from '@/modules/Files'

interface DashboardPageProps {
  items: FileItem[]
}

const DashboardPage: NextPageWithLayout<DashboardPageProps> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} withActions={true} />
    </DashboardLayout>
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

  try {
    const items = await Api.files.getAll()

    return {
      props: {
        items,
      },
    }
  } catch (err) {
    console.log(err)
    return {
      props: {
        items: [],
      },
    }
  }
}

export default DashboardPage
