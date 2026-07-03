export interface TeamMember {
  name: string;
  email: string;
  role: string;
  github: string;
}

export interface Registration {
  teamName: string;
  track: string;
  leaderName: string;
  leaderEmail: string;
  leaderGithub: string;
  members: TeamMember[];
  projectDescription: string;
  olympianId?: string;
  registeredAt?: string;
}

export interface TrackData {
  id: string;
  title: string;
  icon: string;
  deity: string;
  tagline: string;
  description: string;
  challenges: string[];
}

export interface TimelineMilestone {
  date: string;
  title: string;
  phase: string;
  description: string;
  details: string[];
  status: "completed" | "active" | "upcoming";
}

export interface SponsorTier {
  category: string;
  contribution: string;
  benefits: string[];
  color: string;
  accent: string;
  tagline: string;
}

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    category: "Platinum Sponsor",
    contribution: "₹75,000+",
    color: "from-amber-400 to-yellow-600",
    accent: "#ffd700",
    tagline: "Unparalleled visibility and exclusive premier engagement across the entire fellowship ecosystem.",
    benefits: [
      "Logo placement on premium fellowship merchandise (hoodies, t-shirts, caps)",
      "Prominent banner branding across the GEHU campus and on-site grand finale",
      "Official certificate logo placement (jointly branded with IEEE & GEHU)",
      "Dedicated high-visibility booth space at the on-site Grand Finale",
      "10 dedicated social media shout-outs across official IEEE SB & CSE handles",
      "Exclusive keynote address opportunity during the opening ceremony",
      "Dedicated Ask-Me-Anything (AMA) interaction and talent scouting session",
      "National press release and prime recognition during the closing ceremony",
      "Full post-event database access of registered participants & fellows"
    ]
  },
  {
    category: "Gold Sponsor",
    contribution: "₹50,000+",
    color: "from-yellow-200 to-yellow-400",
    accent: "#ffe16d",
    tagline: "High-impact brand positioning with direct access to top developer talent.",
    benefits: [
      "Logo placement on event posters, banners, and marketing flyers",
      "Official certificate logo placement for all participants & winners",
      "Custom booth space inside the main networking arena at the Grand Finale",
      "5 dedicated social media shout-outs with custom partner graphics",
      "Exclusive technical workshop opportunity with fellows",
      "Prominent verbal recognition during the Grand Finale and awards ceremony",
      "Branded track prize sponsor option"
    ]
  },
  {
    category: "Silver Sponsor",
    contribution: "₹25,000+",
    color: "from-slate-300 to-slate-400",
    accent: "#c5c6c8",
    tagline: "Essential brand exposure and active presence in India's open-source acceleration journey.",
    benefits: [
      "Logo on official website partner grid with backlinks",
      "Standard booth space in the networking corridor at the Grand Finale",
      "3 dedicated social media shout-outs with company profile introduction",
      "Logo placement on overall sponsor composite banners",
      "Media visibility and coverage in local college newsletters and portals",
      "Special acknowledgement during the Grand Finale closing ceremony"
    ]
  },
  {
    category: "Supporter",
    contribution: "₹15,000+",
    color: "from-slate-500 to-slate-600",
    accent: "#a1a1aa",
    tagline: "Valuable brand recognition aligned with community growth and educational progress.",
    benefits: [
      "Logo listed on the official IEEEsoc'26 website partners list",
      "1 dedicated social media shout-out welcoming your organization as a partner",
      "Branding inclusion on main digital screens during presentation breaks",
      "Official IEEE supporter recognition certificate",
      "Valuable goodwill alignment with academic excellence and CSE department"
    ]
  }
];

export const TRACKS: TrackData[] = [
  {
    id: "track-1",
    title: "AI & Cognitive Intellect",
    icon: "Cpu",
    deity: "Zeus's Bolt",
    tagline: "Channel the supreme energy of LLMs and autonomous agents to forge intelligent software.",
    description: "Build applications leveraging LLMs, computer vision, neural networks, or generative AI frameworks to solve critical, real-world complexities.",
    challenges: [
      "Dynamic AI Agents for system optimization and orchestration",
      "Explainable AI frameworks for highly critical medical or defense systems",
      "Localized generative models optimized for high-efficiency edge execution",
      "Multimodal digital assistants that aid day-to-day productivity and work"
    ]
  },
  {
    id: "track-2",
    title: "Decentralized Net & Web3",
    icon: "ShieldAlert",
    deity: "Poseidon's Trident",
    tagline: "Rule the deep, trustless currents of decentralized ledgers and peer-to-peer data nodes.",
    description: "Construct trustless applications, secure smart contract platforms, decentralized identity protocols, or sovereign storage meshes.",
    challenges: [
      "Zero-knowledge verification architectures for confidential audits",
      "Decentralized high-speed content delivery networks (dCDNs)",
      "Automated sovereign identities (SSIs) for secure user sessions",
      "Fractional cross-chain asset and liquidity settlement protocols"
    ]
  },
  {
    id: "track-3",
    title: "Real-time Interconnect",
    icon: "Zap",
    deity: "Hermes's Caduceus",
    tagline: "Unleash hyper-responsive pathways for zero-latency communication and collaborative syncing.",
    description: "Design hyper-responsive live collaboration boards, peer-to-peer visual layers, or streaming synchronization engines.",
    challenges: [
      "Optimistic replication models for instant collaboration state-syncing",
      "Low-bandwidth mesh peer-to-peer wireless communication networks",
      "Real-time sensor stream anomaly detectors with instant notifications",
      "Collaborative multiplayer canvases with responsive state-replay logs"
    ]
  },
  {
    id: "track-4",
    title: "Cyber Shield & Privacy",
    icon: "Lock",
    deity: "Athena's Aegis",
    tagline: "Erect impenetrable cryptographic blockades to safeguard human digital assets.",
    description: "Design cryptographic privacy overlays, security vulnerability detectors, static code threat analyzers, or self-healing systems.",
    challenges: [
      "End-to-end encrypted storage vaults with remote server attestation",
      "Real-time static code analyzers with automated secure patching",
      "Decentralized secure multi-party computation nodes (SMPC)",
      "Biometric access protocols utilizing local secure visual hashes"
    ]
  },
  {
    id: "track-5",
    title: "Edge, IoT & Basalt Hardware",
    icon: "Layers",
    deity: "Hades's Vault",
    tagline: "Harness physical controllers and edge chips deep in the embedded systems.",
    description: "Integrate embedded microcontrollers, low-power radios, edge sensor systems, or smart grid interfaces with live digital controls.",
    challenges: [
      "Low-power mesh gateways with offline-resilient buffer caches",
      "Edge computing kernels for real-time localized video telemetry",
      "Smart agricultural mesh systems with deep soil profiling metrics",
      "Wearable health telemetry systems running completely local logic"
    ]
  }
];

export const TIMELINE: TimelineMilestone[] = [
  {
    date: "1st July – 15th July 2026",
    title: "Scouting & Selection",
    phase: "Phase 1",
    description: "Discovering elite potential from thousands of entries across India through deep assessments.",
    details: [
      "National Outreach and Registrations hosted via Unstop platform",
      "Project Administrator and repository maintainer applications received",
      "Rigorous GitHub and LinkedIn profile evaluation",
      "Initial repository vetting and core alignment checks",
      "Ecosystem Leaderboard initialization and confirmation of Fellows"
    ],
    status: "completed"
  },
  {
    date: "16th July – 22nd July 2026",
    title: "Community Bonding & Architecture Immersion",
    phase: "Phase 2",
    description: "Aligning selected fellows with experienced maintainers and structuring code roadmaps.",
    details: [
      "Comprehensive architecture walkthroughs and codebase audits",
      "Familiarization with documentation and strict contribution rules",
      "One-on-one roadmapping discussions with dedicated mentors",
      "Environment setup and dependency resolution on local machines",
      "First pull-request (PR) submission and CI/CD verification checks",
      "Discord server onboarding and session on open-source ethics"
    ],
    status: "active"
  },
  {
    date: "23rd July – 25th September 2026",
    title: "Contribution Sprints",
    phase: "Phase 3",
    description: "A sustained 9-week development drive tracking pull requests and leadership points.",
    details: [
      "Sprint I — Core feature drafting and initial database scaffolding",
      "Sprint II — Advanced contributions, edge case resolutions, and test coverage",
      "Rigorous Mid-Term Evaluation for continuation in the fellowship",
      "Sprint III — Production-grade enhancements and performance profiling",
      "Final Sprint, robust repository stabilization, and documentation freeze",
      "Live leaderboards updating contributors in real-time",
      "Continuous direct mentor reviews and deep community support channels"
    ],
    status: "upcoming"
  },
  {
    date: "30th September 2026",
    title: "National Showcase & Grand Finale",
    phase: "Phase 4",
    description: "Celebrating contribution milestones with a grand physical merge ceremony and awards at Dehradun.",
    details: [
      "The Grand Merge Ceremony — merging outstanding pull requests live",
      "High-impact technical demonstrations to academic and industry pioneers",
      "Interactive evaluation by faculty members and venture industry panels",
      "The Elite 10 lightning talks showcasing stellar engineering achievements",
      "Awards, laurels distribution, and official IEEE-SB GEHU certification"
    ],
    status: "upcoming"
  }
];

export const BENEFITS = [
  {
    title: "Access Top Talent",
    desc: "Interact directly with India's brightest student developers and future technology leaders. Identify potential interns, contributors, and future employees through sustained performance evaluations."
  },
  {
    title: "Strategic Outreach",
    desc: "Engage with 100–250 elite fellows selected from top-tier universities across India. Support an initiative that promotes collaboration, technical innovation, and deep knowledge sharing."
  },
  {
    title: "Enhance Brand Visibility",
    desc: "Prominent logo placement across prestigious event materials, digital platforms, and direct participant communication. Opportunities to conduct keynote sessions, workshops, and technical showcases."
  },
  {
    title: "Demonstrate Thought Leadership",
    desc: "Position your organization as a major champion of open-source innovation. Directly mentor participants and contribute to shaping India's developer ecosystem."
  },
  {
    title: "Extend Market Influence",
    desc: "Build deep, meaningful connections with students, key faculty members, and modern open-source communities. Align your brand with high-grade engineering excellence."
  }
];

export const UNIVERSITY_INFO = {
  name: "Graphic Era Hill University",
  founder: "Prof. (Dr.) Kamal Ghanshala",
  founded: "2011",
  location: "Dehradun, Uttarakhand, India",
  description: "Graphic Era Hill University (GEHU) is the culmination of the hard work of its visionary founder, Prof. (Dr.) Kamal Ghanshala, who dreamt of transforming the destiny of thousands of young minds through quality and holistic education. Founded in 2011, GEHU is a private university located in Dehradun, Uttarakhand, India, established under Section 2(f) of the UGC Act, 1956 as an extension of the Graphic Era Educational Society, Dehradun.",
  extendedDesc: "GEHU is widely recognized for its innovative and diligent education system, nurturing professionals across industries and sectors in India and beyond. The university is known for its high-quality education and state-of-the-art facilities. With an enrollment of over 17,000+ students across diverse academic programs, GEHU continues to build its reputation for academic excellence. Accredited with TCS Priority College Status (July 2025) and awarded the I-GAUGE Gold Rating (July 2025), GEHU stands as a hub of innovation and opportunity.",
  highlights: [
    "Focus on emerging technologies such as Artificial Intelligence, Blockchain, Renewable Energy, and Med-Tech.",
    "Encourages entrepreneurship and innovation through incubation centres and mentorship programs.",
    "Actively participates in national and international collaborations, competitions, and research initiatives."
  ],
  ieeeSB: {
    name: "IEEE Student Branch, GEHU",
    description: "The Department of Computer Science & Engineering at Graphic Era Hill University has a long-standing history of providing exceptional educational, research, internship, and career opportunities to its students. The department has produced successful alumni who have become leaders in world-class multinational organizations.",
    highlights: [
      "The department actively organizes national and international events such as AUTOCOM (Automation & Computation) and Cybernation & Computation, in collaboration with IEEE-SB, GEHU, fostering a culture of innovation, knowledge exchange, and global exposure.",
      "The School of Computing (SoC) at GEHU focuses on providing high-quality education and research opportunities in the field of Computer Applications."
    ]
  }
};
