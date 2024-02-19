import { ProductDetailFragment } from '@/modules/gql/generated'
import { selectedOptionIdsState, selectedVariantsState } from '@/store'
import { useRecoilState } from 'recoil'
import SelectBox, { SelectBoxProps } from '../selectbox'
import { useState } from 'react'

export type OptionGroupsComponentProps = {
  optionGroups: ProductDetailFragment['optionGroups']
  variants: ProductDetailFragment['variants']
}
function OptionGroupsComponent(props: OptionGroupsComponentProps) {
  const [selectedOptionIds, setSelectedOptionIds] = useRecoilState(selectedOptionIdsState)
  const [selectedVariants, setSelectedVariants] = useRecoilState(selectedVariantsState)
  const [openOption, setOpenOption] = useState<number | null>(null)

  const selectOptionId = (groupIdx: number, optionsId: string) => {
    setOpenOption(null)
    const newSelectedOptionIds = selectedOptionIds.slice(0, groupIdx).concat(optionsId)
    setSelectedOptionIds(newSelectedOptionIds)

    const allOptionSelected = props.optionGroups.length === newSelectedOptionIds.length
    if (allOptionSelected) {
      const variant = props.variants.find((variant) =>
        variant.options.every((option) => newSelectedOptionIds.includes(option.id)),
      )
      if (variant) {
        const idx = selectedVariants.findIndex((selectedVariant) => selectedVariant.variant?.id === variant.id)
        if (idx >= 0) {
          const newSelectedVariants = [...selectedVariants]
          newSelectedVariants.splice(idx, 1, { ...selectedVariants[idx], count: selectedVariants[idx].count + 1 })
          setSelectedVariants(newSelectedVariants)
          setSelectedOptionIds([])
        } else {
          setSelectedVariants([...selectedVariants, { variant: variant, count: 1 }])
          setSelectedOptionIds([])
        }
        setSelectedOptionIds([])
      }
    }
  }

  const selectOpen = (index: number | null) => {
    if (openOption === index) {
      setOpenOption(null)
      return
    }
    setOpenOption(index)
  }

  return (
    <div className='divide-y-[8px] laptop:divide-y-[12px] divide-transparent'>
      {props.optionGroups.map((optionGroup, index) => {
        const variantCandidates =
          selectedOptionIds.length === 0
            ? props.variants
            : props.variants.filter((variant) =>
                selectedOptionIds
                  .slice(0, index)
                  .every((optionId) => variant.options.map((option) => option.id).includes(optionId)),
              )
        const optionCandidates = variantCandidates.flatMap((variant) => variant.options.map((option) => option.id))
        const selectableOptions = optionGroup.options
          .filter((option) => optionCandidates.includes(option.id))
          .map((option) => {
            return {
              id: option.id,
              title: option.name,
              status: 'active',
            }
          }) satisfies SelectBoxProps['array']

        const selectedIdx = selectableOptions.findIndex((option) => option.id === selectedOptionIds[index])
        return (
          <SelectBox
            key={index}
            name={
              optionGroup.options.find((option) => option.id === selectedOptionIds[Number(optionGroup.id)])?.name ??
              optionGroup.name
            }
            selectedIndex={selectedIdx < 0 ? undefined : selectedIdx}
            type={selectedOptionIds.length >= index ? 'normal' : 'disabled'}
            disableMsg={'상위 옵션을 선택해주세요.'}
            array={selectableOptions}
            icon={true}
            open={openOption === index}
            onClick={() => {
              selectOpen(index)
            }}
            onChange={(idx) => {
              selectOptionId(index, selectableOptions[idx].id)
            }}
          />
        )
      })}
    </div>
  )
}

export default OptionGroupsComponent
