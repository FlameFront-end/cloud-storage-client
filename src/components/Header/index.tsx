import { FC } from 'react'
import { Layout, Avatar, Menu, Popover, Button, Popconfirm } from 'antd'
import styles from './Header.module.scss'
import { CloudOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import * as Api from '@/api'

const Header: FC = () => {
  const router = useRouter()
  const selectedMenu = router.pathname

  const onClickLogout = () => {
    Api.auth.logout()
    location.href = '/'
  }

  return (
    <Layout.Header className={styles.root}>
      <div className={styles.headerInner}>
        <div className={styles.headerLeft}>
          <h2>
            <CloudOutlined rev={undefined} />
            Cloud Storage
          </h2>

          <Menu
            className={styles.topMenu}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[selectedMenu]}
            onSelect={({ key }) => router.push(key)}
          >
            <Menu.Item key="/dashboard">Главная</Menu.Item>
            <Menu.Item key="/dashboard/profile">Профиль</Menu.Item>
          </Menu>
        </div>

        <div className={styles.headerRight}>
          <Popover
            trigger="click"
            content={
              <Popconfirm title="Вы действительно хотите выйти?" okText="Да" cancelText="Нет" onConfirm={onClickLogout}>
                <Button type="primary" danger>
                  Выйти
                </Button>
              </Popconfirm>
            }
          >
            <Avatar>A</Avatar>
          </Popover>
        </div>
      </div>
    </Layout.Header>
  )
}

export default Header
