import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import worker from '../../assets/auth.png';
import Banner from '../../components/Banner';

export default function AuthLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Outlet />
      </div>
      <div className={styles.banner}>
        <Banner image={worker} title="Your Personal Job Finder" />
      </div>
    </div>
  );
}
