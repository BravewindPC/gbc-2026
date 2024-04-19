"use client"
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result && result.error) {
      toast.error("Sign in error");
    } else {
      toast.success('Sign in succesfully');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-templateDarkBlue p-4 rounded-md shadow-lg w-[70%] max-w-[300px] mx-auto mt-10">
      <div className="mb-4">
        <label htmlFor="username" className="block text-templatePaleYellow font-balmy text-[8px] custom:text-xs sm:text-lg mb-1 custom:mb-2">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="shadow font-monserrat font-bold appearance-none border rounded w-full py-1 px-2 custom:py-2 custom:px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[8px] custom:text-xs sm:text-lg"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-templatePaleYellow font-balmy text-[8px] custom:text-xs sm:text-lg mb-1 custom:mb-2">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow font-monserrat font-bold appearance-none border rounded w-full py-1 px-2 custom:py-2 custom:px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[8px] custom:text-xs sm:text-lg"
        />
      </div>
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-templatePaleYellow py-1 px-2 custom:py-2 custom:px-3 font-balmy hover:bg-gray-100 text-templateDarkBlue font-bold rounded focus:outline-none focus:shadow-outline text-[8px] custom:text-xs sm:text-lg">
          Sign In
        </button>
      </div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </form>
  );
}
