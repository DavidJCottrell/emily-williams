"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "contact", label: "Contact" },
];

export function Nav() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [activeSection, setActiveSection] = useState("about");
    const [isBrandVisible, setIsBrandVisible] = useState(!isHome);

    useEffect(() => {
        // Section-spy only runs on the home page
        if (!isHome) return;

        const getSections = () =>
            navItems
                .map((item) => document.getElementById(item.id))
                .filter((section): section is HTMLElement => Boolean(section));

        let frameId = 0;

        const updateBrandMotion = () => {
            const root = document.documentElement;
            const heroName = document.querySelector<HTMLElement>(".hero__name");
            const progress = Math.min(1, Math.max(0, window.scrollY / 180));

            root.style.setProperty("--brand-progress", progress.toFixed(4));

            if (heroName) {
                const heroTop = parseFloat(window.getComputedStyle(heroName).top || "0");
                const heroFontSize = parseFloat(window.getComputedStyle(heroName).fontSize || "168");
                const navFontSize = 18;
                const targetTop = 24;
                const targetScale = navFontSize / heroFontSize;
                const translateY = (targetTop - heroTop) * progress;
                const scale = 1 + (targetScale - 1) * progress;
                const heroOpacity = progress < 0.88 ? 1 : Math.max(0, 1 - (progress - 0.88) / 0.12);

                root.style.setProperty("--brand-translate-y", `${translateY}px`);
                root.style.setProperty("--brand-scale", scale.toFixed(4));
                root.style.setProperty("--hero-brand-opacity", heroOpacity.toFixed(4));
            }

            setIsBrandVisible(progress > 0.88);
        };

        const updateActiveSection = () => {
            updateBrandMotion();
            const sections = getSections();
            if (!sections.length) return;

            const navOffset = 96;
            const activationLine = navOffset + window.innerHeight * 0.28;
            const scrollBottom = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (documentHeight - scrollBottom < 8) {
                setActiveSection(sections[sections.length - 1].id);
                return;
            }

            const current = sections.reduce((active, section) => {
                const sectionTop = section.getBoundingClientRect().top;

                if (sectionTop <= activationLine) {
                    return section;
                }

                return active;
            }, sections[0]);

            setActiveSection(current.id);
        };

        const requestUpdate = () => {
            window.cancelAnimationFrame(frameId);
            frameId = window.requestAnimationFrame(updateActiveSection);
        };

        updateActiveSection();
        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);

        return () => {
            window.cancelAnimationFrame(frameId);
            window.removeEventListener("scroll", requestUpdate);
            window.removeEventListener("resize", requestUpdate);
            document.documentElement.style.removeProperty("--brand-progress");
            document.documentElement.style.removeProperty("--brand-translate-y");
            document.documentElement.style.removeProperty("--brand-scale");
            document.documentElement.style.removeProperty("--hero-brand-opacity");
        };
    }, [isHome]);

    useEffect(() => {
        if (isHome) return;

        setIsBrandVisible(true);
        document.documentElement.style.removeProperty("--brand-progress");
        document.documentElement.style.removeProperty("--brand-translate-y");
        document.documentElement.style.removeProperty("--brand-scale");
        document.documentElement.style.removeProperty("--hero-brand-opacity");
    }, [isHome]);

    const hrefFor = (id: string) => {
        if (id === "about") return isHome ? "#about" : "/";
        return isHome ? `#${id}` : `/#${id}`;
    };

    return (
        <nav className="nav" aria-label="Primary navigation">
            <Link href="/" className={`nav__brand${isBrandVisible ? " is-visible" : ""}`}>
                Emily Williams
            </Link>
            <ul className="nav__links">
                {navItems.map((item) => {
                    const isActive = isHome && activeSection === item.id;

                    return (
                        <li key={item.id}>
                            <Link
                                className={`nav__link${isActive ? " is-active" : ""}`}
                                href={hrefFor(item.id)}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {item.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
