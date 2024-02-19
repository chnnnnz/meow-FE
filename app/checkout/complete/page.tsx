'use client'

import Accordion from 'components/common/accordion'
import Button from '@/components/common/button'
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
                    <span className='caption-md text-gray-05'>
                        {/* 구독 - 상품 갯수 */}
                        수량 1개
                    </span>
                    <div className='text-right'>
                        <p className='text-[13px] font-[500] leading-[18.2px] text-gray-04 line-through'>17,900원</p>
                        <p className='text-lg'>
                            <span className='text-green-04 mr-[4px]'>20%</span>
                            <span className='text-gray-09'>11,900원</span>
                        </p>
                    </div>
                </div>
                {/* 스토어 - 상품 옵션 */}
                {/* <div>
                    <div className="body-text-sm text-gray-07 px-[8px] py-[5px] mt-[8px] bg-gray-01 rounded-[4px] truncate">옵션: 그린/80X65 / 1개</div>
                    <div className="body-text-sm text-gray-07 px-[8px] py-[5px] mt-[8px] bg-gray-01 rounded-[4px] truncate">옵션: 그린/80X65 / 1개</div>
                    <div className="body-text-sm text-gray-07 px-[8px] py-[5px] mt-[8px] bg-gray-01 rounded-[4px] truncate">옵션: 그린/80X65 / 1개</div>
                </div> */}
            </div>
        </li>
    )
}


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

/** 주문상품 목록 컴포넌트PC - 스토어 */
function ProducListItemsStore () {
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
                        <div className="body-M-14-150 text-gray-07 px-[8px] py-[5px] mt-[8px] bg-gray-01 rounded-[4px] truncate">옵션: 그린/80X65 / 1개</div>
                        <div className="body-M-14-150 text-gray-07 px-[8px] py-[5px] mt-[8px] bg-gray-01 rounded-[4px] truncate">옵션: 그린/80X65 / 1개</div>
                        <div className="body-M-14-150 text-gray-07 px-[8px] py-[5px] mt-[8px] bg-gray-01 rounded-[4px] truncate">옵션: 그린/80X65 / 1개</div>
                    </div>
                </div>
            </td>
            <td className="title-SB-17-150 text-right py-[12px] first:pt-[16px]">
                <div className="whitespace-nowrap pl-[10%] pr-[15%]">
                    <p className='body-M-14-150 text-gray-04 line-through mb-[4px]'>17,000원</p>
                    <p>
                        <span className='text-green-04 mr-[11px]'>20%</span>
                        <span className='text-gray-09'>11,900원</span>
                    </p>
                </div>
            </td>
        </tr>
    )
}

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

function Complete () {
    return (
        <Container className='px-[0] laptop:px-[16px] laptop:pt-[80px]'>
            <div className="relative w-full laptop:flex laptop:items-start desktop:px-0">
                {/* PC 기준 왼쪽 레이아웃 */}
                <div className='w-full laptop:flex-1'>
                    <h3 className="hidden head-B-36-130 text-gray-09 pb-[28px] laptop:block">주문완료</h3>
                    
                    <div className='laptop:border-t-[2px] laptop:pb-[32px] border-gray-07'>
                        <section className="py-[20px] border-gray-01 border-t-[8px] laptop:px-0 laptop:py-[32px] first:border-0">
                            <div className='flex flex-col items-center gap-[8px] text-center laptop:items-start laptop:text-left'>
                                <div className='flex flex-col gap-[8px] mb-[8px] laptop:flex-row laptop:gap-[16px] laptop:items-center'>
                                    <i className='xi-check-circle text-[24px] font-[400] text-sys-green'></i>
                                    <p className='title-lg text-gray-09'>주문이 완료되었습니다.</p>
                                    <span className='body-text-sm text-gray-06'>2023-09-26 19:12:30</span>
                                </div>
                                <div className='w-fit py-[6px] px-[10px] bg-yellow-01 text-gray-09 rounded-[20px]'>
                                    <span className='body-text-sm inline-block mr-[8px]'>주문번호</span>
                                    <span className='body-text-lg'>S230829-HT55-09236867</span>
                                </div>
                            </div>
                        </section>
                        
                        {/* 결제수단 - 가상계좌일 시 */}
                        <section className="py-[20px] border-gray-01 border-t-[8px] laptop:px-0 laptop:py-[32px] first:border-0">
                            
                            <div className='flex justify-between title-sm laptop:sub-head-B-20-130'>입금 계좌 정보</div>
                            
                            <div className='pt-[20px]'>
                                <dl className='flex mb-[12px] last:mb-0'>
                                    <dt className='w-[25%] max-w-[120px] body-text-sm text-gray-05 laptop:body-SB-14-150'>은행명</dt>
                                    <dd className='w-[75%] body-text-sm text-gray-09 laptop:title-M-17-150'>케이뱅크</dd>
                                </dl>
                                <dl className='flex mb-[12px] last:mb-0'>
                                    <dt className='w-[25%] max-w-[120px] body-text-sm text-gray-05 laptop:body-SB-14-150'>계좌번호</dt>
                                    <dd className='w-[75%] body-text-sm text-gray-09 laptop:title-M-17-150 flex items-center gap-[4px] laptop:gap-[8px]'>20394518382303 <i className='xi-documents-o text-[16px] font-[400] text-gray-04 cursor-pointer laptop:text-[17px]'></i></dd>
                                </dl>
                                <dl className='flex mb-[12px] last:mb-0'>
                                    <dt className='w-[25%] max-w-[120px] body-text-sm text-gray-05 laptop:body-SB-14-150'>입금액</dt>
                                    <dd className='w-[75%] body-text-sm text-gray-09 laptop:title-M-17-150'>38,800원</dd>
                                </dl>
                                <dl className='flex mb-[12px] last:mb-0'>
                                    <dt className='w-[25%] max-w-[120px] body-text-sm text-gray-05 laptop:body-SB-14-150'>입금 마감일</dt>
                                    <dd className='w-[75%] body-text-sm text-gray-09 laptop:title-M-17-150'>2023-09-29 22:32까지</dd>
                                </dl>
                            </div>
                            <p className='caption-sm text-gray-07 flex items-center gap-[4px] mt-[20px] laptop:body-RG-14-170'><i className='xi-info-o text-[14px] font-[400]'></i> 마이페이지&#62;주문조회에서 입금계좌를 확인할 수 있습니다.</p>
                        </section>
                        {/* //결제수단 - 가상계좌일 시 */}

                        <section className="py-[20px] border-gray-01 border-t-[8px] laptop:px-0 laptop:py-[32px] first:border-0">
                            
                            <div className='flex justify-between title-sm laptop:sub-head-B-20-130'>
                                주문 상품
                                {/* 구독 - 구독주기 뱃지 */}
                                {/* <span className='caption-lg text-green-03 border-green-03 border-[1px] py-[4px] px-[8px] rounded-[20px]'>2주마다 결제</span>     */}
                            </div>
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
    
                                {/* PC - 스토어상품 */}
                                <table className="hidden w-full mt-[20px] laptop:table">
                                    <thead className="h-[32px] body-M-14-150 text-center bg-gray-01 border-t-[1px] border-gray-02">
                                        <tr className="">
                                            <th className="w-[auto]">상품정보/옵션</th>
                                            <th className="w-[30%]">상품 금액</th>
                                        </tr>
                                    </thead>
    
                                    <tbody className="body-SB-14-150">
                                        <ProducListItemsStore/>
                                        <ProducListItemsStore/>
                                        <ProducListItemsStore/>
                                    </tbody>
                                </table>
                        </section>

                        {/* 약정 상품 있을 시 */}
                        <section className="py-[20px] border-gray-01 border-t-[8px] laptop:px-0 laptop:py-[32px] first:border-0">
                            <p className='title-sm text-gray-09 laptop:sub-head-B-20-130'>약정 정보</p>
                            <AgreementProduct selectedType={3}/>
                        </section>
                        {/* //약정 상품 있을 시 */}
                    </div>
                    
                </div>

                {/* PC 기준 오른쪽 레이아웃 */}
                <div className='border-t-[8px] border-gray-01 laptop:max-w-[356px] laptop:sticky laptop:mt-[73px] right-0 top-[150px] laptop:flex-0 laptop:basis-[32%] laptop:ml-[76px] tablet:border-0'>
                    <div className='rounded-[4px] tablet:border-[1px] tablet:border-gray-02 laptop:rounded-[4px] laptop:overflow-hidden'>
                        <section className='py-[20px] tablet:px-[20px] laptop:py-[32px] laptop:px-[24px] laptop:pt-[20px] laptop:pb-[24px] tablet:bg-gray-bg'>
                            <p className='title-sm text-gray-09 laptop:sub-head-B-20-130'>결제 정보</p>
                            
                            <ul className='mt-[20px]'>
                                <li className='flex justify-between items-start mb-[12px] border-b-[1px] border-gray-02 pb-[12px]'>
                                    <span className='body-text-sm text-gray-08 laptop:text-gray-06 laptop:body-M-14-150'>결제수단</span>
                                    <div className='text-right'>
                                        <p className='body-text-md text-gray-09'>신용/체크카드</p>
                                        <p className='body-text-sm text-gray-07 mt-[4px] laptop:body-M-14-150'>(비씨 1234-****-****-1234)</p>
                                    </div>
                                </li>
                                {/* 정기구독 - 구독 헤택가 */}
                                <li className='flex justify-between items-center mb-[12px]'>
                                    <span className='body-text-sm text-gray-08 laptop:text-gray-06 laptop:body-M-14-150'>총 상품 금액</span>
                                    <span className='btn-text-lg text-gray-06 laptop:title-M-17-150'>35,800원</span>
                                </li>
                                <li className='flex justify-between items-center mb-[12px]'>
                                    <span className='body-text-sm text-gray-08 laptop:text-gray-06 laptop:body-M-14-150'>구독 할인</span>
                                    <span className='btn-text-lg text-gray-09 desktop:title-M-17-150'>-12,000원</span>
                                </li>
                                <li className='flex justify-between items-center mb-[12px]'>
                                    <span className='body-text-sm text-gray-08 laptop:text-gray-06 laptop:body-M-14-150'>첫 구독 할인</span>
                                    <span className='btn-text-lg text-gray-09 desktop:title-M-17-150'>-11,900원</span>
                                </li>
                                <li className='flex justify-between items-center mb-[12px]'>
                                    <div>
                                        <span className='body-text-sm text-gray-08 laptop:text-gray-06 laptop:body-M-14-150'>배송비</span>
                                        {/* 스토어 - 배송비 텍스트 */}
                                        {/* <p className='caption-md text-gray-05 laptop:inline-block laptop:text-gray-07 laptop:caption-M-12-150 laptop:ml-[4px]'>(5만원 이상 구매시 무료배송)</p> */}
                                    </div>
                                    <span className='btn-text-lg text-gray-06 laptop:title-M-17-150'>3,000원</span>
                                </li>
                                {/* 스토어 - 포인트 사용 */}
                                {/* <li className='flex justify-between items-center mb-[12px]'>
                                    <span className='body-text-sm text-gray-08 laptop:text-gray-06 laptop:body-M-14-150'>포인트 사용</span>
                                    <span className='btn-text-lg text-gray-09 laptop:title-M-17-150'>0P</span>
                                </li> */}
                                <li className='flex justify-between items-center mb-[12px] last:mb-0 last:pt-[12px] last:border-t-[1px] border-gray-02'>
                                    <span className='body-text-sm text-gray-08 laptop:title-B-17-150 laptop:text-gray-09'>총 결제 금액</span>
                                    <span className='title-md text-green-04 laptop:sub-head-B-20-130'>26,800원</span>
                                </li>
                            </ul>
                        </section>
                    </div>
    
                    <div className='fixed left-0 bottom-0 w-full px-[16px] py-[8px] bg-gray-01 border-t-[1px] border-gray-02 laptop:static laptop:p-0 laptop:bg-transparent laptop:mt-[24px]'>
                        <div className='flex justify-between gap-[7px]'>
                            <Button 
                                variant='white'
                                className=''
                            >쇼핑 계속하기
                            </Button>
                            <Button 
                                className=''
                            >주문내역확인
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
export default Complete