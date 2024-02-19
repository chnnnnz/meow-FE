import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

export type SelectBoxProps = {
  /*
  * 초기 노출 값(선택 안됐을 때 노출 값)
  * */
  name: string
  /**
   * 선택된 index
   */
  selectedIndex?: number
  /*
  * 노출 여부
  * normal: 기본형 - 베이스 div에 name 값으로 나옴
  * selected: 기본값이 선택된 형태 - 베이스 div에 array 값 중 default 값으로 나옴
  * disabled: 비활성화된 형태
  * */
  type : "normal" | "selected" | "disabled"
  disableMsg?: string
  /*
  * 안에 내용
  * */
  array: {
    title: string
    status?: "active" | "inactive" | "default"
  }[]
  /*
  * icon 노출여부
  * */
  icon?: boolean
  /*
  * 추가 스타일 지정
  * */
  className?: string
  open: boolean
  onClick: () => void
  onChange: (idx: number) => void
}

function SelectBox (props: SelectBoxProps) {
  if (props.type === "disabled") return <DisabledSelectBox {...props} />
  else return <NormalSelectBox {...props} />
}

const NormalSelectBox: React.FC<SelectBoxProps> = ({ name, selectedIndex, array, icon, className, onChange, onClick, open, type }, key) => {

  const selectType = type

  const setValue = (e: any, index: number) => {
    onChange && onChange(index)
  }

  return (
    <>
      <div className="relative w-full" key={key}>
        <div
          className={clsx(
            'w-full border border-gray-04 rounded min-h-[35px] flex items-center px-2 py-2',
            { 'border-gray-07 rounded-b-none': open && selectType === 'normal' },
            { 'rounded-b-none border-b-0 bg-gray-01': open && selectType === 'selected' },
            className
          )}
          onClick={onClick}
        >
          {selectType === "selected" ? array.map((val) => {if (val.status === 'default') return val.title}) : selectedIndex !== undefined ? array[selectedIndex].title : name}
          {icon && <i className="xi-angle-down absolute justify-end right-2"></i>}
        </div>
        {open && (
          <div
            className={clsx(`max-h-[120px] rounded-b overflow-auto w-full absolute left-0 z-10 no-scrollbar`,
              {"bg-white border border-t-0": selectType === "normal"},
              {"bg-white border border-t-0 border-gray-04" : selectType === "selected"},
            )}
          >
            {array.map((value: any, index: number) => {
              if (value.status === 'inactive') {
                return (
                  <div key={index} className="w-full min-h-[30px] my-2 px-2 py-2 text-gray-06">
                    {value.title}
                  </div>
                )
              } else {
                return (
                  <div key={index} className="w-full min-h-[30px] my-2 px-2 py-2 hover:bg-gray-01" onClick={(e) => setValue(e, index)}>
                    {value.title}
                  </div>
                )
              }
            })}
          </div>
        )}
      </div>
    </>
  )
}

const DisabledSelectBox: React.FC<SelectBoxProps> = ({ name, icon, className, onClick, open,  disableMsg }) => {
  return (
    <>
      <div className="relative">
        <div
          className={`w-full border border-gray-04 mt-2 rounded min-h-[35px] flex items-center px-2 py-2 ${
            open && `border-gray-07 rounded-b-none`
          } ${className}`}
          onClick={onClick}
        >
          {name}
          {icon && <i className="xi-angle-down absolute justify-end right-2"></i>}
        </div>
        {open && (
          <div
            className={`max-h-[120px] rounded-b overflow-auto w-full absolute bg-gray-01 left-0 z-10 no-scrollbar border border-t-0`}
          >
            <div className="w-full min-h-[30px] my-2 px-2 py-2 text-gray-04" >
              {disableMsg}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default SelectBox
