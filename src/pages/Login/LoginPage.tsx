import type { FC } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useLoginPage } from './LoginPage.hooks';

export const LoginPage: FC = () => {
  const { handleSuccess } = useLoginPage();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign in to Your Account</h2>
        <p className="text-center text-gray-600 mb-8">Use your Google account to continue</p>
        
        <div className="flex justify-center">
          <div className="rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105">
            <GoogleLogin
              onSuccess={(response) => handleSuccess(response)}
              onError={() => console.log('Google login failed')}
              useOneTap
            />
          </div>
        </div>
      </div>
    </div>
  );
};
