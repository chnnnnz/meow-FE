import { ErrorMessage } from '@hookform/error-message'
import clsx from 'clsx'
import React, { useImperativeHandle } from 'react'
// import { get } from "react-hook-form"
import Input from '@components/common/input'

type InputProps = Omit<Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, 'placeholder'> & {
  label?: string
  errors?: Record<string, unknown>
  name: string
  topLabel?: string
  placeholder?: string
  span?: string
  button?: any
}

type CheckboxProps = {
  name: string
  errors?: Record<string, unknown>
  checked?: boolean
  onChange?: () => void
  label?: string
  span?: string
  required?: boolean
}

const LoginInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, span, button, type, name, label, errors, required, topLabel, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <div className="mt-1">
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          className={clsx(
            'block w-full h-11 px-4 mt-0 bg-ui-bg-field border border-gray-05 rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hove placeholder-gray-500 text-[13px]',
          )}
          {...props}
          ref={inputRef}
        />
      </div>
    )
  },
)
LoginInput.displayName = 'LoginInput'

const LoginCheckbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ name, checked, onChange, span, label, required, errors, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <div className="inline-block items-center space-x-1 mt-4 w-1/3">
        <input
          className="text-base-regular items-center gap-x-2"
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          {...props}
          ref={inputRef}
        />
        {span && (
          <span className="text-base-regular text-gray-08">
            {(required === true && '(필수) ') || (required === false && '(선택) ')} {span}
          </span>
        )}
        {label && <label htmlFor="checkbox">{label}</label>}
      </div>
    )
  },
)
LoginCheckbox.displayName = 'LoginCheckbox'
export default LoginInput
export { LoginCheckbox }
