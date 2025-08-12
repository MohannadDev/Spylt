'use client';
import { useRef } from 'react';
import { flavorlists } from '@/constants';
import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive';

const FlavorSlider = () => {
  const conatienrRef = useRef<HTMLDivElement>(null);
  const isTablet = useMediaQuery({
    query: '(max-width: 768px)',
  });
  useGSAP(() => {
    if (!conatienrRef.current) return;
    const scrollAmount = conatienrRef.current.scrollWidth - window.innerWidth;
    if (!isTablet) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.flavor-section',
          start: '2% top',
          end: `+=${scrollAmount + scrollAmount * 0.2}px`,
          scrub: true,
          pin: true,
        },
      });
      tl.to('.flavor-section', {
        x: `-${scrollAmount + scrollAmount * 0.2}px`,
        ease: 'power1.inOut',
      });
    }

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.flavor-section',
        start: 'top top',
        end: 'bottom center',
        scrub: true,
      },
      defaults: {
        ease: 'power1.inOut',
      },
    });
    titleTl
      .to('.first-text-split', {
        xPercent: -30,
      })
      .to(
        '.flavor-text-scroll',
        {
          xPercent: -20,
        },
        '<'
      )
      .to(
        '.second-text-split',
        {
          xPercent: -10,
        },
        '<'
      );
  });

  return (
    <section className="slider-wrapper" ref={conatienrRef}>
      <div className="flavors">
        {flavorlists.map(flavor => {
          return (
            <div key={flavor.name} className="flavor-container">
              {/* todo: there should be an effect with the elems */}
              <img src={`/assets/images/${flavor.color}-bg.svg`} alt="" className="absolute bottom-0" />

              <img src={`/assets/images/${flavor.color}-drink.webp`} alt="" className="drinks" />

              <img src={`/assets/images/${flavor.color}-elements.webp`} alt="" className="elements" />

              <h1>{flavor.name}</h1>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FlavorSlider;
