import { Route, Routes } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
// import Authentication from './routes/authentication/authentication.component';
import Mint from './routes/mint/mint.component';
// import Landing from './routes/landing/landing.component';
import Gallery from './routes/gallery/gallery.component';
// import Home from './routes/home/home.component';
import './App.scss';
import Checkout from './routes/checkout/checkout.component';
import CheckoutSuccess from './routes/checkout/checkout-success.component';
import CheckoutFailure from './routes/checkout/checkout-failure.component';

// todo Protected/public routes
const App = () => {
  return (
    <Routes>
      {/* <Route path='/' element={<Landing />} />
        <Route path='auth/:type' element={<Authentication />} /> */}
      <Route path='/' element={<Navigation />}>
        <Route index element={<Mint />} />
        <Route path='gallery/:ownerUuid' element={<Gallery />} />
      </Route>
      <Route path='checkout/:collectionUuid' element={<Checkout />} />
      <Route path='success/:collectionUuid' element={<CheckoutSuccess />} />
      <Route path='cancel/:collectionUuid' element={<CheckoutFailure />} />
    </Routes>
  );
}

export default App;
