import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.style';
import { useContext } from 'react';
import { CartContext } from "../../contexts/cart.context";

 
const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  }

  const totalQuantity = cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon/>
      <ItemCount>{totalQuantity}</ItemCount>
    </CartIconContainer>
  )
}
 
 export default CartIcon