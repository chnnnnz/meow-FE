import type { Meta, StoryObj } from '@storybook/react'
import RegInput from 'components/account/register/ui'

const meta = {
  title: 'Meowtimes/Components/RegInput',
  component: RegInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    topLabel: '아이디',
    placeholder: '아이디를 입력해주세요.',
    name: 'userID',
    span: '로그인 아이디로 사용할 이메일을 입력해 주세요.',
  },
} satisfies Meta<typeof RegInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    topLabel: '아이디',
    placeholder: '아이디를 입력해주세요',
  },
}

export const Error: Story = {
  args: {
    topLabel: '아이디',
    placeholder: 'Invalid Id',
  },
}
