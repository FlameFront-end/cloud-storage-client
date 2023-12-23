import { FC } from 'react'
import { Button, Form, Input, notification } from 'antd'
import styles from './Auth.module.scss'
import { RegisterFormDTO } from '@/api/dto/auth.dto'
import { setCookie } from 'nookies'
import * as Api from '@/api'

const RegisterForm: FC = () => {
  const handleSuccess = (data: any) => {
    console.log(data)

    notification.success({
      message: 'Успешно!',
      description: 'Переходим в админ-панель...',
      duration: 2,
    })

    setCookie(null, '_token', data.token, {
      path: '/',
    })

    console.log(data.token)

    location.href = '/dashboard'
  }

  const handleError = (err: Error) => {
    console.warn(err)

    const errorMessage = err.message || 'Ошибка при регистрации'
    notification.error({
      message: 'Ошибка!',
      description: errorMessage,
      duration: 2,
    })
  }

  const onSubmit = async (values: RegisterFormDTO) => {
    try {
      const data = await Api.auth.register(values)
      handleSuccess(data)
    } catch (err) {
      handleError(err as Error)
    }
  }

  return (
    <div className={styles.formBlock}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="E-Mail"
          name="email"
          rules={[
            {
              required: true,
              message: 'Укажите почту',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Полное имя"
          name="fullName"
          rules={[
            {
              required: true,
              message: 'Укажите полное имя',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: 'Укажите пароль',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Регистрация
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RegisterForm
