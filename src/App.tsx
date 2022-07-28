import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.scss';

const Mint = lazy(() => import('./routes/mint/mint.component'));
const Gallery = lazy(() => import('./routes/gallery/gallery.component'));
const Navigation = lazy(() => import('./routes/navigation/navigation.component'));
// import Landing from './routes/landing/landing.component';
// import Home from './routes/home/home.component';
// import Authentication from './routes/authentication/authentication.component';

const Checkout = lazy(() => import('./routes/checkout/checkout.component'));
const CheckoutSuccess = lazy(() => import('./routes/checkout/checkout-success.component'));
const CheckoutFailure = lazy(() => import('./routes/checkout/checkout-failure.component'));


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
