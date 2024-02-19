'use client'
import { useState } from 'react'
import Container from '../common/container'
import { BorderedTabView, UnderlinedTabView } from '../common/tabview'
import SubscriptionCart, { SubscriptionCartGroup } from './SubscriptionCart'
import StoreCart from './StoreCart'

export type CartProps = {
  subscriptionCartGroups: SubscriptionCartGroup[]
}
export default function Cart(props: CartProps) {
  const [tabIndex, setTabIndex] = useState(1)

  return (
    <div>
      <Container className="hidden laptop:block">
        <div className="text-gray-09 font-bold text-[36px] mt-[80px] mb-[40px]">장바구니</div>
        <BorderedTabView
          tabs={['정기구독', '스토어']}
          initialActiveIndex={tabIndex}
          onChangeTab={(index) => setTabIndex(index)}
        />
      </Container>
      <div className="fixed z-[1] top-[50px] left-0 right-0 bg-white laptop:hidden">
        <UnderlinedTabView
          tabs={['정기구독', '스토어']}
          initialActiveIndex={tabIndex}
          onChangeTab={(index) => setTabIndex(index)}
        />
      </div>

      {tabIndex === 0 && <SubscriptionCart groups={props.subscriptionCartGroups} />}
      {tabIndex === 1 && <StoreCart />}
    </div>
  )
}
