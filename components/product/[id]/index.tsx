'use client'

import { useEffect, useRef, useState } from 'react'
import { storeDetailState, selectedOptionIdsState, selectedVariantsState } from '@/store'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
  OrderButton,
  LikeAndShareComponent,
  OrderBottomModal,
  ProductOptionComponent,
  ProductOptionBottomComponent,
  ProductInfoComponent
} from '@components/product/[id]/ui'
import Button from '@components/common/button'
import Container from '@components/common/container'
import Accordion from '@components/common/accordion'
import SwiperComponent from '@components/common/swiper'
import { ProductDetailFragment } from '@/modules/gql/generated'
import { useBadgeBottomFacetValues, useBadgeTopFacetValues, useBrandFacetValues } from '@/modules/hooks/facetValue'
import React from 'react'
import { UnderlinedTabView } from '@/components/common/tabview'

const ProductDetailComponent = React.memo((props: {htmlContent: string}) => {
  return (
    <div className="w-full">
      <div className="items-center justify-center w-full flex py-5" dangerouslySetInnerHTML={ {__html: props.htmlContent } }>
      </div>
    </div>
  )
})

const RefundInfoComponent = () => {
  return (
    <Accordion
      title="반품/교환 안내"
      style="border-t-2 border-gray-02"
      btnStyle="sub-head-SB-20-150 text-gray-09 pt-3 flex justify-between items-center"
      iconStyle='text-[24px] text-gray-07'
      showIcon={true}
    >
      <div className='mt-[16px]'>
        <div className='font-semibold text-gray-07'>배송안내</div>
        <div className='text-gray-06'>일반 택배 : 3,000원</div>
        <div className='font-semibold text-gray-07 mt-[8px]'>반품/교환 안내</div>
        <div className='text-gray-06'>교환/반품 주소지 : 경기도 평택시 산단로 263(칠괴동)</div>
        <div className='text-gray-06'>교환 배송비 : 6,000원 (왕복 택배비)</div>
        <div className='text-gray-06'>반품 배송비 : 3,000원 (편도 택배비)</div>
      </div>
      
    </Accordion>
  )
}
const NoticeComponent = () => {
  return (
    <Accordion
      title="상품 구매 시 주의 사항"
      style="border-t-2 border-gray-02"
      btnStyle="sub-head-SB-20-150 text-gray-09 pt-3 flex justify-between items-center"
      iconStyle='text-[24px] text-gray-07'
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
      style="border-t-2 border-gray-02"
      btnStyle="sub-head-SB-20-150 text-gray-09 pt-3 flex justify-between items-center"
      iconStyle='text-[24px] text-gray-07'
      showIcon={true}
    >
      <ul className='list-disc list-inside font-medium text-gray-07 leading-[24px] my-[16px]'>
        <li>미우타임즈 스토어에서는 정기구독이나 이벤트 등으로 쌓은 포인트를 사용하실 수 있습니다.</li>
        <li>포인트는 주문하신 제품 금액에만 적용이 가능합니다.</li>
        <li>정기구독을 통해 적립된 포인트는 6개월 이후 소멸됩니다.</li>
        <li>이벤트로 적립된 포인트의 경우, 개별 고시된 기간 이후 소멸됩니다.</li>
      </ul>
    </Accordion>
  )
}

const ReviewComponent = () => {
  return (
    <Accordion
      title="REVIEW - 크리마 이용예정"
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

const StoreDetailTopComponent = (props: ProductDetailFragment) => {
  const [proDetail, _] = useRecoilState(storeDetailState)
  const initRating = {
    reviewScore: proDetail.review_score,
    reviewCount: proDetail.review_count,
    likeCount: proDetail.is_like_count,
  }
  const [rating, setRating] = useState(initRating)
  
  const minSalesPrice = Math.min(...props.variants.map((variant) => variant.priceWithTax))
  const originalPrice = props.customFields?.originalPrice ?? minSalesPrice
  const discountRate = Math.floor(((originalPrice - minSalesPrice) / originalPrice) * 100)
  const brandFacetValues = useBrandFacetValues(props.facetValues)
  const badgeTopFacetValues = useBadgeTopFacetValues(props.facetValues)
  const badgeBttomFacetValues = useBadgeBottomFacetValues(props.facetValues)
  const brand = brandFacetValues.length > 0 ? brandFacetValues[0].name : ''
  
  return (
    <>
      <SwiperComponent imageArray={props.assets.map((asset) => asset.preview)} badges={badgeTopFacetValues} />
      <ProductInfoComponent name={props.name} brand={brand} proTag={badgeBttomFacetValues.map((badge) => badge.name)}
                   shortDescription={props.customFields?.shortDescription ?? ''} like={true} productId={props.id} rating={rating} discountRate={discountRate}
                   salesPrice={minSalesPrice / 100} originalPrice={originalPrice / 100}>
        <ProductOptionComponent addCart={() => {}} buyNow={() => {}} {...props}/>
      </ProductInfoComponent>
    </>
  )
}

function StoreDetailComponent(props: ProductDetailFragment) {
  const setSelectedOptionIds = useSetRecoilState(selectedOptionIdsState)
  const setSelectedVariants = useSetRecoilState(selectedVariantsState)
  const [bottomOrder, setBottomOrder] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [bottomOrderBtn, setBottomOrderBtn] = useState(false)
  const [DeskTopBottomOrder, setShowBottomOrder] = useState(false)
  const DivRef = useRef<HTMLDivElement>(null)
  const [selectedDetailTabIdx, setSelectedDetailTabIdx] = useState(0)

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
    setBottomOrder(!bottomOrder)
  }
  const DeskTopShowBottomOrder = () => {
    setShowBottomOrder(!DeskTopBottomOrder)
  }
  useEffect(() => {
    return () => {
      setSelectedOptionIds([])
      setSelectedVariants([])
    }
  }, [])
  return (
    <>
      <Container>
        <div className="w-full max-w-[1280px] mx-auto laptop:flex" ref={DivRef}>
          <StoreDetailTopComponent {...props} />
        </div>
        <div className="w-full justify-center h-auto block pt-16">
          <Container>
            <UnderlinedTabView
              tabs={['상세정보', '리뷰', '반품/교환 안내']}
              initialActiveIndex={selectedDetailTabIdx}
              onChangeTab={(index) => setSelectedDetailTabIdx(index)}
            />
            <ProductDetailComponent htmlContent={props.description} />
            <NoticeComponent />
            <QnAComponent />
            <ReviewComponent />
            <RefundInfoComponent />
          </Container>
        </div>
        <div className="flex-col fixed z-[1] bottom-0 left-0 right-0 border-t border-gray-02 bg-white">
          <div className="inline-block w-1/4 laptop:hidden">
            <LikeAndShareComponent like={true} productId={props.id} />
          </div>
          <div className="inline-block w-3/4 laptop:hidden">
            <OrderButton onClick={() => showBottomOrder()} />
          </div>
        </div>
        {bottomOrder && (
          <OrderBottomModal onClose={() => showBottomOrder()}>
            <ProductOptionComponent addCart={() => {}} buyNow={() => {}} {...props}/>
          </OrderBottomModal>
        )}
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
                <div className="w-full bg-gray-02 shadow-gray-04 shadow-md">
                  <div className="px-2 py-2 bg-white">
                    <ProductOptionBottomComponent addCart={() => {}} buyNow={() => {}} {...props}/>
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

export default StoreDetailComponent
