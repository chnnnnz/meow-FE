import { Body } from '@/app/RootProvider'
import { SearchProductsDocument } from '@/modules/gql/generated'
import { Meta, StoryObj } from '@storybook/react'
import StorePage from 'components/product'

const meta = {
  title: 'Meowtimes/Page/Store',
  component: StorePage,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/product',
        query: {
          collection_id: '2',
        },
      },
    },
  },
  decorators: [
    (Story) => (
      <Body><Story/></Body>
    ),
  ],
} satisfies Meta<typeof StorePage>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    banners: [
      {
        imageUrl: 'https://d1hp210v61lyyp.cloudfront.net/data/20230905163505_.jpg',
        mobileImageUrl: 'https://d1hp210v61lyyp.cloudfront.net/data/20230905163505__1.jpg',
        linkUrl: '/',
      },
      {
        imageUrl: 'https://d1hp210v61lyyp.cloudfront.net/data/20221221151333_.jpg',
        mobileImageUrl: 'https://d1hp210v61lyyp.cloudfront.net/data/20221221151513_.jpg',
        linkUrl: '/',
      },
    ],
  },
  parameters: {
    apolloClient: {
      mocks: [
        {
          request: {
            query: SearchProductsDocument,
            variables: {
              collectionId: '2',
              take: 25,
              skip: 0
            },
          },
          result: {
            data: {
              "search": {
                "items": [],
                "facetValues": [],
                "totalItems": 0,
              }
            }
          }
        }
      ]
    }
  }
}


const MockSearchProduct = {
  "productId": "1",
  "productName": "더 벤토나이트",
  "productAsset": {
    "preview": "http://localhost:3001/assets/preview/29/20230424100235___02__preview.jpg"
  },
  "originalPrice": 150000,
  "priceWithTax": {
    "__typename": "PriceRange",
    "min": 100000,
    "max": 100000
  },
  "facetValueIds": [
    "2",
    "6",
    "7"
  ],
  "description": "<p>더 벤토나이트입니다</p>",
  "inStock": true,
  "isLike": false,
  "__typename": "SearchResult",
}
const MockFacetValues = [
  {
    "facetValue": {
      "id": "1",
      "facet": {
        "code": "brand"
      },
      "name": "미우타임즈",
      "code": "미우타임즈",
      "__typename": "FacetValue"
    },
    "__typename": "FacetValueResult"
  },
  {
    "facetValue": {
      "id": "2",
      "facet": {
        "code": "brand"
      },
      "name": "페스룸",
      "code": "페스룸",
      "__typename": "FacetValue"
    },
    "__typename": "FacetValueResult"
  },
  {
    "facetValue": {
      "id": "5",
      "facet": {
        "code": "badge-top"
      },
      "name": "베스트",
      "code": "#72B96D",
      "__typename": "FacetValue"
    },
    "__typename": "FacetValueResult"
  },
  {
    "facetValue": {
      "id": "6",
      "facet": {
        "code": "badge-top"
      },
      "name": "신상",
      "code": "#FA8125",
      "__typename": "FacetValue"
    },
    "__typename": "FacetValueResult"
  },
  {
    "facetValue": {
      "id": "7",
      "facet": {
        "code": "badge-bottom"
      },
      "name": "쿠폰",
      "code": "쿠폰",
      "__typename": "FacetValue"
    },
    "__typename": "FacetValueResult"
  },
]
export const One: Story = {
  args: {
    banners: [
      {
        imageUrl: 'https://d1hp210v61lyyp.cloudfront.net/data/20230905163505_.jpg',
        mobileImageUrl: 'https://d1hp210v61lyyp.cloudfront.net/data/20230905163505__1.jpg',
        linkUrl: '/',
      },
      {
        imageUrl: 'https://d1hp210v61lyyp.cloudfront.net/data/20221221151333_.jpg',
        mobileImageUrl: 'https://d1hp210v61lyyp.cloudfront.net/data/20221221151513_.jpg',
        linkUrl: '/',
      },
    ],
  },
  parameters: {
    apolloClient: {
      mocks: [
        {
          request: {
            query: SearchProductsDocument,
            variables: {
              collectionId: '2',
              take: 25,
              skip: 0
            },
          },
          result: {
            data: {
              "search": {
                "items": [
                  {...MockSearchProduct}
                ],
                "facetValues": MockFacetValues,
                "totalItems": 1,
              }
            }
          }
        }
      ]
    }
  }
}

export const Many: Story = {
  args: {
    banners: [
      {
        imageUrl: 'https://d1hp210v61lyyp.cloudfront.net/data/20230905163505_.jpg',
        mobileImageUrl: 'https://d1hp210v61lyyp.cloudfront.net/data/20230905163505__1.jpg',
        linkUrl: '/',
      },
      {
        imageUrl: 'https://d1hp210v61lyyp.cloudfront.net/data/20221221151333_.jpg',
        mobileImageUrl: 'https://d1hp210v61lyyp.cloudfront.net/data/20221221151513_.jpg',
        linkUrl: '/',
      },
    ],
  },
  parameters: {
    apolloClient: {
      mocks: [
        {
          request: {
            query: SearchProductsDocument,
            variables: {
              collectionId: '2',
              take: 25,
              skip: 0
            },
          },
          result: {
            data: {
              "search": {
                "items": [
                  {...MockSearchProduct},
                  {...MockSearchProduct},
                  {...MockSearchProduct},
                  {...MockSearchProduct},
                  {...MockSearchProduct},
                  {...MockSearchProduct},
                  {...MockSearchProduct},
                  {...MockSearchProduct},
                  {...MockSearchProduct},
                  {...MockSearchProduct},
                ],
                "facetValues": MockFacetValues,
                "totalItems": 10,
              }
            }
          }
        }
      ]
    }
  }
}
