import { GetServerSidePropsContext } from 'next'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { DeleteOutlined, FileImageOutlined, FileOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import Layout from '@/layouts/Layout'
import { NextPageWithLayout } from '@/pages/_app'
import UploadButton from '@/components/UploadButton/UploadButton'
import FileList from '@/components/FileList'
import { checkAuth } from '@/utils/checkAuth'
import { FileItem } from '@/api/dto/files.dto'
import * as Api from '@/api/index'

import styles from '@/styles/Home.module.scss'

interface DashboardPageProps {
  items: FileItem[]
}

const DashboardPage: NextPageWithLayout<DashboardPageProps> = ({ items }) => {
  const router = useRouter()
  const selectedMenu = router.pathname

  return (
    <main className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <UploadButton />
        <Menu
          className={styles.menu}
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={[
            {
              key: '/dashboard',
              icon: <FileOutlined rev={undefined} />,
              label: 'Файлы',
              onClick: () => router.push('/dashboard'),
            },
            {
              key: '/dashboard/photos',
              icon: <FileImageOutlined rev={undefined} />,
              label: 'Фото',
              onClick: () => router.push('/dashboard/photos'),
            },
            {
              key: '/dashboard/trash',
              icon: <DeleteOutlined rev={undefined} />,
              label: 'Корзина',
              onClick: () => router.push('/dashboard/trash'),
            },
          ]}
        />
      </div>

      <div className="container">
        <FileList items={items} />
      </div>
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
