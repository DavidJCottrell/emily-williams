"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
    { id: "top", label: "Home" },
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "contact", label: "Contact" },
];

export function Nav() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [activeSection, setActiveSection] = useState("top");

    useEffect(() => {
        // Section-spy only runs on the home page
        if (!isHome) return;

        const getSections = () =>
            navItems
                .map((item) => document.getElementById(item.id))
                .filter((section): section is HTMLElement => Boolean(section));

        let frameId = 0;

        const updateActiveSection = () => {
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
        };
    }, [isHome]);

    const hrefFor = (id: string) => {
        if (id === "top") return isHome ? "#top" : "/";
        return isHome ? `#${id}` : `/#${id}`;
    };

    return (
        <nav className="nav" aria-label="Primary navigation">
            <Link href="/" className="nav__brand">
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
