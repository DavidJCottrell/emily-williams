"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";

const navItems = [
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "contact", label: "Contact" },
];

export function Nav() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [activeSection, setActiveSection] = useState("about");
    // Default to hidden. The layout effect below sets the correct value
    // synchronously before first paint based on the route + scroll
    // position. Starting from a fixed `false` avoids any SSR/hydration
    // timing weirdness around `usePathname` and any chance of the
    // initial state being misread.
    const [isBrandVisible, setIsBrandVisible] = useState(false);

    useLayoutEffect(() => {
        const root = document.documentElement;

        // ----- Non-home pages: small brand is always visible. -----
        if (!isHome) {
            setIsBrandVisible(true);
            root.style.removeProperty("--brand-progress");
            root.style.removeProperty("--brand-translate-y");
            root.style.removeProperty("--brand-scale");
            root.style.removeProperty("--hero-brand-opacity");
            return;
        }

        // ----- Home page: brand visibility tracks scroll. -----

        const navigationEntry = performance.getEntriesByType(
            "navigation",
        )[0] as PerformanceNavigationTiming | undefined;
        const isReload = navigationEntry?.type === "reload";

        if (!window.location.hash && !isReload) {
            const previousScrollBehavior = root.style.scrollBehavior;
            root.style.scrollBehavior = "auto";
            window.scrollTo(0, 0);
            root.style.scrollBehavior = previousScrollBehavior;
        }

        const getSections = () =>
            navItems
                .map((item) => document.getElementById(item.id))
                .filter((section): section is HTMLElement => Boolean(section));

        let frameId = 0;
        let settleId = 0;

        const updateBrandMotion = () => {
            const heroName = document.querySelector<HTMLElement>(".hero__name");
            const navBrand = document.querySelector<HTMLElement>(".nav__brand");
            const nav = document.querySelector<HTMLElement>(".nav");

            const progress = Math.min(1, Math.max(0, window.scrollY / 180));

            root.style.setProperty("--brand-progress", progress.toFixed(4));

            if (heroName) {
                const heroStyles = window.getComputedStyle(heroName);
                const heroTop = parseFloat(heroStyles.top || "0");
                const heroFontSize = parseFloat(heroStyles.fontSize || "168");

                const navFontSize = navBrand
                    ? parseFloat(window.getComputedStyle(navBrand).fontSize || "18")
                    : 18;

                const targetTop = nav
                    ? parseFloat(window.getComputedStyle(nav).paddingTop || "24")
                    : 24;

                const targetScale = navFontSize / heroFontSize;
                const translateY = (targetTop - heroTop) * progress;
                const scale = 1 + (targetScale - 1) * progress;
                const heroOpacity =
                    progress < 0.88 ? 1 : Math.max(0, 1 - (progress - 0.88) / 0.12);

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
                if (sectionTop <= activationLine) return section;
                return active;
            }, sections[0]);

            setActiveSection(current.id);
        };

        const requestUpdate = () => {
            window.cancelAnimationFrame(frameId);
            frameId = window.requestAnimationFrame(updateActiveSection);
        };

        // First measurement — runs synchronously, before paint.
        updateActiveSection();
        root.classList.add("brand-motion-ready");

        // Second measurement on the next animation frame. This is the
        // key fix for the "both Emily Williamses on first load" bug:
        // by the next frame, font loading, scroll restoration and any
        // late layout shifts have settled, so the values we measure
        // are the final ones. If anything has changed, state catches up
        // before the user notices.
        settleId = window.requestAnimationFrame(updateActiveSection);

        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);

        // Re-measure once fonts have loaded — Fraunces ships variable
        // optical sizing and its actual metrics affect heroFontSize,
        // which feeds the brand-motion math.
        if (typeof document !== "undefined" && "fonts" in document) {
            document.fonts.ready.then(() => {
                if (root.classList.contains("brand-motion-ready")) {
                    updateActiveSection();
                }
            });
        }

        return () => {
            window.cancelAnimationFrame(frameId);
            window.cancelAnimationFrame(settleId);
            window.removeEventListener("scroll", requestUpdate);
            window.removeEventListener("resize", requestUpdate);
            root.classList.remove("brand-motion-ready");
            root.style.removeProperty("--brand-progress");
            root.style.removeProperty("--brand-translate-y");
            root.style.removeProperty("--brand-scale");
            root.style.removeProperty("--hero-brand-opacity");
        };
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