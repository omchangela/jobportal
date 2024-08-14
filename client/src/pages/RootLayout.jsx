import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import NProgress from 'nprogress';

import styles from './RootLayout.module.css';
import AuthProvider from '../store/authContext';
import { useEffect } from 'react';

export default function RootLayout() {
  const navigation = useNavigation();
  const location = useLocation();
  const { pathname } = location;

  NProgress.configure({ showSpinner: false });

  if (navigation.state === 'loading') {
    NProgress.start();
  }

  useEffect(() => {
    if (NProgress.isStarted()) {
      NProgress.done();
    }
  }, [pathname]);

  return (
    <>
      <div className={styles.toast}>
        <Toaster
          position="bottom-left"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </div>
      <main>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </main>
    </>
  );
}
