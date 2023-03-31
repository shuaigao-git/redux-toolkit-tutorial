import { useEffect } from 'react';
import CartContainer from './components/CartContainer';
import Modal from './components/Modal';
import NavBar from './components/NavBar';
import { getCartItems } from './features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from './hooks/hooks';

const App = () => {
    const { isLoading } = useAppSelector((state) => state.cart);
    const { isOpen } = useAppSelector((state) => state.modal);
    const dispatch = useAppDispatch();

    // 数据请求
    useEffect(() => {
        dispatch(getCartItems());
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className='loading'>
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <main>
            {isOpen ? <Modal /> : null}
            <NavBar />
            <CartContainer />
        </main>
    );
};

export default App;
