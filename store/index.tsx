import { ProductDetailFragment } from '@/modules/gql/generated'
import { ProductDetail } from '@/types'
import { atom } from 'recoil'

export const selectedOptionIdsState = atom<string[]>({
  key: 'selectedOptionIdsState',
  default: []
})

export const selectedVariantsState = atom<{variant: ProductDetailFragment['variants'][0], count: number}[]>({
  key: 'selectedVariantsState',
  default: [],
})

export const counterState = atom({
  key: 'counterState',
  default: 1,
})

export const checkoutGroupedOrderLineIdsState = atom<string[]>({
  key: 'checkoutGroupedOrderLineIdsState',
  default: []
})

//fixme remove test data
export const storeDetailState = atom<ProductDetail>({
  key: "storeDetailState",
  default:
    {
      product_index: "1",
      product_images: ["https://d1wbv0oufvynu1.cloudfront.net/product/32c357195dab9aeb8fcbe8552316f939.png", "https://d1wbv0oufvynu1.cloudfront.net/product/7aaffd386affa356bf3a48e8dffca6f9.png"],
      product_badge: ["https://d1hp210v61lyyp.cloudfront.net/data/20221221224430_.png", "https://d1hp210v61lyyp.cloudfront.net/data/20221221224434_.png"],
      product_brand: "미우타임즈",
      product_name: "the standard",
      product_subname: "상품 특징 제목", // pc 버전만 출력
      product_description: "상품 특징 설명", // pc 버전만 출력
      product_tag: ["쿠폰", "개별배송"],
      product_cost_price: 29900,
      product_sales_price: 19900,
      product_quantity: 10000,
      product_detail: "detail.jpg", // html
      is_promotion: "true",
      is_like: "true",
      is_like_count: "1,234",
      option : [
        {
          option_name: "색상",
          option_value: ["옵션값1", "옵션값2", "옵션값3", "옵션값1", "옵션값2", "옵션값3", "옵션값1", "옵션값2", "옵션값3", "옵션값1", "옵션값2", "옵션값3", "옵션값1", "옵션값2", "옵션값3"],
          option_price: [100, 200, 300],
          required: true,
        },
        {
          option_name: "용량",
          option_value: ["옵션값11", "옵션값22", "옵션값33"],
          option_price: [200, 400, 600],
        }
      ],
      // 리뷰 정보
      review_count: "1,011",
      review_score: 3.3,
      // 카테고리 정보
      category_precaution: "상품 구매 시 주의사항", // html
      category_exchange_guide: "반품/교환 안내" // html
    }
  ,
})