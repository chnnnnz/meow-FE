'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Script from 'next/script'
import { useNaverAuthenticateMutation } from '@/modules/gql/generated'

function NaverCallback() {
  const [token, setToken] = useState()
  const router = useRouter()

  const [mutateFunction, { data, loading, error }] = useNaverAuthenticateMutation({
    refetchQueries: ['activeCustomer'],
  })

  useEffect(() => {
    if (token && token !== '') {
      mutateFunction({ variables: { token: token } })
    }
  }, [token])

  useEffect(() => {
    if (data) {
      router.push('/')
    }
  }, [data])

  return (
    <>
      <Script
        src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js"
        onLoad={() => { //@ts-ignore
          const naverIdLogin = new naver_id_login(
            process.env.NEXT_PUBLIC_NAVER_JS_KEY,
            process.env.NEXT_PUBLIC_NAVER_AUTH_CALLBACK_URL,
          )
          setToken(naverIdLogin.oauthParams.access_token)
        }}
      />
    </>
  )
}

export default NaverCallback
