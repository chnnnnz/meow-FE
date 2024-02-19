import { use, useEffect, useState } from 'react'
import Button from '../common/button'
import CheckBox from '../common/checkbox'
import Container from '../common/container'
import Image from 'next/image'
import EmptyCart from './EmptyCart'
import { useRouter } from 'next/navigation'
import useModal from '@/modules/hooks/modal'
import Tooltip from '../common/tooltip'

export type SubscriptionCartGroup = {
  title: string
  shippingFee: number
  items: SubscriptionCartItem[]
}
export type SubscriptionCartItem = {
  id: number
  brand: string
  name: string
  normarPrice: number
  subscriptionPrice: number
  quantity: number
  state: 'normal' | 'soldout'
}
export type SubscriptionCartProps = {
  groups: SubscriptionCartGroup[]
}

function SubscriptionCart(props: SubscriptionCartProps) {
  const [checkedItems, setCheckedItems] = useState<SubscriptionCartItem[]>([])
  const [totalShippingFee, setTotalShippingFee] = useState(0)

  function onCheckedAll(checked: boolean) {
    if (checked) {
      setCheckedItems(props.groups.flatMap((group) => group.items))
      setTotalShippingFee(props.groups.reduce((acc, cur) => acc + cur.shippingFee, 0))
    } else {
      setCheckedItems([])
      setTotalShippingFee(0)
    }
  }

  function onCheckedItems(checked: boolean, items: SubscriptionCartItem[]) {
    let newCheckedItems: SubscriptionCartItem[] = []
    let newTotalShippingFee = 0
    if (checked) {
      newCheckedItems = [...checkedItems]
      const checkedIds = checkedItems.map((item) => item.id)
      items.forEach((item) => {
        if (!checkedIds.includes(item.id)) {
          newCheckedItems.push(item)
        }
      })
      setCheckedItems(newCheckedItems)
    } else {
      const ids = items.map((item) => item.id)
      newCheckedItems = checkedItems.filter((checkedItem) => !ids.includes(checkedItem.id))
      setCheckedItems(newCheckedItems)
    }
    props.groups.forEach((group) => {
      const groupHasCheckedItem = group.items.some(
        (item) => newCheckedItems.find((checkedItem) => checkedItem.id === item.id) !== undefined,
      )
      if (groupHasCheckedItem) {
        newTotalShippingFee += group.shippingFee
      }
    })
    setTotalShippingFee(newTotalShippingFee)
  }

  return (
    <>
      {props.groups.length == 0 && <EmptyCart onClickShopping={() => useRouter().push('/subscription')} />}
      {props.groups.length > 0 && (
        <div className="pb-[120px] bg-gray-01 laptop:bg-white">
          <CartHeader
            checked={checkedItems.length === props.groups.flatMap((group) => group.items).length}
            onCheckAll={onCheckedAll}
          />
          <Container>
            {props.groups.map((group, index) => (
              <SubscriptionGroupComponent
                key={index}
                group={group}
                checkedItems={checkedItems}
                onCheckedItems={onCheckedItems}
              />
            ))}
          </Container>
          <SubscriptionCartTotal checkedItems={checkedItems} totalShippingFee={totalShippingFee} />
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
  function Desktop(props: CartHeaderProps) {
    return (
      <Container className="hidden laptop:block">
        <div className="mt-[20px] text-[17px] text-gray-09 font-medium">
          <i className="xi-error text-[16px] text-green-03 mr-[10px]" />
          정기구독 상품의 경우, 카테고리별로 구독 신청이 가능합니다.{' '}
          <span className="text-gray-05">(서로 다른 카테고리의 구독 상품은 동시에 구독 신청이 불가합니다.)</span>
        </div>
        <div className="flex place-content-between items-center py-[12px]">
          <CheckBox label="전체선택" checked={props.checked} onChange={props.onCheckAll} />
          <div className="flex">
            <Button variant='inline' className="!w-[104px] !h-[36px]" onClick={props.onRemoveSelected}>선택삭제</Button>
            <Button variant='inline' className="!w-[104px] !h-[36px] ml-[8px]" onClick={props.onRemoveSoldOut}>품절삭제</Button>
          </div>
        </div>
        <div className="h-[8px] bg-gray-01 mt-[20px]" />
      </Container>
    )
  }
  function Mobile(props: CartHeaderProps) {
    return (
      <>
        <Container className="pt-[44px] laptop:hidden bg-white">
          <div className="flex place-content-between items-center py-[12px]">
            <CheckBox
              label="전체선택"
              boxSize="25px"
              labelClassName="text-[14px] text-gray-09"
              checked={props.checked}
              onChange={props.onCheckAll}
            />
            <div className="flex">
              <Button variant='inline' className="!w-[58px] !h-[29px]" onClick={props.onRemoveSelected}>선택삭제</Button>
              <Button variant='inline' className="!w-[58px] !h-[29px] ml-[8px]" onClick={props.onRemoveSoldOut}>품절삭제</Button>
            </div>
          </div>
        </Container>

        <Container className="bg-gray-01 py-[16px] laptop:hidden text-center">
          <div className="text-[13px] text-gray-08 font-medium">
            <i className="xi-error text-[14px] text-green-03 mr-[4px]" />
            정기구독 상품의 경우, 카테고리별로 구독 신청이 가능합니다.{' '}
            <span className="block text-[12px] text-gray-05">
              (서로 다른 카테고리의 구독 상품은 동시에 구독 신청이 불가합니다.)
            </span>
          </div>
        </Container>
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

type SubscriptionGroupComponentProps = {
  group: SubscriptionCartGroup
  checkedItems: SubscriptionCartItem[]
  onCheckedItems: (checked: boolean, items: SubscriptionCartItem[]) => void
}
function SubscriptionGroupComponent(props: SubscriptionGroupComponentProps) {
  const groupNormalTotalPrice = props.checkedItems
    .reduce((acc, cur) => acc + (props.group.items.some((item) => item.id === cur.id) ? cur.normarPrice : 0), 0)
    .toLocaleString()
  const groupSubscriptionTotalPrice = props.checkedItems
    .reduce((acc, cur) => acc + (props.group.items.some((item) => item.id === cur.id) ? cur.subscriptionPrice : 0), 0)
    .toLocaleString()
  function Desktop(props: SubscriptionGroupComponentProps) {
    return (
      <div className="hidden laptop:block mt-[24px] mb-[60px]">
        <div className="flex items-center">
          <span className="text-[24px] font-bold text-gray-09 ml-[8px]">{props.group.title}</span>
          <span className="text-[17px] font-medium text-gray-09 ml-[20px]">
            배송비 {props.group.shippingFee.toLocaleString()}원
          </span>
        </div>
        <table className="table-fixed w-full mt-[20px]">
          <thead className="text-gray-08 font-medium border-y-[1px] border-gray-02 h-[54px]">
            <th className="w-[70px]">
              <CheckBox
                checked={props.group.items.every((item) =>
                  props.checkedItems.map((checkedItem) => checkedItem.id).includes(item.id),
                )}
                onChange={(checked) => props.onCheckedItems(checked, props.group.items)}
              />
            </th>
            <th className="w-[480px]">상품정보</th>
            <th>수량</th>
            <th>일반 결제</th>
            <th>구독 결제</th>
            <th className="w-[70px]"></th>
          </thead>
          <tbody className="divide-y divide-gray-02">
            {props.group.items.map((item) => (
              <SubscriptionCartItemComponent
                key={item.id}
                item={item}
                checked={props.checkedItems.find((checkedItem) => checkedItem.id === item.id) !== undefined}
                onCheckedItem={(checked) => props.onCheckedItems(checked, [item])}
              />
            ))}
          </tbody>
        </table>
        <div className="flex h-[96px] place-content-between items-center bg-gray-01 pl-[46px] pr-[36px]">
          <div className="flex text-gray-08 items-center">
            <span className="font-semibold">일반 결제 시</span>
            <span className="ml-[8px] text-[24px] font-bold">{groupNormalTotalPrice}원</span>
            <span className="text-[18px] font-medium text-gray-03 mx-[16px]">|</span>
            <span className="font-semibold">구독 결제 시</span>
            <span className="ml-[8px] text-[24px] font-bold">{groupSubscriptionTotalPrice}원</span>
          </div>
          <Button variant='white' className="w-[216px] !h-[46px]">
            벤토나이트 구독하기
          </Button>
          
        </div>
      </div>
    )
  }
  function Mobile(props: SubscriptionGroupComponentProps) {
    return (
      <div className="laptop:hidden border-[1px] border-gray-02 bg-white mb-[20px]">
        <div className="flex items-center h-[53px] border-b-[1px] border-gray-02 place-content-between px-[14px]">
          <span className="text-[16px] font-semibold text-gray-09">벤토나이트</span>
          <span className="text-[13px] font-medium text-gray-07">배송비 3,000원</span>
        </div>
        <div className="px-[14px] divide-y-[1px] divide-gray-02 relative">
          {props.group.items.map((item) => (
            <SubscriptionCartItemComponent
              key={item.id}
              item={item}
              checked={props.checkedItems.find((checkedItem) => checkedItem.id === item.id) !== undefined}
              onCheckedItem={(checked) => props.onCheckedItems(checked, [item])}
            />
          ))}
          <div className="flex items-center place-content-between py-[20px]">
            <div>
              <div>
                <span className="text-[13px] font-medium text-gray-08">일반 결제 시</span>
                <span className="text-[16px] font-bold text-green-04 ml-[8px]">{groupNormalTotalPrice}원</span>
              </div>
              <div>
                <span className="text-[13px] font-medium text-gray-08">구독 결제 시</span>
                <span className="text-[16px] font-bold text-gray-08 ml-[8px]">{groupSubscriptionTotalPrice}원</span>
              </div>
            </div>
            <div className="px-[14px] py-[15px] border-[1px] border-gray-09 rounded-[4px] text-[14px] font-semibold text-gray-09">
              벤토나이트 구독하기
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <Desktop {...props} />
      <Mobile {...props} />
    </>
  )
}

type SubscriptionCartItemProps = {
  item: SubscriptionCartItem
  checked: boolean
  onCheckedItem: (checked: boolean, item: SubscriptionCartItem) => void
}
function SubscriptionCartItemComponent(props: SubscriptionCartItemProps) {
  function Desktop(props: SubscriptionCartItemProps) {
    return (
      <tr className="text-center hidden laptop:table-row">
        <td className="align-top pt-[36px]">
          <CheckBox checked={props.checked} onChange={(checked) => props.onCheckedItem(checked, props.item)} />
        </td>
        <td className="text-left py-[32px]">
          <div className="flex">
            <div className="relative">
              <Image
                src="https://d1hp210v61lyyp.cloudfront.net/product/20230424100235_.jpg"
                width={120}
                height={120}
                alt="상품이미지"
              />
              {props.item.state === 'soldout' && (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-09/30 font-bold text-white flex items-center place-content-center">
                  선착순 모집 마감
                </div>
              )}
            </div>
            <div className="ml-[20px]">
              <div className="text-gray-08">{props.item.brand}</div>
              <div className="text-gray-09 text-[20px] font-semibold mt-[4px]">{props.item.name}</div>
              <Button variant='inline' className='mt-[20px] laptop:!body-M-14-150 !rounded-[2px]'>수량 변경하기</Button>
            </div>
          </div>
        </td>
        <td className="text-[17px] font-semibold text-gray-09">{props.item.quantity}</td>
        <td className="relative text-[17px] font-medium text-gray-07">
          {props.item.normarPrice.toLocaleString()}원
          <div className="h-[120px] w-[1px] bg-gray-02 inline-block absolute right-0 top-[30px]"></div>
        </td>
        <td className="text-[17px] font-bold text-gray-09">{props.item.subscriptionPrice.toLocaleString()}원</td>
        <td>
          <i className="xi-close text-[20px] text-gray-06 cursor-pointer" />
        </td>
      </tr>
    )
  }
  function Mobile(props: SubscriptionCartItemProps) {
    return (
      <div className="flex px-[2px] py-[20px] items-start relative laptop:hidden">
        <CheckBox
          boxSize="25px"
          checked={props.checked}
          onChange={(checked) => props.onCheckedItem(checked, props.item)}
        />
        <Image
          src="https://d1hp210v61lyyp.cloudfront.net/product/20230424100235_.jpg"
          width={80}
          height={80}
          alt="상품이미지"
          className="ml-[4px]"
        />
        <div className="ml-[12px] flex-1">
          <div className="text-[12px] font-medium text-gray-07">{props.item.brand}</div>
          <div className="text-[14px] font-semibold text-gray-09">{props.item.name}</div>
          <div className="flex items-center mt-[14px]">
            <span>{props.item.quantity}개</span>
            <div className="px-[8px] py-[6px] border-[1px] border-gray-02 rounded-[2px] ml-[10px]">수량 변경하기</div>
          </div>
          <div className="flex place-content-between mt-[14px]">
            <span className="text-[13px] text-gray-05 font-medium">일반 결제</span>
            <span className="text=[14px] font-bold text-gray-08">{props.item.normarPrice.toLocaleString()}원</span>
          </div>
          <div className="flex place-content-between mt-[4px]">
            <span className="text-[13px] text-gray-05 font-medium">구독 결제</span>
            <span className="text=[14px] font-bold text-gray-08">
              {props.item.subscriptionPrice.toLocaleString()}원
            </span>
          </div>
        </div>
        <i className="xi-close text-[16px] text-gray-04 cursor-pointer p-[4px] absolute top-[20px] right-[16px] z-0" />
      </div>
    )
  }
  return (
    <>
      <Desktop {...props} />
      <Mobile {...props} />
    </>
  )
}

type SubscriptionCartTotalProps = {
  checkedItems: SubscriptionCartItem[]
  totalShippingFee: number
}
function SubscriptionCartTotal(props: SubscriptionCartTotalProps) {
  const [isTooltipOpen, openTooltip, closeTooltip] = useModal()
  const totalPrice = props.checkedItems.reduce((acc, cur) => acc + cur.normarPrice, 0).toLocaleString()
  const totalShippingFee = props.totalShippingFee.toLocaleString()
  const normalTotalPriceIncludeShippingFee = props.checkedItems
    .reduce((acc, cur) => acc + cur.normarPrice, props.totalShippingFee)
    .toLocaleString()
  const subscriptionTotalPriceIncludeShippingFee = props.checkedItems
    .reduce((acc, cur) => acc + cur.subscriptionPrice, props.totalShippingFee)
    .toLocaleString()

  function Desktop(props: SubscriptionCartTotalProps) {
    return (
      <Container>
        <div className="hidden laptop:block">
          <div className="mt-[20px] border-t-[3px] border-b-[1px] border-gray-07">
            <div className="flex py-[19px] text-[17px] font-semibold text-gray-07 text-center place-content-center">
              <div className="w-[160px]">총 상품금액</div>
              <div className="w-[20px]" />
              <div className="w-[160px]">배송비</div>
              <div className="flex-1 max-w-[148px]" />
              <div className="w-[200px] font-bold text-gray-09">일반 결제 시</div>
              <div className="w-[200px] text-green-03">
                <div className='w-fit inline-block relative'>
                  <span>구독 결제 시</span>
                  <i className="xi-info-o ml-[4px] text-[16p] cursor-pointer" onClick={openTooltip}/>
                  {isTooltipOpen && <Tooltip title='구독 결제 안내' content='표시된 구독 결제 시 가격은 1회차 기준이며, 구독 회차에 따라 추가 할인이 적용됩니다.' align='right' onClose={closeTooltip}/>}
                </div>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-02"></div>
            <div className="flex items-center py-[34px] text-[24px] text-gray-08 font-semibold text-center place-content-center">
              <div className="w-[160px]">
                {totalPrice}
                <span className="text-[17px] font-medium">원</span>
              </div>
              <div className="w-[20px]">
                <i className="xi-plus-circle text-gray-09 text-[20px]" />
              </div>
              <div className="w-[160px]">
                {totalShippingFee}
                <span className="text-[17px] font-medium">원</span>
              </div>
              <div className="flex-1 max-w-[148px] text-[20px] text-gray-09 font-bold">=</div>
              <div className="w-[200px]">
                {normalTotalPriceIncludeShippingFee}
                <span className="text-[17px] font-medium">원</span>
              </div>
              <div className="w-[200px]">
                {subscriptionTotalPriceIncludeShippingFee}
                <span className="text-[17px] font-medium">원</span>
              </div>
            </div>
          </div>
          <div className='text-center'>
            <Button className="mt-[80px] !w-[432px]">
              구매하기
            </Button>
          </div>
        </div>
      </Container>
    )
  }
  function Mobile(props: SubscriptionCartTotalProps) {
    return (
      <div className="laptop:hidden">
        <div className="bg-white py-[20px] px-[16px]">
          <div className="flex items-center place-content-between">
            <span className="text-gray-08 font-medium">총 상품 금액</span>
            <span className="text-gray-09 font-bold text-[15px]">{totalPrice}원</span>
          </div>
          <div className="flex items-center place-content-between mt-[12px]">
            <span className="text-gray-08 font-medium">배송비</span>
            <span className="text-gray-09 font-bold text-[15px]">{totalShippingFee}</span>
          </div>
          <div className="h-[1px] w-full bg-gray-02 my-[12px]" />
          <div className="flex items-center place-content-between">
            <span className="text-gray-09 font-medium">일반 결제 시</span>
            <span className="text-gray-09 font-bold text-[15px]">{normalTotalPriceIncludeShippingFee}원</span>
          </div>
          <div className="flex items-center place-content-between mt-[16px]">
            <div className="flex items-center">
              <span className="text-gray-09 font-bold">구독 결제 시</span>
              <i className="xi-info-o text-[16px] text-green-03 ml-[4px] cursor-pointer" onClick={openTooltip}/>
            </div>
            <span className="text-green-04 font-bold text-[20px]">{subscriptionTotalPriceIncludeShippingFee}원</span>
          </div>
          <div className='relative'>
            {isTooltipOpen && <Tooltip title='구독 결제 안내' content='표시된 구독 결제 시 가격은 1회차 기준이며, 구독 회차에 따라 추가 할인이 적용됩니다.' align='left' onClose={closeTooltip}/>}
          </div>
        </div>
        <div className="fixed laptop:hidden bottom-0 left-0 right-0 border-t-[1px] border-gray-02 z-[1] bg-white py-[8px] px-[16px]">
          <Button className="h-[48px] mt-[0px] text-[15px] font-bold">
            구매하기
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Desktop {...props} />
      <Mobile {...props} />
    </>
  )
}

export default SubscriptionCart
