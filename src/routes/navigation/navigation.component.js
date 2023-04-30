import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import './navigation.style.scss'


const Navigaiton = () => {
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
                    <Link className='nav-link' to='/auth'>
                        SignIn
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigaiton;