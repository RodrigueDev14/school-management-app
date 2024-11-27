import { FC } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import Navbar from '@/components/Navbar';

const LoginPage: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Connectez-vous à votre compte
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm />
          
          <p className="mt-10 text-center text-sm text-gray-500">
            Pas encore membre?{' '}
            <a href="/auth/register" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
              Créer un compte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
