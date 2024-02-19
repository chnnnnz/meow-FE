import type { Meta, StoryObj } from '@storybook/react'
import Datepicker from 'components/common/datepicker'

const meta = {
  title: 'Meowtimes/Components/datepicker',
  component: Datepicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Datepicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    
  },
}
