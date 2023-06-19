import { Fragment, useContext } from 'react';
import { UserContext } from "../../contexts/user.contexts";
import { CartContext } from "../../contexts/cart.context";
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import { NavigaitonContainer, LogoContainer, NavLinksContainer, NavLink } from './navigation.style';


const Navigaiton = () => {

    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);


    return (
        <Fragment>
            <NavigaitonContainer>
                <LogoContainer to='/'><CrwnLogo /></LogoContainer >

                <NavLinksContainer>
                    <NavLink to='/shop'>SHOP</NavLink>
                    {currentUser ?
                        (<NavLink as='span' onClick={signOutUser} >SIGN OUT</NavLink>) : (<NavLink to='/auth'>SIGN IN</NavLink>)}
                    <CartIcon />
                </NavLinksContainer>

                {isCartOpen && <CartDropDown />}
            </NavigaitonContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigaiton;