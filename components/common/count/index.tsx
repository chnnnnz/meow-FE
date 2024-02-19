import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

type CountProps = {
  onClickUp: () => void
  onClickDown: () => void
  count: number
  className?: string
  btnStyle?: string
  countStyle?: string
}

const Count = ({ onClickUp, onClickDown, count, className, btnStyle, countStyle }: CountProps) => {
  const [disabled, setDisabled] = useState(false)

  let BtnStyle = btnStyle ?? 'border border-gray-04 rounded-[50%] h-[32px] w-[32px]'
  let CountStyle = countStyle ?? 'flex items-center justify-center text-center px-6'

  useEffect(() => {
    if (count === 1) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [count])

  return (
    <>
      <div className={`flex ${className}`}>
        <div className={`flex ${BtnStyle}`}>
          <button disabled={disabled} className="flex items-center justify-center w-full bg-white rounded-[17px]" onClick={onClickDown}>
            <i className={`xi-minus-min ${disabled ? "text-gray-06" : ""}`}></i>
          </button>
        </div>

        <span className={`${CountStyle}`}>{count}</span>

        <div className={`flex ${BtnStyle}`}>
          <button className="flex items-center justify-center text-center w-full bg-white rounded-[17px]" onClick={onClickUp}>
            <i className="xi-plus-min"></i>
          </button>
        </div>
      </div>
    </>
  )
}

export default Count
