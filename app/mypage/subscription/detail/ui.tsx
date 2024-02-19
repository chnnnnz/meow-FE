'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Button, { ButtonProps } from '@components/common/button'
import { TitleComponent, TitleBtnComponent, InfoListComponent } from '../ui'
import SelectBox from '@/components/common/selectbox'
import BottomSheet from '@components/common/bottomSheet'
import useModal from '@/modules/hooks/modal'
import Modal from '@components/common/modal'
import FullModal from '@components/common/modal/fullModal'
import Calendar from '@components/common/datepicker/index'
import CheckBox from '@/components/common/checkbox'

type subscType = 'used' | 'paused' | 'unused' // 구독중(used), 정지(paused), 미구독(unused)

type InfoTextComponentProps = {
  subscType: subscType
  contractStatus: boolean
  paymentCycle: number | null
  pullSubscription?: () => void
  continueSubscription?: () => void
}
const InfoTextComponent = (props: InfoTextComponentProps) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  const [state, setState] = useState<boolean | null>(null)

  const [continueSubscriptionModal, setContinueSubscriptionModal] = useState(false)
  const [pullSubscriptionModal, setPullSubscriptionModal] = useState(false)
  const [donePullSubscriptionModal, setDonePullSubscriptionModal] = useState(false)
  const [doneContinueSubscriptionModal, setDoneContinueSubscriptionModal] = useState(false)

  let buttonType: ButtonProps['variant']

  const pullSubscription = () => {
    setPullSubscriptionModal(true)
  }

  const continueSubscription = () => {
    setContinueSubscriptionModal(true)
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
  }, [windowSize])

  windowSize < 960 ? (buttonType = 'default') : (buttonType = 'inline')

  const handlePullModalBtn = (val: boolean) => {
    setPullSubscriptionModal(false)
    setDonePullSubscriptionModal(true)

    val ? setState(false) : setState(true)
  }

  const handleContinueModalBtn = () => {
    setContinueSubscriptionModal(false)
    setDoneContinueSubscriptionModal(true)
  }

  const handleCloseModal = () => {
    setDonePullSubscriptionModal(false)
  }

  return (
    <>
      <div className="py-[32px] px-[16px] desktop:p-[20px] flex flex-col laptop:flex-row laptop:justify-between	items-center">
        <div className="text-center laptop:text-left">
          <p className="title-md desktop:title-B-17-150 text-gray-09">
            {props.subscType === 'used'
              ? '지금 바로 구독중인 상품을 받고 싶다면?'
              : '이전 혜택 그대로! 구독을 이어할 수 있어요!'}
          </p>
          <p className="mt-[6px] body-text-sm text-gray-07 desktop:title-M-17-150 laptop:text-gray-09">
            {props.subscType === 'used'
              ? '당겨받기 선택 시, 결제가 이루어지고 상품이 준비돼요!'
              : '기존 구족 회차에서부터 구독을 이어서 합니다.'}
          </p>
        </div>
        <Button
          variant={buttonType}
          className="mt-[20px] laptop:mt-0 laptop:!bg-gray-07 laptop:!border-gray-07 !text-white"
          onClick={() => (props.subscType === 'used' ? pullSubscription() : continueSubscription())}
        >
          {props.subscType === 'used' ? '구독 상품 당겨받기' : '구독 이어하기'}
        </Button>
      </div>

      {pullSubscriptionModal && (
        <PullSubscriptionModal
          paymentCycle={props.paymentCycle}
          nextStep={(val) => handlePullModalBtn(val)}
          onClose={() => setPullSubscriptionModal(false)}
        />
      )}
      {donePullSubscriptionModal && (
        <DonePullSubscriptionModal
          state={state}
          onClose={() => handleCloseModal()}
          setChangePaymentDate={donePullSubscriptionModal}
        />
      )}
      {continueSubscriptionModal && (
        <ContinueSubscriptionModal
          onClose={() => setContinueSubscriptionModal(false)}
          nextStep={handleContinueModalBtn}
        />
      )}
      {doneContinueSubscriptionModal && (
        <DoneContinueSubscriptionModal onClose={() => setDoneContinueSubscriptionModal(false)} />
      )}
    </>
  )
}

// 구독 이어하기
type ContinueSubscriptionModalProps = {
  onClose: () => void
  nextStep: () => void
}
const ContinueSubscriptionModal = (props: ContinueSubscriptionModalProps) => {
  const [openSelectBox, setOpenSelectBox] = useState(false)
  const [selectedCycleIdx, setSelectedCycleIdx] = useState(0)
  const cycleOptions = [
    { title: '2주마다 결제 후 배송받기', status: 'default' },
    { title: '3주마다 결제 후 배송받기' },
    { title: '4주마다 결제 후 배송받기' },
    { title: '6주마다 결제 후 배송받기' },
  ]

  return (
    <>
      <Modal onClose={props.onClose} closableBg={false}>
        <div className="pt-[20px] laptop:pt-[40px] text-center">
          <p className="body-text-lg laptop:sub-head-B-20-130 text-gray-09">이어할 구독 주기를 선택해 주세요.</p>
          <p className="mt-[8px] laptop:mt-[16px] mb-[16px] laptop:mb-[24px] body-text-sm laptop:title-M-17-150 text-gray-07">
            선택하신 주기로 구독을 이어서 합니다.
          </p>
        </div>

        <div className="p-[10px] laptop:p-[12px] text-center bg-gray-01 rounded-[4px]">
          <p className="mt-[8px] caption-md laptop:body-M-14-150 text-green-03">
            구독 이어하기를 하실 경우{' '}
            <span className="body-SB-14-130">
              설정하신 주기가 <br />
              지난 뒤부터
            </span>{' '}
            결제가 진행됩니다.
          </p>
          <p className="mt-[4px] caption-md laptop:mt-[12px] laptop:body-M-14-150 text-gray-06">
            상품을 바로 받고 싶을 땐 당겨받기를 이용해 주세요.
          </p>
        </div>

        <p className="mt-[16px] laptop:mt-[24px] mb-[12px] text-center caption-sm laptop:body-M-14-150 text-gray-07">
          결제 예정일 : 2023년 10월 11일
        </p>

        <SelectBox
          name="2주마다 결제 후 배송받기"
          type="selected"
          array={cycleOptions.map((option, index) => ({
            title: option.title,
            status: index === selectedCycleIdx ? 'default' : undefined,
          }))}
          selectedIndex={selectedCycleIdx}
          open={openSelectBox}
          onClick={() => setOpenSelectBox(!openSelectBox)}
          onChange={(index) => {
            setSelectedCycleIdx(index)
            setOpenSelectBox(false)
          }}
          icon={true}
        />

        <div className="mt-[30px] laptop:mt-[60px] flex items-center">
          <Button onClick={props.onClose} variant="solid">
            취소
          </Button>
          <Button onClick={props.nextStep} variant="default" className="ml-[8px]">
            확인
          </Button>
        </div>
      </Modal>
    </>
  )
}

type DoneContinueSubscriptionModalProps = {
  onClose: () => void
}
const DoneContinueSubscriptionModal = (props: DoneContinueSubscriptionModalProps) => {
  return (
    <>
      <Modal onClose={props.onClose} closableBg={false}>
        <div className="pt-[20px] laptop:pt-[40px] text-center">
          <p className="body-text-lg laptop:sub-head-SB-20-150 text-gray-09">구독을 이어서 시작합니다!</p>
          <p className="mt-[8px] laptop:mt-[16px] mb-[16px] laptop:mb-[24px] body-text-sm laptop:title-M-17-150 text-gray-07">
            선택하신 주기마다 정기 결제가 진행됩니다. <br />
            상품을 바로 받고 싶을 땐 당겨받기를​ 이용해 주세요.
          </p>
        </div>
        <div className="mt-[30px] laptop:mt-[60px] flex items-center">
          <Button onClick={props.onClose} variant="solid">
            확인
          </Button>
          <Button
            onClick={() => {
              props.onClose
              window.location.href = '/mypage/subscription'
            }}
            variant="default"
            className="ml-[8px]"
          >
            당겨 받으러 가기
          </Button>
        </div>
      </Modal>
    </>
  )
}

// 주기 변경
type ChangeCycleModalProps = {
  onClose: () => void
  paymentCycle: number | null
  changeEvent?: (e: number | null) => void
}
const ChangeCycleModal = (props: ChangeCycleModalProps) => {
  const options = [2, 3, 4, 6]

  const [selectedOption, setSelectedOption] = useState<number | null>(props.paymentCycle ?? null)
  const handleOptionClick = (option: number) => {
    setSelectedOption(option)
  }

  const BoxOptions = options.map((option, index) => {
    return (
      <div
        key={index}
        onClick={() => handleOptionClick(option)}
        className={`mt-[4px] flex items-center justify-center h-[48px] w-full border rounded-[4px] cursor-pointer laptop:mt-[8px] laptop:h-[60px] ${
          option === selectedOption ? 'border-green-05' : 'border-gray-03 laptop:border-gray-04'
        }`}
      >
        <p
          className={`body-text-md laptop:title-M-17-150 ${
            option === selectedOption ? 'text-green-03' : 'text-gray-06 laptop:text-gray-09'
          }`}
        >
          {option}주마다 결제 후 배송받기
        </p>
      </div>
    )
  })

  return (
    <>
      {/* Mobile */}
      <div className="laptop:hidden">
        <BottomSheet onClose={props.onClose}>
          <div className="px-[16px]">
            <p className="pb-[20px] text-center title-sm text-gray-09">구독 주기 변경하기</p>
            {BoxOptions}
            <div className="mt-[30px] pb-[8px] flex items-center">
              <Button onClick={props.onClose} variant="white">
                취소하기
              </Button>
              <Button variant="default" className="ml-[7px]">
                변경하기
              </Button>
            </div>
          </div>
        </BottomSheet>
      </div>
      {/* PC */}
      <div className="hidden laptop:block">
        <Modal closableBg={false} onClose={props.onClose}>
          <div>
            <p className="pt-[6px] pb-[20px] title-B-17-150 text-gray-09 text-center">구독 주기 변경하기</p>
            {BoxOptions}
            <div className="mt-[60px] flex items-center">
              <Button onClick={props.onClose} variant="solid">
                취소하기
              </Button>
              <Button variant="default" className="ml-[8px]">
                변경하기
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}

// 결제일 변경
type ChangePaymentDateModalProps = {
  onClose: () => void
}
const ChangePaymentDateModal = (props: ChangePaymentDateModalProps) => {
  return (
    <>
      {/* Mobile */}
      <div className="laptop:hidden">
        <BottomSheet onClose={props.onClose}>
          <div className="px-[16px]">
            <p className="pb-[20px] text-center title-sm text-gray-09">결제일 변경하기</p>
            <p className="pt-[4px] pb-[12px] text-gray-09 body-text-lg">이번 결제일</p>
            <div className="px-[16px] py-[10px] border rounded-[4px] border-gray-03">
              <p className="body-text-sm text-gray-09">24년 01월 30일</p>
            </div>
            <div className="mt-[12px]">
              <Calendar />
            </div>
            <div className="mt-[30px] pb-[8px] flex items-center">
              <Button onClick={props.onClose} variant="white">
                취소하기
              </Button>
              <Button variant="default" className="ml-[7px]">
                변경하기
              </Button>
            </div>
          </div>
        </BottomSheet>
      </div>
      {/* PC */}
      <div className="hidden laptop:block">
        <Modal closableBg={false} onClose={props.onClose}>
          <div>
            <p className="pt-[6px] pb-[20px] title-B-17-150 text-gray-09 text-center">결제일 변경하기</p>
            <p className="py-[8px] text-gray-05 body-SB-14-150">이번 결제일</p>
            <div className="px-[20px] py-[8px] border rounded-[4px] border-gray-02">
              <p className="body-M-14-150 text-gray-04">24년 01월 30일</p>
            </div>
            <div className="mt-[8px] border border-gray-02 rounded-[4px] p-[20px] pb-[12px]">
              <Calendar />
            </div>
            <div className="mt-[60px] flex items-center">
              <Button onClick={props.onClose} variant="solid">
                취소하기
              </Button>
              <Button variant="default" className="ml-[8px]">
                변경하기
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}

// 당겨받기
type PullSubscriptionModalProps = {
  paymentCycle: number | null
  onClose: () => void
  nextStep: (val: boolean) => void
}
const PullSubscriptionModal = (props: PullSubscriptionModalProps) => {
  const [changePaymentDate, setChangePaymentDate] = useState(false)

  const handleMaintainClick = () => {
    setChangePaymentDate(false)
    props.nextStep(false)
  }

  const handleChangeClick = () => {
    setChangePaymentDate(true)
    props.nextStep(true)
  }

  return (
    <>
      {/* Mobile */}
      <div className="laptop:hidden">
        <BottomSheet onClose={props.onClose}>
          <div className="px-[16px]">
            <p className="pb-[24px] title-sm text-gray-09 text-center">구독 상품 당겨받기</p>
            <p className="text-center text-gray-07 body-text-sm">
              당겨받기가 완료되었습니다! <br />
              오늘 날짜에 맞춰서 다음 결제일도 함께 변경하시겠습니까?
            </p>
            <p className="py-[16px] text-center body-text-sm text-gray-09">
              현재 나의 구독 주기: {props.paymentCycle}주
            </p>
            <div className="p-[12px] bg-gray-01 rounded-[4px]">
              <div className="flex items-center justify-between">
                <p className="body-text-sm text-gray-09">현재 설정된 다음 결제일</p>
                <p className="text-lg text-green-03">2024-02-05</p>
              </div>
              <div className="mt-[10px] flex items-center justify-between">
                <p className="body-text-sm text-gray-09">날짜 변경 시 다음 결제일</p>
                <p className="text-lg text-green-03">2024-02-07</p>
              </div>
            </div>
            <div className="mt-[30px] pb-[8px] flex items-center">
              <Button onClick={handleMaintainClick} variant="white">
                유지하기
              </Button>
              <Button onClick={handleChangeClick} variant="default" className="ml-[7px]">
                변경하기
              </Button>
            </div>
          </div>
        </BottomSheet>
      </div>
      {/* PC */}
      <div className="hidden laptop:block">
        <Modal closableBg={false} onClose={props.onClose}>
          <div>
            <p className="pt-[6px] pb-[28px] title-B-17-150 text-gray-09 text-center">구독 상품 당겨받기</p>
            <p className="text-center text-gray-07 title-M-17-150">
              당겨받기가 완료되었습니다! <br />
              오늘 날짜에 맞춰서 다음 결제일도 함께 변경하시겠습니까?
            </p>
            <p className="py-[16px] text-center body-SB-14-150 text-gray-09">
              현재 나의 구독 주기: {props.paymentCycle}주
            </p>
            <div className="p-[20px] bg-gray-01 rounded-[4px]">
              <div className="flex items-center justify-center">
                <p className="body-M-14-150 mr-[20px] text-gray-07">현재 설정된 다음 결제일</p>
                <p className="body-SB-14-130 text-green-03">2024-02-05</p>
              </div>
              <div className="mt-[10px] flex items-center justify-center">
                <p className="body-M-14-150 mr-[17px] text-gray-07">날짜 변경 시 다음 결제일</p>
                <p className="body-SB-14-130 text-green-03">2024-03-07</p>
              </div>
            </div>
            <div className="mt-[60px] flex items-center">
              <Button onClick={handleMaintainClick} variant="solid">
                유지하기
              </Button>
              <Button onClick={handleChangeClick} variant="default" className="ml-[8px]">
                변경하기
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}
type DonePullSubscriptionModalProps = {
  onClose: () => void
  setChangePaymentDate?: boolean
  state: boolean | null
}
const DonePullSubscriptionModal = (props: DonePullSubscriptionModalProps) => {
  const [isPullFlowModalOpened, openPullFlowModal, closePullFlowModal] = useModal()

  return (
    <>
      <Modal onClose={closePullFlowModal} closableBg={false}>
        <div className="pt-[20px] laptop:pt-[30px] text-center">
          {props.state ? (
            <p className="text-lg laptop:sub-head-SB-20-150 text-gray-09">다음 결제일을 유지합니다.</p>
          ) : (
            <p className="text-lg laptop:sub-head-SB-20-150 text-gray-09">다음 결제일을 변경하였습니다.</p>
          )}
          <p className="mt-[8px] laptop:mt-[12px] body-text-sm laptop:body-SB-14-150 text-green-03 laptop:text-green-04">
            다음 결제일: {props.state ? '2024-02-05' : '2024-03-07'}
          </p>
          <p className="mt-[12px] laptop:mt-[16px] caption-md laptop:title-M-17-150 text-gray-05 laptop:text-gray-07">
            결제일은 마이페이지 - 구독관리에서 수정 가능합니다.
          </p>
        </div>
        <Button onClick={props.onClose} variant="default" className="mt-[30px] laptop:mt-[60px]">
          확인
        </Button>
      </Modal>
    </>
  )
}

// 구독 정지/해지하기
type StatusSubscriptionModalProps = {
  onClose: () => void
  nextCancelStep: () => void
  nextPauseStep: () => void
}
const StatusSubscriptionModal = (props: StatusSubscriptionModalProps) => {
  return (
    <>
      {/* Mobile */}
      <div className="laptop:hidden">
        <BottomSheet onClose={props.onClose}>
          <div className="px-[16px]">
            <p className="pb-[12px] title-sm text-gray-09 text-center">구독 정지하기 / 해지하기</p>
            <p className="pt-[12px] text-lg text-gray-09">구독 정지하기</p>
            <p className="mt-[4px] pb-[12px] border-b border-gray-02 body-text-sm text-gray-06">
              정기결제가 일시 중단되며, 기존 구독 정보로 언제든 구독을 이어할 수 있습니다.
            </p>
            <p className="pt-[12px] text-lg text-gray-09">구독 해지하기</p>
            <p className="mt-[4px] body-text-sm text-gray-06">
              구독이 해지되며, 재구독 시 구독 절차를 다시 진행해야 합니다.
            </p>
            <div className="mt-[30px] pb-[8px] flex items-center">
              <Button onClick={() => props.nextCancelStep()} variant="white">
                구독 해지하기
              </Button>
              <Button onClick={() => props.nextPauseStep()} variant="default" className="ml-[8px]">
                구독 정지하기
              </Button>
            </div>
          </div>
        </BottomSheet>
      </div>
      {/* PC */}
      <div className="hidden laptop:block">
        <Modal closableBg={false} onClose={props.onClose}>
          <div>
            <p className="pt-[6px] pb-[20px] title-B-17-150 text-gray-09 text-center">구독 정지하기 / 해지하기</p>
            <p className="pt-[18px] sub-head-B-20-130 text-gray-09">구독 정지하기</p>
            <p className="mt-[2px] pb-[16px] border-b border-gray-02 title-M-17-150 text-gray-07">
              정기결제가 일시 중단되며, 기존 구독 정보로 언제든 구독을 이어할 수 있습니다.
            </p>
            <p className="pt-[18px] sub-head-B-20-130 text-gray-09">구독 해지하기</p>
            <p className="mt-[2px] title-M-17-150 text-gray-07">
              구독이 해지되며, 재구독 시 구독 절차를 다시 진행해야 합니다.
            </p>
            <div className="mt-[60px] flex items-center">
              <Button onClick={() => props.nextCancelStep()} variant="solid">
                구독 해지하기
              </Button>
              <Button onClick={() => props.nextPauseStep()} variant="default" className="ml-[8px]">
                구독 정지하기
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}

const ReasonOptions = [
  { title: '고양이가 모래를 좋아하지 않아요.' },
  { title: '응고력이 좋지 않아요.' },
  { title: '탈취력이 좋지 않아요.' },
  { title: '먼지가 너무 많아요.' },
  { title: '사막화가 너무 심해요.' },
  { title: '비용이 너무 부담스러워요.' },
  { title: '다시 구독할 예정이에요.' },
  { title: '모래가 아직 많이 남았어요.' },
  { title: '잠시 다른 모래를 사용하고 싶어요.' },
  { title: '기타 다른 이유가 있어요.' },
]

// 구독 해지하기
type cancelSubscriptionModalProps = {
  onClose: () => void
  nextStep: () => void
  changeModal: () => void
}
const CancelSubscriptionModal = (props: cancelSubscriptionModalProps) => {
  return (
    <>
      {/* Mobile */}
      <div className="laptop:hidden">
        <FullModal>
          <p className="py-[12px] title-sm text-gray-09 text-center border-b border-gray-02">구독 해지하기</p>
          <div className="my-[24px] text-center">
            <i className="xi-error text-[24px] text-sys-red"></i>
            <p className="pt-[12px] title-md text-gray-09 text-center">
              <span>홍길동</span> 님, 잠시만요! <br />
              연간 <span className="text-sys-red">188,220원</span>을 절약할 수 있어요! <br />
              정말 해지 하시겠어요?
            </p>
          </div>

          <div className="p-[14px] bg-yellow-01 rounded-[4px] text-center">
            <p className="text-lg text-gray-09">
              구독 시 쌓이는 <span className="text-green-04">28,520 포인트</span>도 <br />더 이상 받을 수 없어요.
            </p>
          </div>
          <div className="mt-[24px] mb-[40px] text-center">
            <p className="ml-[8px] body-M-14-150 text-gray-09">
              <i className="xi-error text-[14px] text-green-03"></i> 구독을 잠깐 멈추고 싶다면, <br />
              혜택이 유지되는{' '}
              <Link onClick={props.changeModal} href="" className="underline text-green-04">
                구독 정지
              </Link>
              를 추천해요!
            </p>
          </div>
          <p className="body-SB-14-150 text-gray-09 border-b border-gray-02 pb-[8px] mb-[8px]">구독 해지 유의 사항</p>
          <ul>
            <li className="pl-[16px] relative before:content-['ㆍ'] before:absolute before:left-0 before:top-0 text-gray-06 caption-M-13-130">
              구독 해지 즉시 구독 회차별 할인 혜택이 소멸됩니다.
            </li>
            <li className="pl-[16px] relative before:content-['ㆍ'] before:absolute before:left-0 before:top-0 text-gray-06 caption-M-13-130 mt-[4px]">
              구독 해지 즉시 구독 회차별 포인트 추가 적립 혜택이 소멸됩니다.
            </li>
            <li className="pl-[16px] relative before:content-['ㆍ'] before:absolute before:left-0 before:top-0 text-gray-06 caption-M-13-130 mt-[4px]">
              해지 시에도 적립된 포인트는 포인트 소멸 일자까지 스토어에서 사용할 수 있습니다.
            </li>
          </ul>

          <div className="absolute left-0 bottom-[8px] px-[16px] w-full flex items-center">
            <Button onClick={props.onClose} variant="white">
              닫기
            </Button>
            <Button onClick={() => props.nextStep()} variant="default" className="ml-[8px]">
              다음
            </Button>
          </div>
        </FullModal>
      </div>
      {/* PC */}
      <div className="hidden laptop:block">
        <Modal closableBg={false} onClose={props.onClose}>
          <p className="pt-[6px] pb-[28px] title-B-17-150 text-gray-09 text-center">구독 해지하기</p>
          <div className="text-center">
            <i className="xi-error text-[24px] text-sys-red"></i>
            <p className="py-[8px] sub-head-B-20-130 text-gray-09">
              <span>홍길동</span> 님, 잠시만요!
            </p>
          </div>
          <p className="text-center pb-[16px] title-M-17-150 text-gray-07">
            연간 <span className="title-SB-17-150 text-sys-red">188,220원</span>을 절약할 수 있어요! <br />
            정말 해지 하시겠어요?
          </p>
          <div className="p-[12px] bg-gray-01 rounded-[4px] text-center">
            <p className="body-SB-14-150 text-gray-09">
              구독 시 쌓이는 <span className="body-B-14-130 text-green-04">28,520 포인트</span>도 <br />더 이상 받을 수
              없어요.
            </p>
          </div>
          <div className="mt-[16px] mb-[32px] flex items-center justify-center">
            <i className="mr-[4px] xi-error text-[14px] text-green-03"></i>
            <p className="body-M-14-150 text-gray-09">
              구독을 잠깐 멈추고 싶다면, 혜택이 유지되는{' '}
              <Link onClick={props.changeModal} href="" className="underline text-green-04">
                구독 정지
              </Link>
              를 추천해요!
            </p>
          </div>
          <p className="body-text-md text-gray-08 border-b border-gray-02 pb-[10px] mb-[10px]">구독 해지 유의 사항</p>
          <ul>
            <li className="pl-[16px] relative before:content-['ㆍ'] before:absolute before:left-0 before:top-0 caption-md text-gray-06">
              구독 해지 즉시 구독 회차별 할인 혜택이 소멸됩니다.
            </li>
            <li className="pl-[16px] relative before:content-['ㆍ'] before:absolute before:left-0 before:top-0 caption-md text-gray-06 mt-[4px]">
              구독 해지 즉시 구독 회차별 포인트 추가 적립 혜택이 소멸됩니다.
            </li>
            <li className="pl-[16px] relative before:content-['ㆍ'] before:absolute before:left-0 before:top-0 caption-md text-gray-06 mt-[4px]">
              해지 시에도 적립된 포인트는 포인트 소멸 일자까지 스토어에서 사용할 수 있습니다.
            </li>
          </ul>

          <div className="mt-[60px] flex items-center">
            <Button onClick={props.onClose} variant="solid">
              닫기
            </Button>
            <Button onClick={() => props.nextStep()} variant="default" className="ml-[8px]">
              다음
            </Button>
          </div>
        </Modal>
      </div>
    </>
  )
}

type InprogressCancelSubscriptionModalProps = {
  onClose: () => void
  nextStep: () => void
}
const InprogressCancelSubscriptionModal = (props: InprogressCancelSubscriptionModalProps) => {
  const [openSelectBox, setOpenSelectBox] = useState(false)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>()

  return (
    <>
      {/* Mobile */}
      <div className="laptop:hidden">
        <FullModal>
          <p className="py-[12px] title-sm text-gray-09 text-center border-b border-gray-02">구독 해지하기</p>
          <p className="mt-[32px] text-center title-md text-gray-09">
            <span>홍길동</span> 님, 해지 하신다니 너무 아쉬워요.
          </p>
          <p className="text-center pt-[20px] pb-[24px] body-text-sm text-gray-07">
            구독 해지 사유를 편하게 남겨 주시면​ <br />
            집사님의 의견을 반영해 더 좋은 서비스를 만들겠습니다!
          </p>

          <p className="mb-[8px] body-text-md text-gray-08">해지 사유*</p>
          <SelectBox
            name="구독 해지 사유를 선택해 주세요."
            type="normal"
            array={ReasonOptions.map((option, index) => ({
              title: option.title,
              status: index === selectedOptionIndex ? 'default' : undefined,
            }))}
            selectedIndex={selectedOptionIndex}
            open={openSelectBox}
            onClick={() => setOpenSelectBox(!openSelectBox)}
            onChange={(index) => {
              setSelectedOptionIndex(index)
              setOpenSelectBox(false)
            }}
            icon={true}
          />

          <p className="mt-[20px] mb-[8px] body-text-md text-gray-08">
            해지하시려는 이유를 조금 더 자세하게 알 수 있을까요?*
          </p>
          <textarea
            className="w-full h-[90px] body-text-sm text-gray-09 resize-none border border-gray-04 rounded-[4px] p-[14px]"
            placeholder="해지하시려는 이유나 바라는 점을 자유롭게 남겨주세요. 집사님의 의견을 꼼꼼히 읽고, 끊임없는 연구로 더 나은 모습을 보여드리겠습니다."
          >
            탈취력이 정말 좋지 않아요. 고양이 화장실이 문제인지 집안 환기가 잘 안돼서 그런 건지 몰라도 참기가 조금
            힘들어요. 탈취력이 정말 좋지 않아요. 고양이 화장실이 문제인지 집안 환기가 잘 안돼서 그런 건지 몰라도 참기가
            조금 힘들어요. 탈취력이 정말 좋지 않아요. 고양이 화장실이 문제인지 집안 환기가 잘 안돼서 그런 건지 몰라도
            참기가 조금 힘들어요.
          </textarea>

          <p className="mt-[40px] body-text-md text-gray-08 border-b border-gray-02 pb-[10px] mb-[10px]">
            다음 내용을 확인해 주세요.
          </p>
          <div className="mt-[12px]">
            <CheckBox
              label="(필수) 구독 해지 시 구독 회차별 할인 혜택이 소멸됩니다."
              labelTextSize="14px"
              labelClassName="body-text-sm text-gray-07"
            />
          </div>
          <div className="mt-[12px]">
            <CheckBox
              label="(선택) 신​제품 또는 이벤트 소식을 받아 보시겠어요?"
              labelTextSize="14px"
              labelClassName="body-text-sm text-gray-07"
            />
          </div>

          <div className="absolute left-0 bottom-[8px] px-[16px] w-full flex items-center">
            <Button onClick={props.onClose} variant="white">
              닫기
            </Button>
            <Button onClick={() => props.nextStep()} variant="default" className="ml-[7px] !bg-sys-red">
              구독 해지하기
            </Button>
          </div>
        </FullModal>
      </div>
      {/* PC */}
      <div className="hidden laptop:block">
        <Modal closableBg={false} onClose={props.onClose}>
          <p className="pt-[6px] pb-[28px] title-B-17-150 text-gray-09 text-center">구독 해지하기</p>
          <p className="text-center title-B-17-150 text-gray-09">
            <span>홍길동</span> 님, 해지 하신다니 너무 아쉬워요.
          </p>
          <p className="text-center pt-[16px] pb-[24px] body-M-14-150 text-gray-07">
            구독 해지 사유를 편하게 남겨 주시면​ <br />
            집사님의 의견을 반영해 더 좋은 서비스를 만들겠습니다!
          </p>

          <p className="body-SB-14-150 text-gray-08">해지 사유*</p>
          <SelectBox
            name="구독 해지 사유를 선택해 주세요."
            type="normal"
            array={ReasonOptions.map((option, index) => ({
              title: option.title,
              status: index === selectedOptionIndex ? 'default' : undefined,
            }))}
            selectedIndex={selectedOptionIndex}
            open={openSelectBox}
            onClick={() => setOpenSelectBox(!openSelectBox)}
            onChange={(index) => {
              setSelectedOptionIndex(index)
              setOpenSelectBox(false)
            }}
            icon={true}
          />

          <p className="mt-[16px] mb-[8px] body-SB-14-150 text-gray-08">
            해지하시려는 이유를 조금 더 자세하게 알 수 있을까요?*
          </p>
          <textarea
            className="w-full h-[120px] body-M-14-150 text-gray-09 resize-none border border-gray-04 rounded-[4px] px-[20px] py-[12px]"
            placeholder="해지하시려는 이유나 바라는 점을 자유롭게 남겨주세요. 집사님의 의견을 꼼꼼히 읽고, 끊임없는 연구로 더 나은 모습을 보여드리겠습니다."
          >
            탈취력이 정말 좋지 않아요. 고양이 화장실이 문제인지 집안 환기가 잘 안돼서 그런 건지 몰라도 참기가 조금
            힘들어요. 탈취력이 정말 좋지 않아요. 고양이 화장실이 문제인지 집안 환기가 잘 안돼서 그런 건지 몰라도 참기가
            조금 힘들어요. 탈취력이 정말 좋지 않아요. 고양이 화장실이 문제인지 집안 환기가 잘 안돼서 그런 건지 몰라도
            참기가 조금 힘들어요.
          </textarea>

          <p className="mt-[24px] body-text-md text-gray-08 border-b border-gray-02 pb-[10px] mb-[10px]">
            다음 내용을 확인해 주세요.
          </p>
          <div className="mt-[16px]">
            <CheckBox
              label="(필수) 구독 해지 시 구독 회차별 할인 혜택이 소멸됩니다."
              labelTextSize="14px"
              labelClassName="body-M-14-150 text-gray-07"
            />
          </div>
          <div className="mt-[16px]">
            <CheckBox
              label="(선택) 신​제품 또는 이벤트 소식을 받아 보시겠어요?"
              labelTextSize="14px"
              labelClassName="body-M-14-150 text-gray-07"
            />
          </div>
          <div className="mt-[60px] flex items-center">
            <Button onClick={props.onClose} variant="solid">
              닫기
            </Button>
            <Button onClick={() => props.nextStep()} variant="default" className="ml-[8px] !bg-sys-red">
              구독 해지하기
            </Button>
          </div>
        </Modal>
      </div>
    </>
  )
}

type DoneCancelSubscriptionModalProps = {
  onClose: () => void
}
const DoneCancelSubscriptionModal = (props: DoneCancelSubscriptionModalProps) => {
  return (
    <Modal onClose={props.onClose} closableBg={false}>
      <p className="text-center pt-[6px] pb-[28px] title-B-17-150 text-gray-09 hidden laptop:block">구독 해지하기</p>
      <p className="mt-[20px] laptop:mt-0 text-lg text-center laptop:sub-head-B-20-130 text-gray-09">
        홍길동 님의 구독이 해지되었습니다.
      </p>
      <div className="my-[20px] p-[14px] laptop:my-[16px] laptop:p-[12px] bg-gray-01 rounded-[4px] text-center">
        <p className="text-lg laptop:body-SB-14-150 text-gray-09">
          구독으로 쌓은 <span className="text-green-04">12,700 포인트</span>는​ <br />
          계속 사용할 수 있어요!
        </p>
      </div>
      <p className="text-center body-text-sm laptop:body-M-14-150 text-gray-07">
        구독을 해지했어도 스토어는 계속 이용할 수 있어요. <br />
        스토어에서 미우타임즈가 엄선한 제품들을 둘러보세요. <br />
        포인트를 사용하면 부담 없는 가격으로 만나볼 수 있어요!
      </p>

      <div className="mt-[30px] laptop:mt-[60px] flex items-center">
        <Button
          onClick={() => {
            props.onClose
            window.location.href = '/mypage/subscription'
          }}
          variant="solid"
        >
          닫기
        </Button>
        <Button variant="default" className="ml-[7px] laptop:ml-[8px]">
          스토어 둘러보기
        </Button>
      </div>
    </Modal>
  )
}

// 구독 정지하기
type PauseSubscriptionModalProps = {
  onClose: () => void
  nextStep: () => void
}
const PauseSubscriptionModal = (props: PauseSubscriptionModalProps) => {
  return (
    <>
      {/* Mobile */}
      <div className="laptop:hidden">
        <FullModal>
          <p className="py-[12px] title-sm text-gray-09 text-center border-b border-gray-02">구독 정지하기</p>
          <div className="my-[24px] text-center">
            <i className="xi-error text-[24px] text-sys-red"></i>
            <p className="pt-[12px] title-md text-gray-09 text-center">
              앗! 구독을 정지하면 <br />더 이상 포인트가 쌓이지 않아요.
            </p>
          </div>
          <div className="mb-[40px] p-[14px] bg-yellow-01 rounded-[4px] text-center">
            <p className="text-lg text-gray-09">
              <span>홍길동</span> 님이 <span>12</span>회 구독 시 <br />
              <span className="text-green-04">최대 28,8750 포인트</span>가 더 쌓여요!
            </p>
          </div>
          <p className="body-SB-14-150 text-gray-09 border-b border-gray-02 pb-[10px] mb-[10px]">구독 정지 유의 사항</p>
          <ul>
            <li className="pl-[16px] relative before:content-['ㆍ'] before:absolute before:left-0 before:top-0 text-gray-06 caption-M-13-130">
              구독 정지 시 다음 회차 결제가 이루어지지 않으며 제품이 배송되지 않습니다.
            </li>
            <li className="pl-[16px] relative before:content-['ㆍ'] before:absolute before:left-0 before:top-0 text-gray-06 caption-M-13-130 mt-[4px]">
              이전 결제일 이후 3개월 동안 결제가 이루어지지 않을 경우, 자동 구독 해지 상태로 변경됩니다.
            </li>
            <li className="pl-[16px] relative before:content-['ㆍ'] before:absolute before:left-0 before:top-0 text-gray-06 caption-M-13-130 mt-[4px]">
              정지 시에도 적립된 포인트는 소멸 전까지 스토어에서 사용 가능합니다.
            </li>
            <li className="pl-[16px] relative before:content-['ㆍ'] before:absolute before:left-0 before:top-0 text-gray-06 caption-M-13-130 mt-[4px]">
              첫 구독 이벤트 등 정기구독 약정 혜택을 받으신 경우, 정지가 불가능할 수 있습니다.
            </li>
          </ul>

          <div className="absolute left-0 bottom-[8px] px-[16px] w-full flex items-center">
            <Button onClick={props.onClose} variant="white">
              닫기
            </Button>
            <Button onClick={() => props.nextStep()} variant="default" className="ml-[8px]">
              다음
            </Button>
          </div>
        </FullModal>
      </div>
      {/* PC */}
      <div className="hidden laptop:block">
        <Modal closableBg={false} onClose={props.onClose}>
          <p className="pt-[6px] pb-[28px] title-B-17-150 text-gray-09 text-center">구독 정지하기</p>
          <div className="text-center">
            <i className="xi-error text-[24px] text-sys-red"></i>
            <p className="py-[8px] title-M-17-150 text-gray-07">
              앗! 구독을 정지하면 <br />더 이상 포인트가 쌓이지 않아요.
            </p>
          </div>
          <div className="mt-[16px] mb-[28px] p-[12px] bg-gray-01 rounded-[4px] text-center">
            <p className="body-SB-14-150 text-gray-09">
              <span>홍길동</span> 님이 <span>12</span>회 구독 시 <br />
              <span className="text-green-04">최대 28,8750 포인트</span>가 더 쌓여요!
            </p>
          </div>
          <p className="body-SB-14-150 text-gray-09 border-b border-gray-02 pb-[8px] mb-[8px]">구독 정지 유의 사항</p>
          <ul>
            <li className="pl-[16px] relative before:content-['ㆍ'] before:absolute before:left-0 before:top-0 caption-md text-gray-06">
              구독 정지 시 다음 회차 결제가 이루어지지 않으며 제품이 배송되지 않습니다.
            </li>
            <li className="pl-[16px] relative before:content-['ㆍ'] before:absolute before:left-0 before:top-0 mt-[4px] caption-md text-gray-06">
              이전 결제일 이후 3개월 동안 결제가 이루어지지 않을 경우, 자동 구독 해지 상태로 변경됩니다.
            </li>
            <li className="pl-[16px] relative before:content-['ㆍ'] before:absolute before:left-0 before:top-0 mt-[4px] caption-md text-gray-06">
              정지 시에도 적립된 포인트는 소멸 전까지 스토어에서 사용 가능합니다.
            </li>
            <li className="pl-[16px] relative before:content-['ㆍ'] before:absolute before:left-0 before:top-0 mt-[4px] caption-md text-gray-06">
              첫 구독 이벤트 등 정기구독 약정 혜택을 받으신 경우, 정지가 불가능할 수 있습니다.
            </li>
          </ul>

          <div className="mt-[60px] flex items-center">
            <Button onClick={props.onClose} variant="solid">
              닫기
            </Button>
            <Button onClick={() => props.nextStep()} variant="default" className="ml-[8px]">
              다음
            </Button>
          </div>
        </Modal>
      </div>
    </>
  )
}

type InprogressPauseSubscriptionModalProps = {
  onClose: () => void
  nextStep: () => void
}
const InprogressPauseSubscriptionModal = (props: InprogressPauseSubscriptionModalProps) => {
  const [openSelectBox, setOpenSelectBox] = useState(false)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>()

  return (
    <>
      {/* Mobile */}
      <div className="laptop:hidden">
        <FullModal>
          <p className="py-[12px] title-sm text-gray-09 text-center border-b border-gray-02">구독 정지하기</p>
          <p className="mt-[32px] text-center title-md text-gray-09">
            <span>홍길동</span> 님, 다시 돌아오실거죠?
          </p>
          <p className="text-center pt-[20px] pb-[24px] body-text-sm text-gray-07">
            혹시 이용 중, 불편하셨거나 아쉬웠던 점이 있으셨을까요? <br />
            자유롭게 의견을 남겨 주시면 적극적으로 반영해서 <br />더 나은 미우타임즈가 되어 있겠습니다!
          </p>

          <p className="mb-[8px] body-text-md text-gray-08">정지 사유*</p>
          <SelectBox
            name="구독 정지 사유를 선택해 주세요."
            type="normal"
            array={ReasonOptions.map((option, index) => ({
              title: option.title,
              status: index === selectedOptionIndex ? 'default' : undefined,
            }))}
            selectedIndex={selectedOptionIndex}
            open={openSelectBox}
            onClick={() => setOpenSelectBox(!openSelectBox)}
            onChange={(index) => {
              setSelectedOptionIndex(index)
              setOpenSelectBox(false)
            }}
            icon={true}
          />

          <p className="mt-[20px] mb-[8px] body-text-md text-gray-08">
            정지하시려는 이유를 조금 더 자세하게 알 수 있을까요?*
          </p>
          <textarea
            className="w-full h-[90px] body-text-sm text-gray-09 resize-none border border-gray-04 rounded-[4px] p-[14px]"
            placeholder="정지하시려는 이유나 바라는 점을 자유롭게 남겨주세요. 집사님의 의견을 꼼꼼히 읽고, 끊임없는 연구로 더 나은 모습을 보여드리겠습니다."
          >
            탈취력이 정말 좋지 않아요. 고양이 화장실이 문제인지 집안 환기가 잘 안돼서 그런 건지 몰라도 참기가 조금
            힘들어요. 탈취력이 정말 좋지 않아요. 고양이 화장실이 문제인지 집안 환기가 잘 안돼서 그런 건지 몰라도 참기가
            조금 힘들어요. 탈취력이 정말 좋지 않아요. 고양이 화장실이 문제인지 집안 환기가 잘 안돼서 그런 건지 몰라도
            참기가 조금 힘들어요.
          </textarea>

          <p className="mt-[40px] body-text-md text-gray-08 border-b border-gray-02 pb-[10px] mb-[10px]">
            다음 내용을 확인해 주세요.
          </p>
          <div className="mt-[12px]">
            <CheckBox
              label="(필수) 이전 결제일 이후 3개월 이내에 구독 결제가 이루어지지 않을 경우 구독 해지 상태로 변경됩니다."
              labelTextSize="14px"
              labelClassName="body-text-sm text-gray-07"
            />
          </div>
          <div className="mt-[12px]">
            <CheckBox
              label="(선택) 신​제품 또는 이벤트 소식을 받아 보시겠어요?"
              labelTextSize="14px"
              labelClassName="body-text-sm text-gray-07"
            />
          </div>

          <div className="absolute left-0 bottom-[8px] px-[16px] w-full flex items-center">
            <Button onClick={props.onClose} variant="white">
              닫기
            </Button>
            <Button onClick={() => props.nextStep()} variant="default" className="ml-[7px] !bg-sys-red">
              구독 정지하기
            </Button>
          </div>
        </FullModal>
      </div>
      {/* PC */}
      <div className="hidden laptop:block">
        <Modal closableBg={false} onClose={props.onClose}>
          <p className="pt-[6px] pb-[28px] title-B-17-150 text-gray-09 text-center">구독 정지하기</p>
          <p className="text-center sub-head-B-20-130 text-gray-09">
            <span>홍길동</span> 님, 다시 돌아오실거죠?
          </p>
          <p className="text-center pt-[16px] pb-[24px] body-M-14-150 text-gray-07">
            혹시 이용 중 불편하셨거나 아쉬웠던 점이 있으셨을까요? <br />
            자유롭게 의견을 남겨주시면 적극적으로 반영해서 <br />더 나은 미우타임즈가 되어 있겠습니다!
          </p>

          <p className="body-SB-14-150 text-gray-08">정지 사유*</p>
          <SelectBox
            name="구독 정지 사유를 선택해 주세요."
            type="normal"
            array={ReasonOptions.map((option, index) => ({
              title: option.title,
              status: index === selectedOptionIndex ? 'default' : undefined,
            }))}
            selectedIndex={selectedOptionIndex}
            open={openSelectBox}
            onClick={() => setOpenSelectBox(!openSelectBox)}
            onChange={(index) => {
              setSelectedOptionIndex(index)
              setOpenSelectBox(false)
            }}
            icon={true}
          />

          <p className="mt-[16px] mb-[8px] body-SB-14-150 text-gray-08">
            정지하시려는 이유를 조금 더 자세하게 알 수 있을까요?*
          </p>
          <textarea
            className="w-full h-[120px] body-M-14-150 text-gray-09 resize-none border border-gray-04 rounded-[4px] px-[20px] py-[12px]"
            placeholder="해지하시려는 이유나 바라는 점을 자유롭게 남겨주세요. 집사님의 의견을 꼼꼼히 읽고, 끊임없는 연구로 더 나은 모습을 보여드리겠습니다."
          >
            탈취력이 정말 좋지 않아요. 고양이 화장실이 문제인지 집안 환기가 잘 안돼서 그런 건지 몰라도 참기가 조금
            힘들어요. 탈취력이 정말 좋지 않아요. 고양이 화장실이 문제인지 집안 환기가 잘 안돼서 그런 건지 몰라도 참기가
            조금 힘들어요. 탈취력이 정말 좋지 않아요. 고양이 화장실이 문제인지 집안 환기가 잘 안돼서 그런 건지 몰라도
            참기가 조금 힘들어요.
          </textarea>

          <p className="mt-[24px] body-text-md text-gray-08 border-b border-gray-02 pb-[10px] mb-[10px]">
            다음 내용을 확인해 주세요.
          </p>
          <div className="mt-[16px]">
            <CheckBox
              label="(필수) 이전 결제일 이후 3개월 이내에 구독 결제가 이루어지지 않을 경우​ 구독 해지 상태로 변경됩니다."
              labelTextSize="14px"
              labelClassName="body-M-14-150 text-gray-07"
            />
          </div>
          <div className="mt-[16px]">
            <CheckBox
              label="(선택) 신​제품 또는 이벤트 소식을 받아 보시겠어요?"
              labelTextSize="14px"
              labelClassName="body-M-14-150 text-gray-07"
            />
          </div>
          <div className="mt-[60px] flex items-center">
            <Button onClick={props.onClose} variant="solid">
              닫기
            </Button>
            <Button onClick={() => props.nextStep()} variant="default" className="ml-[8px] !bg-sys-red">
              구독 정지하기
            </Button>
          </div>
        </Modal>
      </div>
    </>
  )
}

type DonePauseSubscriptionModalProps = {
  onClose: () => void
}
const DonePauseSubscriptionModal = (props: DonePauseSubscriptionModalProps) => {
  return (
    <Modal onClose={props.onClose} closableBg={false}>
      <p className="text-center pt-[6px] pb-[28px] title-B-17-150 text-gray-09 hidden laptop:block">구독 정지하기</p>
      <p className="mt-[20px] laptop:mt-0 text-lg text-center laptop:sub-head-B-20-130 text-gray-09">
        홍길동 님의 구독이 정지되었습니다.
      </p>
      <div className="my-[20px] p-[14px] laptop:my-[16px] laptop:p-[12px] bg-gray-01 rounded-[4px] text-center">
        <p className="text-lg laptop:body-SB-14-150 text-gray-09">
          구독으로 쌓은 <span className="text-green-04">12,700 포인트</span>는​ <br />
          계속 사용할 수 있어요!
        </p>
      </div>
      <p className="text-center body-text-sm laptop:body-M-14-150 text-gray-07">
        구독을 정지했어도 스토어는 계속 이용할 수 있어요. <br />
        스토어에서 미우타임즈가 엄선한 제품들을 둘러보세요. <br />
        포인트를 사용하면 부담 없는 가격으로 만나볼 수 있어요!
      </p>

      <div className="mt-[30px] laptop:mt-[60px] flex items-center">
        <Button
          onClick={() => {
            props.onClose
            window.location.href = '/mypage/subscription'
          }}
          variant="solid"
        >
          닫기
        </Button>
        <Button variant="default" className="ml-[7px] laptop:ml-[8px]">
          스토어 둘러보기
        </Button>
      </div>
    </Modal>
  )
}

type userDataProps = {
  subscProdTitle: string
  subscPausedStatus: boolean
  subscType: subscType
  subscCycles: number
  paymentCycle: number | null
  currentPaymentDate: string
  totalSubscQuantity: number
  totalSubscAmount: string
  contractStatus: boolean
  contractCount: number | null
  prodArr: {
    brand: string
    productName: string
    optionName: string
    count: string
    price: string
  }[]
}
function DetailPage(props: userDataProps) {
  const [showBtn, setShowBtn] = useState(true)
  const [changeCycleModal, setChangeCycleModal] = useState<{ status: boolean; option: number | null }>({
    status: false,
    option: null,
  })
  const [showChangePaymentDateModal, setShowChangePaymentDateModal] = useState(false)
  const [statusSubscriptionModal, setStatusSubscriptionModal] = useState(false)
  const [cancelSubscriptionModal, setCancelSubscriptionModal] = useState(false)
  const [inprogressCancelSubscriptionModal, setInprogressCancelSubscriptionModal] = useState(false)
  const [doneCancelSubscriptionModal, setDoneCancelSubscriptionModal] = useState(false)
  const [pauseSubscriptionModal, setPauseSubscriptionModal] = useState(false)
  const [inprogressPauseSubscriptionModal, setInprogressPauseSubscriptionModal] = useState(false)
  const [donePauseSubscriptionModal, setDonePauseSubscriptionModal] = useState(false)

  const cycleChange = () => {
    setChangeCycleModal({ status: true, option: changeCycleModal.option })
  }

  const changePaymentDate = () => {
    setShowChangePaymentDateModal(true)
  }

  const openStatusSubscription = () => {
    setStatusSubscriptionModal(true)
  }

  const openCancelStepModal = () => {
    setStatusSubscriptionModal(false)
    setCancelSubscriptionModal(true)
  }

  const openPauseStepModal = () => {
    setStatusSubscriptionModal(false)
    setPauseSubscriptionModal(true)
  }

  const closeCancelSubscriptionModal = () => {
    setCancelSubscriptionModal(false)
    setInprogressCancelSubscriptionModal(true)
  }

  const closeInprogressCancelSubscriptionModal = () => {
    setInprogressCancelSubscriptionModal(false)
    setDoneCancelSubscriptionModal(true)
  }

  const closePauseSubscriptionModal = () => {
    setPauseSubscriptionModal(false)
    setInprogressPauseSubscriptionModal(true)
  }

  const closeInprogressPauseSubscriptionModal = () => {
    setInprogressPauseSubscriptionModal(false)
    setDonePauseSubscriptionModal(true)
  }

  const changeCancelSubscriptionModal = () => {
    setCancelSubscriptionModal(false)
    setPauseSubscriptionModal(true)
  }

  return (
    <>
      <TitleComponent
        subscType={props.subscType}
        subscPausedStatus={props.subscPausedStatus}
        subscProdTitle={props.subscProdTitle}
        contractStatus={props.contractStatus}
        contractCount={props.contractStatus ? props.contractCount : null}
      />
      <InfoTextComponent
        subscType={props.subscType}
        contractStatus={props.contractStatus}
        paymentCycle={props.paymentCycle}
      />
      <div className="px-[16px] laptop:px-[20px]">
        <TitleBtnComponent subscType={props.subscType} subName="구독 정보" showChangeButton={showBtn} />
        <InfoListComponent
          subscType={props.subscType}
          subscPausedStatus={props.subscPausedStatus}
          subscCycles={props.subscCycles}
          paymentCycle={props.paymentCycle}
          currentPaymentDate={props.currentPaymentDate}
          totalSubscQuantity={props.totalSubscQuantity}
          totalSubscAmount={props.totalSubscAmount}
          showChangeButton={showBtn}
          changeCycle={() => cycleChange()}
          changePaymentDate={() => changePaymentDate()}
        />
      </div>
      <div className="mt-[70px] laptop:mt-[100px] text-center">
        <button
          onClick={() => openStatusSubscription()}
          className="underline caption-md text-gray-05 laptop:text-gray-05 laptop:title-M-17-150"
        >
          구독 정지 / 해지하기
        </button>
      </div>

      {changeCycleModal.status && (
        <ChangeCycleModal
          onClose={() => setChangeCycleModal({ status: false, option: changeCycleModal.option })}
          paymentCycle={props.paymentCycle}
        />
      )}
      {showChangePaymentDateModal && <ChangePaymentDateModal onClose={() => setShowChangePaymentDateModal(false)} />}
      {statusSubscriptionModal && (
        <StatusSubscriptionModal
          onClose={() => setStatusSubscriptionModal(false)}
          nextCancelStep={() => openCancelStepModal()}
          nextPauseStep={() => openPauseStepModal()}
        />
      )}
      {cancelSubscriptionModal && (
        <CancelSubscriptionModal
          onClose={() => setCancelSubscriptionModal(false)}
          nextStep={() => closeCancelSubscriptionModal()}
          changeModal={() => changeCancelSubscriptionModal()}
        />
      )}
      {inprogressCancelSubscriptionModal && (
        <InprogressCancelSubscriptionModal
          onClose={() => setInprogressCancelSubscriptionModal(false)}
          nextStep={() => closeInprogressCancelSubscriptionModal()}
        />
      )}
      {doneCancelSubscriptionModal && (
        <DoneCancelSubscriptionModal onClose={() => setDoneCancelSubscriptionModal(false)} />
      )}
      {pauseSubscriptionModal && (
        <PauseSubscriptionModal
          onClose={() => setPauseSubscriptionModal(false)}
          nextStep={() => closePauseSubscriptionModal()}
        />
      )}
      {inprogressPauseSubscriptionModal && (
        <InprogressPauseSubscriptionModal
          onClose={() => setInprogressPauseSubscriptionModal(false)}
          nextStep={() => closeInprogressPauseSubscriptionModal()}
        />
      )}
      {donePauseSubscriptionModal && (
        <DonePauseSubscriptionModal onClose={() => setDonePauseSubscriptionModal(false)} />
      )}
    </>
  )
}

export default DetailPage
