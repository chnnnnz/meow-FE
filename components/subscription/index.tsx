'use client'
import React from 'react'
import Container from '@components/common/container'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import SwiperCore from 'swiper'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import SubscriptionItem from '@components/subscription/ui'

SwiperCore.use([Autoplay])

export type SubscriptionProps = {
  banners: {
    imageUrl: string
    mobileImageUrl: string
    linkUrl: string
  }[]
  categories: string[]
  products: {
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
    product_subscription_price: number, // 6회차 구독 금액
    product_detail: string // html
    is_promotion: string
    is_like: boolean
    is_like_count: string
  }[]
}

const CategorySelector = () => {
  return (
    <>
      <Container>
        <h1>CategorySelector</h1>
      </Container>
    </>
  )
}

function SubscriptionComponent(props: SubscriptionProps) {
  return (
    <>
      <CategorySelector />
      <div className="laptop:pt-[50px]">
        <Swiper slidesPerView={1} autoplay={{ delay: 3000 }} loop={true} className="!z-0">
          {props.banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="pb-[34%] desktop:pb-[0px] relative overflow-hidden min-h-[170px] desktop:max-h-[480px] max-h-none flex">
                <div className="absolute desktop:static w-full h-full">
                  <div className="relative h-full overflow-hidden desktop:h-[480px] flex place-content-center items-center">
                    <Image
                      src={banner.imageUrl}
                      width={2600}
                      height={480}
                      className="hidden tablet:block h-full object-fill max-w-none"
                      alt="banner"
                    />
                    <Image
                      src={banner.mobileImageUrl}
                      width={1500}
                      height={800}
                      className="tablet:hidden h-full w-full object-cover max-w-none overflow-clip"
                      alt="banner"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Container className="bg-green-02 pb-32">
        <div className="w-full flex">
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-[7px] laptop:gap-[21px] mt-[28px] gap-y-[50px] laptop:gap-y-[84px] items-center justify-center">
            {props.products.map((item) => {
              return <SubscriptionItem {...item} />
            })}
          </div>
        </div>
      </Container>
      <Container>
        <div className="pt-6">
          <h1>구독 및 포인트 해택 유의사항</h1>
          <div className="text-[13px]">
            구독 제품의 원물, 배송비, 환율 등의 경기동향에 따라 추후 구독 가격이 변돌될 수 있습니다.
          </div>
          <div className="text-[13px]">
            포인트는 제품의 실 결제금액을 기준으로 지급헙니다. 이에 배송비는 포인트 산정에 포함되지 않습니다.
          </div>
        </div>
      </Container>
    </>
  )
}

export default SubscriptionComponent