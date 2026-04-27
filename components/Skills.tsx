import { Reveal } from "./Reveal";

const skillColumns: {
  label: string;
  items: string[];
}[] = [
  {
    label: "Marketing Strategy",
    items: [
      "360° cross-channel strategy",
      "Content strategy & planning",
      "Social media platform management (LinkedIn, Instagram, Facebook, TikTok)",
      "Social & Google advertising",
      "Email marketing & automation",
      "SEO & website strategy",
      "Campaign planning & delivery",
      "Budget management",
    ],
  },
  {
    label: "Brand & Content",
    items: [
      "Brand strategy development",
      "Brand positioning & messaging",
      "Brand guidelines development",
      "Tone of voice framework development",
      "Copywriting & storytelling",
      "Customer experience strategy",
      "Art direction & content creation",
      "Photography & visual design",
    ],
  },
  {
    label: "Culture & Comms",
    items: [
      "Communications strategy",
      "Culture surveys & analysis",
      "Culture & employee engagement strategy",
      "Change management",
    ],
  },
];

const tools = [
  "Canva",
  "Adobe Express",
  "Figma",
  "CapCut",
  "Google Analytics",
  "Google Tag Manager",
  "Google Search Console",
  "Looker Studio",
  "Meta Business Suite",
  "LinkedIn Analytics",
  "Mailchimp",
  "Hootsuite",
  "SocialPilot",
  "Sprout",
  "Wordpress",
  "Shopify",
  "Squarespace",
];

export function Skills() {
  return (
    <section className="section section--skills" id="skills">
      <div className="shell">
        <Reveal as="p" className="skills__lede">
          A working overview — the things I lean on most across brand,
          marketing and culture work.
        </Reveal>

        <Reveal stagger className="skills__grid">
          {skillColumns.map((column) => (
            <div className="skill-col" key={column.label}>
              <h3 className="skill-col__label">{column.label}</h3>
              <ul className="skill-col__list">
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>

        <Reveal className="skills__tools">
          <span className="skills__tools-label">Tools &amp; Platforms</span>
          <p className="skills__tools-list">
            {tools.map((tool, i) => (
              <span key={tool}>
                {tool}
                {i < tools.length - 1 && (
                  <span aria-hidden="true" className="skills__tools-sep">
                    {" "}
                    •{" "}
                  </span>
                )}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
