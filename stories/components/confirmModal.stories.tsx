import type { Meta, StoryObj } from '@storybook/react'
import ConfirmModal from '@/components/common/modal/ConfirmModal'

const meta = {
  title: 'Meowtimes/Components/Modal/ConfirmModal',
  component: ConfirmModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ConfirmModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: '정말 아주 매우 엄청나게 진짜 대박으로 길고 길고 길고 길고 길고 또 긴 제목입니다',
    content: '내용입니다',
  },
}
export const OnlyTitle: Story = {
  args: {
    title: '제목만있습니다',
  },
}
export const OnlyContent: Story = {
  args: {
    content: '내용만있습니다',
  },
}