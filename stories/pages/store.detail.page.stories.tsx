import RootProvider from '@/app/RootProvider'
import StoreDetailComponent from '@components/product/[id]'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Meowtimes/Page/StoreDetail',
  component: StoreDetailComponent,
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
} satisfies Meta<typeof StoreDetailComponent>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
      __typename: 'Product', 
      id: '2', 
      name: '더 벤토나이트', 
      description: '상품 설명', 
      customFields: { 
       __typename: 'ProductCustomFields', 
       shortDescription: '상품 소개', 
       originalPrice: 150000 
     }, 
     featuredAsset: {
        __typename: 'Asset', 
        preview: 'https://d1wbv0oufvynu1.cloudfront.net/product/32c357195dab9aeb8fcbe8552316f939.png' 
     }, 
     assets: [
       { __typename: 'Asset', preview: 'https://d1wbv0oufvynu1.cloudfront.net/product/32c357195dab9aeb8fcbe8552316f939.png' },
       { __typename: 'Asset', preview: 'https://d1wbv0oufvynu1.cloudfront.net/product/7aaffd386affa356bf3a48e8dffca6f9.png' }
     ], 
     variants: [
       { 
         __typename: 'ProductVariant', 
         id: '1', 
         name: '빨강 6kg', 
         stockLevel: "10", 
         priceWithTax: 150000,
         options: [
           { 
             __typename: 'ProductOption', 
             id: '1', 
             groupId: '1' 
           }
         ] 
       }
     ], 
     optionGroups: [
       { 
         __typename: 'ProductOptionGroup', 
         id: '1', 
         name: '색상', 
         options: [
           { 
             __typename: 'ProductOption', 
             id: '1', 
             name: '빨강' 
           }
         ] 
       }
     ], 
     facetValues: [
       {
        id: "1",
        facet: {
          code: "brand"
        },
        name: "미우타임즈",
        code: "미우타임즈",
        __typename: "FacetValue"
       },
       {
        id: "2",
        facet: {
          code: "brand"
        },
        name: "페스룸",
        code: "페스룸",
        __typename: "FacetValue"
       },
       {
        id: "5",
        facet: {
          code: "badge-top"
        },
        name: "베스트",
        code: "#72B96D",
        __typename: "FacetValue"
       },
       {
        id: "6",
        facet: {
          code: "badge-top"
        },
        name: "신상",
        code: "#FA8125",
        __typename: "FacetValue"
       },
       {
        id: "7",
        facet: {
          code: "badge-bottom"
        },
        name: "쿠폰",
        code: "쿠폰",
        __typename: "FacetValue"
       },
     ]
  },
  decorators: [
    (Story) => (
      <RootProvider>
        <Story />
      </RootProvider>
    ),
  ],
}
