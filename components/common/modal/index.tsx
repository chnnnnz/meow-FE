import React, { useState } from 'react'

export type ModalProps = {
  /**
   * 배경 딤드 여부
   * @default false
   */
  dimmed?: boolean
  /**
   * 배경 클릭시 닫히는지 여부
   * @default true
   */
  closableBg?: boolean
  /**
   * bg 클릭으로 닫혀야 하는경우 호출, 이벤트 받아서 unmount 처리해야함
   */
  onClose: () => void
  className?: string
  children: React.ReactNode
}

/**
 * - `children`을 모달 형태로 띄워주는 컴포넌트
 * - `useModal()` hook을 사용하면 편리하게 사용할 수 있음
 * 
 * ```tsx
 * function MyComponent() {
 *   const [isOpen, open, close] = useModal()
 *   return (
 *    <>
 *     <button onClick={open}>모달 열기</button>
 *     <Modal isOpen={isOpen} onClose={close}>
 *       <div>모달 내용</div>
 *     </Modal>
 *   </>
 *   )
 * }
 * ```
 */
function Modal(props: ModalProps) {
  const [opened, setOpened] = useState(true)
  const dimmed = props.dimmed ?? false

  function onClickBg() {
    if (props.closableBg === false) return false
    close()
  }

  function close() {
    setOpened(false)
    props.onClose()
  }

  return (
    <div className={`absolute top-0 left-0 w-full h-full ${dimmed ? 'bg-gray-09/40' : ''} z-20`} onClick={onClickBg}>
      {opened && (
        <div
          className={`bg-white fixed p-[16px] laptop:p-[20px] w-[343px] laptop:max-w-[920px] laptop:min-w-[492px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-30 rounded-[10px] shadow-[0_0_20px_0_rgba(25,26,26,0.14)] ${props.className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {props.children}
        </div>
      )}
    </div>
  )
}

export default Modal
