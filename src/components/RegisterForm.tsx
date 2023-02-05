import React from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getError } from 'helpers/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'utils/axios';

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async ({
    username,
    email,
    password,
  }) => {
    const body = { username, email, password };
    try {
      const { data: result } = await axios.post('api/auth/register', body);
      console.log(result);
      if (result.ok) {
        router.push('/login');
      } else {
        toast.error(result.statusText);
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
        <label htmlFor="username">Name</label>
        <input
          type="text"
          id="username"
          className="w-full"
          autoFocus
          {...register('username', {
            required: 'Please, enter your username',
            minLength: {
              value: 4,
              message: 'Name should be more than 3 chars',
            },
          })}
        />
        {errors.username && (
          <div className="text-red-500">{errors.username.message}</div>
        )}
      </div>
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
          Register
        </button>
      </div>
      <div>
        If you have an account, then &nbsp;
        <span className="text-blue-600">
          <Link href="login">Login</Link>
        </span>
      </div>
    </form>
  );
};
