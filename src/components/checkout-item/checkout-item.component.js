import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, removeCartItem, clearCartItem } from "../checkout-functions/checkout-function.components";
import { selectCartItems } from '../../Redux/selector';
import { setCartItems } from '../../Redux/actions';
import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton, } from "./checkout-item.style";


const CheckoutItem = ({ items }) => {
  const { name, price, imageUrl, quantity } = items;

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addItemToCart = () => {
    const newCartItems = addCartItem(cartItems, items);
    dispatch(setCartItems(newCartItems));
  };

  const removeItemFromCart = () => {
    const newCartItems = removeCartItem(cartItems, items);
    dispatch(setCartItems(newCartItems));
  };

  const clearItemFromCart = () => {
    const newCartItems = clearCartItem(cartItems, items);
    dispatch(setCartItems(newCartItems));
  };


  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemFromCart}>
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemToCart}>
          &#10095;
        </Arrow>
      </Quantity>
      <BaseSpan> {price}</BaseSpan>
      <RemoveButton onClick={clearItemFromCart}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem;