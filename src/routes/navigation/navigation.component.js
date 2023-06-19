import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { CONSTANTS } from "../../Redux/constants";
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import { selectCurrentUser, selectIsCartOpen } from "../../Redux/selector";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { NavigaitonContainer, LogoContainer, NavLinksContainer, NavLink } from './navigation.style';


const Navigaiton = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen);

    const signOutUser = () => dispatch({ type: CONSTANTS.REQUEST_SIGN_OUT_PENDING });


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