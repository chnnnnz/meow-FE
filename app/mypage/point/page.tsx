
type PointListItemProps = {
    state: 'plus' | 'minus'
    point: number
}
function PointListItem(props: PointListItemProps) {
    return (
        <li className="relative px-[16px] py-[18px] border-b-[1px] border-gray-02 last:border-b-0">
            <div className="text-gray-08 max-w-[calc(100%_-_70px)]">
                <p className="body-text-lg">[구독 적립]</p>
                <p className="body-text-sm my-[8px]">더 스탠다드 2회차 10%적립</p>
            </div>
            <div className={`absolute right-[16px] top-[18px] caption-md ${props.state === 'plus' ? 'text-sys-green' : 'text-sys-red'} text-right`}>
                <p>{props.state === 'plus' ? '적립' : '차감'}</p>
                <p>{props.state === 'plus' ? '+' : '-'}{props.point}P</p>
            </div>
            <div className="flex justify-between caption-md text-gray-05">
                <span>CACD-ADAJ-AAA-AAAB</span>
                <span>2023-09-18</span>
            </div>
        </li>
    )
}
function PointListItemPc (props: PointListItemProps) {
    return (
        <tr className="text-center text-gray-07 border-b-[1px] border-gray-02 last:border-b-0">
            <td className={`w-[10%] body-M-14-150 ${props.state === "plus" ? "text-sys-green" : "text-sys-red"} py-[12px]`}>{props.state === "plus" ? "적립" : "차감"}</td>
            <td className={`w-[15%] body-M-14-150 ${props.state === "plus" ? "text-sys-green" : "text-sys-red"} py-[12px]`}>{props.state === "plus" ? "+" : "-"}{props.point}P</td>
            <td className="w-[35%] text-left py-[12px]">
                <p className="body-SB-14-150 text-gray-08 mb-[6px]">[구독 적립]</p>
                <p className="caption-Lg-14-100 truncate">더 스탠다드 2회차 10% 적립</p>
            </td>
            <td className="w-[25%] caption-Lg-14-1 py-[12px]">CACD-ADAJ-AAA-AAAB</td>
            <td className="w-[15%] caption-Lg-14-1 py-[12px]">2023-09-18</td>
        </tr>
    )
}

function MyPagePoint() {
    return (
        <div>
            {/* 마이페이지 - 포인트 */}

            {/* 포인트 안내 */}
            <div className="relative px-[16px] pt-[20px] pb-[28px] laptop:bg-gray-02 laptop:px-[24px] laptop:pt-[29px] laptop:pb-[28px] laptop:border-b-0">

                <div className="laptop:justify-between laptop:flex">
                    <div className="flex justify-between items-center w-full border-b-[1px] border-gray-02 laptop:block laptop:w-[calc((100%_-_11px_*_2)_/_3)] laptop:border-b-0">
                        <p className="body-text-sm laptop:body-SB-14-150 laptop:mb-[13px] laptop:text-gray-05">포인트</p>
                        <div className="text-lg py-[12px] text-gray-09 bg-white rounded-[4px] laptop:title-B-17-150 laptop:px-[20px]">30,000P</div>
                    </div>
                    
                    <div className="flex justify-between items-center w-full border-b-[1px] border-gray-02 laptop:block laptop:w-[calc((100%_-_11px_*_2)_/_3)] laptop:border-b-0">
                        <p className="body-text-sm laptop:body-SB-14-150 laptop:mb-[13px] laptop:text-gray-05">사용 포인트</p>
                        <div className="text-lg py-[11px] text-gray-06 bg-white rounded-[4px] laptop:title-M-17-150 laptop:px-[20px] laptop:text-gray-07">10,000P</div>
                    </div>
                    
                    <div className="flex justify-between items-center w-full border-b-[1px] border-gray-02 laptop:block laptop:w-[calc((100%_-_11px_*_2)_/_3)] laptop:border-b-0">
                        <p className="body-text-sm laptop:body-SB-14-150 laptop:mb-[13px] laptop:text-gray-05">소멸 예정 포인트(1달이내)</p>
                        <div className="text-lg py-[11px] text-gray-06 bg-white rounded-[4px] laptop:title-M-17-150 laptop:px-[20px] laptop:text-gray-07">6,350P</div>
                    </div>

                    <div className="absolute w-[calc(100%_+_32px)] h-[8px] left-[-16px] bottom-0 bg-gray-01 laptop:hidden"></div>
                </div>

                <p className="caption-lg text-gray-07 mt-[16px] mb-[6px] laptop:mb-[8px] laptop:title-B-17-150">포인트 사용안내</p>
                <ul className="caption-sm text-gray-05 laptop:body-M-14-150 laptop:text-gray-06">
                    <li className="relative pl-[10px] before:content-['•'] before:absolute before:left-0 before:top-0">포인트는 소멸 예정일에 임박한 순서로 사용됩니다.​</li>
                    <li className="relative pl-[10px] before:content-['•'] before:absolute before:left-0 before:top-0">포인트는 지급일 기준 6개월 후 자동 소멸됩니다.​​</li>
                </ul>
            </div>
            {/* // 포인트 안내 */}

            {/* 포인트 내역 */}
            <div className="pt-[20px] laptop:px-0 laptop:pt-[32px] laptop:pb-[120px]">
                <div className="px-[16px] desktop:p-0 laptop:mb-[20px]">
                    <button className="body-text-md text-green-03 px-[12px] py-[8px] mr-[6px] border-[1px] border-green-03 rounded-[30px] laptop:title-SB-17-150 laptop:px-[20px] laptop:mr-[8px]">전체</button>
                    <button className="body-text-md text-gray-06 px-[12px] py-[8px] mr-[6px] border-[1px] border-gray-03 rounded-[30px] laptop:title-SB-17-150 laptop:px-[20px] laptop:mr-[8px]">적립</button>
                    <button className="body-text-md text-gray-06 px-[12px] py-[8px] border-[1px] border-gray-03 rounded-[30px] laptop:title-SB-17-150 laptop:px-[20px]">사용</button>
                </div>

                {/* 내역 없음 */}
                <div className="hidden text-center pt-[40px] pb-[57px] laptop:pt-[132px] laptop:pb-[124px]">
                    포인트 내역이 없습니다.
                </div>

                {/* PC */}
                <div className="hidden laptop:block">
                    <table className="w-full">
                        <thead className="bg-gray-01 h-[32px]">
                            <tr>
                                <th className="w-[10%]">상태</th>
                                <th className="w-[15%]">포인트</th>
                                <th className="w-[35%]">상세 내용</th>
                                <th className="w-[25%]">쿠폰/주문 번호</th>
                                <th className="w-[15%]">적용 일자</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            <PointListItemPc state="plus" point={1000}/>
                            <PointListItemPc state="minus" point={3000}/>
                        </tbody>
                    </table>
                </div>

                {/* MO */}
                <ul className="laptop:hidden">
                    <PointListItem state="plus" point={1000}/>
                    <PointListItem state="minus" point={3000}/>
                </ul>
            </div>
            {/* // 포인트 내역 */}
        </div>
    )
}

export default MyPagePoint