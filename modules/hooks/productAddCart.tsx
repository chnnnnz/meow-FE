import { ProductDetailFragment, useAddItemsToOrderMutation } from '@/modules/gql/generated'
function useAddItemsToOrder():[(selectedVariants: {
  variant: ProductDetailFragment["variants"][0];
  count: number
}[], sucessCallback: () => void, errorCallback: () => void) => Promise<void>]{
  const [addItemsToOrder] = useAddItemsToOrderMutation()

  const addItems = async (selectedVariants: { variant: ProductDetailFragment['variants'][0], count: number }[], sucessCallback: () => void, errorCallback: () => void ) => {
    try {
      const res = await addItemsToOrder({
        variables: {
          input: {
            items: selectedVariants.map((selectedVariant) => ({
              productVariantId: selectedVariant.variant.id,
              quantity: selectedVariant.count,
            })),
          },
        },
      })
      if (res.data?.addItemsToOrder.__typename === 'Order') {
        sucessCallback()
      } else if (res.errors?.find((e) => e.message === 'INSUFFICIENT_STOCK_ERROR')) {
        errorCallback()
      }
    } catch (error) {
      //TODO : error handling
      console.error('Error while adding items to order:', error)
    }
  }

  return [addItems]
}

export default useAddItemsToOrder;
