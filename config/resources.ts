import { AwsConfig, Resources } from 'types'
import process from 'process'

export const awsConfig: AwsConfig = {
  cloudFrontDomain: 'https://d39h0xn1r3o9zb.cloudfront.net/',
  s3Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
  s3BucketRegion: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_REGION,
  s3BucketKey: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_KEY,
  s3BucketSecret: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_SECRET,
}

export const resources: Resources = {
  default: `${awsConfig.cloudFrontDomain}`,
  common: `${awsConfig.cloudFrontDomain}dev/common/`,
  background: `${awsConfig.cloudFrontDomain}dev/bg/`,
  results: `${awsConfig.cloudFrontDomain}dev/result/`,
}
