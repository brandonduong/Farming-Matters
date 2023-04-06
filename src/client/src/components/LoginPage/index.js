import { CreateAccount } from './CreateAccount';
import { Login } from './Login';
import { ResetPassword } from './ResetPassword';

export const LoginPage = () => (
  <div
    style={{
      diplay: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '50px',
      }}
    >
      <Login />
      <CreateAccount />
    </div>
    <ResetPassword />
  </div>
);
