import { useEffect } from "react";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Landing from "./routes/landing/landing.component";
import Login from "./routes/login/login.component";
import SmsLoginVerify from "./routes/sms-login-verify/sms-login-verify.component";
import { saveSessionState } from "./utils/storage/session-storage.utils";
import { saveLocalState } from "./utils/storage/local-storage.utils";

import { store } from "./store/store";

import "./App.scss";
import GetStarted from "./routes/get-started/get-started.component";
import CollectibleDetails from "./routes/collectible-details/collectible-details.component";

const CreateHome = lazy(
  () => import("./routes/create-home/create-home.component")
);
const CreateCollectible = lazy(
  () => import("./routes/create-collectible/create-collectible.component")
);
const CreateAccessPass = lazy(
  () => import("./routes/create-access-pass/create-access-pass.component")
);
const Gallery = lazy(() => import("./routes/gallery/gallery.component"));
const Navigation = lazy(
  () => import("./routes/navigation/navigation.component")
);
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));
const CheckoutSuccess = lazy(
  () => import("./routes/checkout/checkout-success.component")
);
const CheckoutFailure = lazy(
  () => import("./routes/checkout/checkout-failure.component")
);
const Vanity = lazy(
  () => import("./routes/vanity/vanity.component")
)
const ClaimNft = lazy(() => import("./routes/claim-nft/claim-nft.component"));
const AccessPassDetails = lazy(() => import("./routes/access-pass-details/access-pass-details.component"));



const App = () => {

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const user = store.getState().user;
      if (user && user.currentUser) {
        saveSessionState(store.getState());
        saveLocalState(user.currentUser.phone);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="auth/" element={<Login />} />
          <Route path="verify/" element={<SmsLoginVerify />} />

          {/* Private routes */}
          <Route path="nfts/" element={<Navigation />}>
            <Route index element={<CreateHome />} />
            <Route path="create-collectible/:redirect" element={<CreateCollectible />} />
            <Route path="create-collectible/" element={<CreateCollectible />} />
            <Route path="create-access-pass/:redirect" element={<CreateAccessPass />} />
            <Route path="create-access-pass/" element={<CreateAccessPass />} />
            <Route path="gallery/:ownerUuid" element={<Gallery />} />
            <Route path="access-pass/:uuid/" element={<AccessPassDetails />} />
            <Route path="collectible/:uuid/" element={<CollectibleDetails />} />
            <Route path="success/:userUuid/:tokenUuid" element={<CheckoutSuccess />} />
          </Route>

          {/* User get starting routes */}
          <Route path='started/' element={<GetStarted />} >
            <Route index element={<CreateHome />} />
            <Route path="create-collectible/" element={<CreateCollectible />} />
            <Route path="create-access-pass/" element={<CreateAccessPass />} />
          </Route>

          {/* Public routes */}
          <Route path="access-pass/:uuid/" element={<AccessPassDetails />} />
          <Route path="collectible/:uuid/" element={<CollectibleDetails />} />

          <Route path="checkout/:collectionUuid" element={<Checkout />} />
          <Route
            path="success/:userUuid/:tokenUuid"
            element={<CheckoutSuccess />}
          />
          <Route path="cancel/:userUuid" element={<CheckoutFailure />} />
          <Route path="collectionable/:tokenUuid" element={<ClaimNft />} />
          <Route path="/:vanityUrl" element={<Vanity />}/>
        </Routes>
      </Suspense>
    </>
  );
};
//hmy/
export default App;
