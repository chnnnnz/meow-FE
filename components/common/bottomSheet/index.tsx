'use client'

import { useEffect, useRef, useState } from 'react'

export type BottomSheetProps = {
  /**
   * 배경 딤드 여부
   * @default true
   */
  dimmed?: boolean
  /**
   * 배경 클릭시 닫히는지 여부
   * @default true
   */
  closableBg?: boolean
  /**
   * 상단 드래그 핸들로 닫히는지 여부. false일 경우 핸들 노출 안됨
   * @default true
   */
  closableDrag?: boolean
  /**
   * 드래그 핸들이나 bg 클릭으로 닫혀야 하는경우 호출, 이벤트 받아서 unmount 처리해야함
   */
  onClose: () => void
  className?: string
}

/**
 * - 하단에서 올라오는 모달 컴포넌트<br>
 * - `useModal()`훅을 사용하여 conditional rendering 으로 이용합니다.<br>
 * 
 * ```tsx
 * function Example() {
 * const [isOpen, open, close] = useModal()
 * return (
 *   <>
 *     {isOpen && (<BottomSheet onClose={close}>내용</BottomSheet>)}
 *     <button onClick={open}>...</button>
 *   </>
 * )
 * ```
}
 */
function BottomSheet(props: React.PropsWithChildren<BottomSheetProps>) {
  const [opened, setOpened] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const dimmed = props.dimmed ?? true
  let isDragging = false
  let startY = 0
  let startHeight = 0

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpened(true)
    }, 50)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  function onClickBg() {
    if (props.closableBg === false) return false
    close()
  }

  function close() {
    setOpened(false)
    props.onClose()
  }

  function dragStart(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    isDragging = true
    if (startHeight === 0) {
      startHeight = contentRef.current?.clientHeight || 0
    }
    startY = e.pageY
  }

  function dragging(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!isDragging) return
    const delta = startY - e.pageY
    let newHeight = startHeight + delta > startHeight ? startHeight : startHeight + delta
    contentRef.current?.style.setProperty('height', `${newHeight}px`)
  }

  function dragStop(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (isDragging) {
      if ((contentRef.current?.clientHeight ?? 0) < startHeight * 0.8) {
        close()
      } else {
        contentRef.current?.style.setProperty('height', `${startHeight}px`)
      }
      isDragging = false
    }
  }

  return (
    <div className={`w-full h-full`} onMouseMove={dragging} onMouseUp={dragStop}>
      <div
        className={`absolute top-0 left-0 right-0 bottom-0 ${dimmed ? 'bg-gray-09/40' : ''} z-10`}
        onClick={onClickBg}
      />
      <div
        ref={contentRef}
        className={`fixed bottom-0 left-[50%] translate-x-[-50%] w-full bg-white rounded-t-[10px] transition-transform duration-200 ease-in-out ${
          opened ? 'translate-y-0' : 'translate-y-full'
        } shadow-[0_0_20px_0_rgba(25,26,26,0.14)] z-20 ${props.className}`}
      >
        {props.closableDrag !== false && (
            <div className="pt-[8px] pb-[20px] flex items-center place-content-center" onMouseDown={dragStart}>
            <div className="w-[40px] h-[4px] rounded-[99px] bg-gray-02" />
          </div>
        )}
        {props.children}
      </div>
    </div>
  )
}

export default BottomSheet
