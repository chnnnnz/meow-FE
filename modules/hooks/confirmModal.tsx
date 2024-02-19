import { use, useState } from 'react'

function useConfirmModal(): [
  boolean,
  string | undefined,
  string | undefined,
  () => void,
  ({ title, content }: { title?: string; content?: string, onPositive: () => void}) => void,
  () => void,
] {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>()
  const [content, setContent] = useState<string>()
  const [onPositive, setOnPositive] = useState(() => () => {})
  const open = ({title, content, onPositive}: { title?: string; content?: string, onPositive: () => void }) => {
    setTitle(title)
    setContent(content)
    setIsOpen(true)
    setOnPositive(() => onPositive)
  }
  const close = () => {
    setIsOpen(false)
  }
  return [isOpen, title, content, onPositive, open, close]
}

export default useConfirmModal
