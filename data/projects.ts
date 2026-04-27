export type ProjectCategory = "brand" | "marketing" | "culture";

export type ProjectMetric = {
  value: string;
  label: string;
};

export type Project = {
  /** URL slug — used at /work/[slug] */
  slug: string;
  /** Display title of the piece of work */
  title: string;
  /** Category used to group on the homepage */
  category: ProjectCategory;
  /** Client / organisation the work was for */
  client: string;
  /** Year (or year range) the work was delivered */
  year: string;
  /** Short role line shown on the tile + detail meta */
  role: string;
  /** Short summary shown beneath the tile title on the homepage */
  summary: string;
  /** Optional hero image for tile + detail page (placeholder shown if absent) */
  image?: string;
  /** Lede / opening paragraph on the detail page */
  intro: string;
  /** Long-form body paragraphs on the detail page */
  body: string[];
  /** Bullet list shown in the sidebar of the detail page */
  scope: string[];
  /** Optional outcome statement */
  outcome?: string;
  /** Optional pull-out metrics (e.g. growth numbers) */
  metrics?: ProjectMetric[];
  /** Optional gallery on the detail page (placeholders shown if absent) */
  gallery?: string[];
  /** Optional external link (live site, case study, etc.) */
  href?: string;
};

export const projects: Project[] = [
  /* ===========================================================
     BRAND
     =========================================================== */
  {
    slug: "brand-refresh",
    title: "Brand Refresh & Guidelines",
    category: "brand",
    client: "Hooper Quinn",
    image: "/assets/hooper-quinn-logo.png",
    gallery: ["/assets/hooper-quinn-logo.png"],
    year: "2025",
    role: "Brand strategy, copywriting, design",
    summary:
      "A full refresh of brand identity and guidelines — positioning, values, colour and typography — bringing the brand in line with a new strategic direction.",
    intro:
      "Hooper Quinn was outgrowing the brand it had built itself on. The work needed to evolve the firm from a traditional professional services identity into a modern, client-centric brand that could compete in a crowded market and attract entrepreneurial clients.",
    body: [
      "I led the refresh end-to-end — from positioning workshops with leadership through to the finished guidelines document. The aim was to give the brand a clearer point of view, a more confident voice, and a visual system the team could actually use without hand-holding.",
      "The new identity was built around the people Hooper Quinn wanted to work with: founders, technical leads, and ambitious in-house teams. Every element — from typographic hierarchy to colour use — had to feel useful in real-world contexts: pitch decks, social, print, signage, the office itself.",
    ],
    scope: [
      "Positioning, values, and messaging architecture",
      "Visual identity refresh — colour, typography, layout system",
      "Full brand guidelines document",
      "Internal rollout and team training",
    ],
    outcome:
      "Brand refresh adopted across all client-facing and internal touchpoints, giving the team a single, confident reference for everything they ship.",
  },
  {
    slug: "tone-of-voice",
    title: "Tone of Voice Framework",
    category: "brand",
    client: "Hooper Quinn",
    year: "2025",
    role: "Brand strategy, copywriting",
    summary:
      "A revised tone of voice framework to complement the refreshed brand identity — written so the team could pick it up and use it, not just admire it.",
    intro:
      "A brand refresh that doesn't reach the writing is only half done. Alongside the visual identity work, I built a tone of voice framework Hooper Quinn could use across every channel — proposals, social, web, internal comms — without sounding like a different company each time.",
    body: [
      "The framework defined voice principles, do-and-don't examples, and a set of writing patterns mapped to real situations the team writes for: a LinkedIn post, a project case study, a sales follow-up, an internal Slack message.",
      "Rather than abstract adjectives, the document leans heavily on side-by-side rewrites — showing the team what 'on-brand' actually looks like at the sentence level.",
    ],
    scope: [
      "Voice principles and supporting attributes",
      "Channel-specific writing guidance",
      "Before / after examples across real touchpoints",
      "Embedded into the wider brand guidelines",
    ],
    outcome:
      "A practical reference the team uses when writing, not a document that lives in a drawer.",
  },
  {
    slug: "beanworks-art-direction",
    title: "Beanworks Roastery",
    category: "brand",
    client: "Beanworks Roastery",
    year: "2021",
    role: "Art direction, social media strategy",
    summary:
      "Instagram-led visual direction for a specialty roastery — building a brand-forward feed grounded in product, process and place.",
    intro:
      "Beanworks needed an Instagram presence that felt as considered as their coffee. The work focused on art direction and a social strategy that gave the brand a consistent, recognisable visual language.",
    body: [
      "I worked closely with the team on the look and feel of the feed — what to shoot, how to shoot it, and how the grid would build over time. The goal was an account that read as a single brand world, not a collection of individual posts.",
      "Photography was professionally produced; my role was the direction and strategy that sat around it.",
    ],
    scope: [
      "Visual direction for Instagram",
      "Social media strategy and content planning",
      "Briefing and direction of professional photography",
    ],
  },

  /* ===========================================================
     MARKETING
     =========================================================== */
  {
    slug: "linkedin-social-strategy",
    title: "LinkedIn Social Strategy",
    category: "marketing",
    client: "Hooper Quinn",
    year: "2025",
    role: "Social media strategy, content creation, management",
    summary:
      "An audience-first LinkedIn strategy for an engineering and technology partner — content that grew followers and built real engagement, not vanity metrics.",
    intro:
      "When I joined Hooper Quinn, LinkedIn was active but underperforming. Posts were generic, engagement was flat, and the channel wasn't doing much for the brand. I rebuilt the strategy around the people Hooper Quinn actually wanted to reach — and what those people would want to read.",
    body: [
      "The new approach prioritised story-led posts: behind-the-scenes from live engineering projects, founder spotlights from the Student Entrepreneur Incubator, team culture moments, and the occasional honest reflection from leadership. Less corporate, more human.",
      "Cadence, formats and post structure were all tuned to the platform — long-form text posts where they earned their length, photo-led posts when the visual carried the story, and a consistent voice across the board.",
    ],
    scope: [
      "Channel strategy, audience definition and content pillars",
      "Editorial calendar and post planning",
      "Copywriting, photography direction and post production",
      "Performance reporting and iteration",
    ],
    outcome:
      "Over ten months, LinkedIn became one of Hooper Quinn's strongest brand channels — measured in real conversation with the right audiences, not just impressions.",
    metrics: [
      { value: "+49%", label: "Follower growth (1,861 → 2,780)" },
      { value: "+683%", label: "Engagement rate (3% → 23.5%)" },
      { value: "10 mo", label: "Programme length" },
    ],
  },
  {
    slug: "lead-magnet-email",
    title: "Lead Magnet Email Campaign",
    category: "marketing",
    client: "Hooper Quinn",
    year: "2025",
    role: "Marketing strategy, copywriting, design",
    summary:
      "An automated email journey built around a 'prototyping guide' lead magnet — turning a useful download into a conversation with the right audience.",
    intro:
      "The goal: give prospects something genuinely useful, then build a relationship from there. I designed and built an email journey triggered by downloads of a Hooper Quinn prototyping guide, with content sequenced to deepen engagement rather than hurry to a pitch.",
    body: [
      "The campaign covered the landing page, the gated download, and the multi-step nurture journey that followed — each email written to be opened, read, and replied to rather than skimmed and binned.",
      "Tracking was set up across the funnel so we could see what was actually working and refine quickly.",
    ],
    scope: [
      "Landing page strategy and copy",
      "Lead magnet content and design",
      "Multi-step nurture sequence",
      "Performance tracking and optimisation",
    ],
    outcome:
      "30+ qualified downloads within the first 30 days, building a warm pipeline of contacts who'd already self-identified as relevant.",
  },
  {
    slug: "website-restructure",
    title: "Website Restructure",
    category: "marketing",
    client: "Hooper Quinn",
    year: "2025",
    role: "Content strategy, copywriting, design",
    summary:
      "A full restructure of the Hooper Quinn website — new site map, new page architecture, new customer journeys reflecting a sharpened brand position.",
    intro:
      "The existing site was a legacy of an earlier era of the business. It described what Hooper Quinn used to be, not what they were becoming. I led a full restructure aligned to the refreshed brand and the way clients actually arrive, evaluate and engage.",
    body: [
      "The work began with a content audit and a rethought site map, mapping pages to specific audience needs and stages. From there I developed new wireframes for the homepage, division pages and case study templates — and wrote the copy to match.",
      "The result is a site that does fewer things, says them more clearly, and gives the sales team a structure they can actually point clients to.",
    ],
    scope: [
      "Content audit of the existing site",
      "New site map and page architecture",
      "Wireframes for homepage, division and case study templates",
      "Page-level copywriting",
    ],
    outcome:
      "A clearer, more confident site that reflects where the business is heading — not where it's been.",
  },

  /* ===========================================================
     CULTURE
     =========================================================== */
  {
    slug: "culture-survey",
    title: "Culture Survey & Strategy",
    category: "culture",
    client: "Hooper Quinn",
    year: "2025",
    role: "Culture strategy, survey design, analysis",
    summary:
      "A fully anonymised, 100%-response culture survey — and the strategies it unlocked across belonging, motivation, communication, ways of working and trust.",
    intro:
      "After a stretch of intense deadlines, internal pressure was showing. Rather than guess at the cause, we asked. I designed and ran a fully anonymised culture survey covering the things that quietly determine whether a team does its best work — or quietly burns out.",
    body: [
      "The survey was structured across five core areas: Belonging, Safety & Inclusion; Motivation, Growth & Retention; Feedback, Recognition & Communication; Ways of Working & Team Culture; and Openness, Trust & Underlying Issues.",
      "Every employee responded. The findings were synthesised into actionable strategies for each area, with clear ownership and review cadences — moving the conversation from 'how are we feeling?' to 'here's what we're going to do about it.'",
    ],
    scope: [
      "Survey design across five culture pillars",
      "Anonymised distribution and response collection",
      "Analysis and synthesis of findings",
      "Action planning across all five areas",
    ],
    outcome:
      "100% response rate. Findings translated into concrete action across belonging, recognition, ways of working, and trust.",
    metrics: [
      { value: "100%", label: "Response rate" },
      { value: "5", label: "Culture pillars covered" },
    ],
  },
  {
    slug: "student-entrepreneur-incubator",
    title: "Student Entrepreneur Incubator",
    category: "culture",
    client: "Hooper Quinn",
    year: "2025",
    role: "Programme design, partnerships, brand",
    summary:
      "A new incubator partnering Hooper Quinn with universities to support student entrepreneurs through early-stage IP and prototyping.",
    intro:
      "The Student Entrepreneur Incubator was a brand-defining initiative — positioning Hooper Quinn as a serious supporter of early-stage ideas, while giving university teams genuine engineering and prototyping support.",
    body: [
      "I worked on the programme design, the university partnerships, and the brand around the launch — including the stories that would carry the initiative on social and PR.",
      "The launch established Hooper Quinn as a credible voice in early-stage IP, and gave the brand a steady stream of content rooted in real, optimistic work — not stock-photo abstractions.",
    ],
    scope: [
      "Programme structure and partner approach",
      "University partnership development",
      "Launch brand, positioning and messaging",
      "Ongoing storytelling across social and PR",
    ],
    outcome:
      "A live programme generating real founder stories — and positioning HQ as thought leaders on early-stage IP.",
  },
  {
    slug: "team-culture-programme",
    title: "Team Culture Programme",
    category: "culture",
    client: "Hooper Quinn",
    year: "2025",
    role: "Culture strategy, event design, internal comms",
    summary:
      "A company-wide culture programme — quarterly team events, away days, an onboarding journey, and the office-as-brand work that ties them together.",
    intro:
      "Culture isn't built in survey reports — it's built in the everyday rhythm of a team. Alongside the survey work, I designed and ran the wider culture programme: quarterly events, away days, onboarding, and the spatial brand of the HQ office itself.",
    body: [
      "Each touchpoint was designed to do real work: onboarding to bed new joiners in fast, away days to reset and reconnect, quarterly events to mark progress, and an office environment that reflected the brand back to the team every day.",
      "The programme was deliberately lightweight to run — designed to keep going without depending on any single person.",
    ],
    scope: [
      "Quarterly team events programme",
      "Away day design and facilitation",
      "Onboarding journey for new joiners",
      "Office-as-brand spatial and signage work",
    ],
    outcome:
      "A repeatable culture rhythm that outlasts any single owner — woven into the way the team works, not bolted on top.",
  },
];

/** Stable display order for the three category groups on the homepage. */
export const categoryOrder: ProjectCategory[] = ["brand", "marketing", "culture"];

/** Short intro lines shown above each category grid. */
export const categoryMeta: Record<
  ProjectCategory,
  { label: string; intro: string }
> = {
  brand: {
    label: "Brand",
    intro:
      "Identity, voice, and the visual systems that hold them together — the foundations everything else gets built on.",
  },
  marketing: {
    label: "Marketing",
    intro:
      "Audience-first campaigns and channels — built to do something useful, measured against the metrics that actually matter.",
  },
  culture: {
    label: "Culture",
    intro:
      "Strategy, programmes, and the listening behind them — the work that decides whether a team gets to do its best work.",
  },
};

/** Small helper used by the homepage and the dynamic detail route. */
export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
