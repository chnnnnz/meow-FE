import Modal from '.'
import Button from '../button'

export type ConfirmModalProps = {
  /**
   * 배경 딤드 여부
   * @default true
   */
  dimmed?: boolean
  /**
   * 타이틀
   */
  title?: string
  /**
   * 내용
   */
  content?: string
  /**
   * 취소 버튼 클릭시 호출. 지정하지 않으면 취소버튼이 노출되지 않고 확인 버튼만 노출됨
   */
  onNegativeClick?: () => void
  /**
   * 확인 버튼 클릭시 호출.
   */
  onPositiveClick: () => void
}

/**
 * - Title, Conetnet, Negative, Positive 버튼 가지고 있는 기본 컨펌 팝업.
 * - conditional rendering으로 노출 여부를 결정.
 * - `useConfirmModal()` hook을 사용하면 편리하게 사용할 수 있음
 * 
 * ```tsx
 * function MyComponent() {
 *  const [isOpen, title, content, open, close] = useConfirmModal()
 *  return (
 *    <>
 *      <button onClick={() => open({title: '제목', content:'내용'})}>컨펌 모달 열기</button>
 *      {isOpen && <ConfirmModal title={title} content={content} onNegativeClick={close} onPositiveClick={close} />}
 *    </>
 *  )
 * }
 * ```
 */
function ConfirmModal(props: ConfirmModalProps) {
  return (
    <Modal closableBg={false} {...props} onClose={() => props.onNegativeClick?.()}>
      <div className='text-center'>
        <div className='text-lg laptop:sub-head-SB-20-150 mt-[16px] laptop:mt-[40px]'>{props.title}</div>
        <div className='title-M-17-150 mt-[8px]'>{props.content?.split('\n').map((line, idx) => <p key={idx}>{line}</p>)}</div>
        <div className="flex mt-[30px] laptop:mt-[60px]">
          {props.onNegativeClick && (
            <Button variant="solid" className="flex-1" onClick={props.onNegativeClick}>취소</Button>
          )}
          <Button className="flex-1 ml-[7px]" onClick={props.onPositiveClick}>확인</Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal
