'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Magnetic from './magnetic';
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 p-3 md:p-9">
      <Magnetic
        className="opacity-100 scale-90 filter-[brightness(1)] "
        ease="power2.out"
        hoverAnimation={{ scale: 1, opacity: 0.8, filter: 'brightness(0.9)', duration: 0.3 }}
        leaveAnimation={{ scale: 0.9, opacity: 1, filter: 'brightness(1)', duration: 0.3 }}>
        <Link href="/">
          <Image src="/assets/images/nav-logo.svg" alt="logo" width={16} height={16} className="w-16 md:w-20" />
        </Link>
      </Magnetic>
    </nav>
  );
};

export default Navbar;
