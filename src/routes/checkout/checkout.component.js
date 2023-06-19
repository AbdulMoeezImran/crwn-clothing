import { memo } from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../Redux/selector";
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from "./checkout.style";

const Checkout = memo(() => {

    const cartItems = useSelector(selectCartItems)

    const cartTotal = cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price, 0);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock><span>Product</span></HeaderBlock>
                <HeaderBlock><span>Description</span></HeaderBlock>
                <HeaderBlock><span>Quantity</span></HeaderBlock>
                <HeaderBlock><span>Price</span></HeaderBlock>
                <HeaderBlock><span>Remove</span></HeaderBlock>
            </CheckoutHeader>
            {cartItems.map((item) => <CheckoutItem key={item.id} items={item} />)}
            <Total>TOTAL: ${cartTotal}</Total>
        </CheckoutContainer>
    )
})

export default Checkout