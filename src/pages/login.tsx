import React from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Layout } from 'components';

interface IFormInput {
  email: string;
  password: string;
}
const LoginScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = ({ email, password }) =>
    console.log(email, password);

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-lg"></h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className="w-full"
            autoFocus
            {...register('email', {
              required: 'Please, enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please, enter valid email',
              },
            })}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full"
            {...register('password', {
              required: 'Please, enter password',
              minLength: {
                value: 6,
                message: 'Password should be more than 5 chars',
              },
            })}
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div>
          <button className="primary-button" type="submit">
            Login
          </button>
        </div>
        <div>
          Don&apos;t have an account? &nbsp;
          <Link href="register">Register</Link>
        </div>
      </form>
    </Layout>
  );
};

export default LoginScreen;
