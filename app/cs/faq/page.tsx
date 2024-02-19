
"use client"

import Button from '@/components/common/button';
import Input from '@/components/common/input';
import Accordion from 'components/common/accordion'
import { useState, useEffect } from "react"
import React from 'react';
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Container from '@/components/common/container'

export type CsCategoryProps = {
    category: string;
    activeIndex: string | null;
    onClick: (index: string) => void;
};

export type CategoryListProps = {
    categoryNames : {
        name : string,
        accordions : {
            title : string,
            contents : string
        }[]
    }[]
}

const CateButton: React.FC<CsCategoryProps> = ({ category, activeIndex, onClick }) => {
    const handleButtonClick = (e:string) => {
        onClick && onClick(e)
    };

    return (
        <button className={`py-[8px] rounded-[99px] border-[1px] body-text-md ${activeIndex === category ? ' text-green-03 border-green-03' : 'border-gray-03 text-gray-06'} laptop:flex-[0_0_auto] laptop:mt-[12px]`} onClick={() => handleButtonClick(category)}>
            <span className="px-[12px]">{category}</span>
        </button>
    );
};

const CategoryListComponent: React.FC<CategoryListProps> = ({ categoryNames }) => {
    const [activeIndex, setActiveIndex] = useState<string | null>(categoryNames[0]?.name || null);

    useEffect(() => {
        if (categoryNames.length > 0) {
            setActiveIndex(categoryNames[0].name);
        }
    }, []);

    const handleButtonClick = (name: string) => {
        setActiveIndex(name);
    };

    const CategoryListAccordion = (e: any) => {
        return (
            <Accordion title={e.title} 
                style="pt-[26.5px] border-t-[1px] border-t-gray-02 first-of-type:border-t-0" 
                innerStyle="mt-[26.5px]" 
                btnStyle="text-[15px] font-[500] leading-[19.5px] text-gray-09 text-left relative" 
                showIcon={true}
                iconStyle="absolute w-[24px] h-[24px] text-gray-04 text-[15px] !leading-[24px] text-center top-2/4 mt-[-12px] right-0 transition-all duration-400"
                childStyle='!border-t-0 bg-gray-02 px-[12px] py-[24px] body-text-sm whitespace-pre-wrap'
            >
                {e.contents}
            </Accordion>
        );
    };

    return (
        <>
            <div className="hidden laptop:flex laptop:flex-wrap laptop:pt-[4px] laptop:gap-x-[8px]">
                {categoryNames.map((item, index) => (
                    <CateButton
                        category={item.name}
                        activeIndex={activeIndex}
                        onClick={() => handleButtonClick(item.name)}
                        key={index}
                    />
                ))}
            </div>

            <div className="laptop:hidden">
                <Swiper
                    spaceBetween={6}
                    slidesPerView={"auto"}
                    initialSlide={categoryNames.findIndex((item) => item.name === activeIndex)}
                >
                    {categoryNames.map((item, index) => (
                        <SwiperSlide key={index} className="!w-auto">
                            <CateButton
                                category={item.name}
                                activeIndex={activeIndex}
                                onClick={() => handleButtonClick(item.name)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="pt-[32px] laptop:px-0 laptop:pt-[60px]">
                {categoryNames.map((item, index) => (
                    item.name === activeIndex && (
                        <div key={index}>
                            <h2 className="title-md pb-[20px] border-b-gray-07 border-b-[1.5px]">{item.name}</h2>
                            {item.accordions.length > 0 ? (
                                item.accordions.map((accordion, i) => (
                                    <CategoryListAccordion key={i} {...accordion} />
                                ))
                            ) : (
                                <p className="text-gray-04 text-center body-text-sm"><i className="xi-error-o mt-[40px] mb-[8px] w-[24px] h-[24px] text-[24px]"></i><br />등록된 게시글이 없습니다.</p>
                            )}
                        </div>
                    )
                ))}
            </div>
        </>
    );
};



function CsFaq(props: CategoryListProps) {
    return (
        <Container>
            <h1 className="hidden laptop:block laptop:sub-head-B-24-130 title-md pb-3 text-gray-09">자주하는 질문</h1> 
            <div className="w-full pt-[16px] py-[20px] flex laptop:py-0 laptop:px-0 relative">
                <Input name="CsFaqSearch" type="text" placeholder="검색어를 입력하세요." className="rounded-[4px] bg-gray-01 w-full h-[44px] pl-[12px] placeholder:body-text-sm placeholder:text-gray-04 laptop:h-[48px] !mt-0"/>
                <Button variant="inline" type="submit" className="px-[10px] !py-[10px] absolute top-[16px] right-0 !bg-transparent !border-0 laptop:w-[104px] laptop:h-[48px] laptop:ml-[12px] laptop:relative laptop:top-auto laptop:right-auto laptop:!bg-gray-09 laptop:text-white title-SB-17-150 ">
                    <Image src="https://d39h0xn1r3o9zb.cloudfront.net/dev/common/icon-search.svg" className="block laptop:hidden " width={24} height={24} alt=""/>
                    <p className="hidden laptop:block">검색</p>
                </Button>
            </div> 
            <CategoryListComponent categoryNames={props.categoryNames}/>
        </Container>
    );
}


function CsFaqPage() {
    return <CsFaq categoryNames={[]} />
}
export default CsFaqPage;