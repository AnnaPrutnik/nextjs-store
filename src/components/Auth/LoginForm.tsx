import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { getError } from 'helpers/error';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

interface IFormInput {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        toast.error(result.error);
      }
      if (result?.ok && (typeof redirect === 'string' || !redirect)) {
        router.push(redirect ? redirect : '/');
      }
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <form
      className=" mx-auto w-1/3 flex flex-col gap-4 p-7 bg-gray-50 shadow-md mt-7"
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
        <span className="text-blue-600">
          <Link href="/register">Register</Link>
        </span>
      </div>
    </form>
  );
};
