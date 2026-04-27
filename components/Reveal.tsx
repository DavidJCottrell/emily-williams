"use client";

import {
  ElementType,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type RevealProps = {
  as?: ElementType;
  stagger?: boolean;
  className?: string;
  children: ReactNode;
};

export function Reveal({
  as: Tag = "div",
  stagger = false,
  className = "",
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = [
    stagger ? "reveal-stagger" : "reveal",
    shown ? "is-in" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    <Tag ref={ref as any} className={cls}>
      {children}
    </Tag>
  );
}
