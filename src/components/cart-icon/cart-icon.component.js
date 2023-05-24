import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectIsCartOpen } from "../../Redux/selector";
import { setCartToOpen } from "../../Redux/slice";
import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.style';

const CartIcon = () => {
  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectIsCartOpen);
  const cartItems = useSelector(selectCartItems);

  const toggleIsCartOpen = () => {
    dispatch(setCartToOpen(!isCartOpen));
  }

  const totalQuantity = cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon/>
      <ItemCount>{totalQuantity}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;
