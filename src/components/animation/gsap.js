'use client';

import { useLayoutEffect, useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useGsapContext(scope) {
  const ctx = useRef();

  useLayoutEffect(() => {
    ctx.current = gsap.context(() => {}, scope);
    return () => ctx.current.revert();
  }, [scope]);

  return ctx;
}

export function Reveal({ children, className, delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: delay,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
