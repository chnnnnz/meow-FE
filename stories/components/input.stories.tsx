import type { Meta, StoryObj } from '@storybook/react'
import Input from 'components/common/input'

const meta = {
  title: 'Meowtimes/Components/Input',
  component: Input,
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
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'name',
    placeholder: 'placeholder',
  },
}
export const Disabled: Story = {
  args: {
    name: 'name',
    placeholder: 'placeholder',
    disabled: true,
  },
}
export const Invalid: Story = {
  args: {
    name: 'name',
    placeholder: 'placeholder',
    value: 'invalid input',
    className: 'border-sys-red',
  },
}
