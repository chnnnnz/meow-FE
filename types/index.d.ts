/**
 * Type definitions for the AWS config
 *
 * @type AwsConfig.cloudFrontDomain - CloudFront domain name
 * @type AwsConfig.s3Bucket - S3 bucket name
 * @type AwsConfig.s3BucketRegion - S3 bucket region
 * @type AwsConfig.s3BucketKey - S3 bucket key
 * @type AwsConfig.s3BucketSecret - S3 bucket secret
 */
export type AwsConfig = {
  cloudFrontDomain?: string
  s3Bucket?: string
  s3BucketRegion?: string
  s3BucketKey?: string
  s3BucketSecret?: string
}

/**
 * Type definitions for the resources urls
 *
 * @type Resources.default - Default resource url
 * @type Resources.common - Common resource url
 * @type Resources.background - Background resource url
 * @type Resources.results - Results resource url
 */
export type Resources = {
  default: string
  common: string
  background: string
  results: string
}

/**
 * Type definitions for the site config
 *
 * @type SiteConfig.company - Company name
 * @type SiteConfig.address - Company address
 * @type SiteConfig.businessNumber - 사업자등록번호
 * @type SiteConfig.registrationNumber - 통신판매업 신고번호
 * @type SiteConfig.owner - Company owner
 * @type SiteConfig.personalInformationManager - 개인정보보호책임자
 * @type SiteConfig.customerCenter - Company customer center
 * @type SiteConfig.email - Company email
 * @type SiteConfig.copyright
 */
export type SiteConfig = {
  company?: string
  address?: string
  businessNumber?: string
  registrationNumber?: string
  owner?: string
  personalInformationManager?: string
  customerCenter?: string
  email?: string
  copyright: string
}

/**
 * Type definitions for the terms
 *
 * @type Terms.title - Terms title
 * @type Terms.content - Terms content
 * @type Terms.effectiveDate - 약관 시행일
 */
export type Terms = {
  title: string
  content: string
  effectiveDate?: string
}

/**
 * Type definitions for the policy
 *
 * @type Policy.termsOfUse - 이용약관
 * @type Policy.privacyPolicy - 개인정보처리방침
 * @type Policy.thirdPartyPolicy - 제3자 제공동의
 * @type Policy.outsourcingPolicy - 개인정보 처리위탁
 * @type Policy.destructionPolicy - 개인정보 파기절차 및 방법
 * @type Policy.retentionPolicy - 개인정보 보유기간
 */
export type Policy = {
  termsOfUse: Terms
  privacyPolicy: Terms
  thirdPartyPolicy?: Terms
  outsourcingPolicy?: Terms
  destructionPolicy?: Terms
  retentionPolicy?: Terms
}

export type Category = {
  id: string
  name: string
  children: Category[]
  mpath?: string
}

export type ProductDetail = {
  product_index: string
  product_images: string[]
  product_badge: string[]
  product_brand: string
  product_name: string
  product_subname: string // pc 버전만 출력
  product_description: string // pc 버전만 출력
  product_tag: string[]
  product_cost_price: number
  product_sales_price: number
  product_quantity: number
  product_detail: string // html
  is_promotion: string
  is_like: string
  is_like_count: string
  // 리뷰 정보
  review_count: string
  review_score: number
  // 카테고리 정보
  category_precaution: string // html
  category_exchange_guide: string // html
  option?: {
    option_name: string
    option_value: string[]
    option_price: number[]
    required?: boolean
  }[]
}

export type Customer = {
  id: string
  email: string
  phone: string
}
