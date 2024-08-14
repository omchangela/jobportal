import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import * as yup from 'yup';

import styles from './styles/index.module.css';
import { Button, Text } from '../../../components/ui/index';
import { AuthContext } from '../../../store/authContext';
import FormInput from '../../../components/form/FormInput';

const regexPattern = /^(\+91\s?[789]\d{9}|[789]\d{9})$/;

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    mobile: yup
      .string()
      .matches(regexPattern, {
        message: 'Please enter valid number.',
        excludeEmptyString: false,
      })
      .required(),
    password: yup.string().min(6).required(),
  })
  .required();

export default function Register() {
  const authCtx = useContext(AuthContext);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (isChecked) {
      try {
        const res = await fetch(
          import.meta.env.VITE_SERVER_URL + '/api/v1/users/register',
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
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <Text step={8} weight="500">
        Create an account
      </Text>
      <Text style={{ marginTop: '0.5rem' }} step={4}>
        Your personal job finder is here
      </Text>

      <div className={styles.inputs}>
        <div className={styles.inputBox}>
          <FormInput
            variant="large"
            label="name"
            register={register}
            placeholder="Name"
          ></FormInput>
          <Text color="red">{errors.name?.message}</Text>
        </div>

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
            label="mobile"
            register={register}
            placeholder="Mobile"
          ></FormInput>
          <Text color="red">{errors.mobile?.message}</Text>
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

        <div>
          <input
            onChange={(e) => setIsChecked(e.target.checked)}
            type="checkbox"
            id="checkbox"
            required
          />
          <label htmlFor="checkbox">
            By creating an account, I agree to our terms of use and privacy
            policy
          </label>
        </div>
      </div>

      <Button disabled={isSubmitting} size="large">
        {isSubmitting ? 'Signing up...' : 'Sing up'}
      </Button>

      <Text style={{ marginTop: '0.6rem' }} step={4}>
        Already have an account?
        <span>
          <Link to="/auth/login">Sign in</Link>
        </span>
      </Text>
    </form>
  );
}
