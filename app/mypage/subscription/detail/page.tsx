import DetailPageComponent from './ui'

const props = {
  subscProdTitle: '벤토나이트',
  subscPausedStatus: false,
  subscType: 'used',
  // subscPausedStatus: true, // 구독정지중: true
  // subscType: 'paused',
  subscCycles: 3,
  paymentCycle: 6,
  currentPaymentDate: '24년 01월 01일',
  totalSubscQuantity: 3,
  totalSubscAmount: '39,700원',
  contractStatus: false,
  contractCount: 6,
  prodArr: [
    {
      brand: '미우타임즈',
      productName: '더 스탠다드',
      optionName: '6kg',
      count: '1',
      price: '9,900원',
    },
    {
      brand: '미우타임즈',
      productName: '더 프라임',
      optionName: '6kg',
      count: '1',
      price: '14,900원',
    },
    {
      brand: '미우타임즈',
      productName: '더 에센셜',
      optionName: '6kg',
      count: '1',
      price: '9,900원',
    },
  ],
}

function MyPageSubscriptionDetail() {
  return (
    //@ts-ignore
    <DetailPageComponent {...props} />
  )
}

export default MyPageSubscriptionDetail
