import { BottomBadge, TopBadge } from '@/components/common/badge'
import { SearchResultProductFragment, SimpleFacetValueFragment } from '@/modules/gql/generated'
import Image from 'next/image'
import Link from 'next/link'
import LikeOffIcon from 'public/icons/product/like_off.svg'
import LikeOnIcon from 'public/icons/product/like_on.svg'
import React from 'react'

export type SearchProductResultItemProps = {
  searchProduct: SearchResultProductFragment
  brandFacetValues: SimpleFacetValueFragment[]
  badgeTopFacetValues: SimpleFacetValueFragment[]
  badgeBottomFacetValues: SimpleFacetValueFragment[]
  showReviewCount?: boolean
  onClickLike?: (searchProduct: SearchResultProductFragment) => void
}


function SearchProductResultItem(props: SearchProductResultItemProps, ref: React.ForwardedRef<HTMLDivElement>) {
  const brand = props.brandFacetValues.find((brandFacetValue) => props.searchProduct.facetValueIds.includes(brandFacetValue.id))?.name
  const badgeTopFacetValues = props.badgeTopFacetValues.filter((sfv) => props.searchProduct.facetValueIds.includes(sfv.id))
  const badgeBottomFacetValues = props.badgeBottomFacetValues.filter((sfv) => props.searchProduct.facetValueIds.includes(sfv.id))
  const salesPrice = props.searchProduct.priceWithTax.__typename === 'PriceRange' ? props.searchProduct.priceWithTax.min / 100 : 0
  const originalPrice = props.searchProduct.originalPrice !== null ?  props.searchProduct.originalPrice / 100 : salesPrice
  const discountRate = salesPrice === originalPrice ? 0 : Math.floor((1 - (salesPrice / originalPrice)) * 100)

  return (
    <Link href={`/product/${props.searchProduct.productId}`}>
      <div ref={ref} className="max-w-[304px] cursor-pointer">
        <div className="relative max-h-[304px] bg-[#d9d9d9]">
          <Image src={props.searchProduct.productAsset?.preview ?? ''} width={304} height={304} alt={props.searchProduct.productName} />
          {props.onClickLike && (
            <div className="absolute bottom-[8px] right-[8px] cursor-pointer" onClick={(e) => {
              e.preventDefault()
              props.onClickLike?.(props.searchProduct)
            }}>
              {props.searchProduct.isLike ? <LikeOnIcon /> : <LikeOffIcon />}
            </div>
          )}
          {!props.searchProduct.inStock && (
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-09 bg-opacity-30 w-full h-full flex items-center place-content-center">
              <span className="text-[24px] font-bold text-white opacity-100">상품 준비중</span>
            </div>
          )}
          <div className="flex absolute top-0 right-0">
            {badgeTopFacetValues.map((badgeFacetValue, index) => {
              return (
                <TopBadge key={index} text={badgeFacetValue.name} bgColor={badgeFacetValue.code} />
              )
            })}
          </div>
        </div>
        <div className="mt-[20px] text-gray-07 text-[12px] laptop:text-[14px] line-clamp-1">{brand}</div>
        <div className="mt-[8px] text-[15px] laptop:text-[17px] font-bold text-gray-09 line-clamp-2">{props.searchProduct.productName}</div>
        <div className="mt-[4px] text-[12px] laptop:text-[14px] font-medium text-gray-07 line-clamp-2">
          {/* 상품 설명 추가 */}
          {/* {props.description} */}
        </div>
        {badgeBottomFacetValues.length > 0 && (
          <div className="flex mt-[8px]">
            {badgeBottomFacetValues.map((badge, index) => (
              <BottomBadge text={badge.name} key={`${badge.id}-${index}`}/>
            ))}
          </div>
        )}
        <div className="mt-[8px] text-[12px] laptop:text-[14px] font-medium text-gray-04 line-through">
          {originalPrice.toLocaleString()}원
        </div>
        <div className="mt-[4px] text-[18px] laptop:text-[20px] font-bold text-gray-09">
          <span className="text-green-04 mr-[8px]">{discountRate}%</span>
          {salesPrice.toLocaleString()}원
        </div>
        {props.showReviewCount && (
          <div className="mt-[8px] text-gray-04 laptop:text-gray-07 text-[11px] laptop:text-[13px] font-medium">
            <i className="xi-speech-o text-[13px] laptop:text-[17px] font-normal mr-[4px]"></i>
            123
            {/* {product.reviewCount.toLocaleString()} */}
          </div>
        )}
      </div>
    </Link>
  )
}

export default React.forwardRef<HTMLDivElement, SearchProductResultItemProps>(SearchProductResultItem)
