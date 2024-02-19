import type { Meta, StoryObj } from '@storybook/react'
import RootProvider from '@/app/RootProvider'

const meta = {
  title: 'Meowtimes/Layout/Default',
  component: RootProvider,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
    controls: { include: [] },
  },
} satisfies Meta<typeof RootProvider>

export default meta
type Story = StoryObj<typeof meta>

const Template = () => {
  return (
    <RootProvider>
      <div className="h-[100vh]"></div>
    </RootProvider>
  )
}

export const Default: Story = {
  decorators: [
    (Story) => (
      <RootProvider>
        <div className="h-[100vh]"><Story/></div>
      </RootProvider>
    ),
  ],
}
