import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IShippingDetails } from 'types';
import { useSaveShippingDetails, useShippingAddress } from 'hooks';
import { useRouter } from 'next/router';

export const CheckoutForm = () => {
  const shipping = useShippingAddress();
  const saveShippingDetails = useSaveShippingDetails();
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IShippingDetails>();

  useEffect(() => {
    setValue('fullName', shipping.fullName);
    setValue('address', shipping.address);
    setValue('city', shipping.city);
    setValue('country', shipping.country);
    setValue('postalCode', shipping.postalCode);
  }, [setValue, shipping]);

  const onSubmit: SubmitHandler<IShippingDetails> = (data) => {
    saveShippingDetails(data);
    router.push('/payment');
  };

  return (
    <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="mb-4 text-xl">Shipping Address</h1>
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          className="w-full"
          autoFocus
          {...register('fullName', {
            required: 'Please, enter your full name',
          })}
        />
        {errors.fullName && (
          <div className="text-red-500">{errors.fullName.message}</div>
        )}
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="address">Address</label>
        <input
          type="address"
          id="address"
          className="w-full"
          autoFocus
          {...register('address', {
            required: 'Please, enter your address',
            minLength: { value: 3, message: 'Address is more than 2 chars' },
          })}
        />
        {errors.address && (
          <div className="text-red-500">{errors.address.message}</div>
        )}
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          className="w-full"
          autoFocus
          {...register('city', {
            required: 'Please, enter your city',
          })}
        />
        {errors.city && (
          <div className="text-red-500">{errors.city.message}</div>
        )}
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="postalCode">Postal Code</label>
        <input
          type="text"
          id="postalCode"
          className="w-full"
          autoFocus
          {...register('postalCode', {
            required: 'Please, enter your postalCode',
          })}
        />
        {errors.postalCode && (
          <div className="text-red-500">{errors.postalCode.message}</div>
        )}
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          className="w-full"
          autoFocus
          {...register('country', {
            required: 'Please, enter your postalCode',
          })}
        />
        {errors.country && (
          <div className="text-red-500">{errors.country.message}</div>
        )}
      </div>
      <button className="primary-button">Next</button>
    </form>
  );
};
