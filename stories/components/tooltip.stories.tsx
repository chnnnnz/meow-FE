import type { Meta, StoryObj } from '@storybook/react'
import Tooltip from 'components/common/tooltip'

const meta = {
  title: 'Meowtimes/Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="w-[400px] text-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: '툴팁 제목',
    content: '택배사에 따라 제주 및 도서산간 지역은 추가요금이 발생할 수 있습니다. 추가 금액은 주문서에서 확인하실 수 있습니다.',
  },
}
