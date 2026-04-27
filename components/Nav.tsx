"use client";

import { useEffect, useState } from "react";

const navItems = [
    { id: "top", label: "Home" },
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "contact", label: "Contact" },
];

export function Nav() {
    const [activeSection, setActiveSection] = useState("top");

    useEffect(() => {
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
    }, []);

    return (
        <nav className="nav" aria-label="Primary navigation">
            <a href="#top" className="nav__brand">
                Emily Williams
            </a>
            <ul className="nav__links">
                {navItems.map((item) => {
                    const isActive = activeSection === item.id;

                    return (
                        <li key={item.id}>
                            <a
                                className={`nav__link${isActive ? " is-active" : ""}`}
                                href={`#${item.id}`}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {item.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
