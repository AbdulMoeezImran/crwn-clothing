import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import { selectCurrentUser, selectIsCartOpen } from "../../Redux/selector";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { NavigaitonContainer, LogoContainer, NavLinksContainer, NavLink } from './navigation.style';


const Navigaiton = () => {
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen);


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