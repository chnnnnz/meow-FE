import RootProvider from '@/app/RootProvider'
import SubscriptionDetailComponent from '@components/subscription/[id]'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Meowtimes/Page/SubscriptionDetail',
  component: SubscriptionDetailComponent,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/product/1',
        query: {
          category_id: '2-2-1',
        },
      },
    },
  },
} satisfies Meta<typeof SubscriptionDetailComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    product_index: 1,
    product_images: [
      'https://d1wbv0oufvynu1.cloudfront.net/product/32c357195dab9aeb8fcbe8552316f939.png',
      'https://d1wbv0oufvynu1.cloudfront.net/product/7aaffd386affa356bf3a48e8dffca6f9.png',
    ],
    product_badge: [
      'https://d1hp210v61lyyp.cloudfront.net/data/20221221224430_.png',
      'https://d1hp210v61lyyp.cloudfront.net/data/20221221224434_.png',
    ],
    product_brand: "브랜드명",
    product_name: "상품명",
    product_subname: "상품명 2", // pc 버전만 출력
    product_description: "상품 설명", // pc 버전만 출력
    product_tag: ['쿠폰', '개별배송'],
    product_cost_price: 20000,
    product_sales_price: 10000,
    product_quantity: 100,
    product_subscription_price: 9900, // 6회차 구독 금액
    product_weight: 6,
    product_detail: "", // html
    is_promotion: "",
    is_like: true,
    is_like_count: '1,234',
    review_count: "1012",
    review_score: 4.5,
    flag_subscription: "구독중", // 구독중, 구독 정지중, 미구독
    product_subscription_discount_section: [1, 3, 6, 10], // 구독 할인 구간
    product_subscription_price_list: [11900, 10900, 9900, 5000], // 1회차, 3회차, 6회차 구독 금액
    product_subscription_reserve_rate: [10, 20, 30, 40], // 1회차, 3회차, 6회차 적립률(%)
    category_precaution: "상품 구매 시 주의사항", // html
    category_exchange_guide: "반품/교환 안내" // html
  },
  decorators: [
    (Story) => (
      <RootProvider>
        <Story />
      </RootProvider>
    ),
  ],
}
