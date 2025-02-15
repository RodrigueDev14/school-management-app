import { FC } from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import Navbar from '@/components/Navbar';

const RegisterPage: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Créer un nouveau compte
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <RegisterForm />
          
          <p className="mt-10 text-center text-sm text-gray-500">
            Déjà membre?{' '}
            <a href="/auth/login" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
