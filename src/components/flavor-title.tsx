'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import React from 'react';

const FlavorTitle = () => {
  useGSAP(() => {
    const firstTextSplit = SplitText.create('.first-text-split h1', { type: 'chars' });
    const secTextSplit = SplitText.create('.second-text-split h1', { type: 'chars' });
    //todo: scrub
    gsap.from(firstTextSplit.chars, {
      yPercent: 200,
      stagger: 0.02,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.flavor-section',
        start: 'top 30%',
        // scrub: true,
      },
    });
    gsap.to('.flavor-text-scroll', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1,
      scrollTrigger: {
        trigger: '.flavor-section',
        start: 'top 10%',
        // scrub: true,
      },
    });
    gsap.from(secTextSplit.chars, {
      yPercent: 200,
      stagger: 0.02,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.flavor-section',
        // scrub: true,
        start: 'top 1%',
      },
    });
  });
  return (
    <div className="general-title col-center h-full 2xl:gap-32 xl:gap-24 gap-16">
      <div className="overflow-hidden 2xl:py-0 py-3 first-text-split">
        <h1>We have 6</h1>
      </div>

      <div
        style={{
          clipPath: ' polygon(50% 0, 50% 0, 50% 100%, 50% 100%)',
        }}
        className="flavor-text-scroll">
        <div className="bg-mid-brown pb-5 2xl:pt-0 pt-3 2xl:px-5 px-3">
          <h2 className="text-milk">freaking</h2>
        </div>
      </div>

      <div className="overflow-hidden 2xl:py-0 py-3 second-text-split">
        <h1>delicious flavors</h1>
      </div>
    </div>
  );
};

export default FlavorTitle;
