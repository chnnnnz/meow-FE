
"use client"

import React from 'react';
import Image from 'next/image';
import Button from '@/components/common/button';
import Container from '@/components/common/container'
import { NoticeProps } from '@/app/cs/notice/page';

export type NoticeDetailProps = {
    title:string
    date:string
    type:string
    index:number
    content:{
        img:any[]
        txt:string
    }
    prev:{
        index:number
        title:string
    }
    next:{
        index:number
        title:string
    }
}

const NoticeDetailComponent: React.FC<NoticeDetailProps> = (props) => {
    const removeSpacesAndDots = (str: string) => str.replace(/[\s.]+/g, '');

    const formatDate = (dateValue: string) => {
        const date = new Date(dateValue);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}.${month < 10 ? '0' : ''}${month}.${day < 10 ? '0' : ''}${day}`;
    };

    const topCss = "pt-[28px] pb-[24px] border-b-[1.5px] border-gray-07 mb-[24px] laptop:mb-[32px] laptop:pt-0 laptop:pb-[32px] laptop:border-b-[2px]"
    const topTitleCss = "title-md text-gray-09 mb-[8px] laptop:sub-head-B-24-130 laptop:mb-[20px]" //line-clamp-2 text-ellipsis 
    const topDateCss = "body-text-sm text-gray-07 laptop:body-M-14-150 laptop:text-gray-04"
    const btmCss = "border-b-[1px] border-gray-02 py-[24.5px] flex align-center space-x-[4px] laptop:space-x-[27.5px] laptop:py-[22px]"
    const btmBtnCss = "body-text-sm text-gray-04 w-[71px] laptop:w-[94.5px] laptop:title-RG-18-150 laptop:text-gray-06"
    const btmTextCss = "text-[16px] font-[400] text-gray-04 relative top-[1px] mr-[4px] w-[16px] text-center laptop:w-[44px] laptop:text-[20px] laptop:text-gray-06 laptop:mr-[3.5px]"
    const btmLinkCss = "w-[calc(100%-71px)] line-clamp-1 text-ellipsis text-[15px] font-[500] text-gray-09 laptop:w-[calc(100%-122px)] laptop:title-SB-18-100 laptop:leading-[27px]"

    return (
        <>
            {props.type === 'fixed' ? (
                <div className={`${topCss}`}>
                    <h2 className={`${topTitleCss} relative pl-[41px] laptop:pl-[60px]`}>
                        <span className="block w-[33px] h-[19px] text-center caption-sm text-green-03 bg-green-01 leading-[19px] absolute top-[3.5px] left-0 laptop:w-[48px] laptop:h-[30px] laptop:leading-[30px] laptop:title-M-17-150 laptop:top-0">공지</span>
                        {props.title}
                    </h2>
                    <p className={`${topDateCss}`}>등록일 : {formatDate(removeSpacesAndDots(props.date))}</p>
                </div>
            ) : (
                <div className={`${topCss}`}>
                    <h2 className={`${topTitleCss}`}>{props.title}</h2>
                    <p className={`${topDateCss}`}>등록일 : {formatDate(removeSpacesAndDots(props.date))}</p>
                </div>
            )}
            <div>
                <div className="whitespace-pre-wrap body-text-sm text-gray-07 laptop:text-[17px] laptop:leading-[25.5px] laptop:font-[500]">{props.content.txt}</div>
                {props.content.img.length > 0 ? (
                    props.content.img.map((imgs, index) => (
                        <div key={index} className="mt-[40px]">
                            <Image src={imgs.imgUrl} alt=''  width={1000} height={3223}/>
                        </div>
                    ))
                ) : (
                    <div className="hidden"></div>
                )}
            </div>
            <div className={`border-t-[1px] border-gray-02 mt-[40px] laptop:mt-[84px] ${Object.keys(props.prev).length == 0 && Object.keys(props.next).length == 0 ? '!mt-0 laptop:!mt-0 border-t-0' : ''}`}>
                {Object.keys(props.prev).length !== 0 ? (
                    <div className={`${btmCss}`}>
                        <p className={`${btmBtnCss}`}><i className={`${btmTextCss} xi-angle-up-min`}></i>이전글</p>
                        <a href={`/notice/detail/${props.prev.index}`} className={`${btmLinkCss}`}>{props.prev.title}</a>
                    </div>
                ) : (
                    <div className="hidden"></div>
                )}
                {Object.keys(props.next).length !== 0 ? (
                    <div className={`${btmCss}`}>
                        <p className={`${btmBtnCss}`}><i className={`${btmTextCss} xi-angle-down-min`}></i>다음글</p>
                        <a href={`/notice/detail/${props.next.index}`} className={`${btmLinkCss}`}>{props.next.title}</a>
                    </div>
                ) : (
                    <div className="hidden"></div>
                )}
            </div>
        </>
    )
}
    


function CsNoticeDetail(props: NoticeDetailProps) {
    return (
        <Container>
            <NoticeDetailComponent {...props} />
            <Button variant="inline" type="button" onClick={() => {location.href='/notice'}} className="rounded-[4px] !bg-gray-09 !border-0 !text-white w-full h-[48px] mt-[40px] text-[15px] font-[700] laptop:w-[164px] laptop:h-[48px] laptop:title-M-17-150 laptop:!pl-0 laptop:!pr-0 laptop:mx-auto block laptop:mt-[84px]">
                목록으로
            </Button>
        </Container>
    ); 
}

function CsNoticeDetailPage() {
    return <CsNoticeDetail title={''} date={''} type={''} index={0} content={{
        img: [],
        txt: ''
    }} prev={{
        index: 0,
        title: ''
    }} next={{
        index: 0,
        title: ''
    }}  />
}
export default CsNoticeDetailPage