'use client'
import { UnderlinedTabView } from '@/components/common/tabview'
import MenuItem from '@/components/mypage/menuItem'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

function CsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-0 laptop:px-[16px]">
      <div className="desktop:container mx-auto">
        <div className="laptop:mt-[80px]">
          <div className="head-B-36-130 hidden laptop:block mx-[16px] laptop:mx-[0px]">고객경험센터</div>
          <div className="flex laptop:mt-[40px]">
            <DesktopMenus />
            <div className="laptop:ml-[126px] flex-1">
              <MobileMenus />
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const menus = [
  { label: '자주하는 질문', pathName: '/cs/faq' },
  { label: '공지사항', pathName: '/cs/notice' },
]

function DesktopMenus() {
  return (
    <div className="hidden laptop:block">
      <div className="border-[1px] border-gray-02 w-[200px] divide-y-[1px] divide-gray-02 h-fit">
        {menus.map((menu, index) => (
          <MenuItem key={index} label={menu.label} pathName={menu.pathName} />
        ))}
      </div>
      <div className="w-full h-[1px] bg-gray-02 mt-[60px]"></div>
      <div className="bg-gray-01 w-full px-[16px] py-[20px] mt-[20px]">
        <div className="title-SB-17-150 text-gray-09">도움이 필요하신가요?</div>
        <div className="mt-[20px]">
          <i className="xi-call text-[18px] text-gray-09" />
          <span className="title-SB-17-150 text-gray-09 ml-[9px]">1668-1299</span>
        </div>
        <div className="mt-[13px] flex items-center">
          <Image src="/icons/cs/kakao.png" width={24} height={24} alt="카카오톡 문의" className="inline-block" />
          <span className="ml-[7px] title-SB-17-150 text-gray-09">@meowtimes</span>
        </div>
        <div className="mt-[28px] flex items-center caption-M-13-130">
          <span className="text-gray-06">운영시간</span>
          <div className="w-[1px] h-[10px] bg-gray-03 mx-[8px]" />
          <span className="text-gray-07">평일 10:00 - 17:00</span>
        </div>
        <div className="mt-[12px] flex items-center caption-M-13-130">
          <span className="text-gray-06">점심시간</span>
          <div className="w-[1px] h-[10px] bg-gray-03 mx-[8px]" />
          <span className="text-gray-07">12:30 - 13:30</span>
        </div>
        <div className="mt-[12px] caption-M-13-130 text-gray-07">(주말, 공휴일 휴무)</div>
      </div>
    </div>
  )
}

function MobileMenus() {
  const router = useRouter()
  return (
    <div className="laptop:hidden">
      <div className="bg-gray-01 px-[16px] pt-[28px] pb-[20px]">
        <div className="title-lg text-gray-09">도움이 필요하신가요?</div>
        <div className="mt-[9px] flex items-center caption-md">
          <span className="text-gray-06">운영시간</span>
          <div className="w-[1px] h-[10px] bg-gray-03 mx-[8px]" />
          <span className="text-gray-07">평일 10:00 - 17:00 (주말, 공휴일 휴무)</span>
        </div>
        <div className="mt-[2px] flex items-center caption-md">
          <span className="text-gray-06">점심시간</span>
          <div className="w-[1px] h-[10px] bg-gray-03 mx-[8px]" />
          <span className="text-gray-07">12:30 - 13:30</span>
        </div>
        <div className="mt-[28px] flex items-center">
          <div className="flex-1 border-[1px] border-gray-02 rounded-[4px] bg-white py-[14px] text-center cursor-pointer">
            <i className="xi-call text-[15px] text-gray-08" />
            <span className="text-[15px] font-semibold text-gray-08 ml-[2px]">1668-1299</span>
          </div>
          <div className="flex-1 border-[1px] border-gray-02 rounded-[4px] bg-white py-[14px] text-center cursor-pointer ml-[5px]">
            <Image src="/icons/cs/kakao.png" width={16} height={16} alt="카카오톡 문의" className="inline-block" />
            <span className="ml-[4px] text-[15px] font-semibold text-gray-09">@meowtimes</span>
          </div>
        </div>
      </div>
      <UnderlinedTabView
        tabs={menus.map((menu) => menu.label)}
        initialActiveIndex={0}
        textStyle="text-[15px] font-semibold text-gray-04"
        activeTextStyle="btn-text-lg text-gray-09"
        tabStyle="mt-[8px]"
        onChangeTab={(index) => router.push(menus[index].pathName)}
      />
    </div>
  )
}

export default CsLayout
