import { useEffect, useState } from "react"
import { CartOrderLineFragment, useActiveOrderQuery } from "../gql/generated"
import { useBrandFacetValues } from "./facetValue"

export type GroupedOrderLine = {
  productThumbnail: string,
  productId: string,
  productName: string,
  brand: string,
  orderLines: CartOrderLineFragment[],
  /**
   * 정상가격 @{Product.customFields.originalPrice}
   */
  originalPrice: number,
  /**
   * OrderLine중 최저가격
   */
  salesPrice: number,
  /**
   * originalPrice 대비 할인율
   */
  discountRate: number,
  /**
   * originalPrice * orderLines의 총 orderLine 수량
   */
  totalOriginalPrice: number,
  /**
   * OrderLine들의 총 가격
   */
  totalSalesPrice: number
  /**
   * 총 order line 수
   */
  totalSalesCount: number
}
  
function useGroupedOrderLines() {
  const activeOrderResult = useActiveOrderQuery()
  const activeOrderLines = activeOrderResult.data?.activeOrder?.lines ? activeOrderResult.data?.activeOrder?.lines : []
  const [groupedOrderLines, setGroupedOrderLines] = useState<GroupedOrderLine[]>([])
  
  useEffect(() => {
    let newGroupedOrderLines: GroupedOrderLine[] = []
    newGroupedOrderLines = activeOrderLines.reduce((acc, cur) => {    
      const idx = acc.findIndex((item) => item.productId === cur.productVariant.product.id)
      if (idx !== -1) {
        acc[idx].orderLines.push(cur)
        if (acc[idx].salesPrice > cur.unitPriceWithTax) {
          acc[idx].salesPrice = cur.unitPriceWithTax
        }
        const originalPrice = (cur.productVariant.product.customFields?.originalPrice ?? 0) > cur.unitPriceWithTax 
          ? (cur.productVariant.product.customFields?.originalPrice ?? 0)
          : cur.unitPriceWithTax 
        acc[idx].totalOriginalPrice += (originalPrice / 100) * cur.quantity
        acc[idx].totalSalesPrice += (cur.unitPriceWithTax / 100) * cur.quantity
        acc[idx].totalSalesCount += cur.quantity
      } else {
        const originalPrice = (cur.productVariant.product.customFields?.originalPrice ?? 0) > cur.unitPriceWithTax
          ? (cur.productVariant.product.customFields?.originalPrice ?? 0) / 100
          : cur.unitPriceWithTax / 100
        const salesPrice = cur.unitPriceWithTax / 100
        const brandFacetValues = useBrandFacetValues(cur.productVariant.product.facetValues)
        acc.push({
          productThumbnail: cur.featuredAsset?.preview ?? '',
          productId: cur.productVariant.product.id, 
          originalPrice: originalPrice, 
          salesPrice: salesPrice,
          orderLines: [cur],
          discountRate: originalPrice === 0 || originalPrice === salesPrice ? 0 : Math.floor(((originalPrice - salesPrice) / originalPrice) * 100),
          brand: brandFacetValues.length >  0 ? brandFacetValues[0].name : '',
          productName: cur.productVariant.product.name,
          totalOriginalPrice: originalPrice * cur.quantity,
          totalSalesPrice: salesPrice * cur.quantity,
          totalSalesCount: cur.quantity
        })
      }
      
      return acc
    }, newGroupedOrderLines)

    setGroupedOrderLines(newGroupedOrderLines)
  }, [JSON.stringify(activeOrderLines)])

  return groupedOrderLines
}

export default useGroupedOrderLines