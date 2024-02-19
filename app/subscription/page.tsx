import SubscriptionComponent from '@components/subscription'

function Subscription() {
  const props = {
    banners: [
      {
        imageUrl: 'https://d1hp210v61lyyp.cloudfront.net/data/20230905163505_.jpg',
        mobileImageUrl: 'https://d1hp210v61lyyp.cloudfront.net/data/20230905163505_.jpg',
        linkUrl: '/',
      },
      {
        imageUrl: 'https://d1hp210v61lyyp.cloudfront.net/data/20221221151333_.jpg',
        mobileImageUrl: 'https://d1hp210v61lyyp.cloudfront.net/data/20221221151333_.jpg',
        linkUrl: '/',
      },
    ],
    categories: ['전체', '목욕', '미용'],
    products: [
      {
        product_index: 1,
        product_images: [
          'https://d1wbv0oufvynu1.cloudfront.net/product/32c357195dab9aeb8fcbe8552316f939.png',
          'https://d1wbv0oufvynu1.cloudfront.net/product/7aaffd386affa356bf3a48e8dffca6f9.png',
        ],
        product_badge: [
          'https://d1hp210v61lyyp.cloudfront.net/data/20221221224430_.png',
          'https://d1hp210v61lyyp.cloudfront.net/data/20221221224434_.png',
        ],
        product_brand: "브랜드명",
        product_name: "상품명",
        product_subname: "상품명 2", // pc 버전만 출력
        product_description: "상품 설명", // pc 버전만 출력
        product_tag: ['쿠폰', '개별배송'],
        product_cost_price: 10000,
        product_sales_price: 10000,
        product_quantity: 100,
        product_subscription_price: 9900, // 6회차 구독 금액
        product_detail: "", // html
        is_promotion: "",
        is_like: true,
        is_like_count: '1,234',
      },
      {
        product_index: 2,
        product_images: [
          'https://d1wbv0oufvynu1.cloudfront.net/product/32c357195dab9aeb8fcbe8552316f939.png',
          'https://d1wbv0oufvynu1.cloudfront.net/product/7aaffd386affa356bf3a48e8dffca6f9.png',
        ],
        product_badge: [
          'https://d1hp210v61lyyp.cloudfront.net/data/20221221224430_.png',
          'https://d1hp210v61lyyp.cloudfront.net/data/20221221224434_.png',
        ],
        product_brand: "브랜드명",
        product_name: "상품명2",
        product_subname: "상품명 2", // pc 버전만 출력
        product_description: "상품 설명", // pc 버전만 출력
        product_tag: ['쿠폰', '개별배송'],
        product_cost_price: 10000,
        product_sales_price: 10000,
        product_quantity: 100,
        product_subscription_price: 9900, // 6회차 구독 금액
        product_detail: "", // html
        is_promotion: "",
        is_like: true,
        is_like_count: '1,234',
      },
      {
        product_index: 3,
        product_images: [
          'https://d1wbv0oufvynu1.cloudfront.net/product/7aaffd386affa356bf3a48e8dffca6f9.png',
          'https://d1wbv0oufvynu1.cloudfront.net/product/32c357195dab9aeb8fcbe8552316f939.png',
        ],
        product_badge: [
          'https://d1hp210v61lyyp.cloudfront.net/data/20221221224430_.png',
          'https://d1hp210v61lyyp.cloudfront.net/data/20221221224434_.png',
        ],
        product_brand: "브랜드명",
        product_name: "상품명3",
        product_subname: "상품명 2", // pc 버전만 출력
        product_description: "상품 설명", // pc 버전만 출력
        product_tag: ['쿠폰', '개별배송'],
        product_cost_price: 10000,
        product_sales_price: 10000,
        product_quantity: 100,
        product_subscription_price: 9900, // 6회차 구독 금액
        product_detail: "", // html
        is_promotion: "",
        is_like: true,
        is_like_count: '1,234',
      },
    ],
  }
  return <SubscriptionComponent {...props} />
}

export default Subscription
