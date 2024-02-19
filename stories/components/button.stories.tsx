import type { Meta, StoryObj } from '@storybook/react'
import Button from 'components/common/button'

const meta = {
  title: 'Meowtimes/Components/Button',
  component: Button,
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
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'BUTTON',
  },
}
export const Primary: Story = {
  args: {
    children: 'BUTTON',
    variant: 'primary',
  },
}
export const White: Story = {
  args: {
    children: 'BUTTON',
    variant: 'white',
  },
}
export const Etc: Story = {
  args: {
    children: 'BUTTON',
    variant: 'etc',
  },
}
export const Solid: Story = {
  args: {
    children: 'BUTTON',
    variant: 'solid',
  },
}
export const Inline: Story = {
  args: {
    children: 'BUTTON',
    variant: 'inline',
  },
}
