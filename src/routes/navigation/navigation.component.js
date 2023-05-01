import { Fragment, useContext } from 'react';
import { UserContext } from "../../contexts/user.contexts";
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import './navigation.style.scss';


const Navigaiton = () => {

    const { currentUser } = useContext(UserContext);

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
                    {currentUser ? (<span className='nav-link' onClick={signOutUser} >Sign Out</span>) : (<Link className='nav-link' to='/auth'>
                        Sign In
                    </Link>)}

                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigaiton;