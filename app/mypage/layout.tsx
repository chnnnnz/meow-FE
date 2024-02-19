'use client'
import { UnderlinedTabView } from "@/components/common/tabview"
import MenuItem from "@/components/mypage/menuItem"
import { useRouter } from "next/navigation"

function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-0 desktop:px-[16px]">
      <div className="mx-auto desktop:container">
        <div className="laptop:mt-[56px] desktop:mt-[80px]">
          <div className="head-B-36-130 hidden laptop:block mx-[16px] desktop:mx-0">마이페이지</div>
          <div className="flex mt-[40px]">
            <DesktopMenus />
            <div className="desktop:ml-[126px] flex-1">
              <div className="mx-[16px] desktop:mx-0"><MyInfo /></div>
              <div className="mx-[16px] desktop:mx-0"><LaptopMenus /></div>
              <MobileMenus />
              <div className="laptop:pt-[40px] desktop:pt-[60px]">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const menus = [
  { label: "구독관리", pathName: "/mypage/subscription" },
  { label: "주문조회", pathName: "/maypage/order" },
  { label: "포인트/쿠폰", pathName: "/mypage/point" },
  { label: "좋아요", pathName: "/mypage/like" },
  { label: "리뷰", pathName: "/mypage/review" },
  { label: "반려동물 프로필", pathName: "/mypage/petProfile" },
]

function DesktopMenus() {
  return (
    <div className="border-[1px] border-gray-02 w-[200px] divide-y-[1px] divide-gray-02 h-fit hidden desktop:block">
      {menus.map((menu, index) => (
        <MenuItem key={index} label={menu.label} pathName={menu.pathName} />
      ))}
    </div>
  )
}
function LaptopMenus() {
  return (
    <div className="mt-[32px] hidden laptop:flex desktop:hidden">
      {menus.map((menu, index) => (
        <MenuItem key={index} label={menu.label} pathName={menu.pathName} />
      ))}
    </div>
  )
}
function MobileMenus() {
  const router = useRouter()
  return (
    <div className="mt-[36px] laptop:hidden">
      <UnderlinedTabView
        tabs={menus.map((menu) => menu.label)} 
        initialActiveIndex={0}
        textStyle="text-[15px] font-semibold text-gray-04"
        activeTextStyle="btn-text-lg text-gray-09"
        onChangeTab={(index) => router.push(menus[index].pathName)}
      />
    </div>
  )
}

function MyInfo() {
  function Desktop() {
    return (
      <div className="border-[1px] border-gray-02 py-[20px] px-[24px] hidden laptop:flex">
        <div className="w-[344px]">
          <div>
            <span className="text-gray-07">정보 수정</span>
            <i className="xi-angle-right-min"/>
          </div>
          <div className="sub-head-B-20-130 text-gray-07 mt-[24px]">
            홍길동 집사님은 구독 중이에요!
          </div>
          <div className="mt-[12px] divide-x-[8px] divide-white">
            <span className="title-M-17-150 text-gray-05">#벤토나이트</span>
            <span className="title-M-17-150 text-gray-05">#카사바</span>
            <span className="title-M-17-150 text-gray-05">#두부</span>
          </div>
        </div>

        <div className="divide-x-[1px] divide-gray-02 flex flex-1">
          <div className="flex-1">
            <div className="text-gray-07">
              <span>포인트</span>
              <i className="xi-angle-right-min"/>
            </div>
            <div className="flex items-center h-full sub-head-B-24-130 text-gray-09">12,000P</div>
          </div>
          
          <div className="flex-1 pl-[20px]">
            <div className="text-gray-07">
              <span>쿠폰</span>
              <i className="xi-angle-right-min"/>
            </div>
            <div className="flex items-center h-full sub-head-B-24-130 text-gray-04">0개</div>
          </div>

          <div className="flex-1 pl-[20px]">
            <div className="text-gray-07">
              <span>미작성 리뷰</span>
              <i className="xi-angle-right-min"/>
            </div>
            <div className="flex items-center h-full sub-head-B-24-130 text-gray-04">0건</div>
          </div>
        </div>

      </div>
    )
  }
  function Mobile() {
    return (
      <div className="laptop:hidden">
        <div className="flex place-content-between">
          <div className="title-lg">홍길동 집사님은 구독 중이에요!</div>
          <div className="border-[1px] border-gray-02 rounded-[2px] py-[6px] px-[8px]">정보수정</div>
        </div>
        <div className="mt-[8px]">
          <span className="body-sm text-gray-06">#벤토나이트</span>
          <span className="body-sm text-gray-06">#카사바</span>
          <span className="body-sm text-gray-06">#두부</span>
        </div>
        <div className="border-[1px] border-gray-03 rounded-[4px] mt-[20px] flex py-[18px]">
          <div className="flex flex-col items-center flex-1">
            <div className="caption-md text-gray-06">포인트<i className="xi-angle-right text-[10px] text-gray-06 ml-[2px]"/></div>
            <div className="text-lg text-gray-09 mt-[5px]">12,000P</div>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div>쿠폰<i className="xi-angle-right text-[10px] text-gray-06 ml-[2px]"/></div>
            <div className="text-lg text-gray-04 mt-[5px]">0개</div>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div>미작성 리뷰<i className="xi-angle-right text-[10px] text-gray-06 ml-[2px]"/></div>
            <div className="text-lg text-gray-04 mt-[5px]">0건</div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <Desktop />
      <Mobile />
    </>
  )
}

export default MyPageLayout
