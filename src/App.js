import {useState} from 'react';
import Header from './Components/Layout/Header';
import Drinks from './Components/Products/Drinks';
import Cart from './Components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onCloseClick={hideCartHandler}/>}
      <Header onShowCart={showCartHandler} /> 
      <main>
        <Drinks />
      </main>
    </CartProvider>
  );
}

export default App;
