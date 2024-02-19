import clsx from 'clsx'
import React, { useImperativeHandle } from 'react'
import Input from '@components/common/input'
import Timer from '@components/common/timer'

type InputProps = Omit<Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, 'placeholder'> & {
  label?: string
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
  placeholder?: string
  span?: string
  button?: any
  hidden?: boolean
  action?: (value: string) => void
  timer?: any
}

type CheckboxProps = {
  name: string
  checked?: boolean
  onChange?: () => void
  label?: string
  span?: string
  required?: boolean
}

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  contents?: string
}

const RegInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { placeholder, timer, action, span, button, type, name, label, touched, required, topLabel, hidden, ...props },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => inputRef.current!)
    const subButtonAction = () => {
      if (action) {
        action(inputRef.current!.value)
      }
    }

    const displayNone = hidden ? 'hidden' : ''

    return (
      <div className={`${displayNone} flex flex-col w-full mt-2`}>
        {topLabel && (
          <label className="mb-2 text-[11px] text-gray-500">
            {topLabel} {required && '*'}
          </label>
        )}
        <div className="flex relative z-0 w-full txt-compact-medium">
          <div className="relative w-full">
            {timer && timer.status && <Timer initialTime={180} type="registerTimer" action={timer.action} />}
            <Input
              type={type}
              name={name}
              placeholder={placeholder}
              className={clsx(
                'pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border border-gray-05 rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover placeholder-gray-500 text-[13px] disabled:bg-gray-02 disabled:text-gray-07',
                // {
                //   "border-rose-500 focus:border-rose-500": hasError,
                // }
              )}
              {...props}
              ref={inputRef}
            />
          </div>
          {button && (
            <button
              type="button"
              onClick={subButtonAction}
              disabled={button.disabled}
              className="w-1/3 ml-2 h-11 text-[11px] text-gray-01 bg-gray-09 hover:bg-gray-07 rounded disabled:bg-gray-04 disabled:text-gray-01"
            >
              {button.text}
            </button>
          )}
        </div>
        {span && <span className="mt-2 text-[11px] text-black">{span}</span>}
      </div>
    )
  },
)
// eslint-disable-next-line react/display-name
const CheckboxWithLabel = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ name, checked, onChange, span, label, required, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <div className="flex items-center space-x-2 mt-4">
        <input
          className="text-base-regular flex items-center gap-x-2"
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          {...props}
          ref={inputRef}
        />
        {span && (
          <span className="text-base-regular">
            {(required === true && '(필수) ') || (required === false && '(선택) ')} {span}
          </span>
        )}
        {label && <label htmlFor="checkbox">{label}</label>}
      </div>
    )
  },
)

CheckboxWithLabel.displayName = 'Checkbox'
export default RegInput
export { CheckboxWithLabel }
