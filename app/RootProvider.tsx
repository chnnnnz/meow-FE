'use client'

import Footer from '@/components/common/footer'
import Header from '@/components/common/header'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ApolloWrapper } from './ApolloWrapper'

export default function RootProvider(props: React.PropsWithChildren) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return (
    <RecoilRoot>
      <ApolloWrapper>
        <QueryClientProvider client={queryClient}>
          <Body>{props.children}</Body>
        </QueryClientProvider>
      </ApolloWrapper>
    </RecoilRoot>
  )
}

export function Body({ children }: { children: React.ReactNode }) {
  return <div className={'relative bg-white'}>
    <Header />
    <div className="pt-[50px] laptop:pt-[148px] pb-[70px] laptop:pb-[120px]">{children}</div>
    <Footer />
  </div>
}