'use client'
import React, { useEffect, useRef, useState } from 'react'
import Container from '@components/common/container'
import SwiperComponent from '@components/common/swiper'
import RatingAndLikeComponent, {
  LikeAndShareComponent,
  OrderButton,
} from '@components/product/[id]/ui'
import BottomSheet from '@components/common/bottomSheet'
import Button from '@components/common/button'
import SubAccordionComponent, {
  SubscriptionProductComponent,
  CountComponent,
  TotalPriceComponent,
  OrderBtnComponent,
  CartAndOrderComponent,
  MobilePriceInfoComponent,
  DeliveryPriceComponent,
  DetailTabViewComponent,
  ProductDetailComponent
} from '@components/subscription/[id]/ui'
import { useRecoilState } from 'recoil'
import { counterState } from '@/store'
import Accordion from '@components/common/accordion'


type SubscriptionDetailProps = {
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
  product_subscription_price: number,
  product_weight: number,
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

const LikeBtn = () => {
  console.log('LikeBtn')
  // TODO : API 통신 필요한가? 일단 고민
}

const ShareBtn = async () => {
  let path = window.location.href
  await navigator.clipboard.writeText(path)
}

const setOrder = () => {
  console.log('setOrder')
}

const setCart = () => {
  console.log('setCart')
}

const NoticeComponent = () => {
  return (
    <Accordion
      title="상품 구매 시 주의 사항"
      style="border-t-2 border-gray-02 "
      btnStyle="text-[15px] pt-3 text-left flex justify-between items-center"
      showIcon={true}
    >
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
    </Accordion>
  )
}

const QnAComponent = () => {
  return (
    <Accordion
      title="스토어 이용 안내"
      style="border-t-2 border-gray-02 "
      btnStyle="text-[15px] pt-3 text-left flex justify-between items-center"
      showIcon={true}
    >
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
    </Accordion>
  )
}

const ReviewComponent = () => {
  return (
    <Accordion
      title="REVIEW"
      style="border-t-2 border-gray-02 "
      btnStyle="text-[15px] pt-3 text-left flex justify-between items-center"
      showIcon={true}
    >
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
    </Accordion>
  )
}

const SubscriptionDetailTopComponent = (props: SubscriptionDetailProps) => {
  const [productCount, setProductCount] = useRecoilState(counterState)
  return (
    <>
      <SwiperComponent imageArray={props.product_images} badges={[]} />
      <div className="w-full pl-3 pt-3 laptop:w-1/2 pr-3 w-max-[640px]">
        <div className="w-full mt-6 laptop:px-3 laptop:ml-8 laptop:mr-4">
          <div className="w-full flex justify-between">
            <div className="text-gray-06 text-[13px] pb-3 inline-block">{props.product_brand}</div>
            <div className="hidden laptop:inline-block laptop:justify-end">
              <LikeAndShareComponent like={LikeBtn} share={ShareBtn} />
            </div>
          </div>
          <div className="text-2xl">{props.product_name}</div>
          <div className="hidden laptop:block mt-2">
            <RatingAndLikeComponent
              rating={props.review_score}
              review={props.review_count}
              like={props.is_like_count}
            />
          </div>
          <div className="hidden laptop:block">{props.product_description}</div>
          {props.product_tag.map((item, index) => {
            return (
              <div
                key={index}
                className="inline-block text-[12px] text-center text-gray-06 bg-gray-02 rounded-2xl mt-3 mb-4 mr-2 py-0.5 px-1.5"
              >
                {item}
              </div>
            )
          })}
          <div className="laptop:hidden border-b-2 border-b-gray-01">
            <RatingAndLikeComponent
              rating={props.review_score}
              review={props.review_count}
              like={props.is_like_count}
            />
          </div>
        </div>
        <div className="w-full mt-6 laptop:px-3 laptop:ml-8 laptop:mr-4 justify-between laptop:hidden">
          <MobilePriceInfoComponent {...props} />
        </div>
        <div className="w-full mt-6 laptop:px-3 laptop:ml-8 laptop:mr-4">
          <SubAccordionComponent {...props} />
        </div>
        <div className="w-full my-6 laptop:px-3 laptop:ml-8 laptop:mr-4 border-t-2 laptop:border-b-2  border-gray-01 py-3">
          <DeliveryPriceComponent {...props} />
        </div>
        {/*TODO : 구매 버튼 상태 값에 따른 뭐 어쩌구 변경 */}
        <div className="hidden w-full mt-6 laptop:px-3 laptop:ml-8 laptop:mr-4 laptop:block border-b-2 border-b-gray-01">
          <div className="w-full bg-gray-02 rounded">
            <div className="flex justify-between my-8 mx-4 py-5">
              <div className="flex items-center">수량 선택</div>
              <div className="flex items-center">
                <CountComponent />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden w-full mt-6 laptop:px-3 laptop:ml-8 laptop:mr-4 laptop:block">
          <TotalPriceComponent
            product_sales_price={props.product_sales_price}
            product_subscription_price_list={props.product_subscription_price_list}
            productCount={productCount}
          />
        </div>
        <div className="hidden w-full mt-6 laptop:px-3 laptop:ml-8 laptop:mr-4 laptop:block">
          <div className="my-2">
            <OrderBtnComponent flag_subscription={props.flag_subscription} Order={() => setOrder()} />
          </div>
          <div className="my-2">
            <CartAndOrderComponent Cart={() => setCart()} Order={() => setOrder()} />
          </div>
        </div>
      </div>
    </>
  )
}

function SubscriptionDetailComponent(props: SubscriptionDetailProps) {
  const [bottomOrderBtn, setBottomOrderBtn] = useState(false)
  const [mobileOrder, setMobileOrder] = useState(false)
  const [DeskTopBottomOrder, setShowBottomOrder] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const DivRef = useRef<HTMLDivElement>(null)
  const [productCount, setProductCount] = useRecoilState(counterState)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    let Height = DivRef.current?.offsetHeight ?? 0
    window.addEventListener('scroll', handleScroll, { passive: true })
    if (scrollY > Height) {
      setBottomOrderBtn(true)
    } else {
      setBottomOrderBtn(false)
    }
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollY])

  const showBottomOrder = () => {
    setMobileOrder(!mobileOrder)
  }

  const DeskTopShowBottomOrder = () => {
    setShowBottomOrder(!DeskTopBottomOrder)
  }

  return (
    <>
      <Container>
        <div className="w-full max-w-[1280px] mx-auto laptop:flex" ref={DivRef}>
          <SubscriptionDetailTopComponent {...props} />
        </div>
        <div className="w-full justify-center h-auto block laptop:pt-16 laptop:border-t-0 pt-8 border-t-4 border-t-gray-02">
          <Container>
            <DetailTabViewComponent />
            <ProductDetailComponent />
            <NoticeComponent />
            <QnAComponent />
            <ReviewComponent />
          </Container>
        </div>
        <div className="flex-col fixed z-[1] bottom-0 left-0 right-0 border-t border-gray-02 bg-white">
          <div className="inline-block w-1/4 laptop:hidden">
            <LikeAndShareComponent like={LikeBtn} share={ShareBtn} />
          </div>
          <div className="inline-block w-3/4 laptop:hidden">
            <OrderButton onClick={() => showBottomOrder()} />
          </div>
        </div>
        {/*모바일 구매하기 클릭 시 나오는 바텀 시트*/}
        {mobileOrder && (
          <BottomSheet onClose={() => showBottomOrder()}>
            <SubscriptionProductComponent {...props} />
          </BottomSheet>
        )}
        {/* PC 스크롤 내렸을때 하단 구매하기 버튼 및 클릭 시 나오는 구매 창 */}
        {bottomOrderBtn && (
          <div className="hidden laptop:flex fixed w-full items-center justify-center bottom-0 left-0 right-0">
            <div className="w-3/5 text-right">
              <div className="w-2/5 inline-block max-w-[270px]">
                <Button
                  className="w-full"
                  onClick={() => {
                    DeskTopShowBottomOrder()
                  }}
                >
                  <div className="flex w-full items-center justify-center">
                    <span className="flex">구매하기</span>
                    <i className="xi-angle-down ml-14 flex"></i>
                  </div>
                </Button>
              </div>
              {DeskTopBottomOrder && (
                <div className="w-full shadow-gray-04 shadow-md bg-white">
                  <div className="justify-between flex p-4 w-full">
                    <div className="p-2 w-3/6">
                      <TotalPriceComponent
                        product_sales_price={props.product_sales_price}
                        product_subscription_price_list={props.product_subscription_price_list}
                        productCount={productCount} Row={true}
                      />
                    </div>
                    <div className="p-2 pr-4 flex items-center justify-end"><CountComponent /></div>
                    <div className="p-2 w-2/6">
                      <div className="my-2">
                        <OrderBtnComponent flag_subscription={props.flag_subscription} Order={() => setOrder()} />
                      </div>
                      <div className="my-2">
                        <CartAndOrderComponent Cart={() => setCart()} Order={() => setOrder()} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </>
  )
}

export default SubscriptionDetailComponent