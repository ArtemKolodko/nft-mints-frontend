import { Route, Routes } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Mint from './routes/mint/mint.component';
import Landing from './routes/landing/landing.component';
import Gallery from './routes/gallery/gallery.component';
// import Home from './routes/home/home.component';
import './App.scss';

// todo Protected/public routes
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
        <Route path='login' element={<Authentication />} />
        {/* <Route path='create-account' element={<CreateAccount />} /> */}
      <Route path='home' element={<Navigation />}>
        <Route index element={<Gallery />} />
        <Route path='gallery' element={<Gallery />} />
        <Route path='mint' element={<Mint />} />
      </Route>
    </Routes>
  );
}

export default App;
