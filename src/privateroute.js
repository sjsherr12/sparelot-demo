import { Navigate, useLocation } from 'react-router-dom';
import { useUserAuthState } from 'app/backend/user/auth/reactprovider';

const PrivateRoute = ({ children }) => {

  const {user} = useUserAuthState();

  if(user){
    return children
  }
  else{
    return <Navigate to={`/login?rd=${window.location.href}`} replace/>
  }
};

export default PrivateRoute;