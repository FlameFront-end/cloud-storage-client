import { FC } from 'react'

import styles from './FileCard.module.scss'
import { getExtensionFromFileName } from '@/utils/getExtensionFromFileName'
import { getColorByExtension } from '@/utils/getColorByExtension'
import { isImage } from '@/utils/isImage'
import { FileTextOutlined } from '@ant-design/icons'
import Link from "next/link";

interface FileCardProps {
  filename: string
  originalName: string
}

const FileCard: FC<FileCardProps> = ({ filename, originalName }) => {
  const ext = getExtensionFromFileName(filename)
  const imageUrl = ext && isImage(ext) ? 'http://localhost:4444/uploads/' + filename : ''

  const color = getColorByExtension(ext)
  const classColor = styles[color]

  return (
      <Link href={`http://localhost:4444/uploads/${filename}`}>
          <div className={styles.root}>
              <div className={styles.icon}>
                  <i className={classColor}>{ext}</i>
                  {isImage(ext) ? (
                      <img className={styles.image} src={imageUrl} alt="File"/>
                  ) : (
                      <FileTextOutlined rev={undefined}/>
                  )}
              </div>
              <span>{originalName}</span>
          </div>
      </Link>
  )
}

export default FileCard
