import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

import Navbar from './Navbar';
import Footer from './Footer';
import Body from './Body';
import Men from './Men';
import Hot from './Hot';
import Basket from './Basket';
import Product from './Product';

import { CartProvider } from './CartContext';
import BuyNow from './Buynow';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/Men" element={<Men />} />
          <Route path="/Hot" element={<Hot />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/buynow/:id" element={<BuyNow />} /> {/* Add BuyNow Route */}
          <Route path="/category/:id" element={<Men />} /> {/* Route for dynamic category pages */}
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
