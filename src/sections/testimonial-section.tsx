'use client';
import { cards } from '@/constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useState } from 'react';
import VideoPanel from '@/components/VideoPanel';

const TestimonialSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useGSAP(() => {
    gsap.set('.testimonials-section', {
      marginTop: '-140vh',
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.testimonials-section',
        start: 'top bottom',
        end: '150% top',
        scrub: 1.5,
        // markers: true
      },
    });
    // todo: ddd
    // (gsap.utils.toArray('.testimonials-section > div:first-child > h1') as HTMLElement[]).forEach((title, index) => {
    //   tl.to(
    //     title,
    //     {
    //     //   xPercent: 70,
    //       xPercent: gsap.utils.wrap([70, 25, -50], index),
    //     },
    //     '<'
    //   );
    // });

    tl.to('.testimonials-section .first-title', {
      xPercent: 70,
    })
      .to(
        '.testimonials-section .sec-title',
        {
          xPercent: 25,
        },
        '<'
      )
      .to(
        '.testimonials-section .third-title',
        {
          xPercent: -50,
        },
        '<'
      );
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.testimonials-section',
        start: '10% top',
        end: '150% top',
        scrub: 1.5,
        pin: true,
      },
    });

    pinTl.from('.vd-card', {
      yPercent: 150,
      stagger: 0.2,
      ease: 'power1.inOut',
    });
  });

  const vdRef = React.useRef<HTMLVideoElement[]>([]);
  function handlePlay(index: number) {
    const vid = vdRef.current[index];
    vid.play();
  }
  function handlePause(index: number) {
    const vid = vdRef.current[index];
    vid.pause();
  }

  return (
    <>
      <section className="testimonials-section">
        <div className="absolute size-full flex flex-col items-center pt-[5vw]">
          <h1 className="text-black first-title">What&apos;s</h1>
          <h1 className="text-light-brown sec-title">Everyone</h1>
          <h1 className="text-black third-title">Talking</h1>
        </div>

        <div className="pin-box">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`vd-card ${card.translation} ${card.rotation} cursor-pointer`}
              onMouseEnter={() => handlePlay(index)}
              onMouseLeave={() => handlePause(index)}
              onClick={() => setSelectedVideo(card.src)}>
              <video
                ref={el => {
                  if (el) vdRef.current[index] = el;
                }}
                src={card.src}
                playsInline
                muted
                loop
                className="size-full object-cover"
              />
            </div>
          ))}
        </div>
        <VideoPanel
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoSrc={selectedVideo || ''}
        />
      </section>
    </>
  );
};

export default TestimonialSection;
