import { useContext } from 'react';
import image from '../assets/header.png';
import styles from './styles/Header.module.css';
import Button from './ui/Button';
import Text from './ui/Text';
import { AuthContext } from '../store/authContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const authCtx = useContext(AuthContext);
  return (
    <div className={styles.header}>
      <img src={image} alt="" />
      <main>
        <Link to="/">
          <Text step={6} color="white" weight="500">
            JobFinder
          </Text>
        </Link>
        <div className={styles.actions}>
          {authCtx.user ? (
            <>
              <Link onClick={authCtx.logout}>
                <Button variant="primary" step={4} color="white">
                  Logout
                </Button>
              </Link>
              <div>
                <Text step={2} weight='500' color="white">
                  Hello!{', '}
                  <span style={{  fontSize: '18px' }}>
                    {authCtx.user.recruiterName}
                  </span>
                </Text>
              </div>
            </>
          ) : (
            <>
              <Link to="/auth/login">
                <Button variant="outline" style={{ color: 'white' }}>
                  Login
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button variant="secondary">Register</Button>
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
