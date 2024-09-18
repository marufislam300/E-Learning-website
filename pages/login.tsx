// pages/login.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const data = await res.json();
      console.log('Login response:', data);
      localStorage.setItem('userData', JSON.stringify({ ...data, email: formData.email }));
      router.push('/welcome');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="py-44">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        {/* Left-side image */}
        <div className="hidden lg:block lg:w-1/2 bg-cover" style={{ backgroundImage: 'url("/images/login_3.jpg")' }}></div>

        {/* Right-side form */}
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">E-School</h2>
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <a href="#" className="text-xs text-center text-gray-500 uppercase">login with email</a>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                placeholder="Email"
                required
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              </div>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                placeholder="Password"
                required
              />
              <Link href="/forgot-password" className="text-xs text-gray-500">
                Forgot Password?
              </Link>
            </div>

            <div className="mt-8">
              <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600" type="submit">
                Login
              </button>
            </div>
          </form>

          <div className="mt-10 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <Link href="/" className="text-xs text-gray-500 uppercase">
              or Go Home
            </Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
