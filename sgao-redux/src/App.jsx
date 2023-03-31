import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartContainer from './components/CartContainer';
import Modal from './components/Modal';
import NavBar from './components/NavBar';
import { getCartItems } from './features/cart/cartSlice';

function App() {
    const { isLoading } = useSelector((state) => state.cart);
    const { isOpen } = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    // 数据请求
    useEffect(() => {
        console.log('执行了');
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
}

export default App;
