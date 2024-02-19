'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useKakaoAuthenticateMutation } from '@/modules/gql/generated'

function KakaoCallback() {
  const code = useSearchParams().get('code')
  const router = useRouter()
  const [kakaoAuth, { data }] = useKakaoAuthenticateMutation({
    refetchQueries: ['activeCustomer'],
  })

  useEffect(() => {
    if (code && code !== '') {
      kakaoAuth({ variables: { code: code } })
    }
  }, [code])

  useEffect(() => {
    if (data) {
      router.push('/')
    }
  }, [data])

  return <div></div>
}

export default KakaoCallback
