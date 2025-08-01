import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Route from './routes/index.tsx';
import Loader from './common/Loader';
import './i18n';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? <Loader /> : <Route />;
}

export default App;
