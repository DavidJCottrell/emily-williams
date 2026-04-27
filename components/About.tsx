import { Reveal } from "./Reveal";

export function About() {
  return (
      <section className="section" id="about">
        <div className="shell">
          <Reveal className="section__head">
            <span className="section__num">01 — About</span>
            <span className="section__label">A few words</span>
          </Reveal>

          <div className="about__grid">
            <Reveal className="about__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                  src="/assets/profile-picture.jpg"
                  alt="Emily Williams"
                  className="about__photo"
                  loading="lazy"
              />
            </Reveal>

            <div className="about__text">
              <Reveal as="h2" className="about__title">
                Brand and marketing strategy,{" "}
                <em>built to last</em>.
              </Reveal>
              <Reveal className="about__copy">
                <p>
                  I&apos;m Emily — a marketing and brand strategist with a
                  track record of building strong brand identities, shaping
                  marketing strategies, and leading teams to deliver
                  campaigns that actually do something.
                </p>
                <p>
                  Most recently, I led brand and marketing strategy at{" "}
                  <em>Hooper Quinn</em>, where I developed brand guidelines,
                  culture insights, and multi-channel campaigns —
                  frameworks the team still uses today. Before that, I
                  supported <em>Motorsport UK&apos;s</em> Digital
                  Experience transformation, bringing fresh thinking to
                  their content and audience engagement.
                </p>
                <p>
                  Outside the work itself, I care about digital
                  communications, brand identity, mental health and
                  wellbeing, sustainability, community, music, and books.
                  If you&apos;ve got something you&apos;re proud of,
                  I&apos;d love to hear about it.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
  );
}
