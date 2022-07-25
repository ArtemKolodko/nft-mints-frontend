import { Route, Routes } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Mint from './routes/mint/mint.component';
import Gallery from './routes/gallery/gallery.component';
// import Landing from './routes/landing/landing.component';
// import Home from './routes/home/home.component';
// import Authentication from './routes/authentication/authentication.component';

import Checkout from './routes/checkout/checkout.component';
import CheckoutSuccess from './routes/checkout/checkout-success.component';
import CheckoutFailure from './routes/checkout/checkout-failure.component';

import './App.scss';

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
      <Route path='success/:userUuid' element={<CheckoutSuccess />} />
      <Route path='cancel/:userUuid' element={<CheckoutFailure />} />
    </Routes>
  );
}

export default App;
