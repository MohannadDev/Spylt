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
    query: '(max-width: 1024px)',
  });
  useGSAP(() => {
    if (!conatienrRef.current) return;
    const scrollAmount = conatienrRef.current.scrollWidth - window.innerWidth;
    if (!isTablet) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.flavor-section',
          start: '2% top',
          end: `+=${scrollAmount + scrollAmount * 0.25}px`,
          scrub: true,
          pin: true,
        },
      });
      tl.to('.flavor-section', {
        x: `-${scrollAmount + scrollAmount * 0.25}px`,
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
              <img
                src={`/assets/images/${flavor.color}-bg.svg`}
                alt={`${flavor.name} background`}
                aria-hidden="true"
                className="absolute bottom-0"
              />

              <img
                src={`/assets/images/${flavor.color}-drink.webp`}
                alt={`${flavor.name} drink`}
                className="drinks"
              />

              <img
                src={`/assets/images/${flavor.color}-elements.webp`}
                alt={`${flavor.name} decorative elements`}
                className="elements"
              />

              <h1>{flavor.name}</h1>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FlavorSlider;
