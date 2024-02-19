import type { Meta, StoryObj } from '@storybook/react'
import { RecommandedKeywords } from 'components/common/search'

const meta = {
  title: 'Meowtimes/Components/Search/RecommandedKeyword',
  component: RecommandedKeywords,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="w-[600px] text-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RecommandedKeywords>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    keywords: ['#고양이 화장실', '#사료', '#스프레이', '#장난감', '#스크래처', '#퓨레', '#부스터', '#세트상품', '#저키'],
  },
}
