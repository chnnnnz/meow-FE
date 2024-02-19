'use client'

import Link from 'next/link'
import Image from 'next/image'
import ActionIcons, { ActionIconsProps } from './ActionIcons'
import FootStamp from 'public/icons/footstamp.svg'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getPageConfig } from '@/config/page.config'
import React, { useState } from 'react'
import useSimpleCollections from '@/modules/hooks/collections'
import { SearchInput } from './search'

export type HeaderProps = {
  /**
   * 데스크탑 네비게이션 바 접힘 여부
   */
  collapsed?: boolean
  /**
   * 모바일 헤더 타이틀
   */
  title?: string
  /**
   * 모바일 헤더 타이틀 카테고리로 쓸건지 여부
   */
  categoryMode?: boolean
  /**
   * 모바일 헤더 타이틀 가운데 정렬 여부
   */
  centerTitle?: boolean
  /**
   * 모바일 헤더 검색모드 여부
   */
  searchMode?: boolean
  /**
   * 우상단 아이콘 노출 여부
   */
  actionIconsProps?: ActionIconsProps
}

function Header(props?: HeaderProps): JSX.Element {
  const pathName = usePathname()
  const pageConfig = getPageConfig(pathName)

  return (
    <>
      <MobileHeader {...pageConfig?.mobile.headerProps} {...props} />
      <DesktopHeader {...pageConfig?.desktop.headerProps} {...props} />
    </>
  )
}

function MobileHeader(props: HeaderProps): JSX.Element {
  const [categoryPanelOpen, setCategoryPanelOpen] = useState(false)
  const hasTitle = props.title !== undefined
  const categoryMode = props.categoryMode || false
  const searchMode = props.searchMode || false
  const centerTitle = props.centerTitle || false
  const router = useRouter()
  const { collectionsWithDepth, currentCollection, changeCurrentCollection } = useSimpleCollections()
  const currentTopLevelCategoryId = currentCollection?.breadcrumbs[1].id
  const currentTopLevelCategory = collectionsWithDepth[0].find((category) => category.id === currentTopLevelCategoryId)
  const topLevelCollectionsIncludeAll = [{id: '1', name: '전체', breadcrumbs: []}, ...collectionsWithDepth[0]]

  return (
    <div
      className={`laptop:hidden flex flex-row h-[50px] fixed z-[2] left-0 right-0 items-center place-content-between ${
        searchMode || categoryMode || hasTitle ? 'pl-[3px]' : 'pl-[16px]'
      } pr-[6px] bg-white`}
    >
      {(searchMode || categoryMode || hasTitle) && (
        <i className="xi-angle-left text-[24px] p-[10px] cursor-pointer" onClick={() => router.back()}></i>
      )}
      {categoryMode && (
        <div className={`text-[18px] font-bold text-gray-09 ${!centerTitle ? 'flex-grow ml-[8px]' : ''}`}>
          <span className="cursor-pointer" onClick={() => setCategoryPanelOpen((prev) => !prev)}>
            {currentTopLevelCategory?.name ?? '전체'}
            <i className="xi-angle-down-min text-[16px] ml-[4px]"></i>
          </span>
          {categoryPanelOpen && (
            <div
              className="fixed top-[50px] left-0 right-0 h-[100vh] bg-gray-09 bg-opacity-40"
              onClick={() => setCategoryPanelOpen(false)}
            >
              <div className="text-center rounded-b-[12px] bg-white pt-[20px] pb-[24px] border-t border-[#ececee]">
                {topLevelCollectionsIncludeAll
                  .map((collection, index) => {
                    return (
                      <div
                        className={`text-[15px] cursor-pointer ${
                          collection.id === currentTopLevelCategoryId ? 'font-bold' : 'font-semibold'
                        } ${collection.id === currentTopLevelCategoryId ? 'text-green-03' : 'text-gray-06'} ${
                          index > 0 ? 'mt-[20px]' : ''
                        }`}
                        key={collection.id}
                        onClick={() => changeCurrentCollection(collection.id)}
                      >
                        {collection.name}
                      </div>
                    )
                  })}
              </div>
            </div>
          )}
        </div>
      )}
      { searchMode && (
        <div className='mr-[10px] w-full'>
          <SearchInput>
          </SearchInput>
        </div>
      )}
      {!searchMode && !categoryMode && hasTitle && (
        <div className={`text-[18px] font-bold text-gray-09 ${!centerTitle ? 'flex-grow ml-[8px]' : ''}`}>
          {props.title}
        </div>
      )}
      {!searchMode && !categoryMode && !hasTitle && (
        <Link href="/">
          <Image
            src='/icons/logo.svg'
            alt="미우타임즈"
            className="w-[118px] h-[14px] tablet:w-[186px] tablet:h-[22px] "
            width={186}
            height={22}
          />
        </Link>
      )} 
      <ActionIcons {...props.actionIconsProps} />
    </div>
  )
}

function DesktopHeader(props: HeaderProps): JSX.Element {
  return (
    <div className="hidden laptop:flex flex-col items-center fixed z-[1] bg-white left-0 right-0 px-[16px] border-b-[1px] border-gray-06/[.07]">
      <div className="w-full desktop:container">
        <div
          className={`flex flex-row ${
            props.collapsed ? 'tablet:h-[60px]' : 'tablet:h-[88px]'
          } items-center place-content-between`}
        >
          <Link href="/">
            <Image
              src='/icons/logo.svg'
              alt="미우타임즈"
              className="w-[118px] h-[14px] tablet:w-[186px] tablet:h-[22px] "
              width={186}
              height={22}
            />
          </Link>
          {props.collapsed === true && <NavBar collapsed={true} />}
          <div className="hidden laptop:block">
            <ActionIcons {...props.actionIconsProps} />
          </div>
        </div>
        {!props.collapsed && <NavBar />}
      </div>
    </div>
  )
}

type NavBarProps = {
  collapsed?: boolean
}
function NavBar(props: NavBarProps): JSX.Element {
  const pathName = usePathname()
  const isSubscription = pathName === '/subscription'
  const isStore = pathName === '/product'
  const isCallOrder = pathName === '/callOrder'

  return (
    <div
      className={`hidden ${
        props.collapsed ? 'mt-[0px]' : 'mt-[13px]'
      } laptop:flex flex-row items-center place-content-between pb-[20px]`}
    >
      <div className="flex flex-row items-center text-[18px] font-bold text-gray-08">
        <Link href={'/subscription'}>
          <div className="flex flex-row items-center">
            <FootStamp className={isSubscription ? 'fill-green-03' : 'fill-gray-08'} />
            <span className={`ml-[8px] ${isSubscription ? 'text-green-03' : 'text-gray-08'}`}>정기구독</span>
          </div>
        </Link>
        <Link href={'/product'}>
          <span className={`ml-[24px] ${isStore ? 'text-green-03' : 'text-gray-08'}`}>스토어</span>
        </Link>
      </div>
      {props.collapsed && <div className="w-[2px] h-[16px] bg-gray-03 ml-[24px]"></div>}
      <div className="flex flex-row items-center text-[18px] text-gray-06">
        <Link href="/consulting">
          <span className="ml-[24px]">전문가상담</span>
        </Link>
        <Link href="/meowtimes">
          <span className="ml-[24px]">미우타임즈</span>
        </Link>
        <Link href="/event">
          <span className="ml-[24px]">이벤트</span>
        </Link>
        <Link href="/community">
          <span className="ml-[24px]">커뮤니티</span>
        </Link>
        <Link href="/cs/faq">
          <span className="ml-[24px]">고객경험센터</span>
        </Link>
      </div>
    </div>
  )
}

export default Header
