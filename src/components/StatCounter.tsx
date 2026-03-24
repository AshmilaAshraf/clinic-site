import { useEffect, useState, useRef } from "react";

interface StatCounterProps {
  end: number;
  suffix?: string;
  label: string;
}

const StatCounter = ({ end, suffix = "+", label }: StatCounterProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const step = end / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-heading text-4xl lg:text-5xl font-bold text-primary">
        {count}{suffix}
      </p>
      <p className="text-muted-foreground text-sm mt-2">{label}</p>
    </div>
  );
};

export default StatCounter;
