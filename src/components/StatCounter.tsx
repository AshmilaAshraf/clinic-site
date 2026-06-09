import { useEffect, useState, useRef } from "react";

interface StatCounterProps {
  end: number;
  suffix?: string;
  label: string;
  variant?: "default" | "onPrimary";
}

const StatCounter = ({ end, suffix = "+", label, variant = "default" }: StatCounterProps) => {
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

  const isOnPrimary = variant === "onPrimary";

  return (
    <div
      ref={ref}
      className={`text-center rounded-2xl p-6 transition-transform hover:scale-105 ${
        isOnPrimary
          ? "bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20"
          : "bg-card border border-border/50"
      }`}
    >
      <p
        className={`font-heading text-4xl lg:text-5xl font-bold tabular-nums ${
          isOnPrimary ? "text-primary-foreground" : "text-primary"
        }`}
      >
        {count}
        {suffix}
      </p>
      <p
        className={`text-sm mt-2 font-medium ${
          isOnPrimary ? "text-primary-foreground/90" : "text-muted-foreground"
        }`}
      >
        {label}
      </p>
    </div>
  );
};

export default StatCounter;
