import React, { useState, useRef, useEffect } from 'react'

export type AccordionProps = {
  title: string
  children: React.ReactNode
  style?: string
  btnStyle?: string
  iconStyle?: string
  innerStyle?: string
  txtStyle?: string
  showIcon?: boolean
  childStyle?: string
}

export type OpenAccordionProps = {
  title: string | React.ReactNode
  children: React.ReactNode
  setdefault?: boolean
  style?: string
  btnStyle?: string
  innerStyle?: string
  childStyle?: string
  showIcon?: boolean
  minHeigth?: number
}

const Accordion: React.FC<AccordionProps> = ({ title, children, style, btnStyle, innerStyle, showIcon, childStyle, iconStyle }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [contentHeight, setContentHeight] = useState<number | string>(0)
  const contentRef = useRef<HTMLDivElement>(null)

  let Style = style ?? 'items-center'
  let BtnStyle = btnStyle ?? 'text-center'
  let IconStyle = iconStyle ?? ''
  let InnerStyle = innerStyle ?? ''
  let ChildStyle = childStyle ?? 'border-t-2 border-gray-02'

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`w-full ${Style}`}>
      <button className={`w-full ${BtnStyle}`} onClick={toggleAccordion}>
        {title}
        {showIcon && <i className={`xi-angle-down ${IconStyle} ${isOpen ? 'rotate-180' : ''}`}></i>}
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: contentHeight }}
        className={`mt-4 overflow-hidden transition-max-h duration-300 ease-in-out ${InnerStyle}`}
      >
        <div className={`text-gray-700 ${ChildStyle}`}>{children}</div>
      </div>
    </div>
  )
}

const OpenAccordion: React.FC<OpenAccordionProps> = ({
  title,
  children,
  setdefault,
  minHeigth,
  style,
  btnStyle,
  innerStyle,
  childStyle,
  showIcon,
}) => {
  const [isOpen, setIsOpen] = useState(setdefault ?? false)
  const [contentHeight, setContentHeight] = useState<number | string | undefined>(isOpen ? minHeigth : 0)
  const contentRef = useRef<HTMLDivElement>(null)

  let Style = style ?? 'items-center'
  let BtnStyle = btnStyle ?? 'text-center'
  let InnerStyle = innerStyle ?? ''
  let ChildStyle = childStyle ?? 'border-t-2 border-gray-02'

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
    setContentHeight((prevHeight) => (prevHeight === 0 ? contentRef.current?.scrollHeight : 0))
  }

  return (
    <div className={`w-full ${Style}`}>
      <button className={`w-full text-[13px] ${BtnStyle}`} onClick={toggleAccordion}>
        {title}
        {showIcon && <i className="xi-angle-down"></i>}
      </button>
      <div
        ref={contentRef}
        className={`mt-4 overflow-hidden transition-height duration-300 ease-in-out ${
          isOpen ? 'h-auto' : 'h-0'
        } ${InnerStyle}`}
        style={{ height: contentHeight }}
      >
        <div className={`text-gray-700 ${isOpen ? `${ChildStyle}` : ''}`}>{children}</div>
      </div>
    </div>
  )
}

export default Accordion
export { OpenAccordion }