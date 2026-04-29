"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";

export function Contact() {
  const ctaRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)")
      .matches;
    if (!fine) return;

    const onMove = (e: MouseEvent) => {
      const r = cta.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      cta.style.transform = `translate(${x * 0.06}px, ${y * 0.1}px)`;
    };
    const onLeave = () => {
      cta.style.transform = "";
    };

    cta.addEventListener("mousemove", onMove);
    cta.addEventListener("mouseleave", onLeave);
    return () => {
      cta.removeEventListener("mousemove", onMove);
      cta.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="section contact" id="contact">
      <div className="shell">
        <Reveal as="p" className="contact__pre">
          Have something in mind?
        </Reveal>
        <Reveal>
          <a
            ref={ctaRef}
            href="mailto:emilywilliams096@gmail.com"
            className="contact__cta"
          >
            Let&apos;s <em>have a chat</em>.
          </a>
        </Reveal>
        <Reveal className="contact__details">
          <a href="mailto:emilywilliams096@gmail.com">emilywilliams096@gmail.com</a>
          <a href="https://www.instagram.com/shhmemm_?igsh=ZHQ4MDJwc3Izdmdr" target="_blank" rel="noopener">
            Instagram
          </a>
          <a href="https://www.linkedin.com/in/emilywilliams096/" target="_blank" rel="noopener">
            LinkedIn
          </a>
        </Reveal>
      </div>
    </section>
  );
}
