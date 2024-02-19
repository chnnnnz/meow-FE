'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@components/common/button'
import { DividerTabView } from '@components/common/tabview'

type subscType = 'used' | 'paused' | 'unused' // 구독중(used), 정지(paused), 미구독(unused)

type TitleComponentProps = {
  subscType: subscType
  subscProdTitle: string
  subscPausedStatus?: boolean // 구독정지 유무
  contractStatus?: boolean // 약정구독 유무
  contractCount?: number | null // 0인 경우 약정종료
}
const TitleComponent: React.FC<TitleComponentProps> = ({
  subscProdTitle,
  subscType,
  subscPausedStatus,
  contractStatus,
  contractCount,
}) => {
  return (
    <div className="px-[16px] laptop:px-[24px] py-[12px] flex items-center justify-between bg-yellow-01 border-t border-solid border-yellow-02">
      <div className="flex items-center">
        <p className="mr-[12px] text-[16px] font-[700] leading-tight laptop:sub-head-B-24-130">{subscProdTitle}</p>
        {contractStatus && (
          <div className="inline-flex flex-wrap">
            <p
              className={`py-[4px] laptop:py-[6px] px-[4px] laptop:px-[7px] text-[12px] leading-none laptop:leading-4 font-[600] laptop:body-M-14-150 text-green-03 border border-solid  overflow-hidden ${
                contractCount === 0 ? 'bg-gray-04 text-white border-gray-04' : 'border-green-03'
              }`}
            >
              {contractCount === 0 ? '약정 종료' : `${contractCount}회 약정`}
            </p>
          </div>
        )}
      </div>
      <p
        className={`caption-lg laptop:body-SB-14-150 ${
          subscPausedStatus ? 'laptop:text-gray-06 text-gray-07' : 'text-yellow-05'
        }`}
      >
        {subscType === 'used' ? '구독중' : subscType === 'paused' ? '구독 정지중' : ''}
      </p>
    </div>
  )
}

type TitleBtnProps = {
  subscType: subscType
  subName: string
  showChangeButton?: boolean
}
const TitleBtnComponent = (props: TitleBtnProps) => {
  function movePageFn(subscType: string, name: string) {
    switch (name) {
      case '구독 정보':
        if (subscType === 'used' || subscType === 'paused') {
          console.log('구독정보변경 페이지 이동')
          location.href = '/mypage/subscription/detail'
        } else {
          console.log('미구독:: 해당 카테고리의 구독 리스트 페이지 이동')
        }
        break
      case '구독 상품 관리':
        if (subscType === 'used') {
          console.log('구독중:: 해당 구독 상품의 카테고리의 구독 리스트 페이지 이동')
        }
        break
      default:
        break
    }
  }

  function getButtonText(subscType: string, name: string) {
    switch (name) {
      case '구독 정보':
        return subscType === 'used' || subscType === 'paused' ? '구독 정보 변경' : '구독하러 가기'
      case '구독 상품 관리':
        return subscType === 'used' ? '구독 상품 추가' : ''
      default:
        return ''
    }
  }

  return (
    <div className="py-[8px] laptop:py-[12px] flex items-center justify-between">
      <p className="text-gray-08 btn-text-lg laptop:sub-head-SB-20-150 laptop:text-gray-08 leading-[1.3]">
        {props.subName}
      </p>
      {!props.showChangeButton && (
        <Button
          variant="inline"
          onClick={() => movePageFn(props.subscType, props.subName)}
          className={`laptop:px-[20px] ${
            props.subscType === 'unused'
              ? '!bg-gray-07 !border-gray-07 !text-white'
              : props.subscType === 'paused' && props.subName === '구독 상품 관리'
                ? 'hidden'
                : ''
          }`}
        >
          {getButtonText(props.subscType, props.subName)}
        </Button>
      )}
    </div>
  )
}

type InfoListComponentProps = {
  subscType: subscType
  subscPausedStatus?: boolean
  subscCycles: number
  paymentCycle: number | null
  currentPaymentDate: string
  totalSubscQuantity: number
  totalSubscAmount: string
  showChangeButton?: boolean
  changeCycle?: () => void
  changePaymentDate?: () => void
}
const InfoListComponent: React.FC<InfoListComponentProps> = ({
  subscType,
  subscPausedStatus,
  subscCycles,
  paymentCycle,
  currentPaymentDate,
  totalSubscQuantity,
  totalSubscAmount,
  showChangeButton,
  changeCycle,
  changePaymentDate,
}) => {
  if (subscType === 'unused') {
    return (
      <li className="flex justify-center py-[40px] laptop:py-[60px]">
        <p className="body-text-sm text-gray-04 laptop:title-M-17-150 laptop:text-gray-05">구독중인 상품이 없습니다.</p>
      </li>
    )
  }

  return (
    <>
      <ul className="divide-y-[1px] divide-gray-02">
        <li className="flex items-center py-[12px] laptop:py-[16px]">
          <p className="basis-auto w-[100px] body-text-sm laptop:body-SB-14-150 text-gray-05">구독회차</p>
          <p className="body-text-sm laptop:title-M-17-150 text-gray-09">{subscCycles}회차</p>
        </li>
        <li className="flex items-center py-[12px] laptop:py-[16px]">
          <p className="shrink-0 basis-auto w-[100px] body-text-sm laptop:body-SB-14-150 text-gray-05">결제주기</p>
          <div className="relative flex items-center w-full">
            {subscPausedStatus ? (
              <p className="body-text-md text-gray-06 laptop:title-M-17-150">구독 정지 중</p>
            ) : (
              <>
                <p className="body-text-sm laptop:title-M-17-150 text-gray-09">
                  {paymentCycle}주마다 결제 후 <span className="text-gray-06">배송받기</span>
                </p>
                {showChangeButton && (
                  <button
                    onClick={changeCycle}
                    className="absolute right-0 underline caption-M-13-130 text-gray-07 laptop:text-gray-08 laptop:title-M-17-150"
                  >
                    주기변경
                  </button>
                )}
              </>
            )}
          </div>
        </li>
        <li className="flex items-center py-[12px] laptop:py-[16px]">
          <p className="shrink-0 basis-auto w-[100px] body-text-sm laptop:body-SB-14-150 text-gray-05">이번 결제일</p>
          <div className="relative flex w-full">
            {subscPausedStatus ? (
              <p className="body-text-md text-gray-06 laptop:title-M-17-150">구독 정지 중</p>
            ) : (
              <>
                <p className="body-text-sm laptop:title-M-17-150 text-gray-09">{currentPaymentDate}</p>
                {showChangeButton && (
                  <button
                    onClick={changePaymentDate}
                    className="absolute right-0 top-[50%] translate-y-[-50%] underline caption-M-13-130 text-gray-07 laptop:text-gray-08 laptop:title-M-17-150"
                  >
                    결제일변경
                  </button>
                )}
              </>
            )}
          </div>
        </li>
        <li className="flex items-center py-[12px] laptop:py-[16px]">
          <p className="basis-auto w-[100px] body-text-sm laptop:body-SB-14-150 text-gray-05">구독 총 수량</p>
          <p className="body-text-sm laptop:title-M-17-150 text-gray-09">{totalSubscQuantity}개</p>
        </li>
        <li className="flex items-center py-[12px] laptop:py-[16px]">
          <p className="basis-auto w-[100px] body-text-sm laptop:body-SB-14-150 text-gray-05">총 결제 금액</p>
          <p className="flex items-center body-text-sm laptop:title-M-17-150 text-gray-09">
            {totalSubscAmount} <span className="ml-[8px] caption-sm text-gray-04">(배송비 3,000원 포함)</span>
          </p>
        </li>
      </ul>
    </>
  )
}

type ProductItemProps = {
  prodItems: {
    brand: string
    productName: string
    optionName: string
    count: number
    price: string
  }
  index: number
}
const ProductItem: React.FC<ProductItemProps> = ({ prodItems, index }) => {
  return (
    <li
      key={index}
      className={`${
        index === 0 ? 'pt-[12px] laptop:pt-[16px]' : ''
      } laptop:border-none py-[20px] laptop:py-[12px] flex flex-nowrap laptop:flex-wrap`}
    >
      <Link className="relative mr-[12px] shrink-0 w-[80px] h-[80px] bg-gray-01" href="#">
        <Image
          className="w-full"
          src="https://d39h0xn1r3o9zb.cloudfront.net/dev/product/img-subsc-thumb-01.png"
          alt=""
          layout="fill"
        />
      </Link>
      <div className="relative flex flex-col justify-between w-[calc(100%-92px)] laptop:flex-row laptop:justify-start">
        <div className="pr-[36px] laptop:pr-0 laptop:shrink-0 laptop:self-start laptop:w-[38%]">
          <p className="truncate text-gray-07 caption-sm laptop:caption-Lg-14-100 laptop:text-gray-08">
            {prodItems.brand}
          </p>
          <p className="line-clamp-2 text-gray-09 body-text-md laptop:text-gray-08 laptop:title-SB-17-150 laptop:mt-[4px]">
            {prodItems.productName} / {prodItems.price}
          </p>
        </div>
        <div className="flex items-end justify-between whitespace-nowrap laptop:w-[52%] laptop:items-center laptop:text-center laptop:justify-start">
          <div className="text-gray-05 caption-md laptop:w-[85%]">
            <p className="hidden text-center laptop:block Body-M-14-150 text-gray-09">{prodItems.count}</p>
            <p className="block laptop:hidden">수량 {prodItems.count}개</p>
          </div>
          <p className="text-lg text-right break-all whitespace-normal text-gray-09 laptop:w-full laptop:title-SB-17-150 laptop:text-center">
            {prodItems.price}
          </p>
        </div>
        <div className="absolute top-0 right-0 text-center laptop:static laptop:w-[12%] laptop:self-center">
          <Link className="inline-block laptop:p-[8px]" href="#">
            <i className="xi-border-color text-[18px] text-gray-03 laptop:text-[17px] laptop:text-gray-04"></i>
          </Link>
        </div>
      </div>
    </li>
  )
}

function SubscriptionUIComponent() {
  let userArr: any = [
    {
      subscProdTitle: '벤토나이트',
      subscPausedStatus: false,
      subscType: 'used',
      subscCycles: 3,
      paymentCycle: 6,
      currentPaymentDate: '24년 01월 01일',
      totalSubscQuantity: 3,
      totalSubscAmount: '39,700원',
      contractStatus: false,
      contractCount: 1,
      prodArr: [
        {
          brand: '미우타임즈',
          productName: '더 스탠다드',
          optionName: '6kg',
          count: '1',
          price: '9,900원',
        },
        {
          brand: '미우타임즈',
          productName: '더 프라임',
          optionName: '6kg',
          count: '1',
          price: '14,900원',
        },
        {
          brand: '미우타임즈',
          productName: '더 에센셜',
          optionName: '6kg',
          count: '1',
          price: '9,900원',
        },
      ],
    },
    {
      subscProdTitle: '카사바',
      subscPausedStatus: true,
      subscType: 'paused',
      subscCycles: 3,
      paymentCycle: 6,
      currentPaymentDate: '24년 01월 01일',
      totalSubscQuantity: 3,
      totalSubscAmount: '39,700원',
      contractStatus: false,
      contractCount: 0,
      prodArr: [
        {
          brand: '미우타임즈',
          productName: '더 스탠다드',
          optionName: '6kg',
          count: '1',
          price: '9,900원',
        },
        {
          brand: '미우타임즈',
          productName: '더 프라임',
          optionName: '6kg',
          count: '1',
          price: '14,900원',
        },
        {
          brand: '미우타임즈',
          productName: '더 에센셜',
          optionName: '6kg',
          count: '1',
          price: '9,900원',
        },
      ],
    },
    {
      subscProdTitle: '두부',
      subscPausedStatus: false,
      subscType: 'unused',
      subscCycles: 3,
      paymentCycle: 6,
      currentPaymentDate: '24년 01월 01일',
      totalSubscQuantity: 3,
      totalSubscAmount: '39,700원',
      contractStatus: false,
      contractCount: 0,
      prodArr: [
        {
          brand: '미우타임즈',
          productName: '더 스탠다드',
          optionName: '6kg',
          count: '1',
          price: '9,900원',
        },
        {
          brand: '미우타임즈',
          productName: '더 프라임',
          optionName: '6kg',
          count: '1',
          price: '14,900원',
        },
        {
          brand: '미우타임즈',
          productName: '더 에센셜',
          optionName: '6kg',
          count: '1',
          price: '9,900원',
        },
      ],
    },
  ]

  return (
    <>
      <p className="hidden desktop:block mb-[24px] sub-head-SB-24-130 text-gray-09">구독관리</p>
      <DividerTabView tabs={["전체", "벤토나이트", "카사바", "두부"]} initialActiveIndex={0} onChangeTab={(idx) => {}} />

      {userArr.map((item: any, index: number) => {
        return (
          <div key={index} className={index === 0 ? 'mt-0' : 'mt-[20px] laptop:mt-[100px]'}>
            <TitleComponent
              subscType={item.subscType}
              subscPausedStatus={item.subscPausedStatus}
              subscProdTitle={item.subscProdTitle}
              contractStatus={item.contractStatus}
              contractCount={item.contractStatus ? item.contractCount : null}
            />
            <div className="px-[16px] laptop:px-[20px]">
              <TitleBtnComponent subName="구독 정보" subscType={item.subscType} />
              <InfoListComponent
                subscType={item.subscType}
                subscPausedStatus={item.subscPausedStatus}
                subscCycles={item.subscCycles}
                paymentCycle={item.paymentCycle}
                currentPaymentDate={item.currentPaymentDate}
                totalSubscQuantity={item.totalSubscQuantity}
                totalSubscAmount={item.totalSubscAmount}
              />
              <div className={`${item.subscType !== 'unused' ? 'block' : 'hidden'}`}>
                <TitleBtnComponent subName="구독 상품 관리" subscType={item.subscType} />
                <div className="hidden laptop:flex py-[6px] body-M-14-150 text-gray-08 items-center text-center bg-gray-01">
                  <p className="w-[45%]">상품정보</p>
                  <p className="w-[22%]">수량</p>
                  <p className="w-[25%]">상품 금액</p>
                  <p className="w-[11%]">상품 관리</p>
                </div>
                <ul className="divide-y-[1px] divide-gray-02">
                  {item.prodArr.map((prodItem: any, prodIndex: number) => {
                    return <ProductItem prodItems={prodItem} index={prodIndex} key={prodIndex} />
                  })}
                </ul>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default SubscriptionUIComponent
export { TitleComponent, TitleBtnComponent, InfoListComponent }
