import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import SearchIcon from 'public/icons/search.svg'
import useConfirmModal from '@/modules/hooks/confirmModal'
import ConfirmModal from '../modal/ConfirmModal'

function SearchInput() {
  const searchParams = useSearchParams()
  const [keyword, setKeyword] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [isConfirmOpened, title, content, onPositive, openConfirm, closeConfirm] = useConfirmModal()
  

  function onClickSearch() {
    if (keyword.trim().length === 0) { 
      openConfirm({ title: '검색어를 입력해주세요.', onPositive: closeConfirm })
      return
    }
    router.replace(`/search?keyword=${keyword}`)
  }

  useEffect(() => {
    setKeyword(searchParams.get('keyword') ?? '')
  }, [searchParams])

  return (
    <>
    {isConfirmOpened && <ConfirmModal title={title} content={content} onPositiveClick={onPositive} />}
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        placeholder="원하시는 상품을 검색해 보세요."
        className="rounded-[4px] laptop:rounded-[8px] bg-gray-01 w-full px-[12px] pr-[74px] py-[10px] laptop:p-[20px] laptop:pr-[100px] body-text-sm laptop:sub-head-M-24-130 text-gary-09 placeholder:text-gray-04"
        value={keyword}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            onClickSearch()
          }
        }}
        onChange={(e) => {
          setKeyword(e.target.value)
        }}
      />
      <i
        className="xi-close-circle text-[16px] laptop:text-[20px] text-gray-04 absolute top-[10px] right-[48px] laptop:right-[70px] laptop:top-[26px] cursor-pointer"
        onClick={() => {
          setKeyword('')
          inputRef.current?.focus()
        }}
      />
      <SearchIcon
        className="absolute right-[16px] top-[8px] laptop:right-[20px] laptop:top-[20px] w-[20px] laptop:w-[32px] cursor-pointer"
        onClick={onClickSearch}
      />
    </div>
    </>
  )
}

function RecommandedKeyword({ keyword }: { keyword: string }) {
  const router = useRouter()

  function onClickKeyword() {
    router.replace(`/search?keyword=${keyword}`)
  }

  return (
    <div 
      className="inline-block bg-green-01 rounded-full px-[12px] laptop:px-[20px] py-[6px] laptop:py-[11px] body-text-sm laptop:title-SB-17-150 text-green-03 cursor-pointer"
      onClick={onClickKeyword}
    >
      #{keyword}
    </div>
  )
}

function RecommandedKeywords({ keywords, className }: { keywords: string[]; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-x-[8px] gap-y-[16px] ${className}`}>
      {keywords.map((keyword, index) => (
        <RecommandedKeyword keyword={keyword} key={`${keyword}-${index}`} />
      ))}
    </div>
  )
}

export { SearchInput, RecommandedKeywords }
