import { FC, useState } from 'react'
import { Empty } from 'antd'
import { FileItem } from '@/api/dto/files.dto'
import FileList, { FileSelectType } from '@/components/FileList'
import FileActions from '@/components/FileActions'

import * as Api from '@/api'

interface FilesProps {
  items: FileItem[]
  withActions?: boolean
}

const Files: FC<FilesProps> = ({ items, withActions }) => {
  const [files, setFiles] = useState(items || [])
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const onFileSelect = (id: number, type: FileSelectType) => {
    if (type === 'select') {
      setSelectedIds((prev) => [...prev, id])
    } else {
      setSelectedIds((prev) => prev.filter((_id) => _id !== id))
    }
  }

  const onClickRemove = () => {
    setSelectedIds([])
    setFiles((prev) => prev.filter((file) => !selectedIds.includes(file.id)))
    Api.files.remove(selectedIds)
  }

  const onClickShare = () => {
    alert('share')
  }

  return (
    <>
      {files.length ? (
        <>
          {withActions && (
            <FileActions onClickRemove={onClickRemove} onClickShare={onClickShare} isActive={selectedIds.length > 0} />
          )}
          <FileList items={files} onFileSelect={onFileSelect} />
        </>
      ) : (
        <Empty className="empty-block" description="Список файлов пуст" />
      )}
    </>
  )
}

export default Files
