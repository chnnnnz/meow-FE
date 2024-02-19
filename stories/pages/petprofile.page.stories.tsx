import RootProvider from '@/app/RootProvider'
import type { Meta, StoryObj } from '@storybook/react'
import PetProfilePage from '@/app/mypage/pet/page'
import LayoutProvider from '@/app/mypage/layout'

const meta = {
    title: 'Meowtimes/Page/PetProfile',
    component: PetProfilePage,
    parameters: {
        layout: 'fullscreen',
        nextjs: {
            navigation: {
                pathname: '/mypage/petProfile',
            },
        },
    },
} satisfies Meta<typeof PetProfilePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        profileList: [
            {
                petImage: "https://img2.quasarzone.com/editor/2022/10/04/fe4d85256fa8404106bb0a1d7a9aa2e8.png",
                name: "냥냥이",
                type: "노르웨이 숲",
                gender: "여아",
                age: "2020-01-13",
                neutering: "모르겠어요",
                weight: "2~3kg",
                likes: {
                    check: ["피부", "관절"],
                    etc: "슬개골 탈구가 있고, 상부 호흡기 감염이 종종 있어요."
                },
                allergy: false,
                index: 1
            },
            {
                name: "야옹이",
                type: "노르웨이 숲",
                gender: "남아",
                age: "2010-01-11",
                neutering: "했어요",
                weight: "4~5kg",
                likes: {
                },
                allergy: true,
                index: 2
            },
            {
                petImage: "https://ncache.ilbe.com/files/attach/new/20200206/4255758/1621045151/11231547442/2a4742fc9ee703223e7b964de8730732_11231547478.jpg",
                name: "깽깽이",
                type: "코리안 숏헤어",
                gender: "여아",
                age: "1999-03-08",
                neutering: "안했어요",
                weight: "2~3kg",
                likes: {
                    check: ["피부"]
                },
                allergy: false,
                index: 4
            },
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
