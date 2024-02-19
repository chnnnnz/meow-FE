import type { Meta, StoryObj } from '@storybook/react'
import SelectBox from '@components/common/selectbox'

const meta = {
  title: 'Meowtimes/Components/SelectBox',
  component: SelectBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story: any) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ]
} satisfies Meta<typeof SelectBox>

export default meta
type Story = StoryObj<typeof meta>


export const Default: Story = {
  args: {
    name: '선택해주세요',
    type: 'selected',
    array: [
      {
        title: 'option1',
        status: 'active',
      },
      {
        title: 'option2',
        status: 'inactive',
      },
      {
        title: 'option3',
        status: 'default',
      }
    ],
    open: false,
    icon: true,
    className: '',
    disableMsg: '상위 옵션 선택 시 하위 옵션 선택 가능합니다.',
    onClick: () => {},
    onChange: () => {},
  },
}