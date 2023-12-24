import { GetServerSidePropsContext } from 'next'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { DeleteOutlined, FileImageOutlined, FileOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import Layout from '@/layouts/Layout'
import { NextPageWithLayout } from '@/pages/_app'
import FileList from '@/components/FileList'
import { checkAuth } from '@/utils/checkAuth'
import { FileItem } from '@/api/dto/files.dto'
import * as Api from '@/api/index'

import { DashboardLayout } from '@/layouts/DashboardLayout'
import Files from '@/modules/Files'

interface DashboardTrashProps {
  items: FileItem[]
}

const DashboardTrash: NextPageWithLayout<DashboardTrashProps> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} withActions={false} />
    </DashboardLayout>
  )
}

DashboardTrash.getLayout = (page: ReactNode) => {
  return <Layout title="Dashboard / Корзина">{page}</Layout>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx)

  if ('redirect' in authProps) {
    return authProps
  }

  try {
    const items = await Api.files.getAll('trash')

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

export default DashboardTrash
