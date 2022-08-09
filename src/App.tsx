import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.scss";
import CreateAccessPass from "./routes/create-access-pass/create-access-pass.component";
import Landing from "./routes/landing/landing.component";

const Mint = lazy(() => import("./routes/mint/mint.component"));
const Gallery = lazy(() => import("./routes/gallery/gallery.component"));
const Navigation = lazy(() => import("./routes/navigation/navigation.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));
const CheckoutSuccess = lazy(() => import("./routes/checkout/checkout-success.component"));
const CheckoutFailure = lazy(() => import("./routes/checkout/checkout-failure.component"));
const ClaimNft = lazy(() => import("./routes/claim-nft/claim-nft.component"));

// todo Protected/public routes
const App = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='landing/' element={<Landing />} />
          {/* <Route path='auth/:type' element={<Authentication />} /> */}
          <Route path="/" element={<Navigation />}>
            <Route index element={<Mint />} />
            <Route path='create-access-pass/' element={<CreateAccessPass />}/>
            <Route path="gallery/:ownerUuid" element={<Gallery />} />
          </Route>
          <Route path="checkout/:collectionUuid" element={<Checkout />} />
          <Route path="success/:userUuid/:tokenUuid" element={<CheckoutSuccess />} />
          <Route path="cancel/:userUuid" element={<CheckoutFailure />} />
          <Route path="collectionable/:tokenUuid" element={<ClaimNft />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
