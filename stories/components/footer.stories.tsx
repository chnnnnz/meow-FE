import type { Meta, StoryObj } from '@storybook/react'
import Footer from 'components/common/footer'

const meta = {
  title: 'Meowtimes/Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
  },
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
}
