import { Outlet, useNavigation } from 'react-router-dom';
import { useLoader } from '../Context/LoaderContext';
import { useEffect } from 'react';
import Loader from '../components/Loader';

const MainLayout = () => {
  const navigation = useNavigation();
  const { showLoader, hideLoader, loading } = useLoader();

  useEffect(() => {
    if (navigation.state === 'loading') {
      showLoader();
    } else {
      hideLoader();
    }
  }, [navigation.state]);

  return (
    <>
      {loading && <Loader />}
      <Outlet />
    </>
  );
};

export default MainLayout;
