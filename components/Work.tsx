"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { Reveal } from "./Reveal";

export function Work() {
    const [openId, setOpenId] = useState<string | null>(null);
    const currentYear = new Date().getFullYear();

    return (
        <section className="section" id="work">
            <div className="shell">
                <Reveal className="section__head">
                    <span className="section__num">02 — Selected Work</span>
                    <span className="section__label">2019 — {currentYear}</span>
                </Reveal>

                <Reveal as="ul" stagger className="work__list">
                    {projects.map((p) => {
                        const isOpen = openId === p.id;
                        const images = p.images?.length ? p.images : [p.image];
                        const detailsId = `work-details-${p.id}`;

                        return (
                            <li
                                key={p.id}
                                className={`work__item${isOpen ? " is-open" : ""}`}
                            >
                                <button
                                    type="button"
                                    className="work__link"
                                    aria-expanded={isOpen}
                                    aria-controls={detailsId}
                                    onClick={() => setOpenId(isOpen ? null : p.id)}
                                >
                                    <span className="work__num">— {p.id}</span>
                                    <span className="work__title">{p.title}</span>
                                    <span className="work__client">{p.client}</span>
                                    <span className="work__cat">
                    <span className="work__cat-engagement">
                      {p.engagement}
                    </span>
                    <span className="work__cat-type">{p.category}</span>
                  </span>
                                    <span className="work__year">{p.year}</span>
                                </button>

                                <div
                                    id={detailsId}
                                    className={`work__details${isOpen ? " is-open" : ""}`}
                                    aria-hidden={!isOpen}
                                >
                                    <div className="work__details-inner">
                                        <div className="work__details-grid">
                                            <div className="work__details-text">
                                                <div className="work__details-meta">
                                                    <span>{p.engagement}</span>
                                                    <span
                                                        aria-hidden="true"
                                                        className="work__details-meta-sep"
                                                    >
                            ·
                          </span>
                                                    <span>{p.year}</span>
                                                    <span
                                                        aria-hidden="true"
                                                        className="work__details-meta-sep"
                                                    >
                            ·
                          </span>
                                                    <span>{p.category}</span>
                                                </div>

                                                <div className="work__detail-block">
                                                    <span className="work__detail-label">Overview</span>
                                                    <p>{p.overview}</p>
                                                </div>

                                                <div className="work__detail-block">
                          <span className="work__detail-label">
                            Role &amp; Scope
                          </span>
                                                    <ul>
                                                        {p.role.map((r) => (
                                                            <li key={r}>{r}</li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="work__detail-block">
                                                    <span className="work__detail-label">Outcome</span>
                                                    <p>{p.outcome}</p>
                                                </div>

                                                {p.href && p.href !== "#" && (
                                                    <a
                                                        href={p.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="work__detail-link"
                                                    >
                                                        View live →
                                                    </a>
                                                )}
                                            </div>

                                            <div className="work__details-media">
                                                {images.map((src, i) => (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        key={`${p.id}-${i}`}
                                                        src={src}
                                                        alt={`${p.title} — image ${i + 1}`}
                                                        loading="lazy"
                                                        className="work__details-img"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </Reveal>
            </div>
        </section>
    );
}
