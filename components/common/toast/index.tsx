import React, { use, useEffect, useState } from 'react';
import Image from 'next/image'

export type ToastProps = {
  /*
  * 토스트 메시지
  * */
  message: string;
  /*
  * 이미지는 필수값 아님
  * */
  image?: string;
  onHidden: () => void;
}

const Toast: React.FC<ToastProps> = (props: ToastProps) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    setShow(false)
    const timer = setTimeout(() => {
      props.onHidden()
    }, 1300)
    return () => {
      clearTimeout(timer)
    }
  }, [props])

  return (
    <div className={`fixed bottom-20 left-1/2 -translate-x-1/2 w-fit laptop:min-w-[636px] z-10 bg-gray-08/90 rounded-[4px] py-[13px] laptop:py-[15px] px-[20px] transition-opacity ease-in duration-[1300ms] ${show ? '' : 'opacity-0'}`}>
      <div className="flex items-center place-content-center h-full mx-4 body-text-sm laptop:sub-head-SB-20-150 text-white">
        {props.image && (
          <Image
            src={props.image}
            alt={''}
            width={20}
            height={20}
            className="inline-block mr-2"
          />
        )}
        {props.message}
      </div>
    </div>
  )
}

export default Toast