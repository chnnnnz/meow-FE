import Link from 'next/link'
import Image from 'next/image'
import { resources } from 'config/resources'
import InstagramIcon from 'public/icons/instagram.svg'
import InipayIcon from 'public/icons/inipay.svg'
import InipayMobileIcon from 'public/icons/inipay_mobile.svg'
import HomeIcon from 'public/icons/bottomNav/home.svg'
import SubscriptionIcon from 'public/icons/bottomNav/footstamp_sub.svg'
import StoreIcon from 'public/icons/bottomNav/store.svg'
import HeartIcon from 'public/icons/bottomNav/heart.svg'
import ProfileIcon from 'public/icons/bottomNav/profile.svg'
import { usePathname } from 'next/navigation'
import { getPageConfig } from '@/config/page.config'

function Footer() {
  return (
    <>
      <div className="laptop:hidden">
        <MobileFooter />
      </div>
      <div className="hidden laptop:block">
        <DesktopFooter />
      </div>
    </>
  )
}

function MobileFooter() {
  const pathName = usePathname()
  const pageConfig = getPageConfig(pathName)
  const showFooter = pageConfig?.mobile.showFooter
  const showBottomNav = pageConfig?.mobile.showBottomNav

  return (
    <>
      {showFooter && (
        <footer className="bg-gray-01 left-0 bottom-0 right-0 pt-[22px] pb-[120px] px-[16px] relative">
          <div className="flex place-content-between items-center">
            <div className="flex">
              <Link href="/terms">
                <span className="text-[14px] font-semibold text-gray-05">이용약관</span>
              </Link>
              <Link href="/terms/privacy" className="ml-[30px]">
                <span className="text-[14px] font-semibold text-gray-06">개인정보처리방침</span>
              </Link>
            </div>
            <a href="https://www.instagram.com/meowtimes_official/" target="_blank" rel="noreferrer">
              <span className="text-white">
                <InstagramIcon width={50} height={50} />
              </span>
            </a>
          </div>
          <div className="mt-[14px] text-[13px] font-medium text-gray-06">고객센터 번호 : 1668-1299</div>
          <div className="text-[12px] font-medium text-gray-05">평일 : 10:00 - 17:00 (주말, 공휴일 휴무)</div>
          <div className="text-[12px] font-medium text-gray-05">점심시간 : 12:30 - 13:30</div>
          <div className="mt-[24px] text-[13px] font-medium text-gray-06">
            사업자 정보 <i className="xi-angle-down"></i>
          </div>
          <div className="text-[12px] font-medium text-gray-05 pb-[16px]">
            대표자 : 이정우&nbsp;&nbsp;&nbsp;상호명 : 주식회사 제이엘씨엔티&nbsp;&nbsp;&nbsp;
            <br />
            주소 : 경기도 안성시 원곡면 지문로 519&nbsp;&nbsp;&nbsp;대표이메일 : meowtimes.official@gmail.com
            <br />
            사업자등록번호 : 286-88-02013&nbsp;&nbsp;&nbsp;통신판매업 정보 : 제 2021-경기안성-0539 호<br />
            호스팅서비스제공자 : 아마존 웹 서비스
          </div>
          <p className="text-[12px] font-medium text-gray-05">Copyright ©MEOWTIMES. all right reserved.</p>
          <a
            href="https://mark.inicis.com/mark/popup_v3.php?mid=meowtimes1"
            target="_blank"
            className="absolute bottom-[120px] right-[21px]"
          >
            <InipayMobileIcon />
          </a>
        </footer>
      )}
      {showBottomNav && <MobileBottomNav />}
    </>
  )
}

function MobileBottomNav() {
  return (
    <div className="flex fixed z-[1] bottom-0 left-0 right-0 border-t border-gray-02 bg-white">
      <MobileBottomNavItem svg={<HomeIcon />} title="홈" href="/" />
      <MobileBottomNavItem svg={<SubscriptionIcon />} title="정기구독" href="/subscription" />
      <MobileBottomNavItem svg={<StoreIcon />} title="스토어" href="/product" />
      <MobileBottomNavItem svg={<HeartIcon />} title="좋아요" href="/mypage/like" />
      <MobileBottomNavItem svg={<ProfileIcon />} title="마이" href="/mypage/subscription" />
    </div>
  )
}

function MobileBottomNavItem({ svg, title, href }: { svg: JSX.Element; title: string; href: string }) {
  const pathName = usePathname()
  const isActive = pathName == href
  return (
    <Link className="flex flex-col items-center flex-grow py-[10px]" href={href}>
      <div className="w-[24px] h-[24px]">
        <span className={isActive ? 'text-green-03' : 'text-gray-03'}>{svg}</span>
      </div>
      <span className={`text-[11px] mt-[6px] ${isActive ? 'text-green-03' : 'text-gray-06'}`}>{title}</span>
    </Link>
  )
}

function DesktopFooter() {
  return (
    <footer className="bg-gray-01 pt-[30px] pb-[37px] px-[16px]">
      <div className="desktop:container desktop:mx-auto">
        <div className="flex place-content-between">
          <Image
            src={resources.common + 'logo-foot.svg'}
            alt="미우타임즈"
            className="logo-foot"
            width={153}
            height={18}
          />
          <a href="https://www.instagram.com/meowtimes_official/" target="_blank" rel="noreferrer">
            <span className="text-gray-02">
              <InstagramIcon width={30} height={30} />
            </span>
          </a>
        </div>

        <div className="mt-[24px] text-[12px] font-medium text-gray-07">
          사업자 정보 <i className="xi-angle-down"></i>
        </div>
        <div className="text-[12px] font-medium text-gray-05">
          대표자 : 이정우&nbsp;&nbsp;&nbsp;상호명 : 주식회사 제이엘씨엔티&nbsp;&nbsp;&nbsp;
          <br />
          주소 : 경기도 안성시 원곡면 지문로 519&nbsp;&nbsp;&nbsp;대표이메일 : meowtimes.official@gmail.com
          <br />
          사업자등록번호 : 286-88-02013&nbsp;&nbsp;&nbsp;통신판매업 정보 : 제 2021-경기안성-0539 호<br />
          호스팅서비스제공자 : 아마존 웹 서비스
        </div>
        <p className="text-[12px] text-gray-05 text-right">고객센터 번호 : 1668-1299</p>
        <div className="flex place-content-between items-center mt-[11px]">
          <div className="flex">
            <Link href="/terms">
              <span className="text-[12px] font-medium text-gray-05">
                이용약관 <i className="xi-angle-right"></i>
              </span>
            </Link>
            <Link href="/terms/privacy" className="ml-[24px]">
              <span className="text-[12px] font-medium text-gray-07">
                개인정보처리방침 <i className="xi-angle-right"></i>
              </span>
            </Link>
          </div>
          <div className="flex text-[13px] text-gray-05 font-medium">
            <p>
              운영시간&nbsp;&nbsp;|&nbsp;&nbsp;
              <span className="text-gray-07">평일 10:00 - 17:00</span>
            </p>
            <p className="ml-[26px]">
              점심시간&nbsp;&nbsp;|&nbsp;&nbsp;
              <span className="text-gray-07">평일 12:30 - 13:30</span>
              <span className="text-gray-07 ml-[23px]">(주말, 공휴일 휴무)</span>
            </p>
          </div>
        </div>
        <div className="flex place-content-between items-center mt-[16px]">
          <p className="text-[10px] text-gray-05">Copyright ©MEOWTIMES. all right reserved.</p>
          <a href="https://mark.inicis.com/mark/popup_v3.php?mid=meowtimes1" target="_blank">
            <InipayIcon />
          </a>
        </div>
      </div>
    </footer>
  )
}
export default Footer
