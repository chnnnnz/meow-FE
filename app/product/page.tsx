import StoreComponent from '@components/product'

function Store() {
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
    ]
  }
  return <StoreComponent {...props} />
}

export default Store
