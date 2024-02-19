import RootProvider from '@/app/RootProvider'
import type { Meta, StoryObj } from '@storybook/react'
import RegisterPage from 'components/account/register'

const meta = {
  title: 'Meowtimes/Page/Register',
  component: RegisterPage,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/account/register',
      },
    },
  },
} satisfies Meta<typeof RegisterPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story) => (
      <RootProvider>
        <Story />
      </RootProvider>
    ),
  ],
}
