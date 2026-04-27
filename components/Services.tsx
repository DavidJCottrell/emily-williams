import { Reveal } from "./Reveal";

const services = [
  {
    num: "i.",
    title: "Brand & Strategy",
    copy: "Positioning, voice, and the underlying story — the work that makes everything else easier. Best for new brands or teams ready to sharpen.",
  },
  {
    num: "ii.",
    title: "Content & Social",
    copy: "Editorial calendars, channel strategy, and content built to live on the platforms it's made for. Long-form, short-form, and everything between.",
  },
  {
    num: "iii.",
    title: "Campaigns & Growth",
    copy: "Launches, seasonal moments, and growth programs across email, paid, and partnerships — measured against the metrics that actually matter.",
  },
];

export function Services() {
  return (
    <section className="section">
      <div className="shell">
        <Reveal className="section__head">
          <span className="section__num">03 — Services</span>
          <span className="section__label">Ways to work together</span>
        </Reveal>

        <Reveal stagger className="services__grid">
          {services.map((s) => (
            <div className="service" key={s.title}>
              <span className="service__num">{s.num}</span>
              <h3 className="service__title">{s.title}</h3>
              <p className="service__copy">{s.copy}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
