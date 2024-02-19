import Image from 'next/image'
import LikeOffIcon from '@/public/icons/product/like_off.svg'
import LikeOnIcon from '@/public/icons/product/like_on.svg'
import Cart from '@/public/icons/cart.svg'
import React from 'react'

export type SubscriptionItemProps = {
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
  product_detail: string // html
  is_promotion: string
  is_like: boolean
  is_like_count: string
}

function SubscriptionItem(props: SubscriptionItemProps) {

  const toggleLike = () => {console.log('toggleLike')}
  const toggleCart = () => {console.log('toggleCart')}

  return (
    <div className="w-full px-2 py-2 flex items-center justify-center">
      <div className="my-2 w-full min-h-[200px] bg-white">
        <div className="flex-col items-center justify-center">
          <div className="flex w-full justify-end">
            {props.product_badge.map((item, index) => {
              return <Image key={index} src={item} alt={''} width={30} height={20} className="object-cover" />
            })}
          </div>
          <Image src={props.product_images[0]} alt={''} width={400} height={400} className="h-full object-contain" />
        </div>
        <div className="w-full pl-3 pr-3 flex">
          <div className="w-full">
            <div className="mt-[20px] text-gray-07 text-[12px] laptop:text-[14px] line-clamp-1">
              {props.product_brand}
            </div>
            <div className="mt-[8px] text-[15px] laptop:text-[17px] font-bold text-gray-09 line-clamp-2">
              {props.product_name}
            </div>
            <div className="mt-[4px] text-[12px] laptop:text-[14px] font-medium text-gray-07 line-clamp-2">
              {props.product_description}
            </div>
            {props.product_tag.length > 0 && (
              <div className="flex mt-[8px]">
                {props.product_tag.map((tag, index) => (
                  <div
                    className="py-[6px] px-[8px] bg-gray-02 rounded-full text-[12px] text-gray-07 mr-[4px]"
                    key={index}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
            <div className="mt-[10px] text-[12px] laptop:text-[14px] flex">
              <span className="flex-grow">일반 구매가</span>
              <span className="text-right">{props.product_sales_price.toLocaleString()}원</span>
            </div>
            <div className="mt-[8px] text-[18px] laptop:text-[18px] flex font-medium">
              <span className="flex-grow">최종 구독가</span>
              <span
                className="text-right text-green-04 font-bold">{props.product_subscription_price.toLocaleString()}원</span>
            </div>
          </div>
        </div>
        <div className="flex mt-3 w-full">
          <div className="flex-grow mx-2 px-2 border-t-2 border-gray-01 flex items-center">
            <div className="flex-grow flex items-center">
              <i className="xi-speech-o text-[13px] laptop:text-[15px] text-gray-04 pr-2"></i>
              <span className="text-[12px] laptop:text-[14px] text-gray-04">{props.is_like_count}</span>
            </div>
            <div className="ml-2 px-2 py-2 flex items-center">
              <div className="flex bottom-[8px] right-[8px] cursor-pointer justify-end" onClick={toggleLike}>
                {props.is_like ? <LikeOnIcon /> : <LikeOffIcon />}
              </div>
              <div className="flex bottom-[8px] right-[8px] cursor-pointer justify-end" onClick={toggleCart}>
                <Cart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionItem