'use client'

import Container from '@/components/common/container'
import { RecommandedKeywords, SearchInput } from '@/components/common/search'
import { useSearchProductsQuery } from '@/modules/gql/generated'
import { useBadgeTopFacetValues, useBrandFacetValues } from '@/modules/hooks/facetValue'
import { useSearchParams } from 'next/navigation'
import SearchProductResultItem from '@/components/product/item/index'
import { DividerTabView, UnderlinedTabView } from '@/components/common/tabview'

function SearchPage() {
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword')
  const { data } = useSearchProductsQuery({ 
    fetchPolicy: 'cache-and-network',
    variables: { term: keyword }, skip: !keyword || keyword.length === 0 
  })
  const storeItems = data?.search.items ?? []
  const subscriptionItems = [] //todo: 구독 상품 검색 추가
  const facetValues = data?.search.facetValues.map((fvr) => fvr.facetValue) ?? []
  const brandFacetValues = useBrandFacetValues(facetValues)
  const badgeTopFacetValues = useBadgeTopFacetValues(facetValues)

  return (
    <>
      <Container>
        <div className="max-w-[956px] mx-[16px] laptop:mx-auto mt-[20px] laptop:mt-[80px]">
          <div className="hidden laptop:block">
            <SearchInput />
          </div>
          {!keyword && (
            <div className="laptop:mt-[32px]">
              <div className="text-lg laptop:depth-menu-SB-16-150 text-gray-08 laptop:text-gray-05">추천 검색어</div>
              <RecommandedKeywords
                keywords={[
                  '고양이 화장실',
                  '사료',
                  '스프레이',
                  '장난감',
                  '스크래처',
                  '퓨레',
                  '부스터',
                  '세트상품',
                  '저키',
                ]}
                className="mt-[12px]"
              />
            </div>
          )}
        </div>
      </Container>
        <div>
          <Container>
            <div className="bg-white fixed top-[0] left-0 right-0 pt-[70px] pb-[20px] z-[1] laptop:static laptop:mt-[24px] laptop:text-center laptop:p-0">
              {keyword && <div className="hidden laptop:block sub-head-SB-24-130">{`'${keyword}'에 대한 검색 결과`}</div>}
              {subscriptionItems.length > 0 || storeItems.length > 0 && (
                <div className="ml-[16px] laptop:ml-0 laptop:mt-[12px] body-text-sm laptop:title-M-17-150 text-gray-07">
                  총 {(subscriptionItems.length + storeItems.length).toLocaleString()}개의 상품이 검색되었습니다.
                </div>
              )}
            </div>
            {subscriptionItems.length > 0 || storeItems.length > 0 && (
              <div className="hidden laptop:block mt-[64px]">
                <DividerTabView tabs={[`정기구독(${subscriptionItems.length.toLocaleString()})`, `스토어(${storeItems.length.toLocaleString()})`]} initialActiveIndex={1} />
                <div className="mt-[32px] h-[2px] bg-gray-07"></div>
              </div>
            )}
          </Container>
          {subscriptionItems.length > 0 || storeItems.length > 0 && (
            <div className="laptop:hidden fixed z-10 top-[102px] bg-white w-full">
              <UnderlinedTabView tabs={[`정기구독(${subscriptionItems.length.toLocaleString()})`, `스토어(${storeItems.length.toLocaleString()})`]} initialActiveIndex={1} />
            </div>
          )}
          <Container>
            {keyword && storeItems.length === 0 && (
              <div className="text-center mt-[330px] laptop:mt-[32px]">
                <i className="xi-error-o text-[24px] text-gray-04"/>
                <div className="mt-[8px] body-text-sm text-gray-04">
                  검색된 스토어 상품이 없습니다.
                </div>
              </div>
            )}
            {storeItems.length > 0 && (
              <div className="mt-[130px] laptop:mt-[32px] grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-[7px] laptop:gap-[20px] gap-y-[50px] laptop:gap-y-[64px]">
                {storeItems.map((item, index) => (
                  <SearchProductResultItem
                    brandFacetValues={brandFacetValues}
                    searchProduct={item}
                    badgeTopFacetValues={badgeTopFacetValues}
                    badgeBottomFacetValues={[]}
                    key={item.productId}
                  />
                ))}
              </div>
            )}
          </Container>
        </div>
    </>
  )
}

export default SearchPage
