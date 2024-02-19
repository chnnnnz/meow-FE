import type { Meta, StoryObj } from '@storybook/react'
import Accordion, {OpenAccordion} from 'components/common/accordion'

const meta = {
  title: 'Meowtimes/Components/Accodion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: '제목',
    children: '내용',
  }
} satisfies Meta<typeof Accordion>

const Openmeta = {
  title: 'Meowtimes/Components/OpenAccodion',
  component: OpenAccordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: '제목',
    children: '내용',
    setdefault: true,
    minHeigth: 100
  }
} satisfies Meta<typeof OpenAccordion>

export default meta
type Story = StoryObj<typeof meta>
type OpenStory = StoryObj<typeof Openmeta>
export const Default: Story = {
  args: {
    title: '제목',
    children: '내용',
  },
  argTypes: {
    title: {
      description: '아코디언 제목',
      control: 'text',
      table: {
        defaultValue: { summary: '제목' },
      },
    },
    children: {
      description: '아코디언 내용',
      control: 'text',
      table: {
        defaultValue: { summary: '내용' },
      },
    },
  },
  render: (args) => <Accordion {...args} />,
}

export const Open: OpenStory = {
  args: {
    title: '제목',
    children: '내용',
    setdefault: true,
    minHeigth: 100
  },
  argTypes: {
    title: {
      description: '아코디언 제목',
      control: 'text',
      table: {
        defaultValue: { summary: '제목' },
      },
    },
    children: {
      description: '아코디언 내용',
      control: 'text',
      table: {
        defaultValue: { summary: '내용' },
      },
    },
    setdefault: {
      description: '아코디언 초기값',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    minHeigth: {
      description: '아코디언 최소 높이',
      control: 'number',
      table: {
        defaultValue: { summary: '0' },
      },
    }
  },
  render: (args) => <OpenAccordion {...args} />,
}
