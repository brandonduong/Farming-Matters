import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/auth/hooks';

export const DeniedPage = () => {
  const { isDenied, setIsDenied } = useAuth();

  const onClick = () => setIsDenied(false);

  if (!isDenied) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <h1>Denied! Multiple sessions detected.</h1>
        <Link to={'/login'} onClick={onClick}>
          Go back to login
        </Link>
      </div>
    );
  }
};
