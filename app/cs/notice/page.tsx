
"use client"

import Button from '@/components/common/button';
import Input from '@/components/common/input';
import Accordion from 'components/common/accordion'
import { useState, useEffect } from "react"
import React from 'react';
import Image from 'next/image'
import Container from '@/components/common/container'
import { table } from 'console';


export type NoticeProps = {
    noticeList : {
        title : string
        date : string
        type : string
        index : number
        content : any
    }[]
}

/*
array.map -> 1 차 걸러 fixed -> sortBy date
2차 list -> sortBy date 
*/

const NoticeListComponent: React.FC<NoticeProps>= ({ noticeList }) => {
    const removeSpacesAndDots = (str: string) => str.replace(/[\s.]+/g, '');
    
    const sortedList = noticeList.slice().sort((a, b) => {
        if (a.type === 'fixed' && b.type !== 'fixed') {
            return -1; 
        } else if (a.type !== 'fixed' && b.type === 'fixed') {
            return 1;
        } else {
            return new Date(removeSpacesAndDots(b.date)).getTime() - new Date(removeSpacesAndDots(a.date)).getTime();
        }
    });

    const formatDate = (dateValue: string) => {
        const date = new Date(dateValue);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}.${month < 10 ? '0' : ''}${month}.${day < 10 ? '0' : ''}${day}`;
    };

    const styleTd = "hidden w-[80px] text-center laptop:block laptop:py-[21px]"
    const styleTh = "title-M-17-150 text-gray-09 text-center py-[21px] "

    return (
        <table className="pt-[16px] w-full border-t-[1.5px] border-t-gray-07 laptop:border-t-[2px]">
            <thead className={`hidden laptop:table-header-group w-full ${sortedList.length > 0 ? '' : 'laptop:hidden'}`}>
                <tr className="border-b-[1px] border-b-gray-02">
                    <th className={`w-[80px] ${styleTh}`}>번호</th>
                    <th className={`w-full ${styleTh}`}>제목</th>
                    <th className={`w-[111px] ${styleTh}`}>등록일</th>
                </tr>
            </thead>
            <tbody>
                {sortedList.length > 0 ? (
                    sortedList.map((notice, index) => (
                        <tr key={index} className="border-b-[1px] border-b-gray-02">
                            <>  
                                {notice.type === 'fixed' ? (
                                    <td className={`notice-icon ${styleTd}`}><span className="block w-[40px] h-[26px] align-middle text-center caption-M-12-150 text-green-03 bg-green-01 leading-[26px] mx-[20px] relative top-[-1px] ">공지</span></td>
                                    ) : (
                                    <td className={`list-number ${styleTd} leading-[26px] title-M-17-150 text-gray-05`}>{sortedList.length - index}</td>
                                )}
                                <td className="py-[24px] border-b-[1px] border-b-gray-02 w-[calc(100%-80px)] laptop:w-full laptop:py-[21px]">
                                    <a href={`/notice/detail/${notice.index}`} className={`block w-full relative ${notice.type === 'fixed' ? 'pl-[41px]' : ''} laptop:pl-[16px] laptop:pr-[21px]`}>
                                        {notice.type === 'fixed' ? (
                                            <span className="notice-icon laptop:hidden w-[33px] h-[19px] text-center caption-sm text-green-03 bg-green-01 leading-[19px] absolute top-[50%] left-0 translate-y-[-50%]">공지</span>
                                            ) : (
                                            <span className="hidden"></span>
                                        )}
                                        <p className="text-[15px] font-[500] text-gray-09 leading-normal w-full line-clamp-1 text-ellipsis laptop:text-[17px] laptop:leading-[26px]">{notice.title}</p>
                                    </a>
                                </td>
                                <td className="py-[24px] border-b-[1px] border-b-gray-02 w-[80px] text-right text-gray-04 body-text-sm laptop:w-[111px] laptop:py-[21px] laptop:text-center laptop:caption-Lg-14-100">{formatDate(removeSpacesAndDots(notice.date))}</td>
                            </>
                        </tr>
                    ))
                ) : (
                    <tr className="">
                        <td colSpan={3} className="text-gray-04 text-center body-text-sm laptop:title-M-17-150"><i className="xi-error-o mt-[40px] mb-[8px] w-[24px] h-[24px] text-[24px] laptop:mt-[80px]"></i><br />등록된 게시글이 없습니다.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );


}



function CsNotice(props:NoticeProps) {
    return (
        <Container>
            <div className="w-full pt-[16px] py-[20px] flex laptop:py-0 laptop:px-0 relative">
                <Input name="CsFaqSearch" type="text" placeholder="검색어를 입력하세요." className="rounded-[4px] bg-gray-01 !w-full h-[44px] pl-[12px] placeholder:body-text-sm placeholder:text-gray-04 laptop:h-[48px] !mt-0"/>
                <Button variant="inline" type="submit" className="px-[10px] !py-[10px] absolute top-[16px] right-0 !bg-transparent !border-0 laptop:w-[104px] laptop:h-[48px] laptop:ml-[12px] laptop:relative laptop:top-auto laptop:right-auto laptop:!bg-gray-09 laptop:text-white title-SB-17-150 ">
                    <Image src="https://d39h0xn1r3o9zb.cloudfront.net/dev/common/icon-search.svg" className="block laptop:hidden " width={24} height={24} alt=""/>
                    <p className="hidden laptop:block">검색</p>
                </Button>
            </div>
            <h1 className="title-md pb-3 text-gray-09 laptop:block laptop:sub-head-B-24-130 laptop:mt-[80px] laptop:pb-[12px]">MEOWTIMES의 새로운 소식</h1>
            <NoticeListComponent noticeList={props.noticeList}/>
        </Container>
    )
}

function CsNoticePage() {
    return <CsNotice noticeList={[]} />
}
export default CsNoticePage
