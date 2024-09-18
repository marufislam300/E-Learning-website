import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'; // For optimized image handling in Next.js
import '../styles/HomePage.css'; // Assuming you have a CSS file for styles

const HomePage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="home-page">
      {/* Header Section */}
      <header className="text-gray-600 body-font bg-[#88cbff2c]">
        <div className="container mx-auto flex flex-wrap p-10 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg className="w-10 h-10 text-Black-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"/>
            </svg>
            <span className="ml-5 text-3xl text-Black">E-School</span>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900 text-Grey">About</a>
          </nav>
        </div>
      </header>

      {/* Main Content Section */}
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-44 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Comprehensive E-School Platform</h1>
            <p className="mb-8 leading-relaxed">Engage in high-quality education tailored for both students and teachers.</p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600  text-lg" onClick={() => router.push('/login')}>Already Have An Account</button>
              
              {/* Dropdown for role selection */}
              <div className="relative inline-block ml-4">
                <button onClick={toggleDropdown} className="text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-rounded-lg text-sm px-6 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Registration <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                  </svg>
                </button>
                {/* Dropdown Menu */}
                <div className={`absolute z-10 ${isDropdownOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <a href="#" onClick={() => { router.push('/register?role=student'); toggleDropdown(); }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Student</a>
                    </li>
                    <li>
                      <a href="#" onClick={() => { router.push('/register?role=teacher'); toggleDropdown(); }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Teacher</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <Image
                className="object-cover object-center rounded"
                src="/images/hero-image.jpg"  // Adjust the path to your image location
                alt="hero"
                width={720}
                height={600}
              />
            </div>

        </div>
      </section>

      {/* Footer Section */}
      <footer className="text-gray-600 body-font">
        <div className="container px-24 py-44 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <span className="ml-3 text-xl">E-School</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            &copy; 2023 E-School. All rights reserved.
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            {/* Social media icons here */}
          </span>
        </div>
      </footer>






    </div>
  );
};

export default HomePage;
