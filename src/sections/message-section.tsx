'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import React from 'react';

const MessageSection = () => {
  useGSAP(() => {
    const firstMsgSplit = SplitText.create('.first-message', { type: 'words' });
    const secMsgSplit = SplitText.create('.second-message', { type: 'words' });
    const pargSplit = SplitText.create('.message-content p', {
      type: 'words,lines',
      linesClass: 'paragraph-line',
    });

    const tl = gsap.timeline();
    tl.to(firstMsgSplit.words, {
      color: '#faeade',
      ease: 'power1.inOut',
      stagger: 2,
      scrollTrigger: {
        trigger: '.message-content',
        scrub: true,
        start: 'top center',
        end: '30% center',
      },
    });
    tl.to(secMsgSplit.words, {
      color: '#faeade',
      ease: 'power1.inOut',
      stagger: 1,
      scrollTrigger: {
        trigger: '.second-message',
        scrub: true,
        start: '-40% center',
        end: 'bottom center',
      },
    });

    const revealTl = gsap.timeline({
      delay: 0.5,
      scrollTrigger: {
        trigger: '.msg-text-scroll',
        start: 'top 60%',
        end: 'bottom 60%',
        scrub: true,
      },
    });
    revealTl.to('.msg-text-scroll', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      ease: 'circ.inOut',
    });
    const paragraphTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.message-content p',
        start: 'top bottom',
      },
    });
    paragraphTl.from(pargSplit.words, {
      yPercent: 300,
      rotate: 3,
      ease: 'power1.inOut',
      duration: 1,
      stagger: 0.01,
    });
  });
  return (
    <section className="message-content">
      <div className="container mx-auto flex-center py-28 relative">
        <div className="w-full h-full">
          <div className="msg-wrapper">
            <h1 className="first-message">Stir up your fearless past and</h1>

            <div
              style={{
                clipPath: ' polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
              }}
              className="msg-text-scroll">
              <div className="bg-light-brown md:pb-5 pb-3 px-5">
                <h2 className="text-red-brown">Fuel Up</h2>
              </div>
            </div>

            <h1 className="second-message">your future with every gulp of Perfect Protein</h1>
          </div>

          <div className="flex-center md:mt-20 mt-10">
            <div className="max-w-md px-10 flex-center overflow-hidden">
              <p>
                Rev up your rebel spirit and feed the adventure of life with SPYLT, where you’re one chug away from
                epic nostalgia and fearless fun.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
