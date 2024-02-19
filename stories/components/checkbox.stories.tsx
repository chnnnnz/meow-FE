import type { Meta, StoryObj } from '@storybook/react'
import CheckBox from 'components/common/checkbox'

const meta = {
  title: 'Meowtimes/Components/CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof CheckBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: '체크박스',
  },
}
