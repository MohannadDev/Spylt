'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import VideoPanel from './VideoPanel';

const VideoPinSection = () => {
  const isMobiel = useMediaQuery({
    query: '(max-width: 768px)',
  });
  const [selectedVideo, setSelectedVideo] = useState('');

  useGSAP(() => {
    if (!isMobiel) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.vd-pin-section',
          start: '-15% top',
          end: '200% top',
          scrub: 1.5,
          pin: true,
        },
      });
      tl.to('.video-box', {
        clipPath: 'circle(100% at 50% 50%)',
        ease: 'power1.inOut',
      });
    }
  });
  return (
    <section className="vd-pin-section">
      <div
        style={{
          clipPath: isMobiel ? 'circle(100% at 50% 50%)' : 'circle(6% at 50% 50%)',
        }}
        className="size-full video-box">
        <video src="/assets/videos/pin-video.mp4" playsInline muted loop autoPlay />

        <div className="abs-center md:scale-100 scale-200">
          <img src="/assets/images/circle-text.svg" alt="" aria-hidden="true" className="spin-circle" />
          <button
            className="play-btn"
            onClick={() => setSelectedVideo('/assets/videos/pin-video.mp4')}
            aria-label="Play video">
            <img src="/assets/images/play.svg" alt="" aria-hidden="true" className="size-[3vw] ml-[.5vw]" />
          </button>
        </div>
      </div>
      <VideoPanel isOpen={!!selectedVideo} onClose={() => setSelectedVideo('')} videoSrc={selectedVideo || ''} />
    </section>
  );
};

export default VideoPinSection;
