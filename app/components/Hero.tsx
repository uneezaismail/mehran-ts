"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MdArrowForward, MdArrowOutward } from 'react-icons/md';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className={`h-screen w-full bg-[#483f36]`}>
      {/* Navbar */}
      <nav className={`z-30 relative w-full border-b text-white py-3 flex justify-center`}>
        <h1
          className={`text-xl font-bold flex items-center gap-2 transition-transform duration-500 ${
            isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'
          }`}
        >
          <span>
            <Image src="/mehran-logo.jpg" alt="mehran-logo" width={30} height={30} className="rounded-full" />
          </span>
          The Mehran Testing Service
        </h1>
      </nav>

      {/* Hero Section */}
      <div className="h-full w-full">
        <Image
          src={'/hero-image.png'}
          alt="Beautiful Landscape"
          fill
          objectFit="cover"
          priority
        />
        <div className="px-2 absolute inset-0 flex flex-col gap-8 items-center pb-10 justify-end bg-black bg-opacity-40 font-medium">
          <h2
            className={`text-white text-md w-[90%] text-center transition-opacity duration-700 delay-200 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Welcome to The Mehran Testing Service,
          </h2>
          <div
            className={`flex flex-col gap-10 items-center justify-center transition-transform duration-700 delay-400 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <p className="text-white text-2xl font-light text-center max-w-xl">
              Discover your <span className="font-bold underline">true potential</span>. Take the challenge
              and showcase your skills by filling out our simple and accessible form.
            </p>
            <Link href="#Form">
              <button
                className="px-6 py-3 flex items-center gap-2 transition-transform hover:ease-in-out duration-300 bg-[#413931] text-white font-semibold rounded-md border hover:bg-[#29241e]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Register Now
                <span className="transition-transform duration-300 transform">
                  {isHovered ? (
                    <MdArrowForward className="animate-bounce" />
                  ) : (
                    <MdArrowOutward />
                  )}
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
