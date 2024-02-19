import type { Meta, StoryObj } from '@storybook/react'
import SearchProductResultItem from '@/components/product/item/index'

const meta = {
  title: 'Meowtimes/Components/SearchProductResultItem',
  component: SearchProductResultItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { exclude: ['isSoldOut'] },
  },
} satisfies Meta<typeof SearchProductResultItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    searchProduct: {
      "productId": "1",
      "productName": "더 벤토나이트",
      "productAsset": {
        "preview": "http://localhost:3001/assets/preview/29/20230424100235___02__preview.jpg"
      },
      "originalPrice": {
        "__typename": "PriceRange",
        "min": 150000,
        "max": 150000
      },
      "priceWithTax": {
        "__typename": "PriceRange",
        "min": 100000,
        "max": 100000
      },
      "facetValueIds": [
        "1",
        "5",
        "6"
      ],
      "description": "<p>더 벤토나이트입니다</p>",
      "inStock": true,
      "isLike": true
    },
    brandFacetValues: [
      {
        "id": "1",
        "facet": {
          "code": "brand"
        },
        "name": "미우타임즈",
        "code": "미우타임즈",
      },
    ],
    badgeTopFacetValues: [
      {
        "id": "5",
        "facet": {
          "code": "badge-top"
        },
        "name": "베스트",
        "code": "#72B96D",
      },
      {
        "id": "6",
        "facet": {
          "code": "badge-top"
        },
        "name": "신상",
        "code": "#FA8125",
      }
    ],
    badgeBottomFacetValues: [
      {
        "id": "5",
        "facet": {
          "code": "badge-bottom"
        },
        "name": "쿠폰",
        "code": "쿠폰",
      },
      {
        "id": "6",
        "facet": {
          "code": "badge-bottom"
        },
        "name": "타임딜",
        "code": "타임딜",
      }
    ]
  },
}

export const SoldOut: Story = {
  args: {
    searchProduct: {
      "productId": "1",
      "productName": "더 벤토나이트",
      "productAsset": {
        "preview": "http://localhost:3001/assets/preview/29/20230424100235___02__preview.jpg"
      },
      "originalPrice": {
        "__typename": "PriceRange",
        "min": 150000,
        "max": 150000
      },
      "priceWithTax": {
        "__typename": "PriceRange",
        "min": 100000,
        "max": 100000
      },
      "facetValueIds": [
        "1",
        "5",
        "6"
      ],
      "description": "<p>더 벤토나이트입니다</p>",
      "inStock": false,
      "isLike": true
    },
    brandFacetValues: [
      {
        "id": "1",
        "facet": {
          "code": "brand"
        },
        "name": "미우타임즈",
        "code": "미우타임즈",
      },
    ],
    badgeTopFacetValues: [
      {
        "id": "5",
        "facet": {
          "code": "badge"
        },
        "name": "베스트",
        "code": "#72B96D",
      },
      {
        "id": "6",
        "facet": {
          "code": "badge"
        },
        "name": "신상",
        "code": "#FA8125",
      }
    ],
    badgeBottomFacetValues: []
  },
}
