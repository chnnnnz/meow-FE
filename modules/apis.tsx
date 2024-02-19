import { Customer } from '@/types'
import axios, { AxiosInstance } from 'axios'

const client: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_HOST}`,
  withCredentials: true,
})

const Api = {
  getCustomer: async (): Promise<Customer> => {
    const res = await client.get('/store/customers/me')
    return res.data
  },
  checkDuplicateEmail: async (email: string): Promise<boolean> => {
    const res = await client.get(`/store/auth/${email}`)
    return res.data.exists
  },
  sendCodePhone: async (phone: string): Promise<number> => {
    const res = await client.post(`/store/customers/phoneAuth`, { phone_number: phone })
    return res.status
  },
  checkCodePhone: async (params: { phone_number: string; auth_number: string }): Promise<number> => {
    const res = await client.patch(`/store/customers/phoneAuth/check`, params)
    return res.data.pass
  },
  recommendCheck: async (recommend_code: string): Promise<number> => {
    const res = await client.get(`/store/customers/recommend/check?recommend_code=${recommend_code}`)
    return res.data
  },
  registerCustomer: async (params: {
    name: string
    email: string
    password: string
    user_agreement: boolean
    marketing_agreement: boolean
    phone: string
    auth_number: string
  }): Promise<void> => {
    const res = await client.post('/store/customers', params)
    console.log(res)
    return res.data
  },
  logout: async (): Promise<void> => {
    const res = await client.delete('/store/auth')
    return res.data
  },
}

export default Api
