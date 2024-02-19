export type TopBadgeProps = {
  /**
   * 뱃지 내용
   */
  text: string
  /**
   * 뱃지 배경 색상
   */
  bgColor: string
  className?: string
}

export function TopBadge(props: TopBadgeProps) {
  return (
    <div
      className={`px-[4px] py-[2px] laptop:px-[9px] laptop:py-[7px] caption-sm text-white ${props.className}`}
      style={{ backgroundColor: props.bgColor }}
    >
      {props.text}
    </div>
  )
}

export type BottomBadgeProps = {
  /**
   * 뱃지 내용
   */
  text: string
}
export function BottomBadge(props: BottomBadgeProps) {
  return <div className="px-[6px] py-[4px] laptop:px-[8px] laptop:py-[6px] bg-gray-02 rounded-full text-[12px] text-gray-07 mr-[4px]">
    {props.text}
  </div>
}