import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout-item.style.scss";

const CheckoutItem = ({cartItems}) => {
  const { name, price, imageUrl, quantity } = cartItems;
  
  const { removeItemToCart, addItemToCart, clearItemFromCart } = useContext(CartContext);
  const addItemHandler  = () => addItemToCart(cartItems);
  const removeItemHandler  = () => removeItemToCart(cartItems);
  const clearItemHandler = () => clearItemFromCart (cartItems);


  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'> {name} </span>
      <span className='quantity'>
        <div className='arrow' onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className='price'> {price}</span>
      <div className='remove-button' onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  )
}

export default CheckoutItem;