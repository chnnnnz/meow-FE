import { useEffect, useState } from 'react'
import Button from '../common/button'
import CheckBox from '../common/checkbox'
import Container from '../common/container'
import Image from 'next/image'
import EmptyCart from './EmptyCart'
import { useRouter } from 'next/navigation'
import {
  CartOrderLineFragment,
  useActiveOrderQuery,
  useAdjustOrderLineMutation,
  useEligibleShippingMethodsLazyQuery,
  useRemoveOrderLinesMutation,
  useSetOrderShippingMethodMutation,
} from '@/modules/gql/generated'
import { useSetRecoilState } from 'recoil'
import { checkoutGroupedOrderLineIdsState } from '@/store'
import useGroupedOrderLines, { GroupedOrderLine } from '@/modules/hooks/groupedOrderLine'
import useCustomer from '@/modules/hooks/customer'
import useConfirmModal from '@/modules/hooks/confirmModal'
import ConfirmModal from '../common/modal/ConfirmModal'
import Link from 'next/link'
import ChangeOptionModal from './ChangeOptionModal'
import useModal from '@/modules/hooks/modal'

export type StoreCartItem = {
  id: number
  brand: string
  name: string
  originalPrice: number
  salesPrice: number
  state: 'normal' | 'soldout'
}
function StoreCart() {
  const router = useRouter()
  const [isChangeOptionModalOpened, openChangeOptionModal, closeChangeOptionModal] = useModal()
  const [changeOptionGroupedOrderLine, setChangeOptionGroupedOrderLine] = useState<GroupedOrderLine>()
  const [checkedItems, setCheckedItems] = useState<GroupedOrderLine[]>([])
  const [adjustOrderLine] = useAdjustOrderLineMutation()
  const [removeOrderLines] = useRemoveOrderLinesMutation({
    refetchQueries: ['activeOrder'],
  })

  const groupedOrderLines = useGroupedOrderLines()

  useEffect(() => {
    groupedOrderLines
      .flatMap((item) => item.orderLines)
      .forEach((orderLine) => {
        if (orderLine.productVariant.priceWithTax !== orderLine.unitPriceWithTax) {
          //장바구니 담은 후 가격 바뀐 경우
          adjustOrderLine({
            variables: {
              orderLineId: orderLine.id,
              quantity: orderLine.quantity,
            },
          })
        }
      })
  }, [groupedOrderLines])

  useEffect(() => {
    setCheckedItems(
      groupedOrderLines.filter((groupedOrderLine) =>
        checkedItems.map((checkedItem) => checkedItem.productId).includes(groupedOrderLine.productId),
      ),
    )
  }, [groupedOrderLines])

  function onCheckedAll(checked: boolean) {
    if (checked) {
      setCheckedItems(groupedOrderLines)
    } else {
      setCheckedItems([])
    }
  }

  function onCheckedItem(checked: boolean, item: GroupedOrderLine) {
    let newCheckedItems: GroupedOrderLine[] = []
    if (checked) {
      newCheckedItems = [...checkedItems]
      const checkedIds = checkedItems.map((item) => item.productId)
      if (!checkedIds.includes(item.productId)) {
        newCheckedItems.push(item)
      }
      setCheckedItems(newCheckedItems)
    } else {
      newCheckedItems = checkedItems.filter((checkedItem) => checkedItem.productId !== item.productId)
      setCheckedItems(newCheckedItems)
    }
  }

  function onRemoveSelected() {
    removeOrderLines({
      variables: {
        orderLineIds: checkedItems.flatMap((item) => item.orderLines.map((orderLine) => orderLine.id)),
      },
    })
  }

  function onRemoveSoldout() {
    removeOrderLines({
      variables: {
        orderLineIds: checkedItems.flatMap((item) =>
          item.orderLines
            .filter((orderLine) => orderLine.productVariant.stockLevel !== 'IN_STOCK')
            .map((orderLine) => orderLine.id),
        ),
      },
    })
  }

  return (
    <>
      {isChangeOptionModalOpened && changeOptionGroupedOrderLine && <ChangeOptionModal groupedOrderLine={changeOptionGroupedOrderLine} onClose={closeChangeOptionModal}/>}
      {groupedOrderLines.length == 0 && <EmptyCart onClickShopping={() => router.push('/product')} />}
      {groupedOrderLines.length > 0 && (
        <div className="pb-[120px] bg-gray-01 laptop:bg-white">
          <CartHeader
            checked={checkedItems.length == groupedOrderLines.length}
            onCheckAll={onCheckedAll}
            onRemoveSelected={onRemoveSelected}
            onRemoveSoldOut={onRemoveSoldout}
          />
          <Container>
            <StoreCartItemsComponent
              items={groupedOrderLines}
              checkedItems={checkedItems}
              onCheckedItem={onCheckedItem}
              onClickChangeOption={(item) => {
                setChangeOptionGroupedOrderLine(item)
                openChangeOptionModal()
              }}
            />
          </Container>
          <StoreCartTotal checkedItems={checkedItems} />
        </div>
      )}
    </>
  )
}

type CartHeaderProps = {
  checked: boolean
  onCheckAll?: (checked: boolean) => void
  onRemoveSelected?: () => void
  onRemoveSoldOut?: () => void
}

function CartHeader(props: CartHeaderProps) {
  return (
    <Container className="pt-[44px] bg-white laptop:pt-[63px]">
      <div className="hidden laptop:flex place-content-between items-center">
        <CheckBox
          label="전체선택"
          checked={props.checked}
          onChange={props.onCheckAll}
          labelClassName="title-B-17-150"
        />
        <div className="flex">
          <Button variant="inline" className="!w-[104px] !h-[36px]" onClick={props.onRemoveSelected}>
            선택삭제
          </Button>
          <Button variant="inline" className="!w-[104px] !h-[36px] ml-[8px]" onClick={props.onRemoveSoldOut}>
            품절삭제
          </Button>
        </div>
      </div>
      <div className="flex laptop:hidden place-content-between items-center py-[12px]">
        <CheckBox
          label="전체선택"
          boxSize="25px"
          labelClassName="body-text-lg"
          checked={props.checked}
          onChange={props.onCheckAll}
        />
        <div className="flex">
          <Button variant="inline" className="!w-[58px] !h-[29px] !px-[0px]" onClick={props.onRemoveSelected}>
            선택삭제
          </Button>
          <Button variant="inline" className="!w-[58px] !h-[29px] ml-[8px] !px-[0px]" onClick={props.onRemoveSoldOut}>
            품절삭제
          </Button>
        </div>
      </div>
    </Container>
  )
}

type StoreCartItemsComponentProps = {
  items: GroupedOrderLine[]
  checkedItems: GroupedOrderLine[]
  onCheckedItem?: (checked: boolean, item: GroupedOrderLine) => void
  onClickChangeOption?: (item: GroupedOrderLine) => void
}
function StoreCartItemsComponent(props: StoreCartItemsComponentProps) {
  const checkedIds = props.checkedItems.map((item) => item.productId)
  function Desktop(props: StoreCartItemsComponentProps) {
    return (
      <>
        <table className="hidden laptop:table w-full mt-[20px]">
          <thead className="text-gray-08 font-medium border-y-[1px] border-gray-02 h-[54px]">
            <th className="w-3/5 min-w-[630px]">상품정보</th>
            <th>상품 주문 금액</th>
            <th className="max-w-[152px]"></th>
          </thead>
          <tbody className="divide-y divide-gray-02">
            {props.items.map((groupedOrderLine) => (
              <StoreCartItemComponent
                key={groupedOrderLine.productId}
                item={groupedOrderLine}
                checked={checkedIds.includes(groupedOrderLine.productId)}
                onCheckedItem={props.onCheckedItem}
                onClickChangeOption={props.onClickChangeOption}
              />
            ))}
          </tbody>
        </table>
      </>
    )
  }
  function Mobile(props: StoreCartItemsComponentProps) {
    return (
      <>
        <div className="laptop:hidden">
          {props.items.map((groupedOrderLine) => (
            <StoreCartItemComponent
              key={groupedOrderLine.productId}
              item={groupedOrderLine}
              checked={checkedIds.includes(groupedOrderLine.productId)}
              onCheckedItem={props.onCheckedItem}
              onClickChangeOption={props.onClickChangeOption}
            />
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <Desktop {...props} />
      <Mobile {...props} />
    </>
  )
}

type StoreCartItemComponentProps = {
  item: GroupedOrderLine
  checked: boolean
  onCheckedItem?: (checked: boolean, item: GroupedOrderLine) => void
  onClickChangeOption?: (item: GroupedOrderLine) => void
}
function StoreCartItemComponent(props: StoreCartItemComponentProps) {
  const [isConfirmOpened, confirmTitle, confirmContent, onPositive, openConfirm, closeConfirm] = useConfirmModal()
  const customer = useCustomer()
  const router = useRouter()
  const setCheckoutGroupedOrderLineIds = useSetRecoilState(checkoutGroupedOrderLineIdsState)
  const [removeOrderLines] = useRemoveOrderLinesMutation({
    refetchQueries: ['activeOrder'],
  })

  function onClickRemove() {
    removeOrderLines({
      variables: {
        orderLineIds: props.item.orderLines.map((orderLine) => orderLine.id),
      },
    })
  }

  function OptionComponent(props: CartOrderLineFragment & { salesPrice: number }) {
    const inStock = props.productVariant.stockLevel === 'IN_STOCK'

    function onClickRemove() {
      removeOrderLines({
        variables: {
          orderLineIds: [props.id],
        },
      })
    }

    const priceDiff = props.unitPriceWithTax / 100 - props.salesPrice
    return (
      <>
        <div className="bg-gray-01 rounded-[4px] px-[12px] py-[10px] laptop:px-[8px] laptop:py-[7px] mt-[8px] flex place-content-between items-center">
          <span className={`body-text-sm laptop:body-M-14-150 ${inStock ? 'text-gray-07' : 'text-gray-03'}`}>
            옵션: {props.productVariant.name}
            {priceDiff > 0 ? `(+${priceDiff.toLocaleString()})` : ''} / {props.quantity}개
            {!inStock && (
              <span className="bg-gray-04 rounded-[2px] px-[6px] py-[4px] caption-sm laptop:caption-RG-12-130 text-white ml-[16px]">
                상품 준비중
              </span>
            )}
          </span>
          <i
            className="xi-close-circle w-[24] h-[24] text-gray-03 text-[18px] laptop:text-[14px] cursor-pointer"
            onClick={onClickRemove}
          />
        </div>
      </>
    )
  }

  function onClickPurchaseNow() {
    if (!customer) {
      openConfirm({
        title: '로그인이 필요합니다.',
        content: '로그인 페이지로 이동하시겠습니까?',
        onPositive: () => {
          closeConfirm()
          router.push('/account/login')
        },
      })
    } else {
      setCheckoutGroupedOrderLineIds([props.item.productId])
      router.push('/checkout')
    }
  }

  function Desktop(props: StoreCartItemComponentProps) {
    return (
      <>
        <tr className="text-center hidden laptop:table-row">
          <td className="text-left py-[32px]">
            <div className="flex items-start pl-[20px]">
              <CheckBox checked={props.checked} onChange={(checked) => props.onCheckedItem?.(checked, props.item)} />
              <Link href={`/product/${props.item.productId}`}>
                <div className="relative ml-[24px]">
                  <Image
                    src={props.item.productThumbnail}
                    width={120}
                    height={120}
                    alt="상품이미지"
                  />
                  {props.item.orderLines.every((item) => item.productVariant.stockLevel !== 'IN_STOCK') && (
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-09/30 font-bold text-white flex items-center place-content-center">
                      상품 준비중
                    </div>
                  )}
                </div>
              </Link>
              <div className="ml-[20px] flex-1">
                <div className="caption-Lg-14-100 text-gray-08">{props.item.brand}</div>
                <div className="sub-head-SB-20-150 text-gray-09 mt-[4px]">{props.item.productName}</div>
                <div className="mt-[8px]">
                  <span className="title-SB-17-150 text-green-04">{props.item.discountRate}%</span>
                  <span className="title-B-17-150 text-gray-09 ml-[4px]">
                    {props.item.salesPrice.toLocaleString()}원
                  </span>
                  <span className="text-gray-04 line-through ml-[4px]">
                    {props.item.originalPrice.toLocaleString()}원
                  </span>
                </div>
                <div className="mt-[4px] max-w-[404px]">
                  {props.item.orderLines.map((orderLine) => (
                    <OptionComponent {...orderLine} salesPrice={props.item.salesPrice} key={orderLine.id} />
                  ))}
                </div>
                <Button variant="inline" className="mt-[8px] laptop:!body-M-14-150 !rounded-[2px]" onClick={() => props.onClickChangeOption?.(props.item)}>
                  옵션 변경하기
                </Button>
              </div>
              <div className="w-[1px] h-[230px] bg-gray-02" />
            </div>
          </td>
          <td>
            <div className="flex flex-col items-center place-content-center">
              <div className="body-M-14-150 text-gray-06">(총 {props.item.totalSalesCount}개)</div>
              <div className="title-B-17-150 text-gray-09">{props.item.totalSalesPrice.toLocaleString()}원</div>
              {props.item.orderLines.some((line) => line.productVariant.stockLevel === 'IN_STOCK') && (
                <Button
                  variant="inline"
                  className="mt-[8px] laptop:!title-SB-17-150 !rounded-[4px] !border-gray-09"
                  onClick={onClickPurchaseNow}
                >
                  바로 구매하기
                </Button>
              )}
              {props.item.orderLines.every((line) => line.productVariant.stockLevel !== 'IN_STOCK') && (
                <Button
                  variant="inline"
                  className="mt-[8px] laptop:!title-SB-17-150 border-[0px] !bg-gray-02 !w-[124px] !text-gray-03"
                >
                  상품 준비중
                </Button>
              )}
            </div>
          </td>
          <td>
            <i className="xi-close text-[20px] text-gray-06 p-[12px] cursor-pointer" onClick={onClickRemove} />
          </td>
        </tr>
      </>
    )
  }

  function Mobile(props: StoreCartItemComponentProps) {
    return (
      <div className="laptop:hidden border-[1px] border-gray-02 bg-white mt-[20px] px-[14px] py-[20px]">
        <div className="flex items-start">
          <CheckBox
            boxSize="25px"
            checked={props.checked}
            onChange={(checked) => props.onCheckedItem?.(checked, props.item)}
          />
          <div className="relative ml-[4px]">
            <Image
              src={props.item.productThumbnail}
              width={80}
              height={80}
              alt="상품이미지"
            />
            {props.item.orderLines.every((item) => item.productVariant.stockLevel !== 'IN_STOCK') && (
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-09/30 font-bold text-white flex items-center place-content-center">
                상품 준비중
              </div>
            )}
          </div>
          <div className="ml-[12px] flex-1">
            <div className="caption-sm text-gray-07">브랜드</div>
            <div className="body-text-md text-gray-09">상품명</div>
            <div className="text-[12px] text-gray-04 font-medium mt-[5px] line-through">
              {props.item.originalPrice?.toLocaleString()}
            </div>
            <div>
              <span className="text-lg text-green-04">20%</span>
              <span className="text-lg text-gray-09 ml-[4px]">{props.item.salesPrice.toLocaleString()}</span>
            </div>
          </div>
          <i className="xi-close text-[16px] text-gray-04 p-[4px] cursor-pointer" onClick={onClickRemove} />
        </div>
        <div className="mt-[12px]">
          {props.item.orderLines.map((orderLine) => (
            <OptionComponent {...orderLine} salesPrice={orderLine.unitPriceWithTax} key={orderLine.id} />
          ))}
        </div>
        <div className="flex place-content-between mt-[23px]">
          <span className="body-sm text-gray-09">총 {props.item.totalSalesCount}개</span>
          <div>
            <span className="body-md text-gray-09">상품 주문 금액</span>
            <span className="title-md text-green-04 ml-[12px]">{props.item.totalSalesPrice.toLocaleString()}원</span>
          </div>
        </div>
        {props.item.orderLines.some((line) => line.productVariant.stockLevel === 'IN_STOCK') && (
          <div className="flex mt-[16px]">
            <Button variant="white" className="flex-1 !h-[48px] !border-gray-03" onClick={() => props.onClickChangeOption?.(props.item)}>
              옵션 변경하기
            </Button>
            <Button variant="white" className="flex-1 !h-[48px] ml-[7px]">
              바로 구매하기
            </Button>
          </div>
        )}
        {props.item.orderLines.every((line) => line.productVariant.stockLevel !== 'IN_STOCK') && (
          <Button variant="solid" disabled className="!h-[48px] mt-[16px]">
            상품 준비중
          </Button>
        )}
      </div>
    )
  }

  return (
    <>
      {isConfirmOpened && (
        <ConfirmModal
          title={confirmTitle}
          content={confirmContent}
          onPositiveClick={onPositive}
          onNegativeClick={closeConfirm}
        />
      )}
      <Desktop {...props} />
      <Mobile {...props} />
    </>
  )
}

type StoreCartTotalProps = {
  checkedItems: GroupedOrderLine[]
}
function StoreCartTotal(props: StoreCartTotalProps) {
  const router = useRouter()
  const setCheckoutGroupedOrderLineIds = useSetRecoilState(checkoutGroupedOrderLineIdsState)
  const [setOrderShippingMethod] = useSetOrderShippingMethodMutation()
  const [getEligibleShippingMethods] = useEligibleShippingMethodsLazyQuery()
  const [isConfirmOpened, confirmTitle, confirmContent, onPositive, openConfirm, closeConfirm] = useConfirmModal()
  const customer = useCustomer()
  const activeOrderResult = useActiveOrderQuery()

  useEffect(() => {
    setShippingMethod()
  }, [activeOrderResult.data?.activeOrder?.shippingLines])

  async function setShippingMethod() {
    const res = await getEligibleShippingMethods()
    const methods = res.data?.eligibleShippingMethods ?? []

    if (
      methods.length > 0 &&
      (activeOrderResult.data?.activeOrder?.shippingLines.length === 0 ||
        activeOrderResult.data?.activeOrder?.shippingLines[0].priceWithTax !== methods[0]?.priceWithTax)
    ) {
      setOrderShippingMethod({
        variables: {
          id: [methods[0].id],
        },
        refetchQueries: ['activeOrder'],
      })
    }
  }

  const totalCount = props.checkedItems.reduce((acc, checkedItem) => {
    const subTotal = checkedItem.orderLines.reduce((acc, orderLine) => (acc += orderLine.quantity), 0)
    acc += subTotal
    return acc
  }, 0)
  const totalPrice = props.checkedItems.reduce((acc, checkedItem) => {
    acc += checkedItem.totalSalesPrice
    return acc
  }, 0)
  const totalShippingFee =
    props.checkedItems.length === 0 ? 0 : (activeOrderResult?.data?.activeOrder?.shippingWithTax ?? 0) / 100
  const totalPriceIncludeShippingFee = totalPrice + totalShippingFee
  let freeShippingThreshold = 50000
  
  if ((activeOrderResult.data?.activeOrder?.shippingLines?.length ?? 0) > 0) {
    const threshold = activeOrderResult.data?.activeOrder?.shippingLines?.[0]?.shippingMethod?.calculator?.args?.find((arg) => arg.name === 'freeShippingPriceThreshold')?.value
    if (threshold) {
      freeShippingThreshold = Number(threshold) / 100
    }
  }
  let freeShippingThresholdString = ''
  if (freeShippingThreshold === 0) {
    freeShippingThresholdString = `0원`
  } else if (freeShippingThreshold < 1000) {
    freeShippingThresholdString = `${freeShippingThreshold}원`
  } else if (freeShippingThreshold < 10000) {
    freeShippingThresholdString = `${freeShippingThreshold / 1000}천원`
  } else {
    freeShippingThresholdString = `${freeShippingThreshold / 10000}만원`
  }

  function onClickPurchase() {
    if (props.checkedItems.length === 0) {
      openConfirm({
        content: '구매할 상품을 선택해주세요.',
        onPositive: () => {
          closeConfirm()
        },
      })
    } else if (!customer) {
      openConfirm({
        title: '로그인이 필요합니다.',
        content: '로그인 페이지로 이동하시겠습니까?',
        onPositive: () => {
          closeConfirm()
          router.push('/account/login')
        },
      })
    } else if (props.checkedItems.length > 0) {
      setCheckoutGroupedOrderLineIds(props.checkedItems.map((item) => item.productId))
      router.push('/checkout')
    }
  }

  function Desktop() {
    return (
      <Container>
        <div className="hidden laptop:block">
          <div className="mt-[48px] border-t-[3px] border-b-[1px] border-gray-07">
            <div className="flex py-[19px] title-SB-17-150 text-gray-07 text-center place-content-center">
              <div className="w-[50px]"></div>
              <div className="w-[170px]">총 상품금액</div>
              <div className="w-[35px]" />
              <div className="w-[170px]">배송비</div>
              <div className="flex-1 max-w-[148px]" />
              <div className="w-[200px] text-green-03">총 결제 금액</div>
            </div>
            <div className="flex items-center py-[34px] text-[24px] text-gray-08 font-semibold text-center place-content-center">
              <div className="title-M-17-150">총 {totalCount}개</div>
              <div className="w-[170px]">
                {totalPrice.toLocaleString()}
                <span className="text-[17px] font-medium">원</span>
              </div>
              <div className="w-[35px]">
                <i className="xi-plus-circle text-gray-09 text-[20px]" />
              </div>
              <div className="w-[170px]">
                {totalShippingFee.toLocaleString()}
                <span className="text-[17px] font-medium">원</span>
                <p className="caption-M-12-150 test-gray-06">({freeShippingThresholdString} 이상 구매시 무료배송)</p>
              </div>
              <div className="flex-1 max-w-[148px] text-[20px] text-gray-09 font-bold">=</div>
              <div className="w-[200px]">
                {totalPriceIncludeShippingFee.toLocaleString()}
                <span className="text-[17px] font-medium">원</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button className="mt-[80px] !w-[432px]" onClick={onClickPurchase}>
              구매하기
            </Button>
          </div>
        </div>
      </Container>
    )
  }
  function Mobile() {
    return (
      <div className="laptop:hidden mt-[20px]">
        <div className="bg-white py-[20px] px-[16px]">
          <div className="flex items-center place-content-between">
            <span className="body-text-sm text-gray-08">총 상품 금액</span>
            <span className="btn-text-lg text-gray-09">{totalPrice.toLocaleString()}원</span>
          </div>
          <div className="flex items-center place-content-between mt-[12px]">
            <span className="body-text-sm text-gray-08">배송비</span>
            <span className="btn-text-lg text-gray-09">{totalShippingFee.toLocaleString()}원</span>
          </div>
          <div className="caption-md text-gray-05">({freeShippingThresholdString} 이상 결제 시 무료)</div>
          <div className="h-[1px] w-full bg-gray-02 my-[12px]" />
          <div className="flex items-center place-content-between">
            <span className="body-text-lg text-gray-09">총 결제 금액</span>
            <span className="title-md text-green-04">{totalPriceIncludeShippingFee.toLocaleString()}원</span>
          </div>
        </div>
        <div className="fixed laptop:hidden bottom-0 left-0 right-0 border-t-[1px] border-gray-02 z-[1] bg-white py-[8px] px-[16px]">
          <Button onClick={onClickPurchase}>구매하기</Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {isConfirmOpened && (
        <ConfirmModal
          title={confirmTitle}
          content={confirmContent}
          onPositiveClick={onPositive}
          onNegativeClick={closeConfirm}
        />
      )}
      <Desktop />
      <Mobile />
    </>
  )
}

export default StoreCart
