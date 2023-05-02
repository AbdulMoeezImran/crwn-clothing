import { Fragment, useContext } from 'react';
import { UserContext } from "../../contexts/user.contexts";
import { CartContext } from "../../contexts/cart.context";
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import './navigation.style.scss';


const Navigaiton = () => {

    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);


    return (
        <Fragment>
            <div className='navigation'>
                <Link className='nav-link' to='/'>
                    <CrwnLogo className='logo-container' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {currentUser ? (<span className='nav-link' onClick={signOutUser} >SIGN OUT</span>) : (<Link className='nav-link' to='/auth'>
                        SIGN IN
                    </Link>)}
                    <CartIcon/>
                </div>
                {isCartOpen && <CartDropDown/>}
                
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigaiton;