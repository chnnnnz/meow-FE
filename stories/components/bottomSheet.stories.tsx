import type { Meta, StoryObj } from '@storybook/react'
import BottomSheet from 'components/common/bottomSheet'

const meta = {
  title: 'Meowtimes/Components/Modal/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { exclude: ['children'] },
  },
} satisfies Meta<typeof BottomSheet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <div className="h-[200px] flex items-center place-content-center">짧은 내용</div>
      </>
    ),
  },
}

export const LongContent: Story = {
  args: {
    children: (
      <>
        <div className="h-[500px] flex items-center place-content-center">긴 내용</div>
      </>
    ),
  },
}

export const FixedWidth: Story = {
  args: {
    children: (
      <>
        <div className="h-[200px] flex items-center place-content-center">짧은 내용</div>
      </>
    ),
    className: '!w-[400px]',
  },
}