import { redirect } from 'react-router-dom';

const loader = () => {
  const user = localStorage.getItem('user');

  if (!user) {
    return redirect('/auth/login');
  }

  return user;
};

export default loader;
