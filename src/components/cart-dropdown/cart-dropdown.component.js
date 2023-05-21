import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.style';
import { useSelector } from "react-redux";
import { selectCartItems } from "../../Redux/selector";
import { useNavigate } from "react-router-dom";
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

const CartDropDown = () => {
  const cartItems = useSelector(selectCartItems)
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  }

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