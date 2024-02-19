import type { Meta, StoryObj } from '@storybook/react'
import { BorderedTabView } from '@/components/common/tabview'

const meta = {
  title: 'Meowtimes/Components/TabView/BorderedTabView',
  component: BorderedTabView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BorderedTabView>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    tabs: ['Tab 1', 'Tab 2', 'Tab 3'],
    initialActiveIndex: 0,
    tabStyle: 'h-[60px]',
    activeTextStyle: 'font-bold text-gray-09',
    textStyle: 'font-semibold text-gray-06',
  },
}
