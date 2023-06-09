import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from 'react-router-dom';
import Spinner from "./components/spinner/spinner.component";
import { CONSTANTS } from "./Redux/constants";
import { GlobalStyle } from "./global.style";

const Home = lazy(() => import('./routes/home/home.components'));
const Authentication = lazy(() => import('./routes/authentication/authentication.component'));
const Navigation = lazy(() => import('./routes/navigation/navigation.component'));
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: CONSTANTS.REQUEST_CURRENTUSER_PENDING });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      <GlobalStyle />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path='shop/*' element={<Shop />} />
            <Route path='auth' element={<Authentication />} />
            <Route path='checkout' element={<Checkout />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
