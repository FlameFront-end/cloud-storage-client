import { FC, useRef } from 'react'
import FileCard from '@/components/FileCard'
import { FileItem } from '@/api/dto/files.dto'
import styles from './FileList.module.scss'
import Selecto from 'react-selecto'

export type FileSelectType = 'select' | 'unselect'

interface FileListProps {
  items: FileItem[]
  onFileSelect: (id: number, type: FileSelectType) => void
}

const FileList: FC<FileListProps> = ({ items, onFileSelect }) => {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div className={styles.root} ref={ref}>
      {items.map((item) => (
        <div data-id={item.id} key={item.id} className="file">
          <FileCard filename={item.fileName} originalName={item.originalName} />
        </div>
      ))}

      <Selecto
        container={ref.current}
        selectableTargets={['.file']}
        selectByClick
        hitRate={10}
        selectFromInside
        toggleContinueSelect={['shift']}
        continueSelect={false}
        onSelect={(e) => {
          e.added.forEach((el) => {
            el.classList.add('active')
            onFileSelect(Number(el.dataset['id']), 'select')
          })
          e.removed.forEach((el) => {
            el.classList.remove('active')
            onFileSelect(Number(el.dataset['id']), 'unselect')
          })
        }}
      />
    </div>
  )
}

export default FileList
