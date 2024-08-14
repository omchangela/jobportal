import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

import styles from './styles/index.module.css';
import { Button, Text } from '../../../components/ui/index';
import { AuthContext } from '../../../store/authContext';
import FormInput from '../../../components/form/FormInput';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export default function Login() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log('isSubmitting', isSubmitting);

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER_URL + '/api/v1/users/login',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message);
      }

      const user = {
        token: resData.token,
        recruiterName: resData.recruiterName,
      };

      authCtx.saveUser(user);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <Text step={8} weight="500">
        Already have an account?
      </Text>
      <Text style={{ marginTop: '0.5rem' }} step={4}>
        Your personal job finder is here
      </Text>

      <div className={styles.inputs}>
        <div className={styles.inputBox}>
          <FormInput
            variant="large"
            label="email"
            register={register}
            placeholder="Email"
          ></FormInput>
          <Text color="red">{errors.email?.message}</Text>
        </div>

        <div className={styles.inputBox}>
          <FormInput
            variant="large"
            label="password"
            register={register}
            type="password"
            placeholder="Password"
          ></FormInput>
          <Text color="red">{errors.password?.message}</Text>
        </div>
      </div>

      <Button disabled={isSubmitting} size="large">
        {isSubmitting ? 'Signing in...' : 'Sing in'}
      </Button>

      <Text style={{ marginTop: '0.6rem' }} step={4}>
        Don’t have an account?{' '}
        <span>
          {' '}
          <Link to="/auth/register">Sign up</Link>
        </span>
      </Text>
    </form>
  );
}
