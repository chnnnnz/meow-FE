import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SimpleCollectionFragment, useSimpleCollectionsQuery } from '../gql/generated'

function useSimpleCollections() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()
  const { data } = useSimpleCollectionsQuery()
  const collections = data?.collections.items || []
  const collectionsWithDepth: [SimpleCollectionFragment[]] = [[]]
  collections.forEach((c) => {
    const collectionsAtDepth = collectionsWithDepth[c.breadcrumbs.length - 2] ?? []
    collectionsWithDepth[c.breadcrumbs.length - 2] = collectionsAtDepth.concat(c)
  })

  const currentCollection = collections.find((c) => c.id === searchParams.get('collection_id'))
  return {
    collectionsWithDepth,
    currentCollection,
    changeCurrentCollection: (id?: string) => {
      const queryParams = new URLSearchParams(searchParams)
      if (id && id !== '1') {
        queryParams.set('collection_id', id)
      } else {
        queryParams.delete('collection_id')
      }
      router.replace(`${pathName}?${queryParams.toString()}`, { scroll: false })
    },
  }
}

export default useSimpleCollections
