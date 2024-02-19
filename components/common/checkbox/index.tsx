export type CheckBoxProps = {
  /**
   * 체크박스 label
   */
  label?: string
  onChange?: (checked: boolean) => void
  checked?: boolean
  /**
   * 체크박스 사이즈(ex. 22px)
   * @default 22px
   */
  boxSize?: string
  /**
   * 체크박스와 라벨 사이 간격(ex: 8px)
   * @default 4px
   */
  labalMarginLeft?: string
  /**
   * 체크박스 라벨 사이즈(ex: 17px)
   * @default 17px
   */
  labelTextSize?: string
  /**
   * 기타 라벨 스타일 in tailwindcss (ex: text-green-03)
   */
  labelClassName?: string
}

function CheckBox(props: CheckBoxProps) {
  return (
    <label className={`flex items-center cursor-pointer`}>
      <input
        type="checkbox"
        checked={props.checked}
        className="hidden peer"
        onChange={(e) => props.onChange?.(e.target.checked)}
      />
      <span className="hidden peer-checked:inline-block" style={{ height: props.boxSize ?? '22px' }}>
        <i className={`xi-check-square text-green-03`} style={{ fontSize: props.boxSize ?? '22px' }} />
      </span>
      <span className="inline-block peer-checked:hidden" style={{ height: props.boxSize ?? '22px' }}>
        <i className={`xi-checkbox-blank text-gray-03`} style={{ fontSize: props.boxSize ?? '22px' }} />
      </span>
      <span
        className={`ml-[8px] text-gray-07 ${props.labelClassName}`}
        style={{ marginLeft: props.labalMarginLeft ?? '4px', fontSize: props.labelTextSize ?? '17px' }}
      >
        {props.label}
      </span>
    </label>
  )
}

export default CheckBox
