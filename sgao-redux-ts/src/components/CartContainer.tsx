import { openModal } from '../features/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import CartItem from './CartItem';

const CartContainer = () => {
    const { cartItems, amount, total } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    if (amount < 1) {
        return (
            <section className='cart'>
                <header>
                    <h2>your bag</h2>
                    <h4 className='empty-cart'>is currently empty</h4>
                </header>
            </section>
        );
    }

    return (
        <section className='cart'>
            <header>
                <h2>your bag</h2>
            </header>
            <div>
                {cartItems.map((item) => {
                    return <CartItem key={item.id} {...item} />;
                })}
            </div>
            <footer>
                <hr />
                <div className='cart-total'>
                    <h4>
                        total <span>${total.toFixed(2)}</span>
                    </h4>
                </div>
                <button
                    className='btn clear-btn'
                    onClick={() => dispatch(openModal())}
                >
                    clear cart
                </button>
            </footer>
        </section>
    );
};

export default CartContainer;
