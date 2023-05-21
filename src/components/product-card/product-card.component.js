import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from "../checkout-functions/checkout-function.components";
import { selectCartItems } from '../../Redux/selector';
import { setCartItems } from '../../Redux/actions';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { ProductCartContainer, Footer, Name, Price } from "./product-card.style";


const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addItemToCart = () => {
    const newCartItems = addCartItem(cartItems, product);
    dispatch(setCartItems(newCartItems));
  };

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>${price}</Price>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addItemToCart}>
        Add to cart
      </Button>
    </ProductCartContainer>
  )
}

export default ProductCard;
