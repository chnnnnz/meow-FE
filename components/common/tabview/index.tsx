import { useState } from 'react'

export type TabViewProps = {
  /**
   * 탭 타이틀에 들어갈 내용
   */
  tabs: React.ReactNode[]
  /**
   * 초기에 활성화될 탭의 인덱스
   */
  initialActiveIndex: number
  /**
   * 비활성화된 탭의 텍스트 스타일
   */
  textStyle?: string
  /**
   * 활성화된 탭의 텍스트 스타일
   */
  activeTextStyle?: string
  /**
   * 그 외 탭 스타일
   */
  tabStyle?: string
  
  /**
   * 탭이 변경될 때 호출되는 콜백
   */
  onChangeTab?: (index: number) => void
}

function BorderedTabView(props: TabViewProps) {
  const [activeIndex, setActiveIndex] = useState(props.initialActiveIndex)
  const textStyle = props.textStyle ?? 'font-semibold text-gray-07'
  const activeTextStyle = props.activeTextStyle ?? 'font-bold text-gray-09'

  return (
    <div className="hidden w-full tablet:flex">
      {props.tabs.map((tab, index) => {
        const isActive = activeIndex === index
        const activeDistance = index - activeIndex
        const border = isActive
          ? 'border-[2px] border-gray-09 border-b-[0px]'
          : `border-t-[1px] ${
              activeDistance < 0 ? 'border-l-[1px]' : 'border-r-[1px]'
            } border-gray-03 border-b-[2px] border-b-gray-09`
        const text = isActive ? activeTextStyle : textStyle
        return (
          <div
            key={index}
            className={`flex text-[20px] w-[212px] h-[60px] items-center justify-center cursor-pointer ${border} ${text} ${props.tabStyle}`}
            onClick={() => {
              setActiveIndex(index)
              props.onChangeTab?.(index)
            }}
          >
            {tab}
          </div>
        )
      })}
      {/* border 용 더미 div */}
      <div className="border-b-[2px] border-gray-09 flex-grow"></div>
    </div>
  )
}

function UnderlinedTabView(props: TabViewProps) {
  const [activeIndex, setActiveIndex] = useState(props.initialActiveIndex)

  const textStyle = props.textStyle ?? 'text-gray-06'
  const activeTextStyle = props.activeTextStyle ?? 'text-gray-09'
  return (
    <div className="flex w-full">
      {props.tabs.map((tab, index) => {
        const isActive = activeIndex === index
        const border = isActive ? 'border-b-[2px] border-yellow-03' : 'border-b-[1px] border-gray-02'
        const text = isActive ? activeTextStyle : textStyle
        return (
          <div
            key={index}
            className={`flex flex-grow items-center justify-center text-[15px] h-[44px] font-bold cursor-pointer ${border} ${text} ${props.tabStyle}`}
            onClick={() => {
              setActiveIndex(index)
              props.onChangeTab?.(index)
            }}
          >
            {tab}
          </div>
        )
      })}
    </div>
  )
}

// 카테고리 탭메뉴
function DividerTabView(props: TabViewProps) {
  const [activeIndex, setActiveIndex] = useState(props.initialActiveIndex)

  const textStyle = props.textStyle ?? 'text-gray-04'
  const activeTextStyle = props.activeTextStyle ?? 'text-green-04'
  
  return (
    <div className="inline-flex divide-x-[2px] divide-gray-02">
      {props.tabs.map((tab, index) => {
        const isActive = activeIndex === index
        const text = isActive ? activeTextStyle : textStyle
        const isFirst = index === 0 && "pl-0"
        
        return (
          <div
            key={index}
            className={`${isFirst} px-[20px] flex flex-grow items-center justify-center sub-head-SB-24-130 leading-[1] cursor-pointer ${text} ${props.tabStyle}`}
            onClick={() => {
              setActiveIndex(index)
              props.onChangeTab?.(index)
            }}
          >
            {tab}
          </div>
        )
      })}
    </div>
  )
}

export {
  BorderedTabView,
  UnderlinedTabView,
  DividerTabView
}