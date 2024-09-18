// components/AuthForm.tsx
import router, { useRouter } from 'next/router';
import { useState } from 'react';

interface AuthFormProps {
  role: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ role }) => {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    otp: '',
    role: role,
  });

  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOTP = async () => {
    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: formData.email }),
    });

    if (res.ok) {
      setOtpSent(true);
    } else {
      alert('Failed to send OTP');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!otpSent) {
      alert('Please send OTP first');
      return;
    }

    // Verify OTP
    const otpRes = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: formData.email, otp: formData.otp }),
    });

    if (!otpRes.ok) {
      alert('Invalid OTP');
      return;
    }

    // Proceed with registration
    const registerRes = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        id: formData.id,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: formData.password,
        role: formData.role,
      }),
    });

    if (registerRes.ok) {
      // Redirect to login page
      router.push('/login');
    } else {
      alert('Failed to register');
    }
  };

  return (
    <div className="font-[sans-serif] min-h-screen flex items-center justify-center p-10">
      <div className="grid lg:grid-cols-2 items-center gap-6 max-w-7xl max-lg:max-w-xl w-full">
        <form onSubmit={handleSubmit} className="lg:max-w-md w-full">
        <h3 className="text-gray-700 text-2xl font-extrabold mb-12">Register as: {role}</h3>
          <div className="space-y-2">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter name"
                required
              />
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">ID</label>
              <input
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter ID"
                required
              />
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter email"
                required
              />
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter phone"
                required
              />
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter address"
                required
              />
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter password"
                required
              />
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter confirm password"
                required
              />
            </div>
          </div>

          <div className="mt-12 flex space-x-4">
            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendOTP}
                className="py-4 px-8 text-sm font-semibold text-white tracking-wide bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Send OTP
              </button>
            ) : (
              <input
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter OTP"
                required
              />
            )}

            <button
              type="submit"
              className="py-4 px-8 text-sm font-semibold text-white tracking-wide bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="max-lg:mt-12">
          <img
            src="https://i.ibb.co.com/JqXm35S/12085869-20944356-removebg.png"
            className="w-full h-full object-cover"
            alt="Dining Experience"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
