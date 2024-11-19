'use client'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('admin/dashboard');
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError(''); 
    
    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Wrong Username or Password");
        setLoading(false); 
        return;
      }

      router.replace("admin/dashboard");
    } catch (error) {
      console.log(error);
      setLoading(false); 
    }
  };

  return (
    <div className="flex justify-center mt-14">
      <div className="p-10 bg-normal-green rounded-lg shadow-lg w-[758px] h-[561px] px-20">
        <h2 className="mb-14 mt-2 text-4xl font-bold text-center text-white">
          Welcome!
        </h2>
        <form onSubmit={handleSubmit} className="text-xl relative h-full">
          <div className="mb-8">
            <label className="block mb-2 text-white">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className={`w-full p-2 text-white bg-transparent placeholder-gray-300 rounded outline-none focus:ring-2 border-[1px] h-[56px] ${error ? 'border-red-500' : 'border-white'}`}
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-white">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className={`w-full p-2 text-white placeholder-gray-300 bg-transparent rounded outline-none focus:ring-2 border-[1px] h-[56px] ${error ? 'border-red-500' : 'border-white'}`}
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <div className="mb-4 text-red-500 bg-red-100 p-3 rounded-md w-max justify-self-center">
              {error}
            </div>
          )}

          <button
            data-test="submit-button"
            type="submit"
            disabled={loading} 
            className={`w-[169px] h-[34px] text-center text-white font-bold bg-light-green text-xl rounded-xl hover:bg-[#c4b25a] transition absolute bottom-28 right-0 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            LOG IN
          </button>
        </form>
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-center text-lg font-bold">Logging in...</p>
          </div>
        </div>
      )}
    </div>
  );
}