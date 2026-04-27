export type Project = {
  id: string;
  title: string;
  client: string;
  category: string;
  /** How Emily was engaged on the project. Affects display in list and detail panel. */
  engagement: "Freelance" | "In-house";
  year: string;
  image: string;
  /** Optional gallery for the expanded view. Falls back to `image` when omitted. */
  images?: string[];
  href?: string;
  overview: string;
  role: string[];
  outcome: string;
};

export const projects: Project[] = [
  {
    id: "01",
    title: "Berylune",
    client: "Brand & marketing strategy",
    category: "Brand / Marketing",
    engagement: "Freelance",
    year: "2026",
    image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80&auto=format&fit=crop",
    overview:
        "As Brand & Marketing Manager at Hooper Quinn, I led the development and delivery of the brand and marketing strategy to support business growth, market positioning, and team culture. The role included ownership of brand identity, tone of voice, visual guidelines, and multi-channel campaigns that balanced storytelling with lead generation.",
    role: [
      "Owned brand identity, tone of voice, and visual guidelines",
      "Shaped multi-channel campaigns across brand, lead generation, and storytelling",
      "Worked closely with BD, sales, SEO, paid media, design, and external partners",
      "Led internal culture strategy, team-wide events, away days, and HQ office branding",
      "Launched the Student Entrepreneur Incubator in partnership with universities",
      "Collaborated with clients and suppliers to co-create authentic content",
    ],
    outcome:
        "Strengthened brand positioning, campaign consistency, internal culture, and partnership-led content during a period of organisational growth and change.",
  },
  {
    id: "02",
    title: "Hooper Quinn",
    client: "Brand & marketing strategy",
    category: "Brand / Marketing",
    engagement: "In-house",
    year: "2025",
    image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80&auto=format&fit=crop",
    overview:
        "As Brand & Marketing Manager at Hooper Quinn, I led the development and delivery of the brand and marketing strategy to support business growth, market positioning, and team culture. The role included ownership of brand identity, tone of voice, visual guidelines, and multi-channel campaigns that balanced storytelling with lead generation.",
    role: [
      "Owned brand identity, tone of voice, and visual guidelines",
      "Shaped multi-channel campaigns across brand, lead generation, and storytelling",
      "Worked closely with BD, sales, SEO, paid media, design, and external partners",
      "Led internal culture strategy, team-wide events, away days, and HQ office branding",
      "Launched the Student Entrepreneur Incubator in partnership with universities",
      "Collaborated with clients and suppliers to co-create authentic content",
    ],
    outcome:
        "Strengthened brand positioning, campaign consistency, internal culture, and partnership-led content during a period of organisational growth and change.",
  },
  {
    id: "03",
    title: "Motorsport UK",
    client: "Digital experience transformation",
    category: "Digital / Content",
    engagement: "In-house",
    year: "2024",
    image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80&auto=format&fit=crop",
    overview:
        "Brought on to support Motorsport UK’s ambitious Digital Experience transformation, I led the content and digital strategy for the redevelopment of its online ecosystem, including a full website rebuild and reimagined user experience.",
    role: [
      "Led content and digital strategy for a major website redevelopment",
      "Managed the project through tender process and agency evaluation",
      "Worked with internal stakeholders and external agencies on the project brief",
      "Created a full content audit, UX recommendations, and content strategy",
      "Developed a Tone of Voice framework and Written Style Guide",
      "Took interim ownership of the existing website, Resource Centre, email, and social content",
    ],
    outcome:
        "Supported Board-level decision-making and ensured continuity across the digital ecosystem during a period of team and platform change.",
  },
  {
    id: "04",
    title: "Igloo Books Ltd",
    client: "Global marketing direction",
    category: "Marketing / Publishing",
    engagement: "In-house",
    year: "2023",
    image:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&q=80&auto=format&fit=crop",
    overview:
        "As Global Marketing Manager at Igloo Books, I made immediate impact in shaping the company’s global marketing direction, developing a comprehensive project plan to create a consistent strategy across territories and align regional activity with overall brand positioning.",
    role: [
      "Developed a project plan for a consistent global marketing strategy",
      "Worked closely with Sales and Publishing teams on go-to-market planning",
      "Supported product launches with major licensing partners including Disney, Marvel, and Tom Gates",
      "Created and supported sales presentations and licensing pitches",
      "Took ownership of the Igloo website and initiated a rebuild project",
    ],
    outcome:
        "Improved strategic clarity around global marketing activity, product launch support, and website performance before the role concluded due to redundancy.",
  },
  {
    id: "05",
    title: "Twentytwo",
    client: "Head of digital marketing",
    category: "Digital / Agency",
    engagement: "In-house",
    year: "2021",
    image:
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=900&q=80&auto=format&fit=crop",
    overview:
        "After being promoted to lead Twentytwo’s growing Marketing department, I managed all aspects of client delivery across organic and paid social, email marketing, PPC, and SEO, ensuring consistently high standards aligned with KPIs, brand guidelines, and data security protocols.",
    role: [
      "Led client delivery across social, email, PPC, SEO, content, and reporting",
      "Oversaw project scoping, team briefing, delivery, and performance reporting",
      "Acted as the central point of contact for marketing clients",
      "Reviewed and produced marketing and web copy, campaign content, and press releases",
      "Grew the team to eight, including hiring a dedicated Graphic Designer",
      "Created departmental processes and improved project and budget tracking in Monday.com",
    ],
    outcome:
        "Built a scalable marketing department, strengthened client retention, improved operational visibility, and raised delivery standards across multi-service digital projects.",
  },
  {
    id: "06",
    title: "Twentytwo",
    client: "Social media & service development",
    category: "Social / Performance",
    engagement: "In-house",
    year: "2020",
    image:
        "https://images.unsplash.com/photo-1522335789203-aaa3d9532b1e?w=900&q=80&auto=format&fit=crop",
    overview:
        "As Twentytwo’s first dedicated marketing hire, I played a key role in establishing and growing the Marketing arm of the business, leading multi-channel social strategies for a diverse client base and helping expand the agency’s digital capabilities.",
    role: [
      "Developed and managed multi-channel social strategies for agency clients",
      "Aligned campaigns with each client’s brand tone and business goals",
      "Introduced new service offerings including paid social, PPC, and SEO",
      "Created reporting and insight processes using Google Analytics and Google Data Studio",
      "Wrote blog and email content tailored to different client voices and sectors",
      "Represented the agency at local networking events to support commercial growth",
    ],
    outcome:
        "Helped establish a new marketing function, broaden the agency’s service offering, and create the foundations for future team growth.",
  },
  {
    id: "07",
    title: "Lee Abbey London",
    client: "Social media & marketing coordination",
    category: "Marketing / Communications",
    engagement: "In-house",
    year: "2019",
    image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=80&auto=format&fit=crop",
    overview:
        "As the sole marketing lead within a small, multifaceted team, I planned and delivered Lee Abbey London’s marketing and communications across social media, website, digital campaigns, print materials, events, and internal communications.",
    role: [
      "Managed all social media channels, including content planning, asset creation, scheduling, engagement, and insights",
      "Created visual content in-house using photography, Canva, and Adobe Creative Cloud",
      "Delivered marketing campaigns and events within tight budget constraints",
      "Maintained and updated the website, writing copy for web, job ads, and digital campaigns",
      "Contributed to the Lee Abbey Movement magazine",
      "Supported project coordination, internal events, office operations, and Board of Trustees administration",
    ],
    outcome:
        "Delivered consistent, audience-relevant communications across digital and print channels while supporting wider organisational operations and stakeholder engagement.",
  },
];
