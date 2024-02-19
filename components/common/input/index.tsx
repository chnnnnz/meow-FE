import React from 'react'
import Button from '../button'

export type InputProps = {
  /**
   * 커스텀 스타일
   */
  outerClassName?: string // 인풋 부모 div
  label?: any // 인풋 타이틀
  button?: {
    text: string
    onClick: () => void
    variant: 'default' | 'primary' | 'white' | 'solid' | 'etc' | 'inline'
    className?: string
  } // 오른쪽 버튼 있는 인풋
  className?: string
  infoText?: any // 인풋 하단 설명글
} & React.InputHTMLAttributes<HTMLInputElement>

function Input(props: InputProps, ref: React.ForwardedRef<HTMLInputElement>) {
  return (
    <div>
      <div className={`laptop:flex w-full items-center ${props.outerClassName}`} >
        {props.label && <p className={`body-text-md text-gray-08 mb-[8px] whitespace-nowrap min-w-[100px] laptop:body-SB-14-150 laptop:text-gray-05 laptop:mb-0 ${props.label?.className}`}>{props.label?.text}</p>}
        
        <div className='w-full relative'>
          <div className='flex'>
            <input
              {...props}
              ref={ref}
              className={`w-full border-[1px] border-gray-03 focus:border-gray-07 invalid:border-red-01 rounded-[4px] p-[14px] laptop:px-[20px] laptop:py-[11px] body-sm laptop:text-lg laptop:title-M-17-150 placeholder:text-gray-04 laptop:placeholder:title-M-17-150 text-gray-09 disabled:bg-gray-01 ${props.className}`}
            />
            {props.button && (
              <Button variant={props.button.variant} className={`max-w-[99px] ml-[6px] caption-lg laptop:title-SB-17-150 laptop:max-w-[124px] laptop:ml-[12px] ${props.button.className}`} onClick={props.button?.onClick}>
                {props.button.text}
              </Button>
            )}
          </div>
        </div>
      </div>
      {props.infoText && (
          <p className='flex caption-sm mt-[8px] text-gray-07 laptop:body-RG-14-170 laptop:mt-[12px] ml-[100px]'>
            {props.infoText.icon &&
              <span className='xi-info-o mt-[2px] mr-[4px] text-[14px] font-[400] laptop:mt-[5px]'></span>
            }
            {props.infoText.text}
          </p>
        )
      }
    </div>
  )
}

export default React.forwardRef<HTMLInputElement, InputProps>(Input)
