import React, { useRef } from 'react'
import { OpenAccordion } from '@components/common/accordion'
import { useRecoilState } from 'recoil'
import { counterState } from '@/store'
import Image from 'next/image'
import Count from '@components/common/count'
import Button from '@components/common/button'
import { UnderlinedTabView } from '@components/common/tabview'

export type SubscriptionDetailProps = {
  product_index: number
  product_images: string[]
  product_badge: string[]
  product_brand: string
  product_name: string
  product_subname: string // pc 버전만 출력
  product_description: string // pc 버전만 출력
  product_tag: string[]
  product_cost_price: number
  product_sales_price: number
  product_quantity: number
  product_subscription_price: number
  product_weight: number
  product_detail: string // html
  is_promotion: string
  is_like: boolean
  is_like_count: string
  review_count: string
  review_score: number
  flag_subscription: string // 구독중, 구독 정지중, 미구독
  product_subscription_discount_section: number[] // 구독 할인 구간
  product_subscription_price_list: number[] // 1회차, 3회차, 6회차 구독 금액
  product_subscription_reserve_rate: number[] // 1회차, 3회차, 6회차 적립률(%)
  category_precaution: string // html
  category_exchange_guide: string // html
}

type TotalPriceProps = {
  product_sales_price: number
  product_subscription_price_list: number[]
  productCount: number
  Row?: boolean
}

type CartAndOrderProps = {
  Cart: () => void
  Order: () => void
}

type OrderBtnProps = {
  flag_subscription: string
  Order: () => void
}

const ProductDetailComponent = () => {
  return (
    <div className="w-full">
      <div className="items-center justify-center w-full flex py-5">
        <Image
          src={'https://d39h0xn1r3o9zb.cloudfront.net/dev/product/img-subsc-tab-detail-01.jpg'}
          alt={''}
          width={840}
          height={2000}
        />
      </div>
    </div>
  )
}

const DetailTabViewComponent = () => {
  return (
    <UnderlinedTabView
      tabs={['상세정보', '리뷰', '반품/교환 안내']}
      initialActiveIndex={0}
      onChangeTab={(index) => {}}
    />
  )
}

const DeliveryPriceComponent = (props: SubscriptionDetailProps) => {
  return (
    <>
      <div className="hidden laptop:flex justify-items-center my-2">
        <div className="flex-none w-1/4">
          <span className="text-[15px] mx-2">일반 구매가</span>
        </div>
        <div className="text-[15px] mx-4">
          <span className="font-medium mr-2">{props.product_sales_price.toLocaleString()}원</span>{' '}
          <span className="text-gray-04 text-[12px]">
            1kg당 {Math.floor(props.product_sales_price / props.product_weight).toLocaleString()}원
          </span>
        </div>
      </div>

      {/* 배송비 섹션 */}
      <div className="flex justify-items-center my-2">
        <div className="flex-none w-1/4">
          <span className="text-[15px] mx-2">배송비</span>
        </div>
        <div className="text-[15px] mx-4">
          <span className="font-medium mr-2">3,000원</span>{' '}
          <span className="text-gray-07 text-[12px]">(수량에 관계없이)</span>
        </div>
      </div>
    </>
  )
}

const MobilePriceInfoComponent = (props: SubscriptionDetailProps) => {
  return (
    <>
      <div className="flex items-center my-2">
        <span className="text-[15px] mx-2">일반 구매가</span>
        <div className="mx-1.5 ml-4">
          <div className="my-1 text-gray-04 text-[12px]">
            1kg당 {Math.floor(props.product_sales_price / props.product_weight).toLocaleString()}원
          </div>
          <div className="my-1 text-xl font-medium">{props.product_sales_price.toLocaleString()}원</div>
        </div>
      </div>
      <div className="flex items-center my-2">
        <span className="text-[15px] mx-2">구독 해택가</span>
        <div className="mx-1.5 ml-4">
          <div className="my-1 text-gray-04 text-[12px]">
            1kg당 {Math.floor(props.product_subscription_price_list[0] / props.product_weight).toLocaleString()}원
          </div>
          <div className="my-1 text-2xl text-green-04 font-semibold">
            {props.product_subscription_price_list[0].toLocaleString()} ~{' '}
            {props.product_subscription_price_list.slice(-1).toLocaleString()}원
          </div>
        </div>
      </div>
    </>
  )
}

const CountComponent = () => {
  const [productCount, setProductCount] = useRecoilState(counterState)
  const Countdown = () => {
    if (productCount > 1) {
      setProductCount(productCount - 1)
    }
  }
  const Countup = () => {
    setProductCount(productCount + 1)
  }
  return <Count onClickDown={Countdown} onClickUp={Countup} count={productCount} />
}

const OrderBtnComponent = (props: OrderBtnProps) => {
  return (
    <>
      {(props.flag_subscription === '구독중' && (
        <Button onClick={props.Order} variant="default" className="mt-2 w-full">
          <i className="xi-check-min px-2"></i>구독중
        </Button>
      )) ||
        (props.flag_subscription === '미구독' && (
          <Button onClick={props.Order} variant="default" className="mt-2 w-full">
            <i className="xi-won px-2"></i>구독 결제하기
          </Button>
        )) ||
        (props.flag_subscription === '구독중지' && (
          <Button onClick={props.Order} variant="default" className="mt-2 w-full">
            <i className="xi-refresh px-2"></i>구독 이어하기
          </Button>
        ))}
    </>
  )
}

const CartAndOrderComponent = (props: CartAndOrderProps) => {
  return (
    <div className="flex">
      <Button onClick={props.Cart} variant="white" className="mr-1">
        장바구니 담기
      </Button>
      <Button onClick={props.Order} variant="white" className="ml-1">
        일반 결제하기
      </Button>
    </div>
  )
}

const TotalPriceComponent = (props: TotalPriceProps) => {
  return <>{(props.Row && <TotalPriceRowComponent {...props} />) || <TotalPriceColumnComponent {...props} />}</>
}

const TotalPriceColumnComponent = (props: TotalPriceProps) => {
  return (
    <div className="w-full">
      <div className="text-left items-center">총 상품 금액</div>
      <div className="flex w-full pr-6 pl-2 my-4">
        <div className={`items-center text-start w-1/2 text-[14px] font-medium`}>일반 결제 시</div>
        <div className={`justify-end text-end w-1/2 text-[14px] font-medium`}>
          {(props.product_sales_price * props.productCount).toLocaleString()}원
        </div>
      </div>
      <div className="flex w-full pr-6 pl-2 my-4">
        <div className={`items-center text-start laptop:text-green-04 w-1/2 text-[14px] font-medium`}>구독 결제 시</div>
        <div className={`flex justify-end text-[20px] text-green-04 font-semibold w-1/2`}>
          {(props.product_subscription_price_list[0] * props.productCount).toLocaleString()}원
        </div>
      </div>
      <div className="text-[12px] text-gray-06 justify-center items-center text-center pr-6 pl-2 my-4 mx-10">
        표시된 구독 결제 시 가격은 1회차 기준이며, 구독 회차에 따라 추가 할인이 적용됩니다.
      </div>
    </div>
  )
}

const TotalPriceRowComponent = (props: TotalPriceProps) => {
  return (
    <div className="w-full pl-2 my-4">
      <div className="text-left items-center text-[14px]">총 상품 금액</div>
      <div className="w-full pr-6 pl-2 my-4">
        <div className="w-full inline-block items-center text-start">
          <div className="inline-block w-fit">
            <span className={`text-[14px] font-medium text-left mr-1`}>일반 결제 시</span>
            <span className={`text-[17px] font-medium text-right ml-1`}>
              {(props.product_sales_price * props.productCount).toLocaleString()}원
            </span>
          </div>
          <span className="text-[14px] text-gray-02 mx-3">|</span>
          <div className="inline-block w-fit">
            <span className={`text-green-04 text-[14px] font-medium mr-1`}>구독 결제 시</span>
            <span className={`text-green-04 text-[17px] font-semibold text-right ml-1`}>
              {(props.product_subscription_price_list[0] * props.productCount).toLocaleString()}원
            </span>
          </div>
        </div>
        <div className="text-[12px] text-gray-06 pr-6 pl-2 my-4 mr-10 items-center text-start overflow-hidden max-h-[36px]">
          <i className="xi-error-o"></i>표시된 구독 결제 시 가격은 1회차 기준이며, 구독 회차에 따라 추가 할인이 적용됩니다.
        </div>
      </div>
    </div>
  )
}

const SubscriptionProductComponent = (props: SubscriptionDetailProps) => {
  const [productCount, setProductCount] = useRecoilState(counterState)

  const setCart = () => {
    console.log('setCart')
  }

  const setOrder = () => {
    console.log('setOrder')
  }

  return (
    <>
      <div className="">
        <div className="justify-items-start flex border-b-2 border-b-gray-02 mb-4 w-full">
          <div className="items-center justify-center flex mx-4 w-1/4 py-3">
            <Image src={props.product_images[0]} alt={''} width={200} height={200} className="object-contain" />
          </div>
          <div className="items-center justify-center mx-4 w-full pb-3">
            <div className="my-5">
              <div className="text-[12px]">{props.product_brand}</div>
              <div className="text-[14px]">{props.product_name}</div>
            </div>

            <div className="flex justify-between">
              <div className="flex w-full justify-start items-center">
                <span className="text-[14px] w-full h-fit">
                  {(props.product_sales_price * productCount).toLocaleString()}원
                </span>
              </div>
              <CountComponent />
            </div>
          </div>
        </div>
        <div className="items-center m-4 w-full">
          <TotalPriceComponent
            product_sales_price={props.product_sales_price}
            product_subscription_price_list={props.product_subscription_price_list}
            productCount={productCount}
          />
        </div>
        <div className="w-full my-2 px-2">
          <CartAndOrderComponent Cart={() => setCart()} Order={() => setOrder()} />
          <OrderBtnComponent flag_subscription={props.flag_subscription} Order={() => setOrder()} />
        </div>
      </div>
    </>
  )
}

function SubAccordionComponent(props: SubscriptionDetailProps) {
  return (
    <>
      <OpenAccordion
        title={
          <div className="flex w-full justify-between">
            <span>회차별 구독 해택가</span>
            <div className="hidden laptop:inline-block laptop:text-left">
              <span className="text-gray-04 text-[12px] pr-4">
                1kg당 {Math.floor(props.product_subscription_price_list[0] / props.product_weight).toLocaleString()}원
              </span>
              <span className="text-[14px] pr-4 font-medium">
                {props.product_subscription_price_list.slice(-1).toLocaleString()} ~{' '}
                {props.product_subscription_price_list[0].toLocaleString()}원
              </span>
            </div>
          </div>
        }
        showIcon={true}
        setdefault={true}
        minHeigth={35 * props.product_subscription_price_list.length + 35}
        style={'item-center text-center bg-yellow-01 border border-yellow-03 min-h-[37px] rounded'}
        btnStyle={'flex h-full text-[14px] mt-2 px-4 justify-between items-center text-center'}
        childStyle={''}
      >
        <div className="bg-white">
          {props.product_subscription_price_list.map((item, index) => {
            return (
              <div key={index} className="flex justify-between text-gray-06 text-[13px] px-3 py-2 items-center">
                {(index === 0 && (
                  <div className="text-start w-1/2 ml-2">
                    {index + 1}-{props.product_subscription_discount_section[index + 1] - 1}회차 구독
                  </div>
                )) ||
                  (index === props.product_subscription_price_list.length - 1 && (
                    <div className="text-start w-1/2 ml-2">
                      {props.product_subscription_discount_section[index]}회차 - 평생
                    </div>
                  )) || (
                    <div className="text-start w-1/2 ml-2">
                      {props.product_subscription_discount_section[index]}-
                      {props.product_subscription_discount_section[index + 1] - 1}회차 구독
                    </div>
                  )}
                <div className="text-center w-1/3 laptop:w-1/2 font-medium laptop:pr-5">{item.toLocaleString()}원</div>
                <div className="w-1/2 flex justify-between desktop:ml-4 items-center">
                  <div className="inline text-[12px] text-center text-green-03 bg-gray-02 rounded-2xl py-0.5 px-1.5">
                    {Math.floor(((props.product_cost_price - item) / props.product_cost_price) * 100)}%
                  </div>
                  {''}+
                  <div className="inline font-medium text-[12px] max-h-[35px] overflow-hidden text-green-04 text-center desktop:mr-4">
                    {props.product_subscription_reserve_rate[index]}% 적립
                  </div>
                </div>
              </div>
            )
          })}
          <div className="py-2 text-gray-06 text-[11px] laptop:text-[13px]">
            구독 제품의 원물가 상승에 의해 추후 구독 가격이 변경될 수 있습니다.
          </div>
        </div>
      </OpenAccordion>
    </>
  )
}

export default SubAccordionComponent
export {
  SubscriptionProductComponent,
  CountComponent,
  TotalPriceComponent,
  CartAndOrderComponent,
  OrderBtnComponent,
  MobilePriceInfoComponent,
  DeliveryPriceComponent,
  DetailTabViewComponent,
  ProductDetailComponent,
}
