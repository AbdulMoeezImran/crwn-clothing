import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from "../../Redux/selector";
import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.style';

const CartDropDown = () => {
  const cartItems = useSelector(selectCartItems)
  const navigate = useNavigate();

  const goToCheckoutHandler = useCallback(() => {
    navigate('/checkout');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (cartItems.map(item => <CartItem key={item.id} cartItem={item} />)) : (<EmptyMessage>Your cart is empty</EmptyMessage>)}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropDown