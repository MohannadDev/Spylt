'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef, ReactNode } from 'react';

type MagneticProps = {
  children: ReactNode;
  className?: string;
  duration?: number;
  ease?: string;
  hoverAnimation?: gsap.TweenVars;
  leaveAnimation?: gsap.TweenVars;
};

export default function Magnetic({
  children,
  className,
  duration = 1,
  ease = 'elastic.out(1, 0.3)',
  hoverAnimation,
  leaveAnimation,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const xTo = gsap.quickTo(el, 'x', { duration, ease });
      const yTo = gsap.quickTo(el, 'y', { duration, ease });

      const mouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = el.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        xTo(x);
        yTo(y);
      };

      const mouseEnter = () => {
        if (hoverAnimation) gsap.to(el, { ...hoverAnimation });
      };

      const mouseLeave = () => {
        xTo(0);
        yTo(0);
        if (leaveAnimation) gsap.to(el, { ...leaveAnimation });
      };

      el.addEventListener('mousemove', mouseMove);
      el.addEventListener('mouseenter', mouseEnter);
      el.addEventListener('mouseleave', mouseLeave);

      return () => {
        el.removeEventListener('mousemove', mouseMove);
        el.removeEventListener('mouseenter', mouseEnter);
        el.removeEventListener('mouseleave', mouseLeave);
      };
    },
    { scope: ref, dependencies: [duration, ease, hoverAnimation, leaveAnimation] }
  );

  return (
    <div ref={ref} style={{ display: 'inline-block' }} className={className}>
      {children}
    </div>
  );
}
