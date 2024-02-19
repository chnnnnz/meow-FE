'use client'

import SearchIcon from 'public/icons/search.svg'
import HeartIcon from 'public/icons/heart.svg'
import CartIcon from 'public/icons/cart.svg'
import ProfileIcon from 'public/icons/profile.svg'
import HamburgerIcon from 'public/icons/hamburger.svg'
import CloseIcon from 'public/icons/close.svg'
import { ReactNode } from 'react'
import Link from 'next/link'
import useCustomer from '@/modules/hooks/customer'
import { useActiveOrderQuery } from '@/modules/gql/generated'

export type ActionIconsProps = {
  /**
   * 검색아이콘 노출 여부
   */
  enableSearch?: boolean
  enableLike?: boolean
  enableCart?: boolean
  enableProfile?: boolean
  enableHamburger?: boolean
  enableClose?: boolean
}

const ActionIcons = ({
  enableSearch,
  enableLike,
  enableCart,
  enableProfile,
  enableHamburger,
  enableClose,
}: ActionIconsProps) => {
  const customer = useCustomer()
  const { data } = useActiveOrderQuery()
  return (
    <div className="flex items-center">
      {enableSearch && (
        <Link href="/search">
          <ActionIcon>
            <span className="text-gray-08 laptop:text-gray-06">
              <SearchIcon className='w-[24px]' />
            </span>
          </ActionIcon>
        </Link>
      )}
      {enableLike && (
        <Link href="/">
          <ActionIcon>
            <span className="text-gray-08 laptop:text-gray-06">
              <HeartIcon />
            </span>
          </ActionIcon>
        </Link>
      )}
      {enableCart && (
        <Link href="/cart">
          <ActionIcon badgeCount={data?.activeOrder?.lines?.length}>
            <span className="text-gray-08 laptop:text-gray-06">
              <CartIcon />
            </span>
          </ActionIcon>
        </Link>
      )}
      {enableProfile && (
        <Link href={customer ? '/mypage/subscription' : '/account/login'}>
          <ActionIcon>
            {customer ? (
              <span className="text-gray-08 laptop:text-gray-06">
                <ProfileIcon />
              </span>
            ) : (
              <span className="text-gray-06">로그인/회원가입</span>
            )}
          </ActionIcon>
        </Link>
      )}
      {enableHamburger && (
        <Link href="/">
          <ActionIcon>
            <span className="text-gray-08 laptop:text-gray-06">
              <HamburgerIcon />
            </span>
          </ActionIcon>
        </Link>
      )}
      {enableClose && (
        <Link href="/">
          <ActionIcon>
            <span className="text-gray-08 laptop:text-gray-06">
              <CloseIcon />
            </span>
          </ActionIcon>
        </Link>
      )}
    </div>
  )
}

const ActionIcon = ({
  className,
  children,
  badgeCount = 0,
}: {
  className?: string
  children: ReactNode
  badgeCount?: number
}) => {
  return (
    <div className={`p-[12px] laptop:p-[10px] relative cursor-pointer ${className}`}>
      {children}
      {badgeCount > 0 && (
        <p className="w-[17px] h-[17px] rounded-full bg-green-03 absolute top-[9px] right-[5px] text-center align-middle text-white text-[10px] font-medium">
          {badgeCount > 9 ? '9+' : badgeCount}
        </p>
      )}
    </div>
  )
}

export default ActionIcons
