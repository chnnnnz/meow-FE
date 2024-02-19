import RootProvider from '@/app/RootProvider'
import type { Meta, StoryObj } from '@storybook/react'
import CartPage from 'components/cart'

const meta = {
  title: 'Meowtimes/Page/Cart',
  component: CartPage,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/cart',
      },
    },
  },
} satisfies Meta<typeof CartPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    subscriptionCartGroups: [
      {
        title: '벤토나이트',
        shippingFee: 3000,
        items: [
          {
            id: 1,
            brand: '미우타임즈',
            name: '더 벤토나이트/6kg',
            normarPrice: 5000,
            subscriptionPrice: 4000,
            quantity: 1,
            state: 'normal',
          },
          {
            id: 2,
            brand: '미우타임즈',
            name: '더 벤토나이트2/6kg',
            normarPrice: 6000,
            subscriptionPrice: 5000,
            quantity: 2,
            state: 'soldout',
          },
        ],
      },
      {
        title: '카사바',
        shippingFee: 3000,
        items: [
          {
            id: 3,
            brand: '미우타임즈',
            name: '더 카사바/6kg',
            normarPrice: 6000,
            subscriptionPrice: 5000,
            quantity: 1,
            state: 'normal',
          },
          {
            id: 4,
            brand: '미우타임즈',
            name: '더 카사바/6kg',
            normarPrice: 7000,
            subscriptionPrice: 6000,
            quantity: 2,
            state: 'soldout',
          },
        ],
      },
    ],
  },
  decorators: [
    (Story) => (
      <RootProvider>
        <Story />
      </RootProvider>
    ),
  ],
}

export const Empty: Story = {
  args: {
    subscriptionCartGroups: [],
  },
  decorators: [
    (Story) => (
      <RootProvider>
        <Story />
      </RootProvider>
    ),
  ],
}
