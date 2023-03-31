import { useDispatch } from 'react-redux';
import { ChevronDown, ChevronUp } from '../assets/icons';
import {
    ICartItem,
    calculateTotals,
    decrease,
    increase,
    removeItem,
} from '../features/cart/cartSlice';

const CartItem: React.FC<ICartItem> = (props) => {
    const { id, img, title, price, amount } = props;
    const dispatch = useDispatch();

    return (
        <article className='cart-item'>
            <img src={img} alt={title} />
            <div>
                <h4>{title}</h4>
                <h4 className='item-price'>${price}</h4>
                <button className='remove-btn'>remove</button>
            </div>
            <div>
                <button
                    className='amount-btn'
                    onClick={() => {
                        dispatch(increase({ id }));
                        dispatch(calculateTotals());
                    }}
                >
                    <ChevronUp />
                </button>
                <p className='amount'>{amount}</p>
                <button
                    className='amount-btn'
                    onClick={() => {
                        if (amount === 1) {
                            dispatch(removeItem({ id }));
                        } else {
                            dispatch(decrease({ id }));
                            dispatch(calculateTotals());
                        }
                    }}
                >
                    <ChevronDown />
                </button>
            </div>
        </article>
    );
};

export default CartItem;
