import { useActiveCustomerQuery } from '../gql/generated'

export const useCustomer = () => {
  const { data } = useActiveCustomerQuery()
  
  return data?.activeCustomer
}

export default useCustomer
