import { selectedVariantsState } from '@/store'
import Count from '../count'
import { useRecoilState } from 'recoil'
import { ProductDetailFragment } from '@/modules/gql/generated'

export type SelectedVariantComponentProps = {
  selectedVariant: { variant: ProductDetailFragment['variants'][0], count: number }
}

function SelectedVariantComponent(props: SelectedVariantComponentProps) {
  const [selectedVariants, setSelectedVariants] = useRecoilState(selectedVariantsState)
  
  function chagneCount(amount: number) {
    let targetCount
    if (amount < 0 && props.selectedVariant.count < amount) {
      targetCount = 0
    } else {
      targetCount = props.selectedVariant.count + amount
    }
    const idx = selectedVariants.findIndex((selectedVariant) => selectedVariant.variant.id === props.selectedVariant.variant.id)
    const newSelectedVariants = [...selectedVariants]
    newSelectedVariants.splice(idx, 1, { variant: props.selectedVariant.variant, count: targetCount })
    setSelectedVariants(newSelectedVariants)
  }

  function onClickRemove() {
    const idx = selectedVariants.findIndex((selectedVariant) => selectedVariant.variant.id === props.selectedVariant.variant.id)
    const newSelectedVariants = [...selectedVariants]
    newSelectedVariants.splice(idx, 1)
    setSelectedVariants(newSelectedVariants)
  }

  return (
    <div className='relative bg-gray-01 px-[16px] laptop:px-[20px] py-[10px]'>
      <div className="body-text-md laptop:body-SB-14-150">{props.selectedVariant.variant.name}</div>
      <div className="flex justify-between mt-[14px]">
        <Count onClickDown={() => chagneCount(-1)} onClickUp={() => chagneCount(1)} count={props.selectedVariant.count} />
        <span className="btn-text-lg laptop:depth-menu-SB-16-150">
          {((props.selectedVariant.variant.priceWithTax / 100) * props.selectedVariant.count).toLocaleString()}원
        </span>
      </div>
      <i className='xi-close absolute top-[8px] right-[20px] text-[14px] text-gray-04 cursor-pointer' onClick={onClickRemove}/>
    </div>
  )
}

export default SelectedVariantComponent