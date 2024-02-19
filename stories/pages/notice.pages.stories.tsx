import RootProvider from '@/app/RootProvider'
import LayoutProvider from '@/app/cs/layout'
import type { Meta, StoryObj } from '@storybook/react'
import NoticePage from '@/app/cs/notice/page'

const meta = {
    title: 'Meowtimes/Page/notice',
    component: NoticePage,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        nextjs: {
            navigation: {
                pathname: '/cs/notice',
            },
        },
    },
} satisfies Meta<typeof NoticePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        noticeList : [
            {
                title : "제목길이 테스트입니다  제목길이 테스트입니다 제목길이 테스트입니다 제목길이 테스트입니다 제목길이 테스트입니다 제목길이 테스트입니다 제목길이 테스트입니다 제목길이 테스트입니다 제목길이 테스트입니다",
                date : "2023-12-12",
                type : "fixed",
                index : 1,
                content:'내용물'
            },
            {
                title : "제목",
                date : "2023-12-23", 
                type : "list",
                index : 7,
                content:'내용물'
            },
            {
                title : "제목",
                date : "2023-12-09",
                type : "fixed",
                index : 6,
                content:'내용물'
            },
            {
                title : "제목길이 테스트입니다  제목길이 테스트입니다 제목길이 테스트입니다 제목길이 테스트입니다 제목길이 테스트입니다 제목길이 테스트입니다 제목길이 테스트입니다 제목길이 테스트입니다 제목길이 테스트입니다",
                date : "2023-11-12", 
                type : "list",
                index : 12,
                content:'내용물'
            }
        ]
    },
    decorators: [
        (Story) => (
        <RootProvider>
            <LayoutProvider>
                <Story />
            </LayoutProvider>
        </RootProvider>
        ),
    ],
}

