import { CartIcon } from '../assets/icons';
import { useAppSelector } from '../hooks/hooks';

const NavBar = () => {
    const { amount } = useAppSelector((state) => state.cart);

    return (
        <nav>
            <div className='nav-center'>
                <h3>redux toolkit</h3>
                <div className='nav-container'>
                    <CartIcon />
                    <div className='amount-container'>
                        <p className='total-amount'>{amount}</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
