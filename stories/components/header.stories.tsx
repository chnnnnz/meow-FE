import type { Meta, StoryObj } from '@storybook/react'
import Header from 'components/common/header'

const meta = {
  title: 'Meowtimes/Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/',
        query: {
          category_id: '1-1',
        },
      },
    },
    controls: { include: ['cartCount', 'loggedIn', 'collapsed', 'categoryMode', 'centerTitle', 'title'] },
  },
  argTypes: {
    
  },
  args: {},
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  
}

