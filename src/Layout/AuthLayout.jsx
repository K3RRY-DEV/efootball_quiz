
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div>
        {/* Render the active auth page here */}
        <Outlet />
    </div>
  );
};

export default AuthLayout;
