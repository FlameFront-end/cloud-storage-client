import { FC } from 'react'
import FileCard from '@/components/FileCard'
import { FileItem } from '@/api/dto/files.dto'
import styles from './FileList.module.scss'

interface FileListProps {
  items: FileItem[]
}

const FileList: FC<FileListProps> = ({ items }) => {
  return (
    <div className={styles.root}>
      {items.map((item) => (
        <div data-id={item.id} key={item.id} className="file">
          <FileCard filename={item.fileName} originalName={item.originalName} />
        </div>
      ))}
    </div>
  )
}

export default FileList
