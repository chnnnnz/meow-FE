import RootProvider from '@/app/RootProvider'
import LayoutProvider from '@/app/cs/layout'
import type { Meta, StoryObj } from '@storybook/react'
import NoticeDetailPage from '@/app/cs/notice/detail/page'

const meta = {
    title: 'Meowtimes/Page/noticeDetail',
    component: NoticeDetailPage,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        nextjs: {
            navigation: {
                pathname: '/cs/notice/detail',
            },
        },
    },
} satisfies Meta<typeof NoticeDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        title : "제목길이 테스트입니다 제목길이 테스트입니다 제목길이 테스트입니다 제목길이 테스트입니다 제목길이 테스트입니다 제목길이 테스트입니다 제목길이 테스트입니다 제목길이 테스트입니다 제목길이 테스트입니다",
        date : "2023-12-12",
        type : "fixed",
        index : 1,
        content:{
            img:[
                {
                    imgUrl:'https://meowtimes.kr/upload/file/20231101154005_vftsd.jpg'
                },
                {
                    imgUrl:'https://meowtimes.kr/upload/file/20230411185828_rnsaq.jpg'
                }
            ],
            txt:`안녕하세요. 미우타임즈 입니다.
미우타임즈 스토어에 입점하고 싶으신 브랜드/회사 담당자분께서는 아래 메일로 연락부탁드립니다.
연락처 : meowtimes.official@gmail.com
입점 신청서 제출 후 미우타임즈 내에서 검토를 거쳐 입점 가능 여부와 계약 절차 등에 대해 안내 드릴 예정입니다.
검토 완료 및 연락까지 시일이 다소 소요될 수 있으니, 중복 신청 또는 고객센터로의 문의 등은 피해 주시기 바랍니다.
미우타임즈 입점 정책을 위반하는 업체는 입점이 불가할 수 있습니다.`
        },
        prev : {
            index : 12,
            title : '이전글입니다 이전글입니다 이전글입니다 이전글입니다 이전글입니다 이전글입니다'
        },
        next : {
            index : 3,
            title : '다음글입니다 다음글입니다 다음글입니다 다음글입니다 다음글입니다 다음글입니다'
        },
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

