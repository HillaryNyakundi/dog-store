'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, SignUpFormData } from '@/lib/validations/auth';
import { signUpAction } from '@/lib/actions/auth-actions';

export default function SignUpForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setFocus,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      full_name: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = (data: SignUpFormData) => {
    setServerError('');

    startTransition(async () => {
      const { confirmPassword, ...signUpData } = data;
      const result = await signUpAction(signUpData);
      
      if (result.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setServerError(result.error || 'Sign up failed');
        setFocus('username');
      }
    });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {serverError && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-800">{serverError}</div>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            {...register('username')}
            id="username"
            type="text"
            disabled={isPending}
            className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:opacity-50`}
            placeholder="Choose a username"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register('email')}
            id="email"
            type="email"
            disabled={isPending}
            className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:opacity-50`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            {...register('full_name')}
            id="full_name"
            type="text"
            disabled={isPending}
            className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
              errors.full_name ? 'border-red-500' : 'border-gray-300'
            } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:opacity-50`}
            placeholder="John Doe"
          />
          {errors.full_name && (
            <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            {...register('password')}
            id="password"
            type="password"
            disabled={isPending}
            className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:opacity-50`}
            placeholder="Min 6 characters with uppercase, lowercase, and number"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
          {password && password.length >= 6 && !errors.password && (
            <p className="mt-1 text-sm text-green-600">✓ Strong password</p>
          )}
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            {...register('confirmPassword')}
            id="confirmPassword"
            type="password"
            disabled={isPending}
            className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:opacity-50`}
            placeholder="Re-enter your password"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex items-start">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
            I agree to the{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Terms and Conditions
            </a>
          </label>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isPending}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isPending ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
          ) : (
            'Create account'
          )}
        </button>
      </div>
    </form>
  );
}