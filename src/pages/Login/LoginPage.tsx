import type { FC } from 'react';
import { GoogleLogin } from '@react-oauth/google';

import { useLoginPage } from './LoginPage.hooks';

export const LoginPage: FC = () => {
  const {handleSuccess} = useLoginPage();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-semibold mb-6">Login Page</h2>

      <div className="w-full max-w-xs">
        <div className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600">
        <GoogleLogin
          onSuccess={(response) => handleSuccess(response)} // Pass role to the success handler
          onError={() => {
            console.log('Google login failed');
          }}
          useOneTap
        />
        </div>
      </div>
    </div>
  );
};
