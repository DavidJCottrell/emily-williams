import { Reveal } from "./Reveal";

export function About() {
  return (
    <section className="about" id="about">
      <div className="shell about__shell">
        <div className="about__hero">
          <h1 className="hero__name" aria-label="Emily Williams">
            Emily <em>Williams</em>
          </h1>

          <Reveal className="about__intro">
            <div className="about__body">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/profile-picture.jpg"
                alt="Emily Williams"
                className="about__photo"
                loading="lazy"
              />

              <div className="about__text">
                <h2 className="about__title">
                  Brand and marketing strategy, <em>built to last.</em>
                </h2>

                <div className="about__copy">
                  <p>
                    I&apos;m Emily — a marketing and brand strategist with a track
                    record of building strong brand identities, shaping marketing
                    strategies, and leading teams to deliver campaigns that
                    actually do something.
                  </p>

                  <p>
                    Most recently, I led brand and marketing strategy at Hooper
                    Quinn, where I developed brand guidelines, culture insights,
                    and multi-channel campaigns — frameworks the team still uses
                    today. Before that, I supported Motorsport UK&apos;s Digital
                    Experience transformation, bringing fresh thinking to their
                    content and audience engagement.
                  </p>

                  <p>
                    Outside the work itself, I care about digital communications,
                    brand identity, mental health and wellbeing, sustainability,
                    community, music, and books. If you&apos;ve got something
                    you&apos;re proud of, I&apos;d love to hear about it.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
