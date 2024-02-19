'use client'

import Accordion from 'components/common/accordion'
import CheckBox from 'components/common/checkbox'
import Input from 'components/common/input'
import Button from '@/components/common/button'
import Container from '@/components/common/container'
import { useState } from 'react'
import { useActiveOrderQuery } from '@/modules/gql/generated'
import { useRecoilValue } from 'recoil'
import { checkoutGroupedOrderLineIdsState } from '@/store'
import useGroupedOrderLines, { GroupedOrderLine } from '@/modules/hooks/groupedOrderLine'
import Link from 'next/link'
import Script from 'next/script'
import SelectBox from '@/components/common/selectbox'
import useCustomer from '@/modules/hooks/customer'

/** 주문상품 목록 컴포넌트 - MO */
function ProductItemList(props: GroupedOrderLine) {
  const discountRate = Math.round(((props.totalOriginalPrice - props.totalSalesPrice) / props.totalOriginalPrice) * 100)
  return (
    <li className="flex py-[20px] border-b-[1px] border-gray-02 last:border-0 last:pb-0">
      <a className="w-[100%] max-w-[80px]" href="">
        <img className="w-[100%]" src={props.productThumbnail} alt="" />
      </a>
      <div className="w-full flex flex-col justify-between ml-[12px]">
        <div className="text-gray-09">
          <p className="caption-sm text-gray-07 mb-[2px] truncate">{props.brand}</p>
          <p className="body-text-md mb-[4px] line-clamp-2">{props.productName}</p>
        </div>
        <div className="flex justify-between items-end">
          <span className="caption-md text-gray-05">
            {/* 구독 - 상품 갯수 */}
            수량 1개
          </span>
          <div className="text-right">
            <p className="text-[13px] font-[500] leading-[18.2px] text-gray-04 line-through">
              {props.totalOriginalPrice.toLocaleString()}원
            </p>
            <p className="text-lg">
              <span className="text-green-04 mr-[4px]">{discountRate}%</span>
              <span className="text-gray-09">{props.totalSalesPrice.toLocaleString()}원</span>
            </p>
          </div>
        </div>
        {/* 스토어 - 상품 옵션 */}
        {/* <div>
                    <div className="body-text-sm text-gray-07 px-[8px] py-[5px] mt-[8px] bg-gray-01 rounded-[4px] truncate">옵션: 그린/80X65 / 1개</div>
                    <div className="body-text-sm text-gray-07 px-[8px] py-[5px] mt-[8px] bg-gray-01 rounded-[4px] truncate">옵션: 그린/80X65 / 1개</div>
                    <div className="body-text-sm text-gray-07 px-[8px] py-[5px] mt-[8px] bg-gray-01 rounded-[4px] truncate">옵션: 그린/80X65 / 1개</div>
                </div> */}
      </div>
    </li>
  )
}

/** 주문상품 목록 컴포넌트PC - 구독 */
function ProducListItemsSubsc() {
  return (
    <tr className="text-center">
      <td className="text-gray-09 py-[12px] first:pt-[16px] text-left">
        <div className="flex">
          <a className="w-[100%] max-w-[80px]" href="">
            <img className="w-[100%]" src="https://d1hp210v61lyyp.cloudfront.net/product/20230424100235_.jpg" alt="" />
          </a>
          <div className="w-full flex flex-col justify-between ml-[12px]">
            <div className="">
              <p className="caption-Lg-14-100 text-gray-08 mb-[2px] truncate">미우타임즈</p>
              <p className="title-SB-17-150 text-gray-09 mb-[8px] line-clamp-2">더 스탠다드 / 6kg</p>
            </div>
          </div>
        </div>
      </td>
      <td className="body-M-14-150 text-gray-09 py-[12px] first:pt-[16px]">1</td>
      <td className="title-SB-17-150 text-right py-[12px] first:pt-[16px]">
        <div className="whitespace-nowrap pl-[10%] pr-[15%]">
          <p className="body-M-14-150 text-gray-04 line-through mb-[4px]">17,000원</p>
          <p>
            <span className="text-green-04 mr-[11px]">20%</span>
            <span className="text-gray-09">11,900원</span>
          </p>
        </div>
      </td>
    </tr>
  )
}

/** 주문상품 목록 컴포넌트PC - 스토어 */
function ProductListItemsStore(props: GroupedOrderLine) {
  const discountRate = Math.round(((props.totalOriginalPrice - props.totalSalesPrice) / props.totalOriginalPrice) * 100)
  return (
    <tr className="text-center">
      <td className="text-gray-09 py-[12px] first:pt-[16px] text-left">
        <div className="flex">
          <Link className="w-[100%] max-w-[80px]" href={`/product/${props.productId}`}>
            <img className="w-[100%]" src="https://d1hp210v61lyyp.cloudfront.net/product/20230424100235_.jpg" alt="" />
          </Link>
          <div className="w-full flex flex-col justify-between ml-[12px]">
            <div className="">
              <p className="caption-Lg-14-100 text-gray-08 mb-[2px] truncate">{props.brand}</p>
              <p className="title-SB-17-150 text-gray-09 mb-[8px] line-clamp-2">{props.productName}</p>
            </div>
            {props.orderLines.map((orderLine) => {
              const priceDiff = orderLine.unitPriceWithTax / 100 - props.salesPrice
              return (
                <div className="body-M-14-150 text-gray-07 px-[8px] py-[5px] mt-[8px] bg-gray-01 rounded-[4px] truncate">
                  옵션: {orderLine.productVariant.name}
                  {priceDiff > 0 ? `(+${priceDiff.toLocaleString()})` : ''} / {orderLine.quantity}개
                </div>
              )
            })}
          </div>
        </div>
      </td>
      <td className="title-SB-17-150 text-right py-[12px] first:pt-[16px]">
        <div className="whitespace-nowrap pl-[10%] pr-[15%]">
          <p className="body-M-14-150 text-gray-04 line-through mb-[4px]">
            {props.totalOriginalPrice.toLocaleString()}원
          </p>
          <p>
            <span className="text-green-04 mr-[11px]">{discountRate}%</span>
            <span className="text-gray-09">{props.totalSalesPrice.toLocaleString()}원</span>
          </p>
        </div>
      </td>
    </tr>
  )
}

/** 약정 상품 확인 컴포넌트 */
type AgreementProductProps = {
  selectedType?: number
}
function AgreementProduct(props: AgreementProductProps) {
  return (
    <>
      <div className="relative flex justify-between items-center px-[13px] py-[12px] bg-gray-01 mt-[20px] rounded-[4px] laptop:mt-[60px] laptop:px-[20px]">
        <span className="body-text-md text-gray-08 mr-[20px] laptop:body-M-14-150 laptop:text-gray-06 laptop:absolute left-0 top-[-32px] laptop:body-SB-14-150">
          약정 유형
        </span>
        <span className="body-text-md text-green-04 laptop:depth-menu-M-16-150">{props.selectedType}회 약정</span>
      </div>

      <div className="mt-[20px] laptop:mt-[33px]">
        <p className="body-text-md text-gray-08 laptop:body-SB-14-150 laptop:text-gray-05">약정 혜택 상품</p>
        <div className="flex mt-[12px] p-[12px] border-[1px] border-gray-03 rounded-[4px] laptop:p-0 laptop:border-gray-02 overflow-hidden">
          <div className="min-w-[80px] max-w-[80px] tablet:max-w-[104px]">
            <img
              src="https://d1hp210v61lyyp.cloudfront.net/shop_goods_thum_452/78c0ef6298aeb2303b29d86419c380dd.png"
              alt=""
            />
          </div>
          <div className="relative w-full flex flex-col justify-between pl-[12px] laptop:px-[16px] laptop:py-[20px]">
            <div className="laptop:w-[80%]">
              <div className="body-text-md text-gray-09 truncate laptop:title-SB-17-150 laptop:text-gray-08">
                <p className="laptop:caption-M-13-130 laptop:mb-[4px]">{props.selectedType}회 약정 상품</p>
                [페스룸 웻 핏 트윈 테이블&보울] 증정
              </div>
              <p className="caption-sm text-gray-05 mt-[2px] laptop:caption-Lg-14-100 laptop:text-gray-07 laptop:mt-[12px]">
                약정 설명글이 출력되는 영역, 글자수는 예상 약 30자
              </p>
            </div>
            <div className="text-right laptop:absolute right-[24px] bottom-[20px]">
              <span className="body-text-md text-gray-04 line-through mr-[4px] laptop:title-M-17-150 laptop:mr-[12px]">
                17,900원
              </span>
              <span className="text-lg text-gray-09 mr-[4px] laptop:sub-head-B-20-130">0원</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
/** //약정 상품 확인 컴포넌트 */

type PayMethodProps = {
  inputName: string
  inputId: string
  text: string
  selected: boolean
  onClick: () => void
}

function PayMethod(props: PayMethodProps) {
  return (
    <label
      htmlFor={props.inputId}
      className={`flex justify-center items-center h-[48px] body-md p-[10px] border-[1px] ${
        props.selected ? 'text-green-03 border-green-05' : 'text-gray-06 border-gray-03'
      } rounded-[4px] cursor-pointer laptop:title-M-17-150`}
      onClick={(e) => props.onClick?.()}
    >
      <input type="radio" name={props.inputName} id={props.inputId} className="hidden" />
      {props.text}
    </label>
  )
}

const CheckOutRequests = [
  {title: '부재시 문 앞에 놓아주세요.', status: 'default'},
  {title: '배송 전에 미리 연락 바랍니다.'},
  {title: '부재 시 경비실에 맡겨주세요.'},
  {title: '빠른 배송 부탁드립니다.'},
  {title: '택배함에 보관해 주세요.'},
  {title: '직접 입력(50자 이내)'},
]
/** 주문서 작성 페이지 컴포넌트 */
function CheckOut() {
  const [selectPay, setSelectPay] = useState<number | undefined>()
  const [zoneCode, setZoneCode] = useState()
  const [address, setAddress] = useState()
  const [isOpenRequest, setOpenRequest] = useState(false)
  const [selectedRequestIdx, setSelectedRequestIdx] = useState(0)
  const checkoutGroupedOrderLineIds = useRecoilValue(checkoutGroupedOrderLineIdsState)
  console.log(`checkout ${checkoutGroupedOrderLineIds}`)
  const { data } = useActiveOrderQuery()
  const groupedOrderLines = useGroupedOrderLines().filter((groupedOrderLine) => checkoutGroupedOrderLineIds.includes(groupedOrderLine.productId))
  console.log(`filtered ${groupedOrderLines.map((groupedOrderLine) => groupedOrderLine.productId)}`)
  const totalSalesPrice = groupedOrderLines.reduce((acc, cur) => (acc += cur.totalSalesPrice), 0)
  const shippingPrice = (data?.activeOrder?.shippingLines?.[0]?.priceWithTax ?? 0) / 100
  const customer = useCustomer()
  return (
    <>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></Script>
      <Container className="px-[0] laptop:px-[16px] laptop:pt-[80px]">
        <div className="relative w-full laptop:flex laptop:items-start desktop:px-0">
          {/* PC 기준 왼쪽 레이아웃 */}
          <div className="w-full laptop:flex-1">
            <h3 className="hidden head-B-36-130 text-gray-09 pb-[28px] laptop:block">주문서</h3>

            <div className="laptop:border-t-[2px] laptop:pb-[32px] border-gray-07">
              <section className="py-[20px] border-gray-01 border-t-[8px] laptop:px-0 laptop:py-[32px] first:border-0">
                <Accordion
                  title="주문 상품"
                  btnStyle="flex items-center justify-between title-sm laptop:sub-head-B-20-130"
                  showIcon={true}
                  innerStyle="mt-[0rem]"
                  childStyle=""
                >
                  {/* MO */}
                  <ul className="laptop:hidden">
                    {groupedOrderLines.map((groupedOrderLine) => (
                      <ProductItemList {...groupedOrderLine} />
                    ))}
                  </ul>

                  {/* PC - 구독상품 */}
                  {/* <table className="hidden w-full mt-[20px] laptop:table">
                                        <thead className="h-[32px] body-M-14-150 text-center bg-gray-01 border-t-[1px] border-gray-02">
                                            <tr className="">
                                                <th className="w-[auto]">상품정보</th>
                                                <th className="w-[20%]">수량</th>
                                                <th className="w-[20%]">상품 금액</th>
                                            </tr>
                                        </thead>
                                        <tbody className="body-SB-14-150">
                                            <ProducListItemsSubsc/>
                                            <ProducListItemsSubsc/>
                                            <ProducListItemsSubsc/>
                                        </tbody>
                                    </table> */}

                  {/* PC - 스토어상품 */}
                  <table className="hidden w-full mt-[20px] laptop:table">
                    <thead className="h-[32px] body-M-14-150 text-center bg-gray-01 border-t-[1px] border-gray-02">
                      <tr className="">
                        <th className="w-[auto]">상품정보/옵션</th>
                        <th className="w-[30%]">상품 금액</th>
                      </tr>
                    </thead>

                    <tbody className="body-SB-14-150">
                      {groupedOrderLines.map((groupedOrderLine) => (
                        <ProductListItemsStore {...groupedOrderLine} />
                      ))}
                    </tbody>
                  </table>
                </Accordion>
              </section>

              {/* <section className="py-[20px] border-gray-01 border-t-[8px] laptop:px-0 laptop:py-[32px] first:border-0">
                <p className="title-sm laptop:sub-head-B-20-130">약정 정보</p>
                <AgreementProduct selectedType={3} />
              </section> */}

              <section className="py-[20px] border-gray-01 border-t-[8px] laptop:px-0 laptop:py-[32px] first:border-0">
                <Accordion
                  title="주문자 정보"
                  btnStyle="flex items-center justify-between title-sm laptop:sub-head-B-20-130"
                  showIcon={true}
                  innerStyle="mt-[0rem]"
                  childStyle=""
                >
                  <div className="pt-[20px]">
                    <dl className="flex mb-[12px] last:mb-0">
                      <dt className="w-[25%] max-w-[120px] body-text-sm text-gray-05 laptop:body-SB-14-150">주문자</dt>
                      <dd className="w-[75%] body-text-sm text-gray-09 laptop:title-M-17-150">{customer?.firstName}</dd>
                    </dl>
                    <dl className="flex mb-[12px] last:mb-0">
                      <dt className="w-[25%] max-w-[120px] body-text-sm text-gray-05 laptop:body-SB-14-150">
                        휴대폰 번호
                      </dt>
                      <dd className="w-[75%] body-text-sm text-gray-09 laptop:title-M-17-150">{customer?.phoneNumber}</dd>
                    </dl>
                    <dl className="flex mb-[12px] last:mb-0">
                      <dt className="w-[25%] max-w-[120px] body-text-sm text-gray-05 laptop:body-SB-14-150">이메일</dt>
                      <dd className="w-[75%] body-text-sm text-gray-09 laptop:title-M-17-150">{customer?.emailAddress}</dd>
                    </dl>
                  </div>
                </Accordion>
              </section>
            </div>

            <div className="laptop:border-t-[2px] laptop:pb-[32px] border-gray-07">
              <section className="py-[20px] border-gray-01 border-t-[8px] laptop:px-0 laptop:py-[32px] first:border-0">
                <div className="flex items-center justify-between">
                  <span className="title-sm laptop:sub-head-B-20-130">배송지 정보</span>
                  <div className="flex items-center gap-[8px] w-fit laptop:gap-[24px]">
                    <button type="button">
                      <CheckBox
                        label="주문자와 동일"
                        labelClassName="body-text-sm laptop:body-M-14-150"
                        onChange={function noRefCheck() {}}
                      />
                    </button>
                    <button type="button">
                      <CheckBox
                        label="최근 배송지"
                        labelClassName="body-text-sm laptop:body-M-14-150"
                        onChange={function noRefCheck() {}}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col w-full mt-[20px]">
                  <Input
                    name="name"
                    label={{ text: '수령인' }}
                    type="text"
                    placeholder="이름"
                    outerClassName="mb-[20px] laptop:mb-[32px]"
                  />
                  <Input
                    name="phoneNumber"
                    label={{ text: '휴대폰 번호' }}
                    type="tel"
                    placeholder="휴대폰 번호 (-제외한 번호 입력)"
                    outerClassName="mb-[20px] laptop:mb-[32px]"
                  />
                  <Input
                    name="address"
                    label={{ text: '주소' }}
                    type="text"
                    button={{
                      text: '우편번호 검색',
                      variant: 'solid',
                      className: '!h-[48px]',
                      onClick: () => {
                        //@ts-ignore
                        new daum.Postcode({
                          //@ts-ignore
                          oncomplete: function (data) {
                            setZoneCode(data.zonecode)
                            setAddress(data.roadAddress)
                          },
                        }).open()
                      },
                    }}
                    placeholder="우편번호"
                    outerClassName="mb-0 laptop:mb-[12px]"
                    value={zoneCode}
                  />
                  <Input
                    name="addressDefault"
                    label={{ text: '' }}
                    type="text"
                    placeholder="기본주소"
                    outerClassName="mb-0 laptop:mb-[12px]"
                    value={address}
                  />
                  <Input
                    name="addressDetail"
                    label={{ text: '' }}
                    type="text"
                    placeholder="상세주소"
                    outerClassName="mb-[20px] laptop:mb-[32px]"
                  />
                  <div>
                    <div className='flex items-center'>
                      <span className='body-text-md text-gray-08 mb-[8px] whitespace-nowrap min-w-[100px] laptop:body-SB-14-150 laptop:text-gray-05 laptop:mb-0'>배송 요청사항</span>
                      <SelectBox 
                        name='부재시 문 앞에 놓아주세요.'
                        type='selected'
                        array={CheckOutRequests.map((item, idx) => ({title: item.title, status: idx === selectedRequestIdx ? 'default' : undefined}))} 
                        selectedIndex={selectedRequestIdx}
                        open={isOpenRequest}
                        onClick={() => setOpenRequest(!isOpenRequest)} 
                        onChange={(idx) => {setSelectedRequestIdx(idx); setOpenRequest(false)}}
                        icon={true}
                        className='h-[48px] !border-gray-03'
                      />
                    </div>
                    <p className='flex caption-sm mt-[8px] text-gray-07 laptop:body-RG-14-170 laptop:mt-[12px] ml-[100px]'>
                      <span className='xi-info-o mt-[2px] mr-[4px] text-[14px] font-[400] laptop:mt-[5px]'></span>
                      공동 현관문 비밀번호가 있다면 ‘직접 입력’ 선택 후 꼭 입력해 주세요.​
                    </p>
                  </div>
                </div>
              </section>

              <section className="py-[20px] border-gray-01 border-t-[8px] laptop:px-0 laptop:py-[32px] first:border-0">
                <p className="title-sm laptop:sub-head-B-20-130">포인트</p>

                <div className="relative pt-[20px]">
                  <Input
                    name="usePoint"
                    label={{ text: '포인트' }}
                    type="number"
                    className="text-right desktop:max-w-[304px] desktop:text-left"
                    button={{ text: '최대 사용', onClick: () => {}, variant: 'default', className: '!bg-gray-07 !h-[48px]' }}
                    placeholder="0P"
                    infoText={{
                      icon: 'xi-info-o',
                      text: '포인트 사용 후 결제 시, 해당 상품을 환불하는 경우에는 해당 금액이 별도로 청구되거나 환불액에서 차감 후 지급될 수 있습니다.',
                    }}
                  />
                  <p className="caption-sm text-gray-09 absolute right-0 top-[16px] laptop:body-M-14-150 laptop:top-[-12px] desktop:left-[560px] desktop:top-[50px] desktop:translate-y-[-50%]">
                    보유 포인트: 5,000P
                  </p>
                </div>
              </section>

              <section className="py-[20px] border-gray-01 border-t-[8px] laptop:px-0 laptop:py-[32px] first:border-0">
                <p className="title-sm laptop:sub-head-B-20-130">결제 수단</p>
                <p className="hidden laptop:block body-SB-14-150 mt-[29px] mb-[13px] text-gray-05">결제 수단 선택</p>
                <div className="grid grid-cols-2 gap-[7px] mt-[20px]">
                  <PayMethod
                    inputName="payMethod"
                    inputId="naverPay"
                    text="네이버페이"
                    selected={selectPay === 0}
                    onClick={() => setSelectPay(0)}
                  />
                  <PayMethod
                    inputName="payMethod"
                    inputId="card"
                    text="신용/체크카드"
                    selected={selectPay === 1}
                    onClick={() => setSelectPay(1)}
                  />
                </div>
              </section>
            </div>
          </div>

          {/* PC 기준 오른쪽 레이아웃 */}
          <div className="border-t-[8px] border-gray-01 laptop:max-w-[356px] laptop:sticky laptop:mt-[73px] right-0 top-[150px] laptop:flex-0 laptop:basis-[32%] laptop:ml-[76px] tablet:border-0">
            <div className="rounded-[4px] tablet:border-[1px] tablet:border-gray-02 laptop:rounded-[4px] laptop:overflow-hidden">
              <section className="py-[20px] tablet:px-[20px] laptop:py-[32px] laptop:px-[24px] laptop:pt-[20px] laptop:pb-[24px] tablet:bg-gray-bg">
                <p className="title-sm text-gray-09 laptop:sub-head-B-20-130">결제 정보</p>

                <ul className="mt-[20px]">
                  <li className="flex justify-between items-center mb-[12px]">
                    <span className="body-text-sm text-gray-08 laptop:text-gray-06 laptop:body-M-14-150">
                      총 상품 금액
                    </span>
                    <span className="btn-text-lg text-gray-06 desktop:title-M-17-150">{totalSalesPrice.toLocaleString()}원</span>
                  </li>
                  {/* 정기구독 - 구독 헤택가 */}
                  {/* <li className='flex justify-between items-center mb-[12px]'>
                                        <span className='body-text-sm text-gray-08 laptop:text-gray-06 laptop:body-M-14-150'>구독 할인</span>
                                        <span className='btn-text-lg text-gray-09 desktop:title-M-17-150'>-12,000원</span>
                                    </li>
                                    <li className='flex justify-between items-center mb-[12px]'>
                                        <span className='body-text-sm text-gray-08 laptop:text-gray-06 laptop:body-M-14-150'>첫 구독 할인</span>
                                        <span className='btn-text-lg text-gray-09 desktop:title-M-17-150'>-11,900원</span>
                                    </li> */}
                  <li className="flex justify-between items-center mb-[12px]">
                    <div>
                      <span className="body-text-sm text-gray-08 laptop:text-gray-06 laptop:body-M-14-150">배송비</span>
                      {/* 스토어 - 배송비 텍스트 */}
                      {/* <p className='caption-md text-gray-05 laptop:inline-block laptop:text-gray-07 laptop:caption-M-12-150 laptop:ml-[4px]'>(5만원 이상 구매시 무료배송)</p> */}
                    </div>
                    <span className="btn-text-lg text-gray-06 laptop:title-M-17-150">
                      {shippingPrice.toLocaleString()}원
                    </span>
                  </li>
                  {/* 스토어 - 포인트 사용 */}
                  {/* <li className='flex justify-between items-center mb-[12px]'>
                                        <span className='body-text-sm text-gray-08 laptop:text-gray-06 laptop:body-M-14-150'>포인트 사용</span>
                                        <span className='btn-text-lg text-gray-09 laptop:title-M-17-150'>0P</span>
                                    </li> */}
                  <li className="flex justify-between items-center mb-[12px] last:mb-0 last:pt-[12px] last:border-t-[1px] border-gray-02">
                    <span className="body-text-sm text-gray-08 laptop:title-B-17-150 laptop:text-gray-09">
                      총 결제 금액
                    </span>
                    <span className="title-md text-green-04 laptop:sub-head-B-20-130">
                      {(totalSalesPrice + shippingPrice).toLocaleString()}원
                    </span>
                  </li>
                </ul>
              </section>
              <section className="py-[20px] tablet:px-[20px] border-t-[8px] border-gray-01 laptop:px-[24px] laptop:py-[32px] laptop:p-[20px] tablet:border-0">
                <CheckBox
                  label="주문 내용을 확인하였으며 약관 전체에 동의합니다."
                  labelClassName="body-text-sm laptop:body-M-14-150"
                  onChange={function noRefCheck() {}}
                />
                <div className="mt-[20px] tablet:ml-[30px] laptop:mt-[24px]">
                  <p className="body-text-sm text-gray-05 mb-[8px] laptop:mb-[18px]">
                    주문 상품정보에 동의{' '}
                    <button className="text-gray-07 ml-[8px] underline laptop:ml-[20px]">보기</button>
                  </p>
                  <p className="body-text-sm text-gray-05 mb-[8px]">
                    전자결제대행 이용 동의{' '}
                    <button className="text-gray-07 ml-[8px] underline laptop:ml-[20px]">보기</button>
                  </p>
                </div>
              </section>
            </div>

            <div className="fixed left-0 bottom-0 w-full px-[16px] py-[8px] bg-gray-01 border-t-[1px] border-gray-02 laptop:static laptop:p-0 laptop:bg-transparent laptop:mt-[24px]">
              <Button className="" variant="primary">
                {(totalSalesPrice + shippingPrice).toLocaleString()}원 결제하기
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
export default CheckOut
