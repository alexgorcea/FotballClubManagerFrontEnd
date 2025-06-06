import { useAuth } from '../context/AuthContext';
import HomeGuest from './HomePages/HomeGuest';
import HomeClient from './HomePages/HomeClient';
import HomeAdmin from './HomePages/HomeAdmin';

const Home = () => {
  const { user } = useAuth();

  if (!user) {
    return <HomeGuest />;
  }

  if (user.roles?.includes("ROLE_ADMIN")) {
    return <HomeAdmin />;
  }

  if (user.roles?.includes("ROLE_CLIENT")) {
    return <HomeClient />;
  }

  return <HomeGuest />;
};

export default Home;
