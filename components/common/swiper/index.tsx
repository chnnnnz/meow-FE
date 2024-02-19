import React  from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import SwiperCore from 'swiper'
import { Autoplay } from 'swiper/modules'
import Image from 'next/image'
import { SimpleFacetValueFragment } from '@/modules/gql/generated'
import { TopBadge } from '../badge'



SwiperCore.use([Autoplay])

export type SwiperProps = {
  imageArray: string[]
  badges: SimpleFacetValueFragment[]
  pair?: boolean
  pairChildren?: React.ReactNode
}

const SwiperComponent:React.FC<SwiperProps> = ({ imageArray, badges, pair, pairChildren}) => {
  return (
    <>
    <div className="flex w-full items-center text-center justify-center laptop:w-1/2 laptop:pt-6 mx-auto">
      <div className="flex w-full laptop:px-3">
        <Swiper slidesPerView={1} autoplay={{ delay: 3000 }} loop={true} className="!z-0 h-auto">
          {imageArray.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="flex-col items-center border-1 border-gray-04 shadow-gray-05">
                  <div className="flex-col items-center w-full">
                    <div className="flex justify-end">
                      {badges &&  badges.map((badge, index) => {
                        return (
                          <TopBadge key={index} text={badge.name} bgColor={badge.code} className='text-[14px] laptop:text-[17px] text-white'/>
                        )
                      })}
                    </div>
                    <Image
                      key={index}
                      src={item}
                      alt={''}
                      width={600}
                      height={600}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
    </>
  )
}


export default SwiperComponent