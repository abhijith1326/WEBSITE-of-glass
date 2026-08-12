import { useEffect } from 'react';

/**
 * Custom hook to initialize IntersectionObserver for elements with .reveal,
 * .reveal-left, .reveal-right, .reveal-scale, and .reveal-glass-3d classes.
 */
export function useScrollReveal() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.12,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const selector = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-glass-3d, .reveal-depth';
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);
}
