import { FC, useState } from 'react'
import { Button, notification, Upload, UploadFile } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import * as Api from '@/api'

import styles from '@/styles/Home.module.scss'

const UploadButton: FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const onUploadSuccess = async (options: any) => {
    try {
      await Api.files.uploadFile(options)

      setFileList([])

      window.location.reload()
    } catch (err) {
      notification.error({
        message: 'Ошибка!',
        description: 'Не удалось загрузить файл',
        duration: 2,
      })
    }
  }

  return (
    <Upload
      className={styles.upload}
      customRequest={onUploadSuccess}
      fileList={fileList}
      onChange={({ fileList }) => setFileList(fileList)}
    >
      <Button type="primary" size="large" icon={<CloudUploadOutlined rev={undefined} />}>
        Загрузить файл
      </Button>
    </Upload>
  )
}

export default UploadButton
