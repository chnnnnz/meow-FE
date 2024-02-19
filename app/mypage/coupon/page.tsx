'use client'
import Input from '@/components/common/input'
import ConfirmModal from '@/components/common/modal/ConfirmModal'
import Toast from '@/components/common/toast'
import { MyCouponsQuery, useMyCouponsQuery, useUseCouponMutation } from '@/modules/gql/generated'
import useConfirmModal from '@/modules/hooks/confirmModal'
import { useApolloClient } from '@apollo/client'
import { useState } from 'react'


function CounponListItem(props: MyCouponsQuery['myCoupons'][0]) {
  const [showToast, setShowToast] = useState(false)
  function onClickCopyCode() {
     window.navigator.clipboard.writeText(props.code) 
    setShowToast(true)
  }

  return (
    <>
    {showToast && <Toast message="쿠폰 번호가 복사되었습니다." onHidden={() => setShowToast(false)}/>}
    <li
      className={`w-full p-[12px] border-[1px] ${
        props.state === 'AVAILABLE' ? 'bg-white border-gray-03' : 'border-gray-02 bg-gray-01'
      } rounded-[4px]`}
    >
      <div className="flex justify-between">
        <span
          className={`title-md ${props.state === 'AVAILABLE' ? 'text-gray-09 ' : 'text-gray-04'} laptop:sub-head-B-24-130`}
        >
          {props.couponTemplate.value.toLocaleString()}P
        </span>
        <span
          className={`text-[12px] font-[600] leading-1 px-[4px] py-[2px] ${
            props.state === 'AVAILABLE'
              ? 'border-[1px] text-green-03 bg-green-01 border-green-02'
              : 'text-white bg-gray-03 border-0'
          } laptop:text-[14px] laptop:font-[500] laptop:px-[8px] laptop:py-[7px]`}
        >
          {props.state === 'AVAILABLE' ? '등록가능' : props.state === 'USED' ? '등록완료' : '기간만료'}
        </span>
      </div>
      <p
        className={`body-text-sm mt-[8px] mb-[2px] truncate laptop:title-SB-17-150 laptop:mt-[12px] laptop:mb-[18px] ${
          props.state === 'AVAILABLE' ? 'text-gray-08 laptop:text-gray-07' : 'text-gray-04'
        } laptop:sub-head-B-24-130`}
      >
        {props.couponTemplate.name}
      </p>
      <div className="caption-md laptop:flex justify-between items-center laptop:caption-Lg-14-100">
        <p className={`${props.state === 'AVAILABLE' ? 'text-gray-05' : 'text-gray-04'}`}>2023-09-18 ~ 2023-09-28</p>
        <p
          className={`flex justify-center items-center pt-[12px] border-t-[1px] border-gray-02 mt-[10px] laptop:m-0 laptop:p-0 laptop:border-0 ${
            props.state === 'AVAILABLE' ? 'text-gray-08' : 'text-gray-04'
          }`}
        >
          {props.code}
          <i className="xi-documents-o text-[16px] font-[400] leading-1 text-gray-04 p-[4px] cursor-pointer laptop:text-[17px]" onClick={onClickCopyCode}></i>
        </p>
      </div>
    </li>
    </>
  )
}

function MyPageCoupon() {
  const { data } = useMyCouponsQuery()
  const [isConfirmOpened, confirmTitle, confirmContent, onPositive, openConfirm, closeConfirm] = useConfirmModal()
  const coupons = data?.myCoupons ?? []
  const [code, setCode] = useState('')
  const [useCoupon] = useUseCouponMutation()
  const client = useApolloClient()
  
  async function onClickUseCoupon() {
    if (code.trim() === '') {
      openConfirm({ title: '쿠폰번호를 입력해 주세요.', onPositive: closeConfirm })
      return
    }

    const res = await useCoupon({ variables: { code } })
    if (res.data?.useCoupon?.__typename == 'UseCouponError') {
      openConfirm({ title: '쿠폰 사용 실패', content: res.data.useCoupon.message, onPositive: closeConfirm })
    } else {
      client.refetchQueries({ include: ['myCoupons'] })
      openConfirm({ title: '쿠폰이 등록되었습니다.', content: '마이페이지>포인트 내역에서\n지급 내용을 확인하실 수 있습니다.', onPositive: closeConfirm })
    }
  }

  return (
    <div>
      {isConfirmOpened && <ConfirmModal title={confirmTitle} content={confirmContent} onPositiveClick={onPositive} />}

      {/* 쿠폰 안내 */}
      <div className="px-[16px] py-[20px] border-b-[8px] border-gray-01 laptop:bg-gray-01 laptop:border-gray-02 laptop:px-[24px] laptop:pt-[29px] laptop:pb-[28px] laptop:border-b-0">
        <div className="mb-[20px]">
          <Input
            outerClassName="laptop:!block"
            label={{ text: '쿠폰 등록', className: 'laptop:!mt-0 laptop:!mb-[13px]' }}
            className="!h-[48px]"
            placeholder="쿠폰번호 (-포함한 번호 입력)"
            onChange={(e) => setCode(e.target.value)}
            button={{
              className: 'bg-gray-07 laptop:bg-gray-09 !h-[48px]',
              text: '등록하기',
              onClick: onClickUseCoupon,
              variant: 'default',
            }}
          ></Input>
        </div>

        <p className="caption-lg text-gray-07 mt-[16px] mb-[6px] laptop:mb-[8px] laptop:title-B-17-150">
          쿠폰 사용안내
        </p>
        <ul className="caption-sm text-gray-05 laptop:body-M-14-150 laptop:text-gray-06">
          <li className="relative pl-[10px] before:content-['•'] before:absolute before:left-0 before:top-0">
            등록 가능한 쿠폰을 별도로 '쿠폰 등록'을 진행해야 포인트 지급이 완료됩니다.​
          </li>
          <li className="relative pl-[10px] before:content-['•'] before:absolute before:left-0 before:top-0">
            쿠폰의 사용 가능 일자를 꼭 확인해 주세요.
          </li>
          <li className="relative pl-[10px] before:content-['•'] before:absolute before:left-0 before:top-0">
            포인트 적립 쿠폰 코드로 적립한 포인트는 ‘마이페이지&#62;포인트/쿠폰&#62;포인트 내역’에서 확인하실 수
            있습니다.
          </li>
        </ul>
      </div>

      {/* 쿠폰 내역 */}
      <div className="px-[16px] py-[20px] laptop:pt-[34px] desktop:px-0">
        <div className="flex justify-between text-gray-08 mb-[20px]">
          <span className="body-text-md laptop:sub-head-B-20-130 laptop:text-gray-07">쿠폰</span>
          <span className="caption-md laptop:body-SB-14-150">등록 가능한 쿠폰: {coupons.filter((coupon) => coupon.state === 'AVAILABLE').length}개</span>
        </div>

        {coupons.length > 0 && (
          <ul className="grid gap-[12px] laptop:grid-cols-2">
            {coupons.map((coupon) => (
              <CounponListItem key={coupon.code} {...coupon} />
            ))}
          </ul>
        )}
        {coupons.length === 0 && (
          <div className='w-full text-center mt-[20px] laptop:mt-[40px] body-text-sm laptop:title-M-17-150 text-gray-04 laptop:text-gray-05'>
            쿠폰 내역이 없습니다.
          </div>
        )}
      </div>

      {/* 토스트 팝업 */}
      <div className="hidden fixed left-[50%] bottom-[89.5px] translate-x-[-50%] body-text-md text-center px-[20px] py-[13px] text-white bg-gray-08/[0.9] rounded-[4px] laptop:min-w-[636px] laptop:sub-head-SB-20-150">
        쿠폰 번호가 복사되었습니다.
      </div>
    </div>
  )
}

export default MyPageCoupon
