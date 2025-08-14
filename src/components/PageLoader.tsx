'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Loading from '@/app/loading';

export default function PageLoader({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finishLoading = () => {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => setIsLoaded(true),
      });
    };

    if (document.readyState === 'complete') {
      finishLoading();
      return;
    }

    window.addEventListener('load', finishLoading);
    return () => window.removeEventListener('load', finishLoading);
  }, []);

  if (isLoaded) return children;

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
      }}>
      <Loading />
    </div>
  );
}
