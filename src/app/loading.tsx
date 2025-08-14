'use client';
import React from 'react';

const Loading = () => {
  return (
    <section className="bg-red-brown text-milk inset-0 w-screen h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">Loading...</div>
    </section>
  );
};

export default Loading;
