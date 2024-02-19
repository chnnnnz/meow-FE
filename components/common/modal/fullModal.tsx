import React, { useEffect, useRef, useState } from 'react'
import Button from '@components/common/button'

export type FullModalProps = {
  className?: string
  children: React.ReactNode
}

function FullModal(props: FullModalProps) {
  const [opened, setOpened] = useState(true);

  return (
    <div className={`absolute top-0 w-full h-full z-20`}>
      {opened && (
        <div
          className="bg-white fixed pb-[8px] px-[16px] laptop:p-[20px] w-full h-full laptop:max-w-[920px] laptop:min-w-[492px] left-0 top-0 z-30"
          onClick={(e) => e.stopPropagation()}
        >
          {props.children}
        </div>
      )}
    </div>
  )
}

export default FullModal
