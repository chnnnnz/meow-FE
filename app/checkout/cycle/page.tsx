"use client"

import React, { useState } from 'react'
import Button from '@/components/common/button'
import Input from '@/components/common/input'
import Container from '@/components/common/container'


/** 주문상품 목록 컴포넌트 - MO */
function ProductItemList (){
    return (
        <li className="flex py-[20px] border-b-[1px] border-gray-02 last:border-0 last:pb-0">
            <a className="w-[100%] max-w-[80px]" href="">
                <img className="w-[100%]" src="https://d1hp210v61lyyp.cloudfront.net/product/20230424100235_.jpg" alt="" />
            </a>
            <div className="w-full flex flex-col justify-between ml-[12px]"
            >
                <div className="text-gray-09">
                    <p className="caption-sm text-gray-07 mb-[2px] truncate">미우타임즈</p>
                    <p className="body-text-md mb-[4px] line-clamp-2">더 스탠다드 / 6kg</p>
                </div>
                <div className="flex justify-between items-end">
                    <span className='caption-md text-gray-05'>수량 1개</span>
                    <div className='text-right'>
                        <p className='text-[13px] font-[500] leading-[18.2px] text-gray-04 line-through'>17,900원</p>
                        <p className='text-lg'>
                            <span className='text-green-04 mr-[4px]'>20%</span>
                            <span className='text-gray-09'>17,900원</span>
                        </p>
                    </div>
                </div>
                {/* 스토어 상품 옵션 */}
                {/* <div>
                    <div className="body-text-sm text-gray-07 px-[8px] py-[5px] mt-[8px] bg-gray-01 rounded-[4px] truncate">옵션: 그린/80X65 / 1개</div>
                    <div className="body-text-sm text-gray-07 px-[8px] py-[5px] mt-[8px] bg-gray-01 rounded-[4px] truncate">옵션: 그린/80X65 / 1개</div>
                    <div className="body-text-sm text-gray-07 px-[8px] py-[5px] mt-[8px] bg-gray-01 rounded-[4px] truncate">옵션: 그린/80X65 / 1개</div>
                </div> */}
            </div>
        </li>
    )
}
/** //주문상품 목록 컴포넌트 - MO */

/** 주문상품 목록 컴포넌트PC - 구독 */
function ProducListItemsSubsc () {
    return (
        <tr className="text-center">
            <td className="text-gray-09 py-[12px] first:pt-[16px] text-left">
                <div className="flex">
                    <a className="w-[100%] max-w-[80px]" href="">
                        <img className="w-[100%]" src="https://d1hp210v61lyyp.cloudfront.net/product/20230424100235_.jpg" alt="" />
                    </a>
                    <div className="w-full flex flex-col justify-between ml-[12px]">
                        <div className="">
                            <p className="caption-Lg-14-100 text-gray-08 mb-[2px] truncate">미우타임즈</p>
                            <p className="title-SB-17-150 text-gray-09 mb-[8px] line-clamp-2">더 스탠다드 / 6kg</p>
                        </div>
                    </div>
                </div>
            </td>
            <td className="body-M-14-150 text-gray-09 py-[12px] first:pt-[16px]">1</td>
            <td className="title-SB-17-150 text-gray-09 py-[12px] first:pt-[16px]">11,900원</td>
        </tr>
    )
}
/** //주문상품 목록 컴포넌트PC - 구독 */

/** 구독 주기 컴포넌트 */
export type SelectCycleProps = {
    inputId?: string
    inputName?: string
    text?: string
    onClick?: () => void
    selected?: boolean
}

function SelectCycle (props:SelectCycleProps) {
    return (
        <label
            htmlFor={props.inputId}
            className={`flex justify-center items-center h-[48px] body-md p-[10px] border-[1px] ${props.selected ? "text-green-03 border-green-05" : "text-gray-06 border-gray-03"} rounded-[4px] cursor-pointer laptop:title-M-17-150`}
            onClick={(e) => props.onClick?.()}
        >
            <input type="radio" name={props.inputName} id={props.inputId} className='hidden' />
            {props.text}
        </label>
    )
}
/** //구독 주기 컴포넌트 */

type SelectAgreeTypeProps = {
    inputName: string
    inputId: string
    times?: number
    title?: string
    onClick?: () => void
    imgSrc?: string
    originPrice?: number
    selected?: boolean
}

/** 약정유형 컴포넌트 */
function SelectAgreeType (props:SelectAgreeTypeProps, ) {

    return (
        <label htmlFor={props.inputId} className={`relative border-[1px] ${props.selected ? "border-green-05" : "border-gray-02"} overflow-hidden rounded-[4px] cursor-pointer`} onClick={props.onClick}>
            <input type="radio" name={props.inputName} id={props.inputId} className='hidden'/>
            <div className='w-full'>
                {props.imgSrc && (
                    <img src={props.imgSrc} alt="" className='w-full' />
                )}
            </div>
            <i className={`${props.selected ? "xi-radiobox-checked text-green-03" : "xi-radiobox-blank text-gray-03"} ${props.imgSrc && "absolute left-0 top-0"} text-[24px] font-[400] p-[8px] pb-0`}></i>
            <div className='p-[10px] bg-white '>
                <div className='pb-[10px]'>
                    <p className='body-text-lg text-gray-09 truncate laptop:depth-menu-SB-16-150'>{props.times === 0 ? "일반 정기구독" : `${props.times}회 약정 상품 [${props.title}] 증정`}</p>
                    <p className='caption-sm text-gray-06 mt-[4px] laptop:body-M-14-150'>약정 설명글이 출력되는 영역, 글자수는 예상 약 30자</p>
                </div>
                    {(props.times !== 0) && (
                        <div className='border-t-[1px] border-gray-02 pt-[8px]'>
                            <span className='text-lg text-gray-09 mr-[4px] laptop:sub-head-B-20-130 laptop:mr-[12px]'>0원</span>
                            <span className='caption-md text-gray-04 line-through laptop:title-M-17-150'>{(props.originPrice)?.toLocaleString('ko-KR')}원</span>
                        </div>
                    )}
            </div>
        </label>
    )
}
/** //약정유형 컴포넌트 */

/** 약정 상품 확인 컴포넌트 */
type AgreementProductProps = {
    selectedType?: number
}
function AgreementProduct (props:AgreementProductProps) {
    return (
        <>
            <div className='relative flex justify-between items-center px-[13px] py-[12px] bg-gray-01 mt-[20px] rounded-[4px] laptop:mt-[60px] laptop:px-[20px]'>
                <span className='body-text-md text-gray-08 mr-[20px] laptop:body-M-14-150 laptop:text-gray-06 laptop:absolute left-0 top-[-32px] laptop:body-SB-14-150'>약정 유형</span>
                <span className='body-text-md text-green-04 laptop:depth-menu-M-16-150'>{props.selectedType}회 약정</span>
            </div>

            <div className='mt-[20px] laptop:mt-[33px]'>
                <p className='body-text-md text-gray-08 laptop:body-SB-14-150 laptop:text-gray-05'>약정 혜택 상품</p>
                <div className='flex mt-[12px] p-[12px] border-[1px] border-gray-03 rounded-[4px] laptop:p-0 laptop:border-gray-02 overflow-hidden'>
                    <div className="min-w-[80px] max-w-[80px] tablet:max-w-[104px]">
                        <img src="https://d1hp210v61lyyp.cloudfront.net/shop_goods_thum_452/78c0ef6298aeb2303b29d86419c380dd.png" alt="" />
                    </div>
                    <div className='relative w-full flex flex-col justify-between pl-[12px] laptop:px-[16px] laptop:py-[20px]'>
                        <div className='laptop:w-[80%]'>
                            <div className='body-text-md text-gray-09 truncate laptop:title-SB-17-150 laptop:text-gray-08'>
                                <p className='laptop:caption-M-13-130 laptop:mb-[4px]'>{props.selectedType}회 약정 상품</p>
                                [페스룸 웻 핏 트윈 테이블&보울] 증정
                            </div>
                            <p className='caption-sm text-gray-05 mt-[2px] laptop:caption-Lg-14-100 laptop:text-gray-07 laptop:mt-[12px]'>약정 설명글이 출력되는 영역, 글자수는 예상 약 30자</p>
                        </div>
                        <div className='text-right laptop:absolute right-[24px] bottom-[20px]'>
                                <span className='body-text-md text-gray-04 line-through mr-[4px] laptop:title-M-17-150 laptop:mr-[12px]'>17,900원</span>
                                <span className='text-lg text-gray-09 mr-[4px] laptop:sub-head-B-20-130'>0원</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
/** //약정 상품 확인 컴포넌트 */

/** 주문서 > 구독 주기 선택 페이지 컴포넌트 */
function Cycle (){
    /** 구독 주기 및 약정 선택 */
    const [selectedCycle, setSelectedCycle] = useState<number | undefined>()
    const [selectedType, setSelectedType] = useState<number | undefined>()

    return (
        <Container className='px-[0] laptop:px-[16px] laptop:pt-[80px]'>
            <div className="relative w-full laptop:flex laptop:items-start desktop:px-0">
                {/* PC 기준 왼쪽 레이아웃 */}
                <div className='w-full laptop:flex-1'>
                    <h3 className="hidden head-B-36-130 text-gray-09 pb-[28px] laptop:block">주문서</h3>
                    <div className='laptop:border-t-[2px] laptop:pb-[32px] border-gray-07'>
                        <section className="py-[20px] border-gray-01 border-t-[8px] laptop:px-0 laptop:py-[32px] first:border-0">
                            <div>
                                <h3 className="title-md text-gray-09 mb-[6px] laptop:sub-head-B-20-130">상품을 받아보실 주기를 선택해 주세요.</h3>
                                <p className="body-sm text-gray-07 laptop:title-M-17-150 laptop:text-gray-06">선택하신 주기마다 
                                자동으로 결제가 이루어져요.</p>
                            </div>
                            
                            <div className="mt-[20px]">
                                <p className="title-sm text-gray-09 mb-[20px] laptop:body-SB-14-150 laptop:text-gray-05 laptop:mb-[12px]">구독 주기</p>
                                <div className='grid gap-[4px] laptop:grid-cols-2 laptop:gap-[12px]'>
                                    <SelectCycle
                                        inputId="week_02"   
                                        inputName= "cycle"
                                        text= "2주마다 결제 후 배송받기"
                                        selected={selectedCycle === 0}
                                        onClick={() => setSelectedCycle(0)}
                                    />
                                    <SelectCycle
                                        inputId="week_03"   
                                        inputName= "cycle"
                                        text= "3주마다 결제 후 배송받기"
                                        selected={selectedCycle === 1}
                                        onClick={() => setSelectedCycle(1)}
                                    />
                                    <SelectCycle
                                        inputId="week_04"   
                                        inputName= "cycle"
                                        text= "4주마다 결제 후 배송받기"
                                        selected={selectedCycle === 2}
                                        onClick={() => setSelectedCycle(2)}
                                    />
                                    <SelectCycle
                                        inputId="week_06"   
                                        inputName= "cycle"
                                        text= "6주마다 결제 후 배송받기"
                                        selected={selectedCycle === 3}
                                        onClick={() => setSelectedCycle(3)}
                                    />
                                </div>
                            </div>
                        </section>

                        <section className='py-[20px] border-gray-01 border-t-[8px] laptop:px-0 laptop:py-[32px] first:border-0'>
                            <div>
                                <h3 className="title-md text-gray-09 mb-[6px]">약정 유형을 선택해 주세요.</h3>
                                <p className="body-sm text-gray-07 laptop:title-M-17-150 laptop:text-gray-06">약정 유형별로 다양한 혜택이 제공됩니다.</p>
                            </div>

                            <div className='mt-[20px]'>
                                <div className='grid grid-cols-2 gap-[7px] laptop:gap-[12px] desktop:grid-cols-4'>
                                    <SelectAgreeType
                                        inputName="agreement"
                                        inputId="agreeType01"
                                        times={3}
                                        title="페스룸 웰핏 보울"
                                        originPrice={9900}
                                        selected={selectedType === 3}
                                        onClick={() => {setSelectedType(3)}}
                                        imgSrc="https://d1hp210v61lyyp.cloudfront.net/shop_goods_thum_452/78c0ef6298aeb2303b29d86419c380dd.png"
                                    />
                                    <SelectAgreeType
                                        inputName="agreement"
                                        inputId="agreeType02"
                                        times={6}
                                        title="페스룸 빙고 트레이닝 트릿"
                                        originPrice={11900}
                                        selected={selectedType === 6}
                                        onClick={() => {setSelectedType(6)}}
                                        imgSrc="https://d1hp210v61lyyp.cloudfront.net/shop_goods_thum_452/20230705173010_.jpg"
                                    />
                                    <SelectAgreeType
                                        inputName="agreement"
                                        inputId="agreeType03"
                                        times={9}
                                        title="페스룸 빙고 트레이닝 트릿"
                                        originPrice={19900}
                                        selected={selectedType === 9}
                                        onClick={() => {setSelectedType(9)}}
                                        imgSrc="https://d1hp210v61lyyp.cloudfront.net/shop_goods_thum_452/5c374160a7e3ff45be117397bf03f1c0.png"
                                    />
                                    <SelectAgreeType
                                        inputName="agreement"
                                        inputId="agreeType04"
                                        times={0}
                                        title="일반 정기구독"
                                        selected={selectedType === 0}
                                        onClick={() => setSelectedType(0)}
                                        imgSrc="https://d1hp210v61lyyp.cloudfront.net/shop_goods_thum_452/df8c4e94bb2de0b9fb7c60f580c7f639.png"
                                    />
                                </div>

                                {(selectedType && selectedType !== 0) && (
                                    <div className='bg-gray-01 p-[14px] mt-[20px] rounded-[4px] laptop:p-[20px] laptop:mt-[24px]'>
                                        <p className='body-text-md text-gray-09 pb-[10px] border-b-[1px] border-gray-02 laptop:sub-head-B-20-130 laptop:border-0'>이용안내</p>
                                        <div>
                                            <p className='caption-lg text-gray-08 mt-[10px] mb-[4px] laptop:title-SB-17-150'>중도 해지 및 정지</p>
                                            <p className='caption-md text-gray-06 laptop:title-M-17-150 laptop:pb-[16px] laptop:border-b-[1px] border-gray-02'>{selectedType}회 약정 유형은 {selectedType}회 정기 결제 상품으로, 만약 {selectedType}회 이용 횟수 충족 전에 구독을 중도 해지 및 정지 할 경우 이미 받아보신 첫 달 무료 혜택에 대한 반환금이 청구됩니다.</p>
                                            <p className='caption-lg text-gray-08 mt-[10px] mb-[4px] laptop:title-SB-17-150 laptop:mt-[16px]'>{selectedType}회 이용 후 자동 연장</p>
                                            <p className='caption-md text-gray-06 laptop:title-M-17-150'>{selectedType}회 이용 횟수를 모두 이용하신 경우 자동으로 정기배송이 연장되며, 회차별 적용 금액으로 계속 이용 가능합니다. 3회 이용 이후 정기배송 유지 시, 해지 및 정지에 제한 없이 이용 가능합니다.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section className='py-[20px] border-gray-01 border-t-[8px] laptop:px-0 laptop:py-[32px] first:border-0'>
                            <div>
                                <h3 className="title-md text-gray-09 mb-[6px] laptop:sub-head-B-20-130">추천인이 있으신가요?</h3>
                                <p className="body-sm text-gray-07 laptop:title-M-17-150 laptop:text-gray-06">추천인을 입력하고, 추천인과 함께 포인트를 받아보세요.</p>
                            </div>

                            <div className='mt-[20px]'>
                                <Input
                                    outerClassName="laptop:!block"
                                    label={{text:"(선택) 추천인 코드번호", className:"laptop:mb-[13px]"}}
                                    placeholder='추천인 코드번호'
                                ></Input>
                            </div>
                        </section>
                    </div>

                    <div className='laptop:border-t-[2px] laptop:pb-[32px] border-gray-07'>
                        <section className='py-[20px] border-gray-01 border-t-[8px] laptop:px-0 laptop:py-[32px] laptop:first:border-0'>
                            <div>
                                <h3 className="title-md text-gray-09 mb-[6px] laptop:sub-head-B-20-130">구독하실 상품을 확인해 보세요.</h3>
                                <p className="body-text-sm text-gray-07 laptop:title-M-17-150 laptop:text-gray-06">마이페이지&#62;구독관리를 통해 언제든지 변경 가능해요.</p>
                            </div>
                            
                            <div className='mt-[20px]'>
                                <p className='title-sm text-gray-09'>구독할 상품</p>
                                {/* MO */}
                                <ul className='laptop:hidden'>
                                    <ProductItemList />
                                    <ProductItemList />
                                    <ProductItemList />
                                </ul>
                                
                                {/* PC - 구독상품 */}
                                <table className="hidden w-full mt-[20px] laptop:table">
                                    <thead className="h-[32px] body-M-14-150 text-center bg-gray-01 border-t-[1px] border-gray-02">
                                        <tr className="">
                                            <th className="w-[auto]">상품정보</th>
                                            <th className="w-[20%]">수량</th>
                                            <th className="w-[20%]">상품 금액</th>
                                        </tr>
                                    </thead>
                                    <tbody className="body-SB-14-150">
                                        <ProducListItemsSubsc/>
                                        <ProducListItemsSubsc/>
                                        <ProducListItemsSubsc/>
                                    </tbody>
                                </table>
                                <div className='laptop:flex justify-between items-center px-[13px] py-[12px] bg-yellow-01 mt-[20px] rounded-[4px]'>
                                    {/* <div className='mb-[9px] flex items-center laptop:m-0'>
                                        <i className='xi-error text-green-03 text-[16px] font-[400] mr-[4px] laptop:mr-[8px]'></i>
                                        <span className='body-text-lg text-gray-09 laptop:text-[17px] laptop:font-[600]'>100% 무제한 페이백 이벤트</span>
                                    </div> */}
                                    <div className='flex justify-between items-center ml-auto'>
                                        <span className='body-text-md text-gray-08 mr-[20px] laptop:body-M-14-150 laptop:text-gray-06'>예상 적립 포인트</span>
                                        <span className='text-lg text-gray-09 laptop:title-SB-17-150'>1,790P</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {(selectedType && selectedType !== 0) && (
                            <section className='py-[20px] border-gray-01 border-t-[8px] laptop:px-0 laptop:py-[32px] laptop:first:border-0'>
                                <div>
                                    <h3 className="title-md text-gray-09 mb-[6px] laptop:sub-head-B-20-130">선택한 약정 정보를 확인해 보세요.</h3>
                                    <p className="body-sm text-gray-07 laptop:title-M-17-150 laptop:text-gray-06">구독 상품 외 별도로 약정 혜택 상품이 추가 제공됩니다.</p>
                                </div>
                                <AgreementProduct
                                    selectedType={selectedType}
                                />
                            </section>
                        )}
                    </div>
                </div>

                {/* PC 기준 오른쪽 레이아웃 */}
                <div className='border-t-[8px] border-gray-01 laptop:max-w-[356px] laptop:sticky laptop:mt-[73px] right-0 top-[150px] laptop:flex-0 laptop:basis-[32%] laptop:ml-[76px] tablet:border-0'>
                    <div className='rounded-[4px] tablet:border-[1px] tablet:border-gray-02 laptop:rounded-[4px] laptop:overflow-hidden'>
                        <section className='py-[20px] tablet:px-[20px] laptop:py-[32px] laptop:px-[24px] laptop:pt-[20px] laptop:pb-[24px] tablet:bg-gray-bg'>
                            <p className='title-sm text-gray-09 laptop:sub-head-B-20-130'>결제 정보</p>
                            
                            <ul className='mt-[20px]'>
                                <li className='flex justify-between items-center mb-[12px]'>
                                    <span className='body-text-sm text-gray-08 laptop:text-gray-06 laptop:body-M-14-150'>총 상품 금액</span>
                                    <span className='btn-text-lg text-gray-06 laptop:title-M-17-150'>35,800원</span>
                                </li>
                                <li className='flex justify-between items-center mb-[12px]'>
                                    <span className='body-text-sm text-gray-08 laptop:text-gray-06 laptop:body-M-14-150'>구독 할인</span>
                                    <span className='btn-text-lg text-gray-09 laptop:title-M-17-150'>-12,000원</span>
                                </li>
                                <li className='flex justify-between items-center mb-[12px]'>
                                    <span className='body-text-sm text-gray-08 laptop:text-gray-06 laptop:body-M-14-150'>첫 구독 할인</span>
                                    <span className='btn-text-lg text-gray-09 laptop:title-M-17-150'>-11,900원</span>
                                </li>
                                <li className='flex justify-between items-center mb-[12px]'>
                                    <span className='body-text-sm text-gray-08 laptop:text-gray-06 laptop:body-M-14-150'>배송비</span>
                                    <span className='btn-text-lg text-gray-06 laptop:title-M-17-150'>3,000원</span>
                                </li>
                                <li className='flex justify-between items-center mb-[12px] last:mb-0 last:pt-[12px] last:border-t-[1px] border-gray-02'>
                                    <span className='body-text-sm text-gray-08 laptop:title-B-17-150 laptop:text-gray-09'>총 결제 금액</span>
                                    <span className='title-md text-green-04 laptop:sub-head-B-20-130'>26,800원</span>
                                </li>
                            </ul>
                        </section>
                    </div>

                    <div className='fixed left-0 bottom-0 w-full px-[16px] py-[8px] bg-gray-01 border-t-[1px] border-gray-02 laptop:static laptop:p-0 laptop:bg-transparent laptop:mt-[24px]'>
                        <Button>다음</Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Cycle