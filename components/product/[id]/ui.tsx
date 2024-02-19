import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@components/common/button'
import ToastComponent from '@components/common/toast'
import { ProductDetailFragment, useAddItemsToOrderMutation, useLikeProductMutation } from '@/modules/gql/generated'
import { useRecoilState } from 'recoil'
import { selectedVariantsState } from '@/store'
import ConfirmModal from '@/components/common/modal/ConfirmModal'
import useConfirmModal from '@/modules/hooks/confirmModal'
import { useRouter } from 'next/navigation'
import OptionGroupsComponent from '@/components/common/optionGroup'
import SelectedVariantComponent from '@/components/common/selectedVariant'
import useAddItemsToOrder from '@/modules/hooks/productAddCart'
import { router } from 'next/client'

export type RatingAndLikeProps = {
  rating: number
  review: string
  like: string
}

export type orderButtonProps = {
  onClick: () => void
}

export type orderButtonModalProps = {
  onClose: () => void
  children: React.ReactNode
}

export type ProductOptionProps = {
  optionGroups: ProductDetailFragment['optionGroups']
  variants: ProductDetailFragment['variants']
  addCart: () => void
  buyNow: () => void
}

export type ProductCountProps = {
  selectedVariant: { variant: ProductDetailFragment['variants'][0], count: number }
  onChange: (count: number) => void
}

export type LikeAndShareProps = {
  like: boolean
  productId: string
}

export type ProductInfoProps = {
  name: string
  brand: string
  proTag: string[]
  like: boolean,
  productId: string,
  rating: any
  discountRate?: number
  salesPrice: number
  originalPrice: number
  PriceTable?: boolean
  children?: React.ReactNode
  shortDescription: string
}
export type ProductPriceInfoProps = {
  originalPrice: number
  salesPrice: number
  discountRate?: number
  PriceTable?: boolean
}

const RatingAndLikeComponent = (props: RatingAndLikeProps) => {
  const maxIcons = 5
  const fullIcons = Math.floor(props.rating)
  const hasHalfIcon = props.rating % 1 !== 0
  const remainingIcons = Math.floor(maxIcons - props.rating)
  
  // base
  const icons = [...Array(fullIcons)].map((_, index) => (
    <Image
      key={'base' + index}
      src={'https://d39h0xn1r3o9zb.cloudfront.net/dev/common/icon-star.svg'}
      alt={'full'}
      width={20}
      height={20}
      className="inline-block pl-1"
    />
  ))
  // half
  if (hasHalfIcon) {
    icons.push(
      <Image
        key={'half'}
        src={'https://d39h0xn1r3o9zb.cloudfront.net/dev/common/icon-star-half.svg'}
        alt={'half'}
        width={20}
        height={20}
        className="inline-block pl-1"
      />
    )
  }
  // empty
  if (remainingIcons > 0) {
    icons.push(
      ...[...Array(remainingIcons)].map((_, index) => (
        <Image
          key={'empty' + index}
          src={'https://d39h0xn1r3o9zb.cloudfront.net/dev/community/star-off.png'}
          alt={'empty'}
          width={20}
          height={20}
          className="inline-block pl-1"
        />
      ))
    )
  }
  return (
    <div className="flex items-center text-center mb-4">
      {icons}
      <div className="flex-col text-center items-center pl-3 pt-1 text-[13px]">{props.rating}</div>
      <div className="flex-col text-center items-center pl-2 pt-1 text-[13px]">
        (<Link className="underline" href={'/'}>{props.review}</Link>)
        {props.like !== '0' && (
          <>
            <span className="pl-2 text-[11px] text-gray-04">|</span>
            <Image
              src={'https://d39h0xn1r3o9zb.cloudfront.net/dev/common/icon-like-on.svg'}
              alt={''}
              width={20}
              height={20}
              className="inline-block pl-1"
            />
            <span className="pl-2 pt-1 text-[13px]">{props.like}</span>
          </>
        )}
      </div>
    </div>
  )
}

const OrderButton: React.FC<orderButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center">
      <Button className="w-full text-[13px] text-white bg-gray-08 my-2 mx-2" onClick={onClick}>
        구매하기
      </Button>
    </div>
  )
}

const LikeAndShareComponent: React.FC<LikeAndShareProps> = ({ like, productId }) => {
  const router = useRouter()
  const [likeStatus, setlikeStatus] = useState(like)
  const [toast, setToast] = useState(false)
  const [isOpenedLoginConfirm, loginConfirmTitle, loginConfirmContent, onPositive, openLoginConfirm, closeLoginConfirm] = useConfirmModal()
  const [likeProduct] = useLikeProductMutation()

  const ShareBtn = async () => {
    let path = window.location.href
    await navigator.clipboard.writeText(path)
  }

  const clickLike = async () => {
    const res = await likeProduct({
      variables: {
        productId: productId,
        like: !like
      },
    })
    if (res.data?.setLikeProduct?.success) {
      console.log('좋아요 성공')
      setlikeStatus(!likeStatus)
      setToast(true)
    } else if ((res.errors?.findIndex((e) => e.extensions.code === 'UNAUTHORIZED') ?? -1) > -1) {
      openLoginConfirm({ title: '로그인이 필요합니다.', content: '로그인 페이지로 이동하시겠습니까?', onPositive: () => {
          closeLoginConfirm()
          router.push('/account/login')
        } })
    }
  }

  let message = ''
  if (likeStatus) {
    message = '좋아하는 상품으로 추가되었습니다.'
  } else {
    message = '좋아하는 상품에서 삭제되었습니다.'
  }

  return (
    <>
      {isOpenedLoginConfirm && (
        <ConfirmModal
          title={loginConfirmTitle}
          content={loginConfirmContent}
          onNegativeClick={closeLoginConfirm}
          onPositiveClick={onPositive}
        />
      )}
      <div className="items-center text-center ">
        <Image
          src={
            likeStatus
              ? `https://d39h0xn1r3o9zb.cloudfront.net/dev/common/icon-like-on.svg`
              : `https://d39h0xn1r3o9zb.cloudfront.net/dev/common/icon-like.svg`
          }
          alt={''}
          width={30}
          height={30}
          className="inline-block pr-2"
          onClick={clickLike}
        />
        <Image
          src={'https://d39h0xn1r3o9zb.cloudfront.net/dev/common/icon-share.svg'}
          alt={''}
          width={30}
          height={30}
          className="inline-block pl-2"
          onClick={ShareBtn}
        />
        {toast && (
          <ToastComponent
            message={message}
            image={
              likeStatus
                ? `https://d39h0xn1r3o9zb.cloudfront.net/dev/common/icon-like-on.svg`
                : `https://d39h0xn1r3o9zb.cloudfront.net/dev/common/icon-like.svg`
            }
            onHidden={() => setToast(false)}
          />
        )}
      </div>
    </>
  )
}

const OrderBottomModal: React.FC<orderButtonModalProps> = ({ onClose, children }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])
  return (
    <>
      <div className="fixed inset-0 bg-gray-04 z-10 bg-opacity-75 transition-opacity justify-between">
        <div className="w-full h-1/2" onClick={onClose} />
        <div className="bottom-0 left-0 w-full max-w-screen-md h-1/2 bg-white rounded-t-lg px-4 pb-10">{children}</div>
      </div>
    </>
  )
}

const ProductOptionComponent: React.FC<ProductOptionProps> = ({
  optionGroups,
  variants,
  addCart,
  buyNow,
}) => {
  const [selectedVariants, setSelectedVariants] = useRecoilState(selectedVariantsState)
  const [isConfirmOpened, confirmTitle, confirmContent, onPositive, openConfirm, closeConfirm] = useConfirmModal()
  const [addItems] = useAddItemsToOrder()
  const router = useRouter()

  function onClickAddCart() {
    if (selectedVariants.length > 0) {
      addItems(
        selectedVariants,
        () => {openConfirm({
        title: '장바구니에 상품을 담았습니다!',
        content: '바로 확인하시겠습니까?',
        onPositive: () => {
          closeConfirm()
          router.push('/cart')
        }
      })},
        () => {openConfirm({
        content: '품절된 상품이 있습니다.',
        onPositive: () => {
          closeConfirm()
        }
      })}
      )
    }
  }

  function onClickBuyNow() {
    //todo 바로구매
  }
 
  return (
    <>
      {isConfirmOpened && <ConfirmModal title={confirmTitle} content={confirmContent} onNegativeClick={closeConfirm} onPositiveClick={onPositive}/>}
      <div className="flex flex-col h-full w-full mx-auto text-left">
        <div className="flex-grow h-3/4">
          <div className="w-full h-4/5 mt-8">
            <OptionGroupsComponent optionGroups={optionGroups} variants={variants} />
            <div className='mt-[12px]'>
              {selectedVariants.map((selectedVariant, index) => {
                return <SelectedVariantComponent
                  key={index}
                  selectedVariant={selectedVariant}
                />
              })}
            </div>

          </div>
        </div>
        <div className="flex-grow border-gray-03 border-t-2 h-1/4">
          <div className="flex justify-between w-full pt-5">
            <div className="w-1/2 text-[15px] pl-3">
              총 <span className="text-sys-green">{selectedVariants.reduce((acc, cur) => acc += cur.count, 0)}</span>개
            </div>
            <div className="w-1/2 text-right text-[15px] pr-5">
              총 상품 금액{' '}
              <span className="text-sys-green text-[17px] pl-3 font-semibold">
                {selectedVariants.length <= 0 ? 0 : (selectedVariants.reduce((acc, cur) => acc += (cur.variant.priceWithTax / 100) * cur.count, 0).toLocaleString())}원
              </span>
            </div>
          </div>
          <div className="flex justify-between w-full items-center text-center">
            <Button className="mr-3" variant="white" onClick={onClickAddCart}>
              장바구니
            </Button>
            <Button className="ml-3" variant="default" onClick={buyNow}>
              구매하기
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

const ProductOptionBottomComponent: React.FC<ProductOptionProps> = ({
  optionGroups,
  variants,
  addCart,
  buyNow,
}) => {
  const [selectedVariants, setSelectedVariants] = useRecoilState(selectedVariantsState)
  const [isConfirmOpened, confirmTitle, confirmContent, onPositive, openConfirm, closeConfirm] = useConfirmModal()
  const [addItems] = useAddItemsToOrder()
  const router = useRouter()

  function onClickAddCart() {
    if (selectedVariants.length > 0) {
      addItems(
        selectedVariants,
        () => {openConfirm({
          title: '장바구니에 상품을 담았습니다!',
          content: '바로 확인하시겠습니까?',
          onPositive: () => {
            closeConfirm()
            router.push('/cart')
          }
        })},
        () => {openConfirm({
          content: '품절된 상품이 있습니다.',
          onPositive: () => {
            closeConfirm()
          }
        })}
      )
    }
  }

  function onClickBuyNow() {
    //todo 바로구매
  }
  return (
    <>
      {isConfirmOpened && <ConfirmModal title={confirmTitle} content={confirmContent} onNegativeClick={closeConfirm}
                                        onPositiveClick={onPositive} />}
      <div className="flex flex-col h-full w-full mx-auto text-left">
        <div className="flex-grow h-3/4">
          <div className="justify-between flex max-h-[240px]">
            <div className="w-1/2 m-2">
              <OptionGroupsComponent optionGroups={optionGroups} variants={variants} />
            </div>
            <div className='w-1/2 m-2 overflow-scroll no-scrollbar'>
              {selectedVariants.map((selectedVariant, index) => {
                return <SelectedVariantComponent
                  key={index}
                  selectedVariant={selectedVariant}
                />
              })}
            </div>
          </div>
        </div>
        <div className="flex border-gray-03 border-t-2 h-1/4">
          <div className="flex w-full py-2 items-center text-left">
            <div className="w-1/2 text-[15px] pl-3">
              총 <span className="text-sys-green">{selectedVariants.reduce((acc, cur) => acc += cur.count, 0)}</span>개
            </div>
            <div className="w-1/2 text-[15px] pr-5">
              총 상품 금액{' '}
              <span className="text-sys-green text-[17px] pl-3 font-semibold">
                {selectedVariants.length <= 0 ? 0 : (selectedVariants.reduce((acc, cur) => acc += (cur.variant.priceWithTax / 100) * cur.count, 0).toLocaleString())}원
              </span>
            </div>
          </div>
          <div className="flex justify-between w-full items-center text-center m-2">
            <Button className="mr-3" variant="white" onClick={onClickAddCart}>
              장바구니
            </Button>
            <Button className="ml-3" variant="default" onClick={buyNow}>
              구매하기
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}


const ProductInfoComponent: React.FC<ProductInfoProps> = ({
  name,
  brand,
  proTag,
  like,
  productId,
  rating,
  discountRate,
  salesPrice,
  originalPrice,
  children,
  PriceTable,
  shortDescription
}) => {
  return (
    <>
      <div className="w-full pl-3 pt-3 laptop:w-1/2 pr-3 w-max-[640px]">
        <div className="w-full mt-6 laptop:px-3 laptop:ml-8 laptop:mr-4 border-b border-gray-03">
          <div className="w-full flex justify-between">
            <div className="text-gray-06 text-[13px] pb-3 inline-block">{brand}</div>
            <div className="hidden laptop:inline-block laptop:justify-end">
              <LikeAndShareComponent like={like} productId={productId} />
            </div>
          </div>
          <div className="text-2xl">{name}</div>
          <div className="hidden laptop:block mt-2">
            <RatingAndLikeComponent rating={rating.reviewScore} review={rating.reviewCount} like={rating.likeCount} />
          </div>
          <div className="hidden laptop:block">{shortDescription}</div>
          {proTag.map((item, index) => {
            return (
              <div
                key={index}
                className="inline-block text-[12px] text-center text-gray-06 bg-gray-02 rounded-2xl mt-3 mb-4 mr-2 py-0.5 px-1.5"
              >
                {item}
              </div>
            )
          })}
          <div className="laptop:hidden">
            <RatingAndLikeComponent rating={rating.reviewScore} review={rating.reviewCount} like={rating.likeCount} />
          </div>
        </div>
        <ProductPriceInfo
          originalPrice={originalPrice}
          salesPrice={salesPrice}
          discountRate={discountRate}
          PriceTable={PriceTable ?? false}
        />
        <div className="w-full mr-4 mt-3 laptop:px-3 laptop:ml-8 laptop:mr-4 border-b border-gray-03 flex items-center text-center">
          <div className="text-[13px] text-gray-08 pb-3 w-1/4 flex pl-4 px-auto items-center text-center">배송비</div>
          <div className="pb-3 w-auto text-left justify-between items-center laptop:flex laptop:text-center laptop:w-full">
            <div className="text-[13px] text-gray-08 pb-3 w-auto text-left laptop:pb-0">
              3,000원 (50,000원 이상 구매 시 무료배송)
            </div>
            <div className="flex text-gray-06 text-[12px] pt-1 laptop:text-right items-center laptop:flex laptop:pt-0">
              추가 배송비 안내 <i className="xi-error-o"></i>
            </div>
          </div>
        </div>
        <div className="hidden laptop:block laptop:w-full ml-7 h-auto">{children}</div>
      </div>
    </>
  )
}

const ProductPriceInfo: React.FC<ProductPriceInfoProps> = (props) => {
  return (
    <>
      {props.PriceTable ? (
        <SubscriptionPrice originalPrice={props.originalPrice} salesPrice={props.salesPrice} />
      ) : (
        <StoreProductPrice originalPrice={props.originalPrice} salesPrice={props.salesPrice} />
      )}
    </>
  )
}

const StoreProductPrice: React.FC<ProductPriceInfoProps> = ({ originalPrice, salesPrice, discountRate }) => {
  return (
    <div className="w-full mr-4 mt-6 laptop:px-3 laptop:ml-8 laptop:mr-4 border-b border-gray-03">
      <div className="text-gray-06 line-through mb-2">{originalPrice.toLocaleString()}원</div>
      <div className="text-3xl font-semibold mb-4">
        <span className="text-sys-green ">{discountRate}%</span>
        <span className="ml-4">{salesPrice.toLocaleString()}원</span>
      </div>
    </div>
  )
}

const SubscriptionPrice: React.FC<ProductPriceInfoProps> = ({}) => {
  return (
    <div className="w-full mr-4 mt-6 laptop:px-3 laptop:ml-8 laptop:mr-4 border-b border-gray-03">
      <div className="w-full mb-2 border border-yellow-03 min-h-[200px] rounded">
        <div className="bg-yellow-02 w-full min-h-[30px]">

        </div>
      </div>
    </div>
  )
}

export default RatingAndLikeComponent
export {
  OrderButton,
  LikeAndShareComponent,
  OrderBottomModal,
  ProductOptionComponent,
  ProductOptionBottomComponent,
  ProductInfoComponent,
}
