import React from 'react'
import styles from '@/styles/Home.module.scss'
import { useRouter } from 'next/router'
import { Menu } from 'antd'
import { DeleteOutlined, FileImageOutlined, FileOutlined } from '@ant-design/icons'
import UploadButton from '@/components/UploadButton/UploadButton'

export const DashboardLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
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
              key: `/dashboard`,
              icon: <FileOutlined rev={undefined} />,
              label: `Файлы`,
              onClick: () => router.push('/dashboard'),
            },
            {
              key: `/dashboard/photos`,
              icon: <FileImageOutlined rev={undefined} />,
              label: `Фото`,
              onClick: () => router.push('/dashboard/photos'),
            },
            {
              key: `/dashboard/trash`,
              icon: <DeleteOutlined rev={undefined} />,
              label: `Корзина`,
              onClick: () => router.push('/dashboard/trash'),
            },
          ]}
        />
      </div>

      <div className="container">{children}</div>
    </main>
  )
}
