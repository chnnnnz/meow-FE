'use client'

import { useState } from 'react'

export type DropDownProps = {
  menus: {
    title: String
    onClick: () => void
  }[]
  /**
   * 메뉴 펼치기(현재 선택된 메뉴명) 버튼 스타일
   */
  buttonClassName?: string
  /**
   * 닫혔을 때 아이콘
   */
  downXeicon?: string
  /**
   * 열렸을 때 아이콘
   */
  upXeicon?: string
  /**
   * 리스트에서 선택된 메뉴 스타일
   */
  selectedMenuItemClassName?: string
  /**
   * 리스트 아이템 스타일
   */
  menuItemClassName?: string
  /**
   * 열렸을 때 최소 너비
   */
  minWidth?: string
  /**
   * 열렸을 때 패딩
   */
  padding?: string
  /**
   * 리스트 아이템 간격
   */
  menuItemGap?: string
  /**
   * 열렸을 때 정렬 위치. 펼치기 버튼 왼쪽에 맞출건지 오른쪽에 맞출건지
   */
  align?: 'left' | 'right'
  /**
   * 선택된 메뉴 인덱스
   */
  selectedIdx?: number
  /**
   * 열림여부
   */
  opened?: boolean
  /**
   * 버튼 클릭시
   */
  onClick?: () => void
}

function DropDown(props: DropDownProps) {
  const selectedIdx = props.selectedIdx ?? 0
  // const [selectedIdx, setSelectedIdx] = useState(props.initialSelectedIdx ?? 0)

  function selectMenu(idx: number) {
    // setSelectedIdx(idx)
    props.menus[idx].onClick()
  }

  return (
    <div className="relative">
      <div className={`cursor-pointer flex items-center ${props.buttonClassName}`} onClick={props.onClick}>
        {props.menus[selectedIdx].title}
        <i
          className={`${
            props.opened ? props.upXeicon ?? 'xi-caret-up-circle-o' : props.downXeicon ?? 'xi-caret-down-circle-o'
          } ml-[4px] text-[17px] text-gray-06`}
        ></i>
      </div>
      {props.opened && (
        <div
          className={`absolute ${
            props.align === 'right' ? 'right-0' : 'left-0'
          } z-[2] bg-white rounded-[4px] border-[1px] border-gray-02 mt-[12px]`}
          style={{
            padding: props.padding,
            minWidth: props.minWidth ?? '93px',
            width: 'max-content',
          }}
        >
          {props.menus.map((menu, index) => (
            <div
              className={`cursor-pointer ${
                selectedIdx === index ? props.selectedMenuItemClassName : props.menuItemClassName
              }`}
              style={{ marginTop: index > 0 ? props.menuItemGap : '0px' }}
              onClick={() => selectMenu(index)}
            >
              {menu.title}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropDown
