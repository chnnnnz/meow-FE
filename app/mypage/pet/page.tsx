"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/button';
import Input from '@/components/common/input';
import Container from '@/components/common/container';
import SelectBox from '@/components/common/selectbox';
import petImg from '@/public/icons/mypage/defaultImg.png';

export type profileProps = {
    profileList: {
        petImage?: string | undefined;
        name: string;
        type: string;
        gender: string;
        age: string;
        neutering: string;
        weight: string;
        likes: {
            check?: any;
            etc?: string;
        };
        allergy: boolean;
        index: number;
    }[];
};

const getDefaultProfile = () => {
    return {
        petImage: "",
        name: "",
        type: "",
        gender: "",
        age: "",
        neutering: "",
        weight: "",
        likes: {
            check: [],
            etc: ""
        },
        allergy: false,
        index: 0
    };
};

export type BtnComponentsProps = {
    name: string
    label: {
        name: string;
    }[] 
    onChange?: (value: string) => void
    checked?: string
    type?: 'checkbox' | 'radio';
}

const BtnComponents: React.FC<BtnComponentsProps> = (props) => {
    const testFn = (name:string) => {
        props.onChange && props.onChange(name)
    }

    return (
        <>
            {props.label.map((item, index) => (
                <div key={index}>
                    <Input
                        name={props.name}
                        type={props.type}
                        value={item.name}
                        checked={props.checked === item.name}
                        onChange={() => testFn(item.name)}
                    />
                    <label htmlFor={props.name}>{item.name}</label>
                </div>
            ))}
        </>
    )
}


const MyPetProfileListComponent: React.FC<profileProps> = ({ profileList }) => {
    const [showProfile, setShowProfile] = useState<boolean>(false);
    const [profileIndex, setProfileIndex] = useState<number | null>(null);

    const handleShowProfileStep = () => {
        setShowProfile(true);
    };

    const handleShowProfile = (index: number) => {
        setShowProfile(true);
        setProfileIndex(index);
    };

    const calculateAgeFromBirthdate = (date: string): number => {
        const [birthYearStr, birthMonthStr, birthDayStr] = date.split('-').map(Number);

        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1;
        const currentDay = today.getDate();
        
        let age = currentYear - birthYearStr;
        if (birthMonthStr > currentMonth || (birthMonthStr === currentMonth && birthDayStr > currentDay)) {
            age--;
        }
        return age;
    };
    
    return (
        <>
            {profileList.length > 0 ? (
                <>
                    {profileList.map((item, index) => (
                        <div key={index}>
                            {!showProfile && (
                                <>
                                    {item.petImage ? (
                                        <Image src={item.petImage} width={200} height={200} alt="" />
                                    ) : (
                                        <Image src={petImg} width={200} height={200} alt="" />
                                    )}
                                    <div>
                                        <h2>{item.name}</h2>
                                        <p>
                                            {item.type}
                                            <span>
                                                {item.gender} / {calculateAgeFromBirthdate(item.age)}세
                                            </span>
                                        </p>
                                        <Button onClick={() => handleShowProfile(index)}>수정</Button>
                                    </div>
                                </>
                            )}
                            {showProfile && profileIndex === index && (
                                <>
                                    <ProfileComponentStep1 profile={item} />
                                    <ProfileComponentStep2 profile={item} />
                                    <ProfileComponentStep3 profile={item} />
                                </>
                            )}
                        </div>
                    ))}
                </>
            ) : (
                <>
                    {!showProfile && (
                        <div>
                            <p>
                                홍길동님과 함께사는 아이는 <span>어떤 친구</span>인가요?
                            </p>
                            <Button onClick={handleShowProfileStep}>프로필 등록하기</Button>
                        </div>
                    )}
                    {showProfile && (
                        <>
                            <ProfileComponentStep1 profile={profileList[0]}/> 
                            <ProfileComponentStep2 profile={profileList[0]}/>
                            <ProfileComponentStep3 profile={profileList[0]}/>
                        </>
                    )}
                </>
            )}
        </>
    );
};

const titleTxt = '';

const ProfileComponentStep1: React.FC<{ profile: profileProps['profileList'][0] }> = ({ profile }) => {
    profile = profile ?? getDefaultProfile()
    const [openSelectBox, setOpenSelectBox] = useState<boolean>(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>();

    const typeOptions = [
        { title: '개성 가득한 믹스' },
        { title: '코리안 숏헤어' },
        { title: '아메리칸 숏헤어' },
        { title: '러시안 블루' },
        { title: '페르시안' },
        { title: '노르웨이 숲' },
        { title: '네벨룽' },
        { title: '먼치킨' },
        { title: '스코티시폴드' },
    ];
    
    const [petName, setPetName] = useState<string>(profile.name);

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const changeInputVal = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPetName(value);
    }

    return(
        <>
            <div>
                <p className={`${titleTxt}`}>프로필 이미지</p>
                <div>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imagePreview ? (
                        <Image src={imagePreview} width={200} height={200} alt="" />
                    ) : (
                        <Image src={profile.petImage || petImg} width={200} height={200} alt="" />
                    )}
                </div>
            </div>
            <div>
                <p className={`${titleTxt}`}>이름*</p>
                <Input type="text" placeholder="아이의 이름을 입력해 주세요." value={petName} onChange={changeInputVal}/>
            </div>
            <div>
                <p className={`${titleTxt}`}>묘종*</p>
                <SelectBox 
                    name="묘종을 선택해 주세요."
                    type='normal'
                    array={typeOptions.map((option, index) => ({
                        title: option.title,
                        status: index === selectedOptionIndex ? 'default' : undefined,
                    }))}
                    selectedIndex={selectedOptionIndex !== undefined ? selectedOptionIndex : (profile.type ? typeOptions.findIndex(option => option.title === profile.type) : undefined)}
                    open={openSelectBox}
                    onClick={() => setOpenSelectBox(!openSelectBox)}
                    onChange={(index) => {
                        setSelectedOptionIndex(index);
                        setOpenSelectBox(false);
                    }}
                    icon={true}
                />
            </div>
        </>
    )
};


const ProfileComponentStep2: React.FC<{ profile: profileProps['profileList'][0] }> = ({ profile }) => {
    const defaultProfile = getDefaultProfile();
    const [inputs, setInputs] = useState(profile ? profile : defaultProfile);
    const { gender, age } = inputs;

    const handleCheckBoxes = (name: string) => {
        setInputs({ ...inputs, gender: name });
    };

    const [birthDate, setBirthDate] = useState<string>(age);
    
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        setBirthDate(value);
    }

    const handleInputBlur = () => {
        const label = document.getElementById('birthDateLabel');
        if (!birthDate) {
            label?.classList.remove('text-white');
            label?.classList.add('text-gray-04');
        }
    }

    return (
        <>
            <div>
                <p className={`${titleTxt}`}>성별*</p>
                <BtnComponents
                    label={[
                        { name: '남아' },
                        { name: '여아' },
                    ]}
                    type="radio"
                    name={gender}
                    checked={gender}
                    onChange={(name) => handleCheckBoxes(name)}
                />
            </div>
            <div>
                <p className={`${titleTxt}`}>나이*</p>
                <div className="relative">
                    <label 
                    htmlFor="birthDate"
                    className={`top-0 left-0 w-full h-full bg-white ${birthDate ? 'text-white' : 'text-gray-04'}`}
                    >{birthDate ? birthDate : '생년월일을 선택해 주세요.'}</label>
                    <Input
                        id="birthDate"
                        type="date"
                        value={birthDate}
                        onChange={handleDateChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                </div>
            </div>
        </>
    )
};

const ProfileComponentStep3: React.FC<{ profile: profileProps['profileList'][0] }> = ({ profile }) => {
    profile = profile ?? getDefaultProfile()
    const defaultProfile = getDefaultProfile();
    const [inputs, setInputs] = useState(profile ? profile : defaultProfile);
    const { neutering, weight } = inputs;

    const handleCheckBoxes = (val: string) => {
        setInputs({ ...inputs, neutering: val });
    };

    const [openSelectBox, setOpenSelectBox] = useState<boolean>(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>();

    const WeightOptions = [
        { title: '1~2kg' },
        { title: '2~3kg' },
        { title: '3~4kg' },
        { title: '4~5kg' },
        { title: '5~6kg' },
    ];

    return (
        <>
            <div>
                <p className={`${titleTxt}`}>중성화 여부*</p>
                <BtnComponents
                    label={[
                        { name: '했어요' },
                        { name: '안했어요' },
                        { name: '모르겠어요' },
                    ]}
                    type="radio"
                    name={neutering}
                    checked={neutering}
                    onChange={(val) => handleCheckBoxes(val)}
                />
            </div>
            <div>
                <p className={`${titleTxt}`}>몸무게*</p>
                <SelectBox 
                    name="1~2kg"
                    type='normal'
                    array={WeightOptions.map((option, index) => ({
                        title: option.title,
                        status: index === selectedOptionIndex ? 'default' : undefined,
                    }))}
                    selectedIndex={selectedOptionIndex !== undefined ? selectedOptionIndex : (profile.weight ? WeightOptions.findIndex(option => option.title === profile.weight) : undefined)}
                    open={openSelectBox}
                    onClick={() => setOpenSelectBox(!openSelectBox)}
                    onChange={(index) => {
                        setSelectedOptionIndex(index);
                        setOpenSelectBox(false);
                    }}
                    icon={true}
                />
            </div>
        </>
    )
}

const ProfileComponentStep4: React.FC<{ profile: profileProps['profileList'][0] }> = ({ profile }) => {
    profile = profile ?? getDefaultProfile()
    const defaultProfile = getDefaultProfile();
    const [inputs, setInputs] = useState(profile ? profile : defaultProfile);
    const { likes, allergy } = inputs;

    const handleCheckBoxes = (val: string) => {
        setInputs({ ...inputs, likes: { ...inputs.likes, check:val} });
    };

    return (
        <>
            <div>
                <p className={`${titleTxt}`}>(선택)<br/>건강 관심사</p>
                <BtnComponents
                    label={[
                        { name: '음수량' },
                        { name: '모질' },
                        { name: '헤어볼' },
                        { name: '변비' },
                        { name: '설사' },
                        { name: '체중' },
                        { name: '치아' },
                        { name: '피부' },
                        { name: '신장' },
                        { name: '관절' },
                        { name: '눈' },
                        { name: '심장' },
                    ]}
                    type="checkbox"
                    name={likes.check}
                    checked={likes.check}
                    onChange={(val) => handleCheckBoxes(val)}
                />
            </div>
            <div>
                <p className={`${titleTxt}`}>몸무게*</p>
                
            </div>
        </>
    )
}

function MyPetProfile(props: profileProps) {
    const data: profileProps['profileList'] = props.profileList ?? [];

    return (
        <Container>
            <MyPetProfileListComponent profileList={data} />
        </Container>
    );
}

export default MyPetProfile;
