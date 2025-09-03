import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  rootMargin?: string;
  threshold?: number;
}

export function useIntersectionObserver<T extends Element>(
  options: UseIntersectionObserverOptions = {},
) {
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        rootMargin: options.rootMargin || "100px",
        threshold: options.threshold || 0.1,
      },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [hasIntersected, options.rootMargin, options.threshold]);

  return { ref, hasIntersected };
}
