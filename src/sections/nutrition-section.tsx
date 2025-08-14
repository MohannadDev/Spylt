'use client';
import { useMediaQuery } from 'react-responsive';
import { nutrientLists } from '../constants';
import { useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import gsap from 'gsap';

const NutritionSection = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const [lists, setLists] = useState(nutrientLists);

  useEffect(() => {
    if (isMobile) {
      setLists(nutrientLists.slice(0, 3));
    } else if (lists !== nutrientLists) {
      setLists(nutrientLists);
    }
  }, [isMobile, lists]);

  useGSAP(() => {
    const titleSplit = SplitText.create('.nutrition-title', { type: 'chars' });
    const paragraphSplit = SplitText.create('.nutrition-section p', {
      type: 'words, lines',
      linesClass: 'paragraph-line',
    });

    // Clean up any unwanted ARIA attributes added by SplitText
    const cleanUpAria = () => {
      const elements = document.querySelectorAll('.nutrition-section [aria-label]');
      elements.forEach(el => {
        // Only remove aria-label if it's redundant (same as text content)
        if (el.getAttribute('aria-label') === el.textContent?.trim()) {
          el.removeAttribute('aria-label');
        }
        // Remove custom data attributes that don't add semantic value
        Array.from(el.attributes).forEach(attr => {
          if (attr.name.startsWith('data-h-') || attr.name === 'data-bstatus') {
            el.removeAttribute(attr.name);
          }
        });
      });
    };

    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.nutrition-section',
        start: 'top center',
        end: ' top top',
        scrub: true,
        onComplete: cleanUpAria, // Clean up after animation
      },
    });

    contentTl.from(titleSplit.chars, {
      yPercent: 100,
      stagger: 0.02,
      ease: 'power2.out',
    });

    contentTl.from(paragraphSplit.lines, {
      yPercent: 300,
      rotate: 3,
      ease: 'power1.inOut',
      duration: 1,
      stagger: 0.01,
    });

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.nutrition-section',
        start: 'top 80%',
      },
    });

    titleTl.to('.nutrition-text-scroll ', {
      opacity: 1,
      scrub: true,
      clipPath: 'polygon(100% 0, 0 0, 0 100%, 100% 100%)',
      ease: 'power1.Out',
    });

    // Clean up immediately after GSAP setup
    setTimeout(cleanUpAria, 100);
  });

  return (
    <section className="nutrition-section">
      <img src="/assets/images/slider-dip.png" alt="decorative dip pattern" className="w-full object-cover" />
      <img src="/assets/images/big-img.png" alt="SPYLT vanilla protein product" className="big-img" />

      <div className="flex md:flex-row flex-col justify-between md:px-10 px-5 mt-14 md:mt-0">
        <div className="relative inline-block md:translate-y-20">
          <div className="general-title relative flex flex-col justify-center items-center gap-24">
            <div className="overflow-hidden place-self-start">
              <h1 id="nutrition-heading" className="nutrition-title">
                It still does
              </h1>
            </div>
            <div
              style={{
                clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
              }}
              className="nutrition-text-scroll place-self-start opacity-0">
              <div className="bg-yellow-brown pb-5 md:pt-0 pt-3 md:px-5 px-3">
                <h2 className="text-milk-yellow">Body Good</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:justify-center items-center translate-y-5">
          <div className="md:max-w-xs max-w-md">
            <p className="text-lg md:text-right text-balance font-paragraph">
              Milk contains a wide array of nutrients, including vitamins, minerals, and protein, and this is
              lactose free
            </p>
          </div>
        </div>

        <div className="nutrition-box" role="region" aria-labelledby="nutrition-facts-title">
          <h3 id="nutrition-facts-title" className="sr-only">
            Nutrition Facts
          </h3>
          <div className="list-wrapper">
            {lists.map((nutrient, index) => (
              <div key={index} className="relative flex-1 col-center overflow-hidden" role="group">
                <div>
                  <div className="md:text-lg font-paragraph">{nutrient.label}</div>
                  <div className="font-paragraph text-sm mt-2">up to</div>
                  <div className="text-2xl md:text-4xl tracking-tighter font-bold">{nutrient.amount}</div>
                </div>
                {index !== lists.length - 1 && <div className="spacer-border" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add CSS to hide screen reader only content */}
      <style jsx>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </section>
  );
};

export default NutritionSection;
