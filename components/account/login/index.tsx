// @ts-nocheck
'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { resources } from '@config/resources'
import LoginInput, { LoginCheckbox } from './ui'
import Button from '@components/common/button'
import Accordion from 'components/common/accordion'
import Link from 'next/link'
import kakao from '@/public/icons/kakao_login_large_wide.png'
import Image from 'next/image'
import ConfirmModal from '@/components/common/modal/ConfirmModal'
import Script from 'next/script'
import useConfirmModal from '@/modules/hooks/confirmModal'
import { useLoginMutation } from '@/modules/gql/generated'
import md5 from 'blueimp-md5'
import { useApolloClient } from '@apollo/client'

const Login = () => {
  const [authError, setAuthError] = useState<any | undefined>(undefined)
  const [autoLogin, setAutoLogin] = useState<boolean>(false)
  const [marketing, setMarketing] = useState<boolean>(false)
  const [isOpen, confirmTitle, confirmContent, onPositive, openConfirm, closeConfirm] = useConfirmModal()
  const router = useRouter()
  const [login] = useLoginMutation()
  const client = useApolloClient()

  useEffect(() => {
    const marketingCheck: string | null = localStorage.getItem('marketing')
    if (marketingCheck) {
      setMarketing(true)
    }
  }, [marketing])

  const handleError = (e: any) => {
    console.log(e)
    setAuthError(e)
  }
  
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    let email = e.target.email.value
    let password = e.target.password.value

    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/

    if (email.trim() === '') {
      handleError({ name: 'email', message: '아이디를 입력해 주세요.' })
      openConfirm({ content: '아이디를 입력해 주세요.', onPositive: closeModals })
      return
    } else {
      if (!emailRegex.test(email)) {
        handleError({ name: 'email', message: '이메일 형식이 올바르지 않습니다.' })
        openConfirm({ content: '이메일 형식이 올바르지 않습니다.', onPositive: closeModals })
        return
      }
    }

    if (password.trim() === '') {
      handleError({ name: 'password', message: '비밀번호를 입력해 주세요.' })
      openConfirm({ content: '비밀번호를 입력해 주세요.', onPositive: closeModals })
      return
    } else {
      if (!passwordRegex.test(password)) {
        handleError({ name: 'password', message: '비밀번호 형식이 올바르지 않습니다.' })
        openConfirm({ content: '비밀번호 형식이 올바르지 않습니다.', onPositive: closeModals })
        return
      }
    }
    
    const res = await login({
      variables: {
        username: email,
        password: md5(password)
      }
    })
    if (res.data?.login?.__typename === 'CurrentUser') {
      client.refetchQueries({ include: ['activeCustomer'] })
      router.push('/')
    }
  }

  const closeModals = () => {
    if (marketing) {
      localStorage.removeItem('marketing')
      setMarketing(false)
    }

    closeConfirm()
  }

  const AutoLogin = () => {
    setAutoLogin(!autoLogin)
  }

  
  const onClickKakao = () => {
    if (!window.Kakao.isInitialized()) { 
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
    }
    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_AUTH_CALLBACK_URL,
    })
  }

  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
        integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
        crossOrigin='anonymous'
        onLoad={() => {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
          window.Kakao.isInitialized()
        }}
      />
      <Script
        src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js"
        onLoad={() => {
          // @ts-ignore
          const naverIdLogin = new naver_id_login(
            process.env.NEXT_PUBLIC_NAVER_JS_KEY,
            process.env.NEXT_PUBLIC_NAVER_AUTH_CALLBACK_URL,
          )
          naverIdLogin.init_naver_id_login()
        }}
      />
      {isOpen && (
        <ConfirmModal title={confirmTitle} content={confirmContent} onPositiveClick={onPositive} />
      )}
      <div className="w-full flex justify-center px-8 py-12">
        <div className="max-w-sm w-full flex flex-col items-center">
          <div className="border-b-2 border-b-black max-w-sm w-full text-center">
            <h1 className="text-large-semi uppercase mb-4 font">로그인</h1>
          </div>
          <p className="text-center text-base-regular text-gray-700 mt-4 mb-4">로그인 및 회원가입을 시작해 보세요!</p>
          <div onClick={onClickKakao}>
            <Image quality={100} width={366} height={90} src={kakao} alt="kakao" />
          </div>
          <div className="mt-6 flex w-full justify-between pl-6 pr-6">
            <div className="items-center text-center relative overflow-auto">
              <Image
                quality={100}
                src={resources.common + 'icon-login-benefit-01.svg'}
                alt=""
                width={30}
                height={30}
                style={{ display: 'inline-block' }}
              />
              <div className="items-center text-center text-[13px]">카카오 플친</div>
              <div className="items-center text-center text-[13px]">3,000원 쿠폰</div>
            </div>
            <div className="items-center text-center relative overflow-auto">
              <Image
                quality={100}
                src={resources.common + 'icon-login-benefit-02.svg'}
                alt=""
                width={30}
                height={30}
                style={{ display: 'inline-block' }}
              />
              <div className="items-center text-center text-[13px]">정기 구독시</div>
              <div className="items-center text-center text-[13px]">최대 50%적립</div>
            </div>
            <div className="items-center text-center relative overflow-auto">
              <Image
                quality={100}
                src={resources.common + 'icon-login-benefit-03.svg'}
                alt=""
                width={30}
                height={30}
                style={{ display: 'inline-block' }}
              />
              <div className="items-center text-center text-[13px]">친구 추천시</div>
              <div className="items-center text-center text-[13px]">2,000P 적립</div>
            </div>
          </div>
          <Accordion title="다른방법으로 로그인/가입하기" style='mt-[112px]' showIcon={true} iconStyle='ml-[2px]' childStyle=''>
            {/* TODO : icon 추가 및 회전기능 */}
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="flex flex-col w-full gap-y-2">
                <LoginInput
                  name="email"
                  label="Email"
                  autoComplete="email"
                  placeholder="아이디(이메일)를 입력해 주세요."
                />
                <LoginInput
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="비밀번호를 입력해 주세요."
                />
              </div>
              <div className="flex">
                <LoginCheckbox name="autoLogin" span="자동로그인" onChange={() => AutoLogin()} checked={autoLogin} />
                <div className="inline-block items-center ml-auto space-x-1 mt-4">
                  <Link
                    className="inline-block underline text-base-regular text-gray-08"
                    href="/account/forgot-password"
                  >
                    아이디찾기
                  </Link>
                  <span className="text-gray-08 text-[10px] items-center">|</span>
                  <Link
                    className="inline-block underline text-base-regular text-gray-08"
                    href="/account/forgot-password"
                  >
                    비밀번호 찾기
                  </Link>
                </div>
              </div>
              <Button type="submit" className='mt-[42px]'>
                로그인
              </Button>
              <Link href={'/account/register'}>
                <Button variant="white" className='mt-[12px]'>회원가입</Button>
              </Link>
              <div className="mt-5 flex justify-center items-center text-center">
                <div>
                  <span className="text-gray-03 text-small-regular">또는</span>
                  <div className="flex">
                    <div id="naver_id_login"></div>

                    <a
                      href={`${process.env.NEXT_PUBLIC_NAVER_AUTH_URL}?redirectTo=${process.env.NEXT_PUBLIC_STORE_URL}`}
                      className="ml-[20px]"
                    >
                      <Image src={resources.common + 'icon-sns-google.svg'} width={40} height={40} alt="googleLogin" />
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </Accordion>
        </div>
      </div>
    </>
  )
}

export default Login
