import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.style.scss";
import { useContext } from 'react';
import { CartContext } from "../../contexts/cart.context";

 
const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  }

  const totalQuantity = cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon"/>
      <span className="item-count">{totalQuantity}</span>
    </div>
  )
}
 
 export default CartIcon