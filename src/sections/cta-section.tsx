'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import Link from 'next/link';
import React from 'react';

export default function CtaSection() {
  useGSAP(() => {
    const titleSplit = SplitText.create('.cta-section .general-title', { type: 'chars' });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 80%',
        end: 'top top',
        scrub: true,
      },
    });
    tl.from(titleSplit.chars, {
      yPercent: 150,
      stagger: 0.02,
      ease: 'power1.inOut',
    }).to('.cta-text-scroll', {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      ease: 'circ.out',
    });
  });
  return (
    <section className="cta-section">
      {/* <img
        src="/assets/images/cta-bg.svg"
        alt="cta map background"
        className="absolute inset-0 w-full h-full object-cover"
      /> */}
      <div className=" cta-content ">
        <div className="col-center items-right px-8 md:px-16">
          <h2 className="general-title text-milk "> Right around</h2>
          <div className="cta-text-scroll" style={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}>
            <h2>the corner</h2>
          </div>
          <p>Buy our drinks at your local store or get them delivered (to your door).</p>
        </div>
        <Link
          href="mailto:mohannad.eldardeery@gmail.com"
          className="cta-button"
          aria-label="Contact the developer">
          <p>Contact the dev</p>
        </Link>
      </div>
    </section>
  );
}
