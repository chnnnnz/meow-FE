export type TooltipProps = {
  /**
   * 툴팁 제목
   */
  title: string
  /**
   * 툴팁 내용
   */
  content: string
  /**
   * 툴팁 위치. (relative parent 기준)
   * @default 'center'
   */
  align?: 'left' | 'center' | 'right'
  /**
   * 닫기 버튼 클릭시 호출
   */
  onClose?: () => void
}
function Tooltip(props: TooltipProps) {
  const align = props.align ?? 'center'
  const alignStyle = align === 'left' ? 'left-0' 
  : align === 'right' ? 'right-0' 
  : 'left-1/2 -translate-x-1/2'

  return (
    <div className={`absolute ${alignStyle} bg-white border-[1px] border-gray-03 rounded-[4px] p-[14px] divide-y-[1px] w-[343px] divide-gray-02 laptop:shadow-[0_0_10px_0_rgba(23,25,28,0.20)]`}>
      <div className="flex place-content-between">
        <span className="body-text-md text-gray-09">{props.title}</span>
        <i className="xi-close text-gray-04 cursor-pointer" onClick={props.onClose}/>
      </div>
      <div className="text-left caption-md text-gray-06 mt-[10px] pt-[10px]">
        {props.content}
      </div>
    </div>
  )
}

export default Tooltip
