'use client'

import RegInput, { CheckboxWithLabel } from './ui'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Button from '@components/common/button'
import Api from '@/modules/apis'
import md5 from 'blueimp-md5'
import useConfirmModal from '@/modules/hooks/confirmModal'
import ConfirmModal from '@/components/common/modal/ConfirmModal'
import { useCheckEmailExistLazyQuery, useRegisterCustomerMutation, useRequestPhoneAuthNumberMutation, useVerifyPhoneAuthNumberMutation } from '@/modules/gql/generated'

const validate = {
  idValidation: { valid: '', error: '', status: false },
  passwordValidation: { valid: '', error: '', status: false },
  passwordConfirmValidation: { valid: '', error: '', status: false },
  recommendValidation: { valid: '', error: '', status: false },
}

const inputs = {
  password: '',
  passwordConfirm: '',
  phone: '',
  phoneInput: false,
  code: '',
  codeHide: true,
  sendCodeBtn: true,
  sendCodeBtnText: '인증번호 전송',
  codeCheckBtn: true,
  idButton: true,
  recommendBtn: true,
  Timer: false,
}

const checkBox = {
  AllCheck: false,
  infoCheck: false,
  useCheck: false,
  marketingCheck: false,
}

const Register = () => {
  const [validation, setIdValidationMessage] = useState(validate)
  const { idValidation, passwordValidation, passwordConfirmValidation, recommendValidation } = validation
  const [input, setInput] = useState(inputs)
  const {
    password,
    phone,
    phoneInput,
    code,
    codeHide,
    sendCodeBtn,
    sendCodeBtnText,
    idButton,
    recommendBtn,
    codeCheckBtn,
    Timer,
  } = input
  const [checkBoxes, setCheckBoxes] = useState(checkBox)
  const { AllCheck, infoCheck, useCheck, marketingCheck } = checkBoxes
  const [isConfirmOpen, confirmTitle, confirmContent, onPositive, openConfirm, closeConfirm] = useConfirmModal();
  // const [modal, setModal] = useState({ open: false, title: '', contents: '' })
  const router = useRouter()
  const [requestPhoneAuthNumber] = useRequestPhoneAuthNumberMutation()
  const [verifyPhoneAuthNumber] = useVerifyPhoneAuthNumberMutation()
  const [registerCustomer] = useRegisterCustomerMutation({
    refetchQueries: ['activeCustomer'],
  })

  const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target
    switch (name) {
      case 'userID':
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
        if (value.trim() === '') {
          setIdValidationMessage({ ...validation, idValidation: { valid: '', error: '', status: false } })
          break
        }
        if (emailRegex.test(value)) {
          setIdValidationMessage({...validation, idValidation : { valid:"", error: '이메일 중복 확인을 해주세요', status: false} })
          setInput({ ...input, idButton: false })
        } else {
          setIdValidationMessage({
            ...validation,
            idValidation: { valid: '', error: '잘못된 이메일 형식입니다.', status: false },
          })
          setInput({ ...input, idButton: true })
        }
        break
      case 'password':
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/
        if (value === '') {
          setIdValidationMessage({ ...validation, passwordValidation: { valid: '', error: '', status: false } })
          break
        }
        if (passwordRegex.test(value)) {
          setIdValidationMessage({
            ...validation,
            passwordValidation: { valid: '사용 가능한 비밀번호입니다.', error: '', status: true },
          })
          setInput({ ...input, password: value })
        } else {
          if (value.length < 8) {
            setIdValidationMessage({
              ...validation,
              passwordValidation: { valid: '', error: '8자 이상으로 입력해 주세요.', status: false },
            })
          } else {
            setIdValidationMessage({
              ...validation,
              passwordValidation: {
                valid: '',
                error: '영문, 숫자, 특수문자를 모두 사용하여 입력해 주세요.',
                status: false,
              },
            })
          }
        }
        break
      case 'passwordConfirm':
        // password input ===  passwordConfirm input 이 같은지 확인
        if (value === '') {
          setIdValidationMessage({ ...validation, passwordConfirmValidation: { valid: '', error: '', status: false } })
          setInput({ ...input, passwordConfirm: 'null' })
          break
        }

        if (value === password) {
          setIdValidationMessage({
            ...validation,
            passwordConfirmValidation: { valid: '비밀번호 확인이 완료되었습니다.', error: '', status: true },
          })
          setInput({ ...input, passwordConfirm: value })
        } else {
          setIdValidationMessage({
            ...validation,
            passwordConfirmValidation: { valid: '', error: '비밀번호가 일치하지 않습니다.', status: false },
          })
        }
        break
      case 'phone':
        // 숫자만 입력 가능하게
        const ReplaceVal = value.replace(/[^0-9]/g, '')
        if (ReplaceVal.length === 11) {
          // 인증번호 전송 버튼 활성화
          setInput({ ...input, phone: ReplaceVal, sendCodeBtn: false })
        } else {
          // 인증번호 전송 버튼 비활성화
          setInput({ ...input, phone: ReplaceVal, sendCodeBtn: true })
        }
        break
      case 'code':
        // 인증번호 입력
        // TODO : 유효성 검사 로직 추가예정
        if (value.trim() === '') {
          setInput({ ...input, code: '', codeCheckBtn: true })
        } else {
          setInput({ ...input, code: value, codeCheckBtn: false })
        }
        break
      case 'recommend':
        // 추천인 코드번호 입력
        // TODO : 유효성 검사 로직 추가예정
        if (value.trim() === '') {
          setInput({ ...input, recommendBtn: true })
        } else {
          setInput({ ...input, recommendBtn: false })
        }
        break
      default:
    }
  }

  const checkbox = (type: string) => {
    // setInput({ ...input, agreeCheck: !agreeCheck })
    switch (type) {
      case 'all':
        if (AllCheck) {
          setCheckBoxes({
            ...checkBoxes,
            AllCheck: !AllCheck,
            useCheck: false,
            infoCheck: false,
            marketingCheck: false,
          })
        } else {
          setCheckBoxes({ ...checkBoxes, AllCheck: !AllCheck, useCheck: true, infoCheck: true, marketingCheck: true })
        }
        break
      case 'use':
        setCheckBoxes({ ...checkBoxes, useCheck: !useCheck })
        break
      case 'info':
        setCheckBoxes({ ...checkBoxes, infoCheck: !infoCheck })
        break
      case 'marketing':
        setCheckBoxes({ ...checkBoxes, marketingCheck: !marketingCheck })
        break
      default:
    }
  }

  const formValidation = (form: any) => {
    if (!validation.idValidation.status) {
      if (form.userID.trim() === '') {
        openConfirm({ title: '아이디를 입력해 주세요.', onPositive: closeConfirm })
        return false
      }
      openConfirm({ title: '아이디 중복체크를 진행해주세요.', onPositive: closeConfirm })
      return false
    }
    if (!validation.passwordValidation.status) {
      if (form.password.trim() === '') {
        openConfirm({ title: '비밀번호를 입력해 주세요.', onPositive: closeConfirm })
        return false
      }
      openConfirm({ title: '비밀번호는 영문, 숫자, 특수문자 조합, 8자 이상으로 입력해 주세요.', onPositive: closeConfirm })
      return false
    }
    if (!validation.passwordConfirmValidation.status) {
      if (form.passwordConfirm.trim() === '') {
        openConfirm({ title: '비밀번호 확인을 입력해 주세요.', onPositive: closeConfirm })
        return false
      }
      openConfirm({ title: '비밀번호가 일치하지 않습니다.', onPositive: closeConfirm })
      return false
    }
    if (form.name.trim() === '') {
      openConfirm({ title: '이름을 입력해 주세요.', onPositive: closeConfirm })
      return false
    }
    if (sendCodeBtnText !== '인증완료') {
      openConfirm({ title: '휴대폰 본인인증이 필요합니다.', onPositive: closeConfirm })
      return false
    }
    // TODO : 추천인 코드번호 유효성 검사
    if (form.recommend.trim() !== '') {
      if (!validation.recommendValidation.status) {
        openConfirm({ title: '존재하지 않는 코드번호입니다.', onPositive: closeConfirm })
        return false
      }
    }
    if (!form.use) {
      openConfirm({ title: '이용약관에 동의해 주세요.', onPositive: closeConfirm })
      return false
    }
    if (!form.info) {
      openConfirm({ title: '개인정보처리방침에 동의해 주세요.', onPositive: closeConfirm })
      return false
    }
    return true
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    let form = e.target
    let data = {
      userID: form.userID.value,
      password: form.password.value,
      passwordConfirm: form.passwordConfirm.value,
      name: form.name.value,
      phone: form.phone.value,
      code: form.code.value,
      recommend: form.recommend.value,
      use: form.use.checked,
      info: form.info.checked,
      marketing: form.marketing.checked,
    }
    let validationResult = formValidation(data)
    if (!validationResult) return
    
    const res = await registerCustomer({
      variables: {
        input: {
          name: data.name,
          emailAddress: data.userID,
          password: md5(data.password),
          marketingAgreement: data.marketing,
          phoneNumber: data.phone,
          authNumber: data.code, 
        }
      }
    })
    if (res.data?.meowtimesRegisterCustomerAccount?.__typename === 'Success' && res.data?.meowtimesRegisterCustomerAccount?.success) {
      router.push('/')
    } else if (res.data?.meowtimesRegisterCustomerAccount?.__typename === 'CustomerCreateError'){
      openConfirm({ title: res.data?.meowtimesRegisterCustomerAccount?.message, onPositive: closeConfirm })
    }
  }

  const [checkEmailExist] = useCheckEmailExistLazyQuery()
  const idCheck = async (email: string) => {
    const res = await checkEmailExist({ variables: { email } })
    if (res.data?.checkEmailExist?.success === true) {
      setIdValidationMessage({
        ...validation,
        idValidation: { valid: '사용 가능한 아이디입니다.', error: '', status: true },        
      })
      setInput({ ...input, idButton: true })
    } else {
      openConfirm({ title: '중복된 이메일 입니다.', content: '이미 가입된 이메일입니다.', onPositive: closeConfirm })
    }

  }

  
  const sendCode = async (phone: string) => {
    const res = await requestPhoneAuthNumber({ variables: { number: phone } })
    
    if (res.data?.generatePhoneAuthNumber?.success !== true) {
      openConfirm({ title: '인증번호 전송에 실패했습니다.', content: '다시 시도해 주세요.', onPositive: closeConfirm })
      return
    }
    if (Timer) {
      setInput({ ...input, Timer: false })
    }
    setInput({ ...input, codeHide: false, sendCodeBtnText: '재전송', Timer: true })
  }
  
  const checkCode = async (val: string) => {
    const res = await verifyPhoneAuthNumber({ variables: { number: phone, code: val } })
    if (res.data?.checkPhoneAuthNumber?.success === true) {
      setInput({
        ...input,
        codeHide: true,
        Timer: false,
        codeCheckBtn: false,
        sendCodeBtn: true,
        sendCodeBtnText: '인증완료',
        phoneInput: true,
      })
    } else {
      openConfirm({ title: '인증 번호가 틀렸습니다.', content: '다시 입력해 주세요.', onPositive: closeConfirm })
    }
  }

  const timeOut = () => {
    setInput({ ...input, Timer: false, codeCheckBtn: true })
    openConfirm({ title: '인증 가능 시간이 경과되었습니다.', content: '다시 입력해 주세요.', onPositive: closeConfirm })
  }

  const recommendCheck = async (val: string) => {
    const recommendCheckApi = await Api.recommendCheck(val)
    if (recommendCheckApi) {
      setIdValidationMessage({
        ...validation,
        recommendValidation: { valid: '사용 가능한 코드입니다.', error: '', status: true },
      })
    } else {
      setIdValidationMessage({
        ...validation,
        recommendValidation: { valid: '', error: '존재하지 않는 코드입니다.', status: false },
      })
    }
  }

  return (
    <>
      {isConfirmOpen && (
        <ConfirmModal title={confirmTitle} content={confirmContent} onPositiveClick={onPositive} />
      )}
      <div className="w-full flex justify-center px-8 py-12">
        <div className="max-w-sm w-96 flex flex-col items-center mt-12 ">
          <div className="border-b-2 border-b-black max-w-sm w-full">
            <h1 className="text-large-semi uppercase mb-3 text-center items-center text-black">회원가입</h1>
          </div>
          <div className="items-center max-w-sm w-full mt-4">
            <p className="text-left text-base-regular text-gray-700 mb-4">기본정보</p>
          </div>
          <form className="w-full flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-col w-full gap-y-2">
              <RegInput
                topLabel="아이디"
                placeholder="이메일을 입력해 주세요."
                name="userID"
                autoComplete="userID"
                required={true}
                onChange={(e) => validateInput(e)}
                span="로그인 아이디로 사용할 이메일을 입력해 주세요."
                button={{ disabled: idButton, text: '중복확인' }}
                action={(value) => idCheck(value)}
              />
              {validation.idValidation && (
                <span className={`text-[11px] ${validation.idValidation.status ? 'text-sys-green' : 'text-red-04'}`}>
                  {validation.idValidation.status ? validation.idValidation.valid : validation.idValidation.error}
                </span>
              )}
              <RegInput
                topLabel="비밀번호"
                placeholder="비밀번호를 입력해 주세요."
                name="password"
                type="password"
                autoComplete="new-password"
                required={true}
                onChange={(e) => validateInput(e)}
                span="영문, 숫자, 특수문자 조합 8자리 이상"
              />
              {validation.passwordValidation && (
                <span
                  className={`text-[11px] ${validation.passwordValidation.status ? 'text-sys-green' : 'text-red-04'}`}
                >
                  {validation.passwordValidation.status
                    ? validation.passwordValidation.valid
                    : validation.passwordValidation.error}
                </span>
              )}
              <RegInput
                topLabel="비밀번호 확인"
                placeholder="비밀번호를 한번 더 입력해 주세요."
                name="passwordConfirm"
                type="password"
                autoComplete="passwordConfirm"
                required={true}
                onChange={(e) => validateInput(e)}
              />
              {validation.passwordConfirmValidation && (
                <span
                  className={`text-[11px] ${
                    validation.passwordConfirmValidation.status ? 'text-sys-green' : 'text-red-04'
                  }`}
                >
                  {validation.passwordConfirmValidation.status
                    ? validation.passwordConfirmValidation.valid
                    : validation.passwordConfirmValidation.error}
                </span>
              )}
              <RegInput
                topLabel="이름"
                placeholder="이름을 입력해 주세요."
                name="name"
                autoComplete="Name"
                required={true}
              />
              <div className="justify-between">
                <RegInput
                  topLabel="휴대폰 인증"
                  placeholder="휴대폰 번호 (-제외)"
                  name="phone"
                  disabled={phoneInput}
                  required={true}
                  onChange={(e) => validateInput(e)}
                  value={phone}
                  button={{ disabled: sendCodeBtn, text: sendCodeBtnText }}
                  action={(value) => sendCode(value)}
                />
                <RegInput
                  hidden={codeHide}
                  placeholder="인증번호 입력"
                  name="code"
                  required={true}
                  onChange={(e) => validateInput(e)}
                  value={code}
                  button={{ disabled: codeCheckBtn, text: '인증번호 확인' }}
                  action={(value) => checkCode(value)}
                  timer={{ status: Timer, action: () => timeOut() }}
                />
              </div>
              <RegInput
                topLabel="(선택) 추천인 코드번호"
                placeholder="추천인 코드번호"
                name="recommend"
                onChange={(e) => validateInput(e)}
                button={{ disabled: recommendBtn, text: '확인' }}
                action={(value) => recommendCheck(value)}
              />
              {validation.recommendValidation && (
                <span
                  className={`text-[11px] ${validation.recommendValidation.status ? 'text-sys-green' : 'text-red-04'}`}
                >
                  {validation.recommendValidation.status
                    ? validation.recommendValidation.valid
                    : validation.recommendValidation.error}
                </span>
              )}
              <div className="mt-6">
                <span className="text-[15px]">이용약관 동의</span>
                <CheckboxWithLabel name="all" span="전체동의" checked={AllCheck} onChange={() => checkbox('all')} />
                <CheckboxWithLabel
                  span="이용약관에 동의합니다."
                  name="use"
                  checked={useCheck}
                  required={true}
                  onChange={() => checkbox('use')}
                />
                <CheckboxWithLabel
                  span="개인정보처리방침에 동의합니다."
                  name="info"
                  checked={infoCheck}
                  required={true}
                  onChange={() => checkbox('info')}
                />
                <CheckboxWithLabel
                  span="마케팅 수신에 동의합니다."
                  name="marketing"
                  checked={marketingCheck}
                  required={false}
                  onChange={() => checkbox('marketing')}
                />
              </div>
            </div>
            <Button type="submit" className='mt-[80px]'>
              가입하기
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
