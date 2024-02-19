import { getClient } from '@/app/ApolloClient'
import { ProductDocument } from '@/modules/gql/generated'
import StoreDetailComponent from '@components/product/[id]'

async function StoreDetail({ params }: { params: { id: string } }): Promise<JSX.Element> {
  const { data } = await getClient().query({ 
    query: ProductDocument,
    variables: {
      id: params.id
    }
  })

  return <StoreDetailComponent {...data.product} />
}

export default StoreDetail
