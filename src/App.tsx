import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Mint from './routes/mint/mint.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Mint />} />
        {/* <Route index element={<Authentication />} />
        <Route path='mint' element={<Mint />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
