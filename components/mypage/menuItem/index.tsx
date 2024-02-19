'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export type MenuItemProps = {
  label: string
  pathName: string
}

function MenuItem(props: MenuItemProps) {
  const pathName = usePathname()
  const isActive = pathName === props.pathName
  return (
    <Link href={props.pathName} className="block laptop:flex-1 desktop:flex-auto">
      <div
        className={`flex items-center h-[56px] laptop:px-[16px] desktop:px-[20px] place-content-between cursor-pointer 
        ${isActive ? 'bg-yellow-03' : 'bg-white'}`}
      >
        <span className={`${isActive ? 'title-B-17-150 text-gray-09' : 'title-SB-17-150 text-gray-07'}`}>
          {props.label}
        </span>
        <i className={`xi-angle-right text-[16px] ${isActive ? 'text-gray-09' : 'text-gray-04'}`} />
      </div>
    </Link>
  )
}

export default MenuItem