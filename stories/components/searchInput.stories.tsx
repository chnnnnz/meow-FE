import type { Meta, StoryObj } from '@storybook/react'
import { SearchInput } from 'components/common/search'

const meta = {
  title: 'Meowtimes/Components/Search/SearchInput',
  component: SearchInput,
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
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
