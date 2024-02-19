import CartSvg from '../../public/icons/cart/cart.svg'
import Button from '../common/button'

export type EmptyCartProps = {
  onClickShopping: () => void
}
function EmptyCart(props: EmptyCartProps) {
  return (
    <div className="flex flex-col place-content-center laptop:place-content-start items-center laptop:mt-[64px] h-[100vh]">
      <CartSvg />
      <div className="title-M-17-150 text-gray-04 mt-[12px]">장바구니에 담긴 상품이 없습니다.</div>
      <Button className="!w-[216px] mt-[48px]" onClick={props.onClickShopping}>
        쇼핑하러 가기
      </Button>
    </div>
  )
}

export default EmptyCart
