import type { Meta, StoryObj } from '@storybook/react'
import Modal from '@/components/common/modal'

const meta = {
  title: 'Meowtimes/Components/Modal/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { exclude: ['children'] },
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onClose: () => {},
    children: <div className='w-[400px] h-[300px]'>ex) 400x300 짜리 내용이면 이렇게 나옴</div>,
  },
}
