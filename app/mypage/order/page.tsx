import Button from "@/components/common/button"
import SelectBox from "@/components/common/selectbox"

type ProducListItemsProps = {
    deliverStatus: "pay" | "ready" | "transit" | "delivered" | "cancel"
}
type OrederListItemsProps = {
    paySort : "subscribe" | "normal"
}


function Badge (props: OrederListItemsProps) {
    if (props.paySort === "subscribe")
    return (
        <div className="flex items-center w-fit caption-sm mt-[12px] laptop:mt-[8px]">
            <span className="text-green-03 px-[8px] py-[4px] bg-green-01 laptop:caption-Lg-14-100 laptop:py-[7px]">[벤토나이트] 1회차</span>
            <span className="ml-[8px] text-gray-07 laptop:body-M-14-150">회차 인정 취소</span>
        </div>
    )
}

/** 주문 목록 컴포넌트 */
function OrderListItems (props: OrederListItemsProps) {
    return (
        <li className="pt-[44px] first:pt-0 laptop:pt-[64px] laptop:pb-[44px] laptop:first:pt-0 laptop:last:pb-0 laptop:border-b-[8px] laptop:border-gray-01 last:border-0">
            <div className="laptop:px-[16px] desktop:px-0">
                <div className="laptop:flex laptop:items-center">
                    <span className={`text-[12px] font-[500] leading-1 whitespace-nowrap px-[8px] py-[4px] mr-[12px] text-white laptop:title-M-17-150 ${props.paySort === "subscribe" ? 'bg-green-04' : 'bg-yellow-04'}`}>{props.paySort === "subscribe" ? "정기구독" : "일반구매"}</span>
                    <a className="w-full flex items-center justify-between border-b-[1.5px] border-gray-07 py-[11px] laptop:border-0" href="">
                        <p className="flex items-center">
                            <span className="btn-text-lg text-gray-08 mr-[8px] laptop:title-M-17-150">2023-09-01</span>
                            <span className="caption-sm text-gray-06 laptop:title-M-17-150 laptop:text-gray-05">(S230901-HT55-09236867)​</span>
                        </p>
                        
                        <div className="flex items-center">
                            <span className="hidden laptop:inline depth-menu-M-16-150">상세내역 보기</span>
                            <i className="xi-angle-right text-[14px] font-[400] leading-1 text-gray-07 ml-[8px] laptop:text-[16px] laptop:text-gray-08"></i>
                        </div>
                    </a>
                </div>

                <Badge paySort={props.paySort}/>
            </div>

            {/* 상품 목록 - MO */}
            <ul className="laptop:hidden">
                <ProducListItems deliverStatus="pay"/>
                <ProducListItems deliverStatus="ready"/>
                <ProducListItems deliverStatus="delivered"/>
            </ul>
            {/* //상품 목록 - MO */}
            
            {/* 상품 목록 - PC */}
            <div className="hidden mt-[20px] laptop:block">
                <table className="w-full">
                    <thead className="h-[32px] body-M-14-150 text-center bg-gray-01 ">
                        <tr className="">
                            <th className="w-[15%]">주문상태</th>
                            <th className="w-[auto]">상품정보</th>
                            <th className="w-[15%]">수량</th>
                            <th className="w-[20%]">상품금액</th>
                        </tr>
                    </thead>
                    <tbody className="body-SB-14-150">
                        <ProducListItemsPC deliverStatus="pay"/>
                        <ProducListItemsPC deliverStatus="ready"/>
                        <ProducListItemsPC deliverStatus="delivered"/>
                    </tbody>
                </table>
            </div>
            {/* //상품 목록 - PC */}
        </li>
    )
}

/** 상품 목록 컴포넌트 */
function ProducListItems (props : ProducListItemsProps) {
    return (
        <li className="py-[20px] border-b-[1px] border-gray-02 last:pb-0 last:border-0">
            <p className="body-text-md text-gray-08 mb-[12px]">
                {(props.deliverStatus === 'pay') ? '결제완료' : (props.deliverStatus === 'ready') ? '상품 준비중' : (props.deliverStatus === 'transit') ? '배송중' : '배송완료'}
            </p>
            <div className="flex">
                <a className="w-[100%] max-w-[80px]" href="">
                    <img className="w-[100%]" src="https://d1hp210v61lyyp.cloudfront.net/product/20230424100235_.jpg" alt="" />
                </a>
                <div className="flex flex-col justify-between ml-[12px]">
                    <div className="text-gray-09">
                        <p className="caption-sm text-gray-07 mb-[2px] truncate">미우타임즈</p>
                        <p className="text-[16px] font-[600] leading-[18.2px] mb-[8px] line-clamp-2">더 스탠다드 / 6kg</p>
                    </div>
                    <p className="caption-lg">1개/11,900원</p>
                </div>
            </div>
            <div className="body-sm text-gray-07 px-[8px] py-[5px] mt-[12px] bg-gray-01 rounded-[4px] truncate">옵션: 그린/80X65</div>
        </li>
    )
}

function ProducListItemsPC (props : ProducListItemsProps) {
    return (
        <tr className="text-center border-b-[1px] border-gray-02 last:border-0">
            <td className="text-gray-09 py-[24px] first:pt-[16px]">
                {(props.deliverStatus === 'pay') ? '결제완료' : (props.deliverStatus === 'ready') ? '상품 준비중' : (props.deliverStatus === 'transit') ? '배송중' : '배송완료'}
            </td>
            <td className="text-gray-09 py-[24px] first:pt-[16px] text-left">
                <div className="flex">
                    <a className="w-[100%] max-w-[80px]" href="">
                        <img className="w-[100%]" src="https://d1hp210v61lyyp.cloudfront.net/product/20230424100235_.jpg" alt="" />
                    </a>
                    <div className="w-full flex flex-col justify-between ml-[12px]">
                        <div className="">
                            <p className="caption-Lg-14-100 text-gray-08 mb-[2px] truncate">미우타임즈</p>
                            <p className="title-SB-17-150 text-gray-09 mb-[8px] line-clamp-2">더 스탠다드 / 6kg</p>
                        </div>
                        <div className="body-M-14-150 text-gray-07 px-[8px] py-[5px] bg-gray-01 rounded-[4px] truncate">옵션: 그린/80X65</div>
                    </div>
                </div>
            </td>
            <td className="text-gray-09 py-[24px] first:pt-[16px]">1</td>
            <td className="text-gray-09 py-[24px] first:pt-[16px]">11,900원</td>
        </tr>
    )
}

/** 주문조회 목록페이지 컴포넌트 */
function MyPageOrder () {
    return (
        <div>
            {/* 마이페이지 - 주문조회 1차 목록 */}
            
            {/* 조회 필터 - MO */}
            <div className="flex justify-between items-center px-[16px] py-[8px] bg-gray-01 laptop:hidden">
                <p className="caption-lg text-gray-09">전체상태 <span className="caption-md text-gray-07 ml-[8px]">(전체 기간)</span></p>

                <Button
                    variant="inline"
                    className="flex !caption-md"
                >
                    필터<img className="ml-[4px]" src="https://d39h0xn1r3o9zb.cloudfront.net/dev/common/icon-filter.svg" alt="필터 아이콘"/>
                </Button>
            </div>
            {/* //조회 필터 - MO */}
            
            {/* 조회 필터 - PC */}
            <div className="hidden items-end px-[16px] py-[28px] bg-gray-01 border-[1px] border-gray-02 laptop:flex">
                <div className="flex-1 flex items-end">
                    <div className="flex-1">
                        <p className="body-SB-14-150 text-gray-05 mb-[13px]">주문상태</p>
                        <div className="flex justify-between items-center h-[48px] title-M-17-150 p-[16px] bg-white border-[1px] border-gray-03 rounded-[4px]">전체상태<i className="xi-angle-down text-gray-04 text-[16px] font-[400] leading-1"></i></div>
                    </div>
                    <div className="flex justify-center items-center w-[40px] h-[48px] text-center">
                        <span className="h-[60%] border-r-[1px] border-gray-07"></span>
                    </div>
                    <div className="flex-1">
                        <p className="body-SB-14-150 text-gray-05 mb-[13px]">조회기간</p>
                        <div className="flex justify-between items-center h-[48px] title-M-17-150 p-[16px] bg-white border-[1px] border-gray-03 rounded-[4px]">전체기간<i className="xi-angle-down text-gray-04 text-[16px] font-[400] leading-1"></i></div>
                    </div>
                </div>
                <div className="flex-1 flex items-center h-[48px] ml-[12px]">
                    <div className="flex-1 flex justify-between items-center h-[100%] title-M-17-150 p-[16px] bg-white border-[1px] border-gray-03 rounded-[4px]">연도.월.일<i className="xi-calendar text-gray-04 text-[16px] font-[400] leading-1"></i></div>
                    <span className="mx-[8px]">~</span>
                    <div className="flex-1 flex justify-between items-center h-[48px] title-M-17-150 p-[16px] bg-white border-[1px] border-gray-03 rounded-[4px]">연도.월.일<i className="xi-calendar text-gray-04 text-[16px] font-[400] leading-1"></i></div>
                    
                    <Button
                        className="!w-[124px] !h-[100%] !title-SB-17-150 ml-[12px]"
                    >조회하기</Button>
                </div>
            </div>
            {/* //조회 필터 - PC */}
            
            {/* 주문 조회 목록 */}
            <ul className="py-[20px] px-[16px] laptop:px-[0]">
                <OrderListItems paySort="subscribe"/>
                <OrderListItems paySort="normal"/>
                <OrderListItems paySort="subscribe"/>
            </ul>
            {/* //주문 조회 목록*/}

        </div>
    )
}

export default MyPageOrder