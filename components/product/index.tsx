'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import Image from 'next/image'
import DropDown from '@components/common/dropdown'
import SearchProductResultItem from './item'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Container from '../common/container'
import { SearchResultProductFragment, SearchResultSortParameter, SimpleFacetValueFragment, SortOrder, useLikeProductMutation, useSearchProductsLazyQuery } from '@/modules/gql/generated'
import useSimpleCollections from '@/modules/hooks/collections'
import useConfirmModal from '@/modules/hooks/confirmModal'
import ConfirmModal from '../common/modal/ConfirmModal'
import useIntersect from '@/modules/hooks/intersect'
import { useBadgeTopFacetValues, useBadgeBottomFacetValues, useBrandFacetValues } from '@/modules/hooks/facetValue'

SwiperCore.use([Autoplay])

export type StoreProps = {
  banners: {
    imageUrl: string
    mobileImageUrl: string
    linkUrl: string
  }[]
}

function CategorySelector() {
  return (
    <>
      <MobileCategorySelector />
      <DesktopCategorySelector />
    </>
  )
}

function MobileCategorySelector() {
  const { collectionsWithDepth, currentCollection, changeCurrentCollection } = useSimpleCollections()

  return (
    <div className="laptop:hidden">
      {collectionsWithDepth.slice(1).map((collectionsAtDepth, index) => {
        if (index > (currentCollection?.breadcrumbs.length ?? 0) - 2) {
          return <span key={index}></span>
        }
        const collections = collectionsAtDepth.filter((c) => c.parentId === currentCollection?.breadcrumbs[index + 1].id)
        const menusIncludeAll = [
          {
            id: currentCollection?.breadcrumbs[index + 1].id ?? '1',
            name: '전체',
            parentId: '0',
            breadcrumbs: [],
          },
          ...collections,
        ]
        let selectedIdx = 0
        if (index < (currentCollection?.breadcrumbs.length ?? 0) - 2) {
          selectedIdx = menusIncludeAll.findIndex((menu) => currentCollection?.breadcrumbs[index + 2].id === menu.id)
        } 
        return (
          <div className="h-[44px] flex items-center pl-[16px] border-b border-gray-02" key={index}>
            {menusIncludeAll.map((collection, index) => {
              return (
                <div
                  className={`cursor-pointer flex text-[15px] h-full ${
                    index === selectedIdx
                      ? 'border-b-[2px] border-yellow-03 text-gray-09 font-bold'
                      : 'pb-[2px] text-gray-04 font-semibold'
                  }  items-center ${index > 0 ? 'ml-[20px]' : ''}`}
                  key={collection.id}
                  onClick={() => changeCurrentCollection(collection.id)}
                >
                  {collection.name}
                </div>
              )
            })}
          </div>
        ) 
      })}
    </div>
  )
}
function DesktopCategorySelector() {
  const { collectionsWithDepth, currentCollection, changeCurrentCollection } = useSimpleCollections()
  const [openedCategoryDepth, setOpenedCategoryDepth] = useState<number>()

  function onChangeCategory(id?: string) {
    setOpenedCategoryDepth(undefined)
    changeCurrentCollection(id)
  }

  return (
    <div className="hidden laptop:block fixed shadow-[0_2px_7px_0px_rgba(23,25,28,0.07)] px-[16px] z-[1] bg-white top-[50px] laptop:top-[149px] left-0 right-0">
      <div className="desktop:container desktop:mx-auto flex place-content-between items-center h-[50px]">
        <div className="flex items-center">
          {collectionsWithDepth.map((collectionsAtDepth, index) => {
            if (index > 0 && index > (currentCollection?.breadcrumbs.length ?? 0) - 1) {
              return <span key={index}></span>
            }
            const collections = index === 0 ? collectionsAtDepth : collectionsAtDepth.filter((c) => c.parentId === currentCollection?.breadcrumbs[index].id)
            const menusIncludeAll = [
              {
                id: currentCollection?.breadcrumbs[index].id ?? '1',
                name: '전체',
                parentId: '0',
                breadcrumbs: [],
              },
              ...collections,
            ]
            let selectedIdx = 0
            if (index < (currentCollection?.breadcrumbs.length ?? 0) - 1) {
              selectedIdx = menusIncludeAll.findIndex((menu) => currentCollection?.breadcrumbs[index + 1].id === menu.id)
            } 
            
            return (
              <div className={`flex items-center`} key={index}>
                {index > 0 && <span className="h-[12px] w-[1px] bg-gray-03 mx-[16px]"></span>}
                <DropDown
                  menus={menusIncludeAll.map((c) => {
                    return {
                      title: c.name,
                      onClick: () => {
                        onChangeCategory(c.id)
                      },
                    }
                  })}
                  buttonClassName="text-[17px] font-medium text-gray-06"
                  menuItemClassName="text-[16px] font-medium text-gray-06"
                  selectedMenuItemClassName="text-[16px] font-semibold text-green-03"
                  minWidth="193px"
                  padding="20px"
                  menuItemGap="20px"
                  selectedIdx={selectedIdx}
                  opened={openedCategoryDepth === index}
                  onClick={() => {
                    setOpenedCategoryDepth(openedCategoryDepth === index ? undefined : index)
                  }}
                />
              </div>
            )
          })}
        </div>
        <div className="text-[17px] font-medium text-gray-07">
          미우포인트 | <span className="text-green-04 font-semibold">124,500P</span>
        </div>
      </div>
    </div>
  )
}

function StoreComponent(props: StoreProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const sortBy = searchParams.get('sort')?.split(',')[0]
  const sortOrder = (searchParams.get('sort')?.split(',')[1] ?? 'DESC') === 'DESC' ? SortOrder.Desc : SortOrder.Asc
  let sort: SearchResultSortParameter | undefined = undefined
  if (sortBy === 'price') {
    sort = { price: sortOrder }
  } else if (sortBy === 'createdAt') {
    sort = { createdAt: sortOrder }
  }
  const [isOpenedLoginConfirm, loginConfirmTitle, loginConfirmContent, onPositive, openLoginConfirm, closeLoginConfirm] = useConfirmModal()
  const [productList, setProductList] = useState<SearchResultProductFragment[]>([])
  const [brandFacetValues, setBrandFacetValues] = useState<SimpleFacetValueFragment[]>([])
  const [badgeTopFacetValues, setBadgeTopFacetValues] = useState<SimpleFacetValueFragment[]>([])
  const [badgeBottomFacetValues, setBadgeBottomFacetValues] = useState<SimpleFacetValueFragment[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const itemsPerPage = 25
  const [likeProduct] = useLikeProductMutation()
  const [searchProducts] = useSearchProductsLazyQuery({ fetchPolicy: 'network-only' })
  const ref = useIntersect((entry, observer) => {
    loadProducts()
  })

  async function loadProducts(refresh: boolean = false) {
    if (!refresh && totalItems !== 0 && totalItems <= productList.length) return
    const res = await searchProducts({
      variables: {
        collectionId: searchParams.get('collection_id'),
        sort: sort,
        take: itemsPerPage,
        skip: refresh ? 0 : productList.length,
      },
    })
    if (res.data?.search.items && res.data?.search.items.length > 0) {
      setProductList(refresh ? res.data.search.items : [...productList, ...res.data.search.items])
      const facetValues = res.data.search.facetValues.map((fvr) => fvr.facetValue)
      setBrandFacetValues(useBrandFacetValues(facetValues))
      setBadgeTopFacetValues(useBadgeTopFacetValues(facetValues))
      setBadgeBottomFacetValues(useBadgeBottomFacetValues(facetValues))
      setTotalItems(res.data.search.totalItems)
    }
  }

  function onClickSortByPrice(sortOrder: 'DESC' | 'ASC') {
    const queryParams = new URLSearchParams(searchParams)
    queryParams.set('sort', `price,${sortOrder}`)
    router.replace(`${pathName}?${queryParams.toString()}`, { scroll: false })
  }

  function onClickSortByCreated() {
    const queryParams = new URLSearchParams(searchParams)
    queryParams.set('sort', `createdAt,DESC`)
    router.replace(`${pathName}?${queryParams.toString()}`, { scroll: false })
  }

  function onClickByPopularity() {
    const queryParams = new URLSearchParams(searchParams)
    queryParams.set('sort', `popularity,DESC`)
    router.replace(`${pathName}?${queryParams.toString()}`, { scroll: false })
  }
  
  async function onClickLike(searchProduct: SearchResultProductFragment) {
    const res = await likeProduct({
      variables: {
        productId: searchProduct.productId,
        like: !searchProduct.isLike
      },
    })
    if (res.data?.setLikeProduct?.success) {
      setProductList(productList.map((product) => {
        if (product.productId === searchProduct.productId) {
          return {
            ...product,
            isLike: !product.isLike
          }
        }
        return product
      }))
    } else if ((res.errors?.findIndex((e) => e.extensions.code === 'UNAUTHORIZED') ?? -1) > -1) {
      openLoginConfirm({ title: '로그인이 필요합니다.', content: '로그인 페이지로 이동하시겠습니까?', onPositive: () => {
        closeLoginConfirm()
        router.push('/account/login')
      } })
    }
  }

  useEffect(() => {
    loadProducts(true)
  }, [searchParams])

  return (
    <>
      {isOpenedLoginConfirm && (
        <ConfirmModal 
          title={loginConfirmTitle} 
          content={loginConfirmContent} 
          onNegativeClick={closeLoginConfirm} 
          onPositiveClick={onPositive} 
        />
      )}
      <CategorySelector />
      <div className="laptop:pt-[50px]">
        <Swiper slidesPerView={1} autoplay={{ delay: 3000 }} loop={true} className="!z-0">
          {props.banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="pb-[34%] desktop:pb-[0px] relative overflow-hidden min-h-[170px] desktop:max-h-[480px] max-h-none flex">
                <div className="absolute desktop:static w-full h-full">
                  <div className="relative h-full overflow-hidden desktop:h-[480px] flex place-content-center items-center">
                    <Image
                      src={banner.imageUrl}
                      width={2600}
                      height={480}
                      className="hidden tablet:block h-full object-fill max-w-none"
                      alt="banner"
                    />
                    <Image
                      src={banner.mobileImageUrl}
                      width={1500}
                      height={800}
                      className="tablet:hidden h-full w-full object-cover max-w-none overflow-clip"
                      alt="banner"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex laptop:hidden px-[16px] py-[12px] place-content-between bg-yellow-03 text-gray-07 font-medium">
          <span>홍길동 집사님</span>
          <p>
            미우포인트 <span className="text-red-04 font-bold">124,500P</span>
          </p>
        </div>
        <Container>
          <div className="mt-[28px] laptop:mt-[80px]">
            <div className="hidden laptop:block text-[36px] font-bold text-gray-09">전체</div>
            <div className="flex place-content-between items-center laptop:mt-[40px]">
              <div className="text-[14px] laptop:text-[17px] font-medium text-gray-07">
                총 {totalItems.toLocaleString()}개의 상품
              </div>
              <div className="hidden laptop:flex items-center">
                <div
                  className="text-[16px] font-medium text-gray-05 cursor-pointer"
                  onClick={() => onClickByPopularity()}
                >
                  인기순
                </div>
                <div className="w-[1px] h-[12px] bg-gray-05 mx-[8px] opacity-40"></div>
                <div
                  className="text-[16px] font-medium text-gray-05 cursor-pointer"
                  onClick={() => onClickSortByCreated()}
                >
                  최신순
                </div>
                <div className="w-[1px] h-[12px] bg-gray-05 mx-[8px] opacity-40"></div>
                <div
                  className="text-[16px] font-medium text-gray-05 cursor-pointer"
                  onClick={() => onClickSortByPrice('DESC')}
                >
                  높은가격순
                </div>
                <div className="w-[1px] h-[12px] bg-gray-05 mx-[8px] opacity-40"></div>
                <div
                  className="text-[16px] font-medium text-gray-05 cursor-pointer"
                  onClick={() => onClickSortByPrice('ASC')}
                >
                  낮은가격순
                </div>
              </div>
              <div className="laptop:hidden">
                <DropDown
                  menus={[
                    {
                      title: '인기순',
                      onClick: () => {},
                    },
                    {
                      title: '최신순',
                      onClick: () => {},
                    },
                    {
                      title: '높은가격순',
                      onClick: () => {},
                    },
                    {
                      title: '낮은가격순',
                      onClick: () => {},
                    },
                  ]}
                  buttonClassName="text-[14px] font-medium text-gray-07"
                  menuItemClassName="text-[14px] font-medium text-gray-07"
                  selectedMenuItemClassName="text-[14px] font-medium text-green-04"
                  downXeicon="xi-angle-down-min"
                  upXeicon="xi-angle-up-min"
                  minWidth="93px"
                  padding="16px"
                  menuItemGap="18px"
                  align="right"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-[7px] laptop:gap-[21px] mt-[28px] gap-y-[50px] laptop:gap-y-[84px]">
              {productList &&
                productList.map((item, index) => (
                  <SearchProductResultItem
                    brandFacetValues={brandFacetValues}
                    searchProduct={item}
                    badgeTopFacetValues={badgeTopFacetValues}
                    badgeBottomFacetValues={badgeBottomFacetValues}
                    key={item.productId}
                    onClickLike={onClickLike}
                    showReviewCount={true}
                    ref={index === productList.length - 1 ? ref : undefined}
                  />
                ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default StoreComponent