import React from 'react'

export type ButtonProps = {
  /**
   * 버튼 스타일 종류
   * @default default
   */
  variant?: 'default' | 'primary' | 'white' | 'solid' | 'etc' | 'inline'
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

/**
 * 기본적으로 `w-full` 이고 960px에서 한 번 베리에이션 됩니다. 기타 사항은 사용시에 `className`으로 커스텀하여 사용
 */
function Button({ children, className, variant = 'default', disabled, onClick}: ButtonProps) {
  const bgColor = variant === 'primary' ? 'bg-green-04' 
    : variant === 'solid' ? 'bg-gray-02'
    : (variant === 'etc' || variant === 'white' || variant === 'inline') ? 'bg-white'
    : 'bg-gray-09'
  const disabledBgColor = variant === 'primary' ? 'disabled:bg-green-02' 
    : variant === 'default' ? 'disabled:bg-gray-02'
    : ''
  const textStyle = variant === 'inline' ? 'caption-sm laptop:title-M-17-150' : 'btn-text-lg laptop:title-sm'
  const textColor = variant === 'primary' ? 'text-white'
  : variant === 'white' ? 'text-gray-09'
  : variant === 'solid' ? 'text-gray-09'
  : variant === 'inline' ? 'text-gray-07 laptop:text-gray-09'
  : variant === 'etc' ? 'text-gray-06'
  : 'text-white'
  const disabledTextColor = variant === 'primary' ? 'disabled:text-green-05'
  : 'disabled:text-gray-03'
  const border = variant === 'white' ? 'border-[1px] border-bg-gray-09'
    : (variant === 'etc' || variant === 'inline') ? 'border-[1px] border-gray-02 laptop:border-gray-03'
    : ''
  const rounded = variant === 'inline' ? 'rounded-[2px] laptop:rounded-[4px]' : 'rounded-[4px]'
  const width = variant === 'inline' ? 'w-fit px-[8px] laptop:px-[10px]' : 'w-full'
  const height = variant === 'inline' ? 'h-fit py-[6px] laptop:py-[4px]' : 'h-[48px] laptop:h-[60px]'

  return (
    <button className={`${bgColor} ${disabledBgColor} ${textStyle} ${textColor} ${disabledTextColor} ${border} ${width} ${height} ${rounded} ${className}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
