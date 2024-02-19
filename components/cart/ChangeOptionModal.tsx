import Modal from '../common/modal'
import { useAddItemToOrderMutation, useAdjustOrderLineMutation, useProductQuery, useRemoveOrderLinesMutation } from '@/modules/gql/generated'
import OptionGroupsComponent from '../common/optionGroup'
import { selectedOptionIdsState, selectedVariantsState } from '@/store'
import { useRecoilState, useSetRecoilState } from 'recoil'
import SelectedVariantComponent from '../common/selectedVariant'
import Button from '../common/button'
import { useEffect } from 'react'
import { GroupedOrderLine } from '@/modules/hooks/groupedOrderLine'
import { useApolloClient } from '@apollo/client'
import Image from 'next/image'
import BottomSheet from '../common/bottomSheet'

export type ChangeOptionModalProps = {
  groupedOrderLine: GroupedOrderLine
  onClose: () => void
}

function ChangeOptionModal(props: ChangeOptionModalProps) {
  const [selectedVariants, setSelectedVariants] = useRecoilState(selectedVariantsState)
  const setSelectedIds = useSetRecoilState(selectedOptionIdsState)
  const [adjustOrderLine] = useAdjustOrderLineMutation()
  const [removeOrderLines] = useRemoveOrderLinesMutation()
  const [addItemToOrder] = useAddItemToOrderMutation()
  const client = useApolloClient()
  const { data } = useProductQuery({ variables: { id: props.groupedOrderLine.productId } })
  const productDetailFragment = data?.product

  useEffect(() => {
    return () => { 
      setSelectedIds([])
      setSelectedVariants([]) 
    }
  }, [])

  useEffect(() => {
    if (!productDetailFragment) return
    const selected = productDetailFragment.variants.filter((variant) => props.groupedOrderLine.orderLines.find((orderLine) => orderLine.productVariant.id === variant.id))
    setSelectedVariants(selected.map((variant) => ({ variant, count: props.groupedOrderLine.orderLines.find((orderLine) => orderLine.productVariant.id === variant.id)?.quantity || 0 })))
  }, [productDetailFragment])

  if (!productDetailFragment) return <></>

  async function onClickConfirm() {
    for (let i = 0; i < selectedVariants.length; i++) {
      const selectedVariant = selectedVariants[i]
      const prevOrderLine = props.groupedOrderLine.orderLines.find((orderLine) => orderLine.productVariant.id === selectedVariant.variant?.id)
      if (!prevOrderLine) { //added
        await addItemToOrder({
          variables: {
            productVariantId: selectedVariant.variant.id,
            quantity: selectedVariant.count,
          },
        })
      } else if (prevOrderLine && prevOrderLine.quantity !== selectedVariant.count) { //changed
        await adjustOrderLine({
          variables: {
            orderLineId: prevOrderLine.id,
            quantity: selectedVariant.count,
          },
        })
      }
    }
    const removed = props.groupedOrderLine.orderLines.filter((orderLine) => !selectedVariants.find((selectedVariant) => selectedVariant.variant?.id === orderLine.productVariant.id))
    await removeOrderLines({ variables: { orderLineIds: removed.map((orderLine) => orderLine.id) } })
    client.refetchQueries({ include: ['activeOrder'] })
    props.onClose()
  }

  return (
    <>
      <div className="hidden laptop:block">
        <Modal onClose={props.onClose} className='h-[632px]'>
          <div className='flex flex-col h-[456px]'>
            <div className='flex items-center'>
              <div className='title-B-17-150 text-gray-09 flex-1 text-center'>변경할 수량을 선택해 주세요.</div>
              <i className='xi-close text-[24px] text-gray-08 cursor-pointer' onClick={props.onClose}/>
            </div>
            <div className='flex mt-[26px]'>
              <Image src={productDetailFragment.featuredAsset?.preview ?? ''} width={100} height={100} alt='상품이미지' />
              <div className='ml-[11px]'>
                <p className='caption-Lg-14-100 text-gray-08'>미우타임즈</p>
                <p className='title-SB-17-150 text-gray-08'>더 매트</p>
                <p className='mt-[20px] text-gray-04'>29,000</p>
                <p className='title-B-17-150'><span className='text-green-04'>20%</span><span className='text-gray-09'>27,900원</span></p>
              </div>
            </div>
            <div className='my-[24px] w-full h-[1px] bg-gray-02'></div>
            <OptionGroupsComponent optionGroups={productDetailFragment.optionGroups} variants={productDetailFragment.variants} />
            <div className='mt-[12px] divide-y-[8px] divide-white overflow-y-scroll no-scrollbar'>
              {selectedVariants.map((selectedVariant, index) => (
                <SelectedVariantComponent
                  selectedVariant={selectedVariant}
                />
              ))}
            </div>
            <div className='absolute left-0 right-0 bottom-0 border-t-[1px] border-gray-02 pt-[15px] bg-white h-[136px]'>
              <div className='flex place-content-between items-center px-[24px]'>
                <div className='body-SB-14-150 text-gray-08'>총 {selectedVariants.reduce((acc, cur) => acc += cur.count, 0)}개</div>
                <div>
                  <span className='body-SB-14-150 text-gray-08'>총 상품금액</span>
                  <span className='sub-head-B-24-130 text-green-04 ml-[18px]'>{selectedVariants.reduce((acc, cur) => acc += (cur.variant.priceWithTax / 100) * cur.count, 0).toLocaleString()}원</span>
                </div>
              </div>
              <div className='flex mt-[12px] mx-[20px] mb-[20px]'>
                <Button variant='solid' onClick={props.onClose}>취소</Button>
                <Button variant='default' className='ml-[8px]' onClick={onClickConfirm}>확인</Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <div className="laptop:hidden">
        <BottomSheet onClose={props.onClose}>
          <div>
            <div className='px-[16px] max-h-[338px] overflow-scroll no-scrollbar'>
              <OptionGroupsComponent optionGroups={productDetailFragment.optionGroups} variants={productDetailFragment.variants} />
              <div className='mt-[16px] divide-y-[8px] divide-white overflow-y-scroll no-scrollbar'>
                {selectedVariants.map((selectedVariant, index) => (
                  <SelectedVariantComponent
                    selectedVariant={selectedVariant}
                  />
                ))}
              </div>
            </div>
            <div className='border-t-[1px] border-gray-02 mt-[12px]'>
              <div className='flex place-content-between items-center px-[16px] mt-[20px]'>
                <div className='body-text-sm text-gray-09'>총 {selectedVariants.reduce((acc, cur) => acc += cur.count, 0)}개</div>
                <div>
                  <span className='body-text-md text-gray-09'>총 상품금액</span>
                  <span className='title-md text-green-04 ml-[12px]'>{selectedVariants.reduce((acc, cur) => acc += (cur.variant.priceWithTax / 100) * cur.count, 0).toLocaleString()}원</span>
                </div>
              </div>
              <div className='flex mt-[20px] mx-[16px] mb-[8px]'>
                <Button variant='solid' onClick={props.onClose}>취소</Button>
                <Button variant='default' className='ml-[8px]' onClick={onClickConfirm}>확인</Button>
              </div>
            </div>
          </div>
        </BottomSheet>
      </div>
    </>
  )
}

export default ChangeOptionModal