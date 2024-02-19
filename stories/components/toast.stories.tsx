import type { Meta, StoryObj } from '@storybook/react'
import Toast from '@/components/common/toast'

const meta = {
  title: 'Meowtimes/Components/Toast',
  component: Toast,
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {
    message: '토스트 메시지',
    image: 'https://d39h0xn1r3o9zb.cloudfront.net/dev/common/icon-like-on.svg',
  },
}