import type { Meta, StoryObj } from '@storybook/react'
import DropDown from 'components/common/dropdown'

const meta = {
  title: 'Meowtimes/Components/DropDown',
  component: DropDown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DropDown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    menus: [
      {
        title: '전체',
        onClick: () => {},
      },
      {
        title: '목욕',
        onClick: () => {},
      },
      {
        title: '미용',
        onClick: () => {},
      },
    ],
    buttonClassName: 'text-[17px] font-medium text-gray-06',
    menuItemClassName: 'text-[16px] font-medium text-gray-06',
    selectedMenuItemClassName: 'text-[16px] font-semibold text-green-03',
    minWidth: '193px',
    padding: '20px',
    menuItemGap: '8px',
  },
}
