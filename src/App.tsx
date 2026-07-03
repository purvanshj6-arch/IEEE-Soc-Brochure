/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Cpu,
  ShieldAlert,
  Zap,
  Lock,
  Layers,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ChevronRight,
  ChevronLeft,
  User,
  Award,
  BookOpen,
  Terminal,
  RefreshCw,
  Check,
  Users,
  AlertTriangle,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Search,
  CheckCircle2,
  DollarSign,
  Briefcase,
  TrendingUp,
  Globe,
  Plus
} from "lucide-react";

import { TRACKS, TIMELINE, SPONSOR_TIERS, BENEFITS, UNIVERSITY_INFO } from "./data";
import { TeamMember, Registration } from "./types";
import gehuLogo from "../logos/gehu.png";
import ieeeLogo from "../logos/ieee (1).png";

const GehuLogo = ({ opacity = 1 }: { opacity?: number }) => (
  <img 
    src={gehuLogo} 
    alt="Graphic Era Hill University Logo"
    className="h-10 w-auto md:h-12 flex-shrink-0 transition-opacity duration-300 select-none" 
    style={{ opacity }} 
  />
);

const IeeeLogo = ({ opacity = 1 }: { opacity?: number }) => (
  <img 
    src={ieeeLogo} 
    alt="IEEE Student Branch Logo"
    className="h-10 w-auto md:h-12 flex-shrink-0 transition-opacity duration-300 select-none" 
    style={{ opacity }} 
  />
);

export default function App() {
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [direction, setDirection] = useState<number>(0);

  // Interactive Partnership Portal State
  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(0);
  const [partnerForm, setPartnerForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    targetTier: "Platinum Sponsor",
    customAmount: "75000",
    interestAreas: [] as string[],
    questions: ""
  });
  const [partnerReceipt, setPartnerReceipt] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Track detail index for Slide 07
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number>(0);

  // Fetch local partner inquiry on mount
  useEffect(() => {
    const saved = localStorage.getItem("ieee_soc_partnership");
    if (saved) {
      try {
        setPartnerReceipt(JSON.parse(saved));
      } catch (e) {
        console.error("Error reading saved partnership interest", e);
      }
    }
  }, []);

  // Handle slide jumps
  const goToSlide = (slideNum: number) => {
    setDirection(slideNum > activeSlide ? 1 : -1);
    setActiveSlide(slideNum);
  };

  const handlePrevSlide = () => {
    if (activeSlide > 1) {
      goToSlide(activeSlide - 1);
    }
  };

  const handleNextSlide = () => {
    if (activeSlide < 11) {
      goToSlide(activeSlide + 1);
    }
  };

  // Keyboard navigation for presentation-style interaction
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNextSlide();
      } else if (e.key === "ArrowLeft") {
        handlePrevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlide]);

  // Submit Partnership Interest Form
  const handlePartnerSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!partnerForm.companyName || !partnerForm.contactPerson || !partnerForm.email) {
      setSubmissionError("Company Name, Contact Person, and Email are mandatory.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      // Simulate transmitting partnership proposal
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName: partnerForm.companyName,
          track: `Sponsorship Partner // ${partnerForm.targetTier} (Contribution: ₹${partnerForm.customAmount})`,
          members: [
            {
              name: partnerForm.contactPerson,
              email: partnerForm.email,
              role: "Corporate Contact",
              github: partnerForm.phone
            }
          ]
        })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        const receipt = {
          ...partnerForm,
          partnerId: data.olympianId.replace("OLY-", "SOC-SPN-"),
          registeredAt: data.registeredAt,
          message: `The Digital Pantheon officially honors the patronage of '${partnerForm.companyName}'!`
        };
        setPartnerReceipt(receipt);
        localStorage.setItem("ieee_soc_partnership", JSON.stringify(receipt));
      } else {
        setSubmissionError(data.error || "The alliance gate rejected the inquiry. Please verify inputs.");
      }
    } catch (err: any) {
      setSubmissionError("The temple gates failed to answer. Fallback: Saved proposal locally.");
      // Fallback save locally anyway for robustness
      const offlineReceipt = {
        ...partnerForm,
        partnerId: `SOC-SPN-OFFLINE-${Math.floor(1000 + Math.random() * 9000)}`,
        registeredAt: new Date().toISOString(),
        message: `Saved locally! Our coordinators will contact you at ${partnerForm.email}.`
      };
      setPartnerReceipt(offlineReceipt);
      localStorage.setItem("ieee_soc_partnership", JSON.stringify(offlineReceipt));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Withdraw / Reset Partnership Proposal
  const resetPartnership = () => {
    if (confirm("Reset current partnership inquiry details and prepare a new custom proposal?")) {
      localStorage.removeItem("ieee_soc_partnership");
      setPartnerReceipt(null);
      setPartnerForm({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        targetTier: "Platinum Sponsor",
        customAmount: "75000",
        interestAreas: [],
        questions: ""
      });
    }
  };

  // Quick select sponsorship tier details
  const updateTierSelection = (tierName: string, amount: string) => {
    setPartnerForm((prev) => ({
      ...prev,
      targetTier: tierName,
      customAmount: amount
    }));
  };

  const handleInterestToggle = (area: string) => {
    setPartnerForm((prev) => {
      const exists = prev.interestAreas.includes(area);
      const updated = exists 
        ? prev.interestAreas.filter((a) => a !== area)
        : [...prev.interestAreas, area];
      return { ...prev, interestAreas: updated };
    });
  };

  // Smooth slide transitions
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1200 : -1200,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 1200 : -1200,
      opacity: 0
    })
  };

  // Opacity setting for logos depending on active slide
  const logoOpacity = (activeSlide === 1 || activeSlide === 12) ? 1.0 : 0.4;

  return (
    <div className="min-h-screen bg-obsidian text-marble font-sans flex flex-col justify-between overflow-x-hidden relative select-text" id="sponsorship-portal-root">
      {/* Background spotlights & golden visual accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[25%] w-[50%] h-[40%] bg-gradient-to-b from-[#ffd7000d] to-transparent rounded-full blur-[110px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-gradient-to-tr from-[#111827] to-[#ffd70003] rounded-full blur-[100px]" />
      </div>

      {/* PERSISTENT HEADER FRAME */}
      <header className="px-6 md:px-12 py-4 border-b border-white/[0.04] bg-obsidian/95 backdrop-blur-md flex items-center justify-between z-20 relative" id="olympian-header">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <GehuLogo opacity={logoOpacity} />
            <div className="h-6 w-[1px] bg-white/20" />
            <IeeeLogo opacity={logoOpacity} />
          </div>
        </div>
        
        <div className="font-serif text-lg md:text-xl font-bold text-center tracking-wider text-glow-gold text-white hidden sm:block">
          IEEE Summer of Code 2026
        </div>

        <div className="flex items-center space-x-4">
          <span className="font-mono text-xs tracking-wider text-neon-gold uppercase font-bold bg-[#1c1b1c] px-3 py-1.5 border border-neon-gold/25 shadow-[0_0_8px_rgba(255,215,0,0.15)] chamfer-clip-sm">
            GEHU | CSE
          </span>
          <div className="w-8 h-8 rounded-none border border-neon-gold/40 flex items-center justify-center bg-stone-navy text-neon-gold">
            <Briefcase className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* CORE DISPLAY WINDOW */}
      <main className="flex-grow px-4 sm:px-8 md:px-12 py-6 flex flex-col justify-center relative z-10" id="deck-view">
        <div className="w-full max-w-7xl mx-auto flex flex-col justify-between min-h-[620px] lg:min-h-[680px] relative">
          
          {/* Classical Meander (Greek Key) glowing frame container */}
          <div className="absolute inset-0 border-2 border-neon-gold/20 pointer-events-none glowing-meander z-0 hidden md:block" />
          <div className="absolute -inset-[2px] border border-white/[0.02] pointer-events-none z-0 hidden md:block" />

          {/* Sizable viewport space for slides */}
          <div className="w-full p-4 md:p-12 flex-grow flex flex-col justify-center relative z-10">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full flex flex-col"
              >
                
                {/* SLIDE 01: THE HERO / THE SPARKS OF INNOVATION */}
                {activeSlide === 1 && (
                  <div className="text-center py-6 max-w-4xl mx-auto flex flex-col items-center justify-center" id="slide-01">
                    <motion.div
                      initial={{ scale: 0.93, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="mb-4 text-xs font-mono tracking-[0.25em] text-neon-gold uppercase border border-neon-gold/20 px-5 py-2 bg-stone-navy/80 shadow-[0_0_12px_rgba(255,215,0,0.1)]"
                    >
                      Official Partnership & Sponsorship Prospectus
                    </motion.div>
                    <h1 className="font-serif text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
                      Accelerate India's <br />
                      <span className="text-glow-gold text-neon-gold font-black">Elite Student Developers</span>
                    </h1>
                    <p className="font-sans text-base md:text-lg text-marble/85 max-w-3xl mx-auto mb-8 leading-relaxed">
                      Sponsor <strong className="text-white">IEEEsoc'26</strong>—Graphic Era Hill University's premiere 12-week open-source fellowship. Connect your brand with India's most talented creators and build future-ready tech pipelines.
                    </p>
                    
                    {/* Key program specs */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full border-t border-b border-white/[0.06] py-6 my-4 font-mono text-xs">
                      <div className="text-center">
                        <span className="block text-[#999077] mb-1">FELLOWSHIP TYPE</span>
                        <span className="text-white text-sm font-bold">12-Week Open Source</span>
                      </div>
                      <div className="text-center border-l border-white/[0.06]">
                        <span className="block text-[#999077] mb-1">AUDIENCE</span>
                        <span className="text-white text-sm font-bold">17,000+ GEHU Students</span>
                      </div>
                      <div className="text-center border-l border-white/[0.06]">
                        <span className="block text-[#999077] mb-1">ELITE FELLOWS</span>
                        <span className="text-white text-sm font-bold">100 - 250 National Minds</span>
                      </div>
                      <div className="text-center border-l border-white/[0.06]">
                        <span className="block text-[#999077] mb-1">ON-SITE FINALE</span>
                        <span className="text-white text-sm font-bold">Top 50 Teams</span>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4 justify-center">
                      <button 
                        onClick={() => goToSlide(9)} 
                        className="px-6 py-3 bg-neon-gold text-black font-mono text-xs tracking-wider font-extrabold uppercase hover:bg-white hover:text-black transition-all border border-neon-gold cursor-pointer chamfer-clip"
                      >
                        Explore Sponsorship Tiers
                      </button>
                      <button 
                        onClick={() => goToSlide(10)} 
                        className="px-6 py-3 bg-stone-navy border border-white/20 hover:border-neon-gold text-neon-gold font-mono text-xs tracking-wider transition-all cursor-pointer chamfer-clip"
                      >
                        Interactive Partner Portal
                      </button>
                    </div>
                  </div>
                )}

                {/* SLIDE 02: ABOUT THE UNIVERSITY (GEHU) */}
                {activeSlide === 2 && (
                  <div className="grid lg:grid-cols-12 gap-8 items-center" id="slide-02">
                    <div className="lg:col-span-7 space-y-5">
                      <span className="font-mono text-xs text-neon-gold tracking-widest uppercase block">SECTION 02 // COGNITIVE CRADLE</span>
                      <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                        About Graphic Era <br />Hill University
                      </h2>
                      <p className="font-sans text-sm text-marble/85 leading-relaxed">
                        Graphic Era Hill University (GEHU) is the culmination of the hard work of its visionary founder, <strong className="text-white">Prof. (Dr.) Kamal Ghanshala</strong>, who dreamt of transforming the destiny of thousands of young minds through quality and holistic education.
                      </p>
                      <p className="font-sans text-sm text-marble/85 leading-relaxed">
                        Founded in 2011, GEHU is a leading private university located in Dehradun, Uttarakhand, India. It is widely recognized for its innovative education system, nurturing professionals across industries in India and beyond.
                      </p>
                      <p className="font-sans text-sm text-marble/70 leading-relaxed border-l-2 border-neon-gold/50 pl-4 py-1 italic bg-stone-navy/20">
                        Accredited with <strong className="text-neon-gold font-bold">TCS Priority College Status (July 2025)</strong> and awarded the prestigious <strong className="text-neon-gold font-bold">I-GAUGE Gold Rating (July 2025)</strong>, GEHU stands as a premier national hub of academic excellence and industry readiness.
                      </p>
                    </div>
                    
                    <div className="lg:col-span-5 bg-stone-navy border border-white/[0.08] p-6 relative overflow-hidden chiseled-inset">
                      <div className="absolute top-0 right-0 w-32 h-32 meander-pattern opacity-10 pointer-events-none" />
                      <h3 className="font-serif text-lg font-bold text-neon-gold border-b border-white/[0.08] pb-3 mb-4">
                        Notable University Highlights
                      </h3>
                      <div className="space-y-4 font-mono text-xs">
                        <div className="flex items-start space-x-3">
                          <span className="text-neon-gold font-bold">✓</span>
                          <p className="text-marble/85">
                            <strong className="text-white block mb-0.5">Focus on Emerging Tech</strong>
                            Artificial Intelligence, Blockchain, Renewable Energy systems, and Med-Tech.
                          </p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <span className="text-neon-gold font-bold">✓</span>
                          <p className="text-marble/85">
                            <strong className="text-white block mb-0.5">Entrepreneurial Core</strong>
                            Nurtures startup innovation through deep incubation centres and continuous mentorship.
                          </p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <span className="text-neon-gold font-bold">✓</span>
                          <p className="text-marble/85">
                            <strong className="text-white block mb-0.5">Global Engagement</strong>
                            Collaborates actively on national and international research initiatives and elite student competitions.
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-white/[0.06] text-center">
                        <span className="font-mono text-xs text-[#999077]">17,000+ ENROLLED STUDENTS ACROSS PROGRAMS</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 03: ABOUT IEEE-SB & CSE DEPARTMENT */}
                {activeSlide === 3 && (
                  <div className="grid lg:grid-cols-12 gap-8 items-center" id="slide-03">
                    <div className="lg:col-span-5 bg-stone-navy border border-white/[0.08] p-6 space-y-4 chiseled-inset">
                      <span className="font-mono text-xs text-neon-gold tracking-widest block uppercase">THE CSE CRADLE</span>
                      <h3 className="font-serif text-2xl font-bold text-white">Department of CSE</h3>
                      <p className="font-sans text-xs text-marble/85 leading-relaxed">
                        The Department of Computer Science & Engineering at Graphic Era Hill University has a long-standing history of providing exceptional educational, research, internship, and career opportunities to its students. 
                      </p>
                      <p className="font-sans text-xs text-marble/85 leading-relaxed">
                        The department has successfully produced alumni who have become leaders in world-class multinational organizations and technology firms across the globe.
                      </p>
                      <div className="bg-obsidian p-3 border border-white/[0.04] font-mono text-[10px] text-marble/65 leading-relaxed">
                        🔥 <strong>School of Computing (SoC)</strong> at GEHU is dedicated to high-quality education and research in Computer Applications.
                      </div>
                    </div>

                    <div className="lg:col-span-7 space-y-6">
                      <span className="font-mono text-xs text-neon-gold tracking-widest uppercase block">SECTION 03 // IEEE-SB SB COOPERATION</span>
                      <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                        Fostering Global Open-Source Innovation
                      </h2>
                      <p className="font-sans text-sm text-marble/85 leading-relaxed">
                        The department actively organizes high-profile national and international tech conferences and hackathons to empower our students with global developer insights and practical industry exposure.
                      </p>
                      
                      <div className="grid sm:grid-cols-2 gap-4 font-mono text-xs pt-2">
                        <div className="p-4 bg-stone-navy/40 border border-white/[0.06]">
                          <span className="text-neon-gold font-bold block mb-1">AUTOCOM</span>
                          <span className="text-marble/70">Annual high-level event focusing on advanced state-of-the-art Automation & Computation architectures.</span>
                        </div>
                        <div className="p-4 bg-stone-navy/40 border border-white/[0.06]">
                          <span className="text-neon-gold font-bold block mb-1">CYBERNATION</span>
                          <span className="text-marble/70">Flagship conference targeting Secure Cybernation & Computation paradigms in partnership with IEEE-SB GEHU.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 04: WHAT IS IEEEsoc'26? */}
                {activeSlide === 4 && (
                  <div className="grid lg:grid-cols-12 gap-8 items-center" id="slide-04">
                    <div className="lg:col-span-7 space-y-5">
                      <span className="font-mono text-xs text-neon-gold tracking-widest uppercase block">SECTION 04 // THE ARCHITECTURE</span>
                      <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                        What is <br />IEEEsoc&rsquo;26?
                      </h2>
                      <p className="font-sans text-sm text-marble/85 leading-relaxed">
                        <strong>IEEEsoc&rsquo;26</strong> is a national-level open-source fellowship designed to discover, mentor, and accelerate India&rsquo;s most promising student developers through real-world software engineering experiences.
                      </p>
                      <p className="font-sans text-sm text-marble/85 leading-relaxed">
                        Unlike conventional short-term hackathons that emphasize quick, half-baked mockups, IEEEsoc&rsquo;26 recognizes <strong>sustained technical excellence</strong> and meaningful contributions to production-grade repositories over a long period.
                      </p>
                      <p className="font-sans text-sm text-marble/80 border-l-2 border-neon-gold pl-4 py-1 italic bg-stone-navy/30">
                        Through rigorous GitHub and LinkedIn profile evaluations, the fellowship filters and identifies top students with the authentic capability to become future open-source technology leaders.
                      </p>
                    </div>

                    <div className="lg:col-span-5 bg-stone-navy border border-neon-gold/20 p-6 relative border-glow-gold flex flex-col justify-between min-h-[300px]">
                      <div className="absolute bottom-0 right-0 w-32 h-32 meander-pattern opacity-10 pointer-events-none" />
                      <div>
                        <h4 className="font-mono text-xs text-neon-gold uppercase tracking-wider mb-3">The Contribution Journey</h4>
                        <ul className="space-y-4 font-mono text-xs">
                          <li className="flex items-start space-x-2">
                            <span className="text-neon-gold font-bold">1 //</span>
                            <span>Selected fellows collaborate directly with veteran open-source maintainers.</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-neon-gold font-bold">2 //</span>
                            <span>Fellows contribute to high-impact live production repositories.</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-neon-gold font-bold">3 //</span>
                            <span>Participants compete on a transparent national leaderboard system.</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-3.5 bg-obsidian border border-white/[0.04] text-[10px] font-mono leading-relaxed mt-4">
                        💡 Sponsoring this fellowship positions your company as a primary architect of modern tech ecosystems and developer networks in India.
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 05: EVENT & FELLOWSHIP HIGHLIGHTS */}
                {activeSlide === 5 && (
                  <div className="space-y-6" id="slide-05">
                    <div className="text-center max-w-2xl mx-auto">
                      <span className="font-mono text-xs text-neon-gold tracking-widest uppercase">THE INTELLECT SPECS</span>
                      <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-1">Sponsorship & Event Metrics</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                      <div className="bg-stone-navy border border-white/[0.06] p-5 chiseled-inset flex flex-col justify-between min-h-[160px]">
                        <div>
                          <span className="font-mono text-[10px] text-neon-gold uppercase block mb-1">AUDIENCE SCOPE</span>
                          <h4 className="font-serif text-lg font-bold text-white mb-2">100–250 Fellows</h4>
                        </div>
                        <p className="font-sans text-[11px] text-marble/70">Highly filtered elite developers from premier engineering institutions across India.</p>
                      </div>

                      <div className="bg-stone-navy border border-white/[0.06] p-5 chiseled-inset flex flex-col justify-between min-h-[160px]">
                        <div>
                          <span className="font-mono text-[10px] text-neon-gold uppercase block mb-1">ON-SITE FINALE</span>
                          <h4 className="font-serif text-lg font-bold text-white mb-2">Top 50 Teams</h4>
                        </div>
                        <p className="font-sans text-[11px] text-marble/70">Shortlisted elite teams arrive at the GEHU Dehradun campus for physical showcases.</p>
                      </div>

                      <div className="bg-stone-navy border border-white/[0.06] p-5 chiseled-inset flex flex-col justify-between min-h-[160px]">
                        <div>
                          <span className="font-mono text-[10px] text-neon-gold uppercase block mb-1">PRACTICALITY</span>
                          <h4 className="font-serif text-lg font-bold text-white mb-2">100+ Live Projects</h4>
                        </div>
                        <p className="font-sans text-[11px] text-marble/70">Authentic software contributions to major web framework stacks and technical modules.</p>
                      </div>

                      <div className="bg-stone-navy border border-white/[0.06] p-5 chiseled-inset flex flex-col justify-between min-h-[160px]">
                        <div>
                          <span className="font-mono text-[10px] text-neon-gold uppercase block mb-1">SYSTEM SUPPORT</span>
                          <h4 className="font-serif text-lg font-bold text-white mb-2">Live Bot Tracking</h4>
                        </div>
                        <p className="font-sans text-[11px] text-marble/70">Sustained tracking ecosystem via a custom GitHub Bot & live leaderboards.</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 font-mono text-xs pt-2">
                      <div className="p-4 bg-stone-navy/40 border border-white/[0.06] flex items-start space-x-3">
                        <span className="text-neon-gold font-bold">★</span>
                        <div>
                          <strong className="text-white block mb-1">Mentor-Contributor Matching</strong>
                          Selected fellows are directly mapped with seasoned maintainers for code reviews and architectural oversight.
                        </div>
                      </div>
                      <div className="p-4 bg-stone-navy/40 border border-white/[0.06] flex items-start space-x-3">
                        <span className="text-neon-gold font-bold">★</span>
                        <div>
                          <strong className="text-white block mb-1">Industry Mentorship & Networking</strong>
                          Workshops on high-grade programming, CI/CD pipelines, and active networking sessions with leading corporates.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 06: FELLOWSHIP TIMELINE */}
                {activeSlide === 6 && (
                  <div className="space-y-6" id="slide-06">
                    <div className="text-center max-w-2xl mx-auto">
                      <span className="font-mono text-xs text-neon-gold tracking-widest uppercase">THE CHRONOLOGY</span>
                      <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-1">Sponsorship Engagement Roadmap</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                      {TIMELINE.map((t, idx) => (
                        <div 
                          key={idx} 
                          className={`p-4 border ${
                            t.status === "active" 
                              ? "border-neon-gold bg-stone-navy/90 border-glow-gold-active" 
                              : "border-white/[0.06] bg-stone-navy/20"
                          } flex flex-col justify-between min-h-[220px] relative font-mono`}
                        >
                          <div>
                            <span className="text-[10px] text-[#999077] block mb-1 uppercase tracking-wider">{t.date}</span>
                            <span className="text-xs text-neon-gold font-bold block mb-1">{t.phase} // SCOUTING</span>
                            <h4 className="font-serif text-base font-bold text-white mb-2 leading-tight">{t.title}</h4>
                            <p className="text-[11px] text-marble/70 leading-normal mb-3">{t.description}</p>
                          </div>
                          
                          <div className="border-t border-white/[0.06] pt-2 text-[9px] text-marble/60 space-y-1">
                            {t.details.slice(0, 3).map((d, dIdx) => (
                              <div key={dIdx} className="flex items-start space-x-1">
                                <span className="text-neon-gold">•</span>
                                <span className="line-clamp-1">{d}</span>
                              </div>
                            ))}
                          </div>

                          {t.status === "active" && (
                            <span className="absolute top-2 right-2 text-[9px] bg-neon-gold text-black font-extrabold px-1.5 py-0.5 tracking-wider">
                              CURRENT
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="text-center text-xs font-mono text-[#999077]">
                      *Major sponsor benefits, keynotes, and recruitment sessions will take place during Phase 4 (30th September 2026).
                    </div>
                  </div>
                )}

                {/* SLIDE 07: FIVE SPECIALIZED TECHNICAL TRACKS */}
                {activeSlide === 7 && (
                  <div className="grid lg:grid-cols-12 gap-8 items-stretch" id="slide-07">
                    <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                      <div>
                        <span className="font-mono text-xs text-neon-gold tracking-widest uppercase block">THE ARENA OF IDEAS</span>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-1">Five Specialized Tracks</h2>
                        <p className="font-sans text-sm text-marble/85 mt-4 leading-relaxed">
                          Sponsor brands can directly align their brand tags and tools with one or multiple specialized technology tracks designed to solve modern infrastructure issues.
                        </p>
                      </div>

                      <div className="flex flex-col space-y-2">
                        {TRACKS.map((t, i) => (
                          <button
                            key={t.id}
                            onClick={() => setSelectedTrackIndex(i)}
                            className={`p-3 text-left font-mono text-xs flex justify-between items-center transition-all cursor-pointer ${
                              selectedTrackIndex === i 
                                ? "bg-neon-gold text-black font-bold border-l-4 border-white shadow-[0_0_8px_rgba(255,215,0,0.3)]" 
                                : "bg-stone-navy hover:bg-stone-navy/80 border border-white/[0.04] text-marble"
                            }`}
                          >
                            <span>{t.deity} — {t.title.split(" ")[0]}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-8 bg-stone-navy border border-neon-gold/20 p-6 flex flex-col justify-between relative border-glow-gold">
                      <div className="absolute bottom-0 right-0 w-48 h-48 meander-pattern opacity-5 pointer-events-none" />
                      <div>
                        <div className="flex justify-between items-start border-b border-white/[0.08] pb-4 mb-4">
                          <div>
                            <span className="font-mono text-xs text-neon-gold tracking-widest uppercase block">{TRACKS[selectedTrackIndex].deity}</span>
                            <h3 className="font-serif text-2xl font-bold text-white">{TRACKS[selectedTrackIndex].title}</h3>
                          </div>
                          <span className="p-2 border border-white/10 text-neon-gold bg-obsidian">
                            {TRACKS[selectedTrackIndex].icon === "Cpu" && <Cpu className="w-6 h-6" />}
                            {TRACKS[selectedTrackIndex].icon === "ShieldAlert" && <ShieldAlert className="w-6 h-6" />}
                            {TRACKS[selectedTrackIndex].icon === "Zap" && <Zap className="w-6 h-6" />}
                            {TRACKS[selectedTrackIndex].icon === "Lock" && <Lock className="w-6 h-6" />}
                            {TRACKS[selectedTrackIndex].icon === "Layers" && <Layers className="w-6 h-6" />}
                          </span>
                        </div>
                        <p className="font-serif italic text-sm text-[#d0c6ab] mb-3">
                          &ldquo;{TRACKS[selectedTrackIndex].tagline}&rdquo;
                        </p>
                        <p className="font-sans text-sm text-marble/85 mb-5 leading-relaxed">
                          {TRACKS[selectedTrackIndex].description}
                        </p>

                        <div className="space-y-2">
                          <span className="font-mono text-xs text-neon-gold block uppercase tracking-wider">Example Track Projects:</span>
                          <div className="grid sm:grid-cols-2 gap-2 font-mono text-[11px]">
                            {TRACKS[selectedTrackIndex].challenges.map((c, idx) => (
                              <div key={idx} className="p-2.5 bg-obsidian/70 border border-white/[0.04] flex items-start space-x-2">
                                <span className="text-neon-gold font-bold">▶</span>
                                <span className="text-marble/90">{c}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/[0.06] flex justify-between items-center text-[10px] font-mono text-[#999077]">
                        <span>CORESYNC OPEN SOURCE STANDARDS</span>
                        <span>SPONSOR KEYNOTE OPPORTUNITIES FOR TRACK WINNERS</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 08: WHY PARTNER WITH IEEEsoc'26? */}
                {activeSlide === 8 && (
                  <div className="space-y-6" id="slide-08">
                    <div className="text-center max-w-2xl mx-auto">
                      <span className="font-mono text-xs text-neon-gold tracking-widest uppercase">MUTUAL ALLIANCE</span>
                      <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-1">Why Partner with IEEEsoc&rsquo;26?</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-2">
                      {BENEFITS.map((b, idx) => (
                        <div key={idx} className="bg-stone-navy border border-white/[0.08] p-5 hover:border-neon-gold/40 transition-all chiseled-inset flex flex-col justify-between min-h-[240px]">
                          <div>
                            <span className="font-serif font-black text-neon-gold text-2xl block mb-3 opacity-80">0{idx + 1}</span>
                            <h3 className="font-serif text-base font-bold text-white mb-2 leading-snug">{b.title}</h3>
                            <p className="font-sans text-xs text-marble/75 leading-relaxed">{b.desc}</p>
                          </div>
                          
                          <div className="border-t border-white/[0.06] pt-3 mt-4 text-[9px] font-mono text-[#999077] uppercase">
                            IMPACT RATING: EXCELLENT
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-stone-navy border border-neon-gold/15 flex flex-col sm:flex-row justify-between items-center font-mono text-xs">
                      <span className="text-marble/85 text-center sm:text-left mb-2 sm:mb-0">
                        ⚡ Want to consult our coordinators regarding customized CSR opportunities or physical marketing arrangements?
                      </span>
                    </div>
                  </div>
                )}

                {/* SLIDE 09: SPONSORSHIP TIERS TABLE */}
                {activeSlide === 9 && (
                  <div className="space-y-6" id="slide-09">
                    <div className="text-center max-w-2xl mx-auto">
                      <span className="font-mono text-xs text-neon-gold tracking-widest uppercase">THE CODES OF PATRONAGE</span>
                      <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-1">Sponsorship Tiers & Benefits</h2>
                    </div>

                    <div className="overflow-x-auto pt-2">
                      <table className="w-full font-mono text-xs text-left border-collapse border border-white/[0.06]">
                        <thead>
                          <tr className="bg-stone-navy border-b border-white/[0.08] text-neon-gold uppercase text-[10px]">
                            <th className="p-4">CATEGORY</th>
                            <th className="p-4">CONTRIBUTION</th>
                            <th className="p-4">CORE VALUE DELIVERABLES</th>
                            <th className="p-4 text-center">ACTION</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                          {SPONSOR_TIERS.map((tier, idx) => (
                            <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                              <td className="p-4 font-bold text-white font-serif text-sm">
                                <div className="flex items-center space-x-2">
                                  <span className="w-2.5 h-2.5 bg-neon-gold inline-block" style={{ backgroundColor: tier.accent }} />
                                  <span>{tier.category}</span>
                                </div>
                              </td>
                              <td className="p-4 text-neon-gold font-bold text-sm">{tier.contribution}</td>
                              <td className="p-4 text-marble/80 leading-relaxed text-[11px] max-w-md">
                                <p className="font-bold text-white mb-1 font-sans text-xs italic">“{tier.tagline}”</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {tier.benefits.slice(0, 3).map((b, bIdx) => (
                                    <span key={bIdx} className="bg-stone-navy border border-white/[0.04] px-1.5 py-0.5 text-[9px] text-[#d0c6ab]">
                                      ✓ {b.split(" ")[0]} {b.split(" ")[1]} {b.split(" ")[2] || ""}...
                                    </span>
                                  ))}
                                  <span className="text-[9px] text-neon-gold font-bold bg-white/5 px-1.5 py-0.5">+{tier.benefits.length - 3} more benefits</span>
                                </div>
                              </td>
                              <td className="p-4 text-center">
                                <button 
                                  onClick={() => {
                                    updateTierSelection(tier.category, tier.contribution.replace("₹", "").replace("+", "").replace(",", ""));
                                    goToSlide(10);
                                  }}
                                  className="px-3 py-1.5 bg-white/10 hover:bg-neon-gold hover:text-black text-white transition-all text-[10px] uppercase font-bold chamfer-clip-sm cursor-pointer"
                                >
                                  Configure
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="p-4 bg-[#1c1b1c] border border-white/[0.06] text-center font-mono text-xs text-marble/75">
                      💡 <strong>Customized packages:</strong> We also offer custom tiers, special rewards, tool-credit integrations, and recruitment-only structures. Contact Dr. Chandradeep Bhatt directly at <strong className="text-neon-gold">ieeesoc@gehu.ac.in</strong>.
                    </div>
                  </div>
                )}

                {/* SLIDE 10: INTERACTIVE PARTNERSHIP PORTAL & VALUE ESTIMATOR */}
                {activeSlide === 10 && (
                  <div className="space-y-6" id="slide-10">
                    <div className="text-center max-w-2xl mx-auto">
                      <span className="font-mono text-xs text-neon-gold tracking-widest uppercase">THE PORTAL OF PROMETHEUS</span>
                      <h2 className="font-serif text-3xl font-bold text-white mt-1">Sovereign Partnership Calculator</h2>
                    </div>

                    <AnimatePresence mode="wait">
                      {!partnerReceipt ? (
                        <motion.form 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onSubmit={handlePartnerSubmit}
                          className="grid md:grid-cols-2 gap-6 bg-stone-navy border border-white/[0.06] p-6 max-w-5xl mx-auto text-xs font-mono"
                        >
                          {/* Left config column */}
                          <div className="space-y-4">
                            <div>
                              <span className="block text-neon-gold uppercase font-bold tracking-wider mb-2 text-[10px]">Select Target Sponsor Tier:</span>
                              <div className="grid grid-cols-2 gap-2">
                                {SPONSOR_TIERS.map((tier, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                      setSelectedTierIndex(idx);
                                      updateTierSelection(tier.category, tier.contribution.replace("₹", "").replace("+", "").replace(",", ""));
                                    }}
                                    className={`p-3 text-left border cursor-pointer flex flex-col justify-between ${
                                      partnerForm.targetTier === tier.category 
                                        ? "border-neon-gold bg-stone-navy/80 border-glow-gold-active" 
                                        : "border-white/[0.06] bg-obsidian/40 hover:bg-obsidian/70"
                                    }`}
                                  >
                                    <span className="font-bold text-white">{tier.category}</span>
                                    <span className="text-neon-gold text-[10px] mt-1">{tier.contribution}</span>
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="block text-[#999077] mb-1.5 uppercase font-bold text-[10px]">Customize Contribution Amount (₹):</label>
                              <div className="flex items-center space-x-2">
                                <span className="text-base text-neon-gold font-bold">₹</span>
                                <input 
                                  type="number"
                                  min="10000"
                                  value={partnerForm.customAmount}
                                  onChange={(e) => setPartnerForm({ ...partnerForm, customAmount: e.target.value })}
                                  className="w-full p-2.5 bg-obsidian border-b border-white/20 text-white focus:border-neon-gold outline-none text-sm font-bold"
                                />
                              </div>
                            </div>

                            <div className="bg-obsidian border border-white/[0.04] p-3.5">
                              <span className="text-neon-gold font-bold block mb-2 uppercase text-[10px]">Brand Activation Focus:</span>
                              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                                {[
                                  "Recruitment Pipeline",
                                  "Open Source Advocacy",
                                  "Developer Tool Credits",
                                  "National Student Outreach",
                                  "Technical Keynote",
                                  "CSR Community Funding"
                                ].map((area, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleInterestToggle(area)}
                                    className={`p-2 text-left border cursor-pointer ${
                                      partnerForm.interestAreas.includes(area)
                                        ? "border-neon-gold bg-neon-gold/10 text-white font-bold"
                                        : "border-white/10 text-marble/60 hover:text-white"
                                    }`}
                                  >
                                    {partnerForm.interestAreas.includes(area) ? "✓ " : "+ "} {area}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right contact details column */}
                          <div className="space-y-4 flex flex-col justify-between">
                            <div className="space-y-3">
                              <span className="text-[#999077] uppercase font-bold block text-[10px] border-b border-white/[0.06] pb-1">Corporate Contact Info:</span>
                              <div className="grid grid-cols-1 gap-2.5">
                                <input 
                                  type="text"
                                  required
                                  placeholder="Company / Organization Name"
                                  value={partnerForm.companyName}
                                  onChange={(e) => setPartnerForm({ ...partnerForm, companyName: e.target.value })}
                                  className="p-2.5 bg-obsidian text-white outline-none border border-white/10 focus:border-neon-gold"
                                />
                                <input 
                                  type="text"
                                  required
                                  placeholder="Contact Representative Name"
                                  value={partnerForm.contactPerson}
                                  onChange={(e) => setPartnerForm({ ...partnerForm, contactPerson: e.target.value })}
                                  className="p-2.5 bg-obsidian text-white outline-none border border-white/10 focus:border-neon-gold"
                                />
                                <input 
                                  type="email"
                                  required
                                  placeholder="Official Email Address"
                                  value={partnerForm.email}
                                  onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                                  className="p-2.5 bg-obsidian text-white outline-none border border-white/10 focus:border-neon-gold"
                                />
                                <input 
                                  type="tel"
                                  placeholder="Phone / Whatsapp Number"
                                  value={partnerForm.phone}
                                  onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                                  className="p-2.5 bg-obsidian text-white outline-none border border-white/10 focus:border-neon-gold"
                                />
                                <textarea 
                                  rows={2}
                                  placeholder="Specify any questions, physical logistics, or customization queries..."
                                  value={partnerForm.questions}
                                  onChange={(e) => setPartnerForm({ ...partnerForm, questions: e.target.value })}
                                  className="p-2 bg-obsidian text-white outline-none border border-white/10 focus:border-neon-gold text-[11px]"
                                />
                              </div>
                            </div>

                            {submissionError && (
                              <div className="p-2.5 bg-red-900/30 border border-red-500 text-red-300 font-bold">
                                {submissionError}
                              </div>
                            )}

                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full p-3 bg-neon-gold text-black font-extrabold uppercase hover:bg-white transition-all tracking-wider border border-neon-gold flex items-center justify-center space-x-2 cursor-pointer chamfer-clip"
                            >
                              {isSubmitting ? (
                                <>
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                  <span>TRANSMITTING ALLIANCE BLUEPRINT...</span>
                                </>
                              ) : (
                                <span>SUBMIT PARTNERSHIP PROPOSAL</span>
                              )}
                            </button>
                          </div>
                        </motion.form>
                      ) : (
                        <motion.div 
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.95, opacity: 0 }}
                          className="bg-stone-navy border-2 border-neon-gold p-6 max-w-md mx-auto relative border-glow-gold text-center"
                          id="partner-ticket-view"
                        >
                          <div className="absolute top-0 left-0 w-16 h-16 meander-pattern opacity-10 pointer-events-none" />
                          <div className="w-12 h-12 bg-neon-gold text-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                            <Check className="w-6 h-6" />
                          </div>
                          
                          <h3 className="font-serif text-2xl font-bold text-white mb-1">Partnership Transmitted</h3>
                          <p className="font-mono text-xs text-neon-gold uppercase tracking-wider mb-4">THE ALLIANCE FLAME GLOWS</p>
                          
                          <div className="bg-obsidian border border-white/[0.06] p-4 text-left font-mono text-xs space-y-2 mb-6">
                            <div className="flex justify-between border-b border-white/[0.04] pb-2">
                              <span className="text-[#999077]">ALLIANCE ID</span>
                              <span className="text-white font-bold">{partnerReceipt.partnerId}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/[0.04] pb-2">
                              <span className="text-[#999077]">COMPANY</span>
                              <span className="text-white">{partnerReceipt.companyName}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/[0.04] pb-2">
                              <span className="text-[#999077]">TIER TARGETED</span>
                              <span className="text-neon-gold font-bold">{partnerReceipt.targetTier}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/[0.04] pb-2">
                              <span className="text-[#999077]">CONTRIBUTION</span>
                              <span className="text-white font-bold">₹{partnerReceipt.customAmount}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/[0.04] pb-2">
                              <span className="text-[#999077]">REPRESENTATIVE</span>
                              <span className="text-white">{partnerReceipt.contactPerson}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#999077]">SECURED AT</span>
                              <span className="text-marble/80 text-[10px]">{new Date(partnerReceipt.registeredAt).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="text-marble/85 font-sans text-xs mb-6 text-center leading-relaxed">
                            {partnerReceipt.message} A formal sponsorship agreement document, branding packet, and technical timeline guidebook have been dispatched to <strong className="text-neon-gold">{partnerReceipt.email}</strong>. Our program convenor, Dr. Chandradeep Bhatt, will initiate contact shortly.
                          </div>

                          <div className="flex space-x-3">
                            <button 
                              onClick={() => goToSlide(11)} 
                              className="flex-1 p-2 bg-neon-gold text-black font-bold uppercase text-[11px] hover:bg-white transition-all chamfer-clip-sm cursor-pointer"
                            >
                              View Actions
                            </button>
                            <button 
                              onClick={resetPartnership} 
                              className="p-2 border border-white/20 hover:border-red-500 hover:text-red-400 text-marble/60 text-[11px] font-bold uppercase transition-all chamfer-clip-sm cursor-pointer"
                            >
                              New Proposal
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* SLIDE 11: THE PANTHEON FINALE / CONTACT INFORMATION */}
                {activeSlide === 11 && (
                  <div className="text-center py-4 max-w-4xl mx-auto flex flex-col items-center justify-center relative" id="slide-12">
                    
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="mb-3 text-[11px] font-mono tracking-[0.25em] text-neon-gold uppercase"
                    >
                      SECURE THE FUTURE
                    </motion.div>
                    
                    <h2 className="font-serif text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
                      The Digital Pantheon Awaits Your Contribution
                    </h2>
                    <p className="font-sans text-sm text-marble/80 max-w-2xl mx-auto mb-6">
                      Join us in bridging the gap between classroom theory and high-grade production engineering. Your sponsorship secures India's most promising software developers.
                    </p>

                    {/* Three custom columns representing precisely: CONVENOR, CHANNELS, VENUE */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left font-sans text-xs border-t border-white/[0.08] pt-6 mt-2 pb-6">
                      
                      {/* Convenor */}
                      <div className="space-y-2">
                        <span className="font-mono text-[#999077] text-[10px] uppercase block tracking-wider font-bold">CONVENOR</span>
                        <h4 className="font-serif text-base font-bold text-white">Dr. Chandradeep Bhatt</h4>
                        <p className="text-marble/65 text-[11px]">Coordinator IEEE SB GEHU</p>
                        <p className="text-marble/65 text-[11px] font-mono text-[10px]">Department of Computer Science & Engineering</p>
                      </div>

                      {/* Channels */}
                      <div className="space-y-2">
                        <span className="font-mono text-[#999077] text-[10px] uppercase block tracking-wider font-bold">CHANNELS</span>
                        <div className="space-y-1.5 font-mono text-[11px]">
                          <a href="mailto:gehuieeesb@gmail.com" className="flex items-center space-x-2 text-marble/85 hover:text-neon-gold transition-colors">
                            <Mail className="w-3.5 h-3.5 text-neon-gold" />
                            <span>gehuieeesb@gmail.com</span>
                          </a>
                          <a href="tel:9634074436" className="flex items-center space-x-2 text-marble/85 hover:text-neon-gold transition-colors">
                            <Phone className="w-3.5 h-3.5 text-neon-gold" />
                            <span>+91 96340 74436</span>
                          </a>
                          <a href="https://ieeesoc.gehu.ac.in" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-marble/85 hover:text-neon-gold transition-colors">
                            <Globe className="w-3.5 h-3.5 text-neon-gold" />
                            <span>ieeesoc.gehu.ac.in</span>
                          </a>
                        </div>
                      </div>

                      {/* Venue */}
                      <div className="space-y-2">
                        <span className="font-mono text-[#999077] text-[10px] uppercase block tracking-wider font-bold">VENUE</span>
                        <h4 className="font-serif text-sm font-bold text-white">Graphic Era Hill University</h4>
                        <div className="space-y-0.5 text-marble/65 text-[11px]">
                          <p>Clement Town, Dehradun</p>
                          <p>Uttarakhand, 248002, India</p>
                        </div>
                        <div className="flex items-center space-x-1.5 text-[10px] font-mono text-neon-gold">
                          <MapPin className="w-3 h-3" />
                          <span>Campus Main Amphitheatre</span>
                        </div>
                      </div>

                    </div>

                    <div className="mt-4 flex flex-wrap gap-4 justify-center">
                      <button 
                        onClick={() => goToSlide(10)} 
                        className="px-6 py-3 bg-neon-gold text-black font-mono text-xs tracking-wider font-extrabold uppercase hover:bg-white transition-all border border-neon-gold cursor-pointer chamfer-clip"
                      >
                        Initiate Sponsorship Agreement
                      </button>
                      <button 
                        onClick={() => goToSlide(1)} 
                        className="px-6 py-3 border border-white/20 hover:border-neon-gold font-mono text-xs tracking-wider text-marble transition-all cursor-pointer chamfer-clip"
                      >
                        Replay Presentation
                      </button>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* LOWER HEADER / FOOTER FOOTPRINTS */}
          <footer className="border-t border-white/[0.04] pt-4 pb-2 flex flex-col md:flex-row items-center justify-between z-10 relative text-xs font-mono" id="slide-footer">
            <div className="flex items-center space-x-3 mb-2 md:mb-0 opacity-80 hover:opacity-100 transition-opacity">
              {/* Crest image mock or fallback vector */}
              <div className="w-6 h-6 rounded-full bg-stone-navy flex items-center justify-center text-neon-gold font-black border border-white/10">
                G
              </div>
              <span className="text-[10px] text-marble/60">GRAPHIC ERA HILL UNIVERSITY</span>
            </div>

            <div className="text-[10px] text-marble/50 text-center uppercase tracking-widest mb-2 md:mb-0">
              IEEE SOC 2026 | COPYRIGHT DEPT. CSE GEHU
            </div>

            <div className="flex items-center space-x-3 opacity-80 hover:opacity-100 transition-opacity">
              <span className="text-[10px] text-marble/60">STUDENT BRANCH</span>
              <div className="w-5 h-5 bg-stone-navy border border-[#1572B6]/40 flex items-center justify-center text-[#1572B6]">
                ◆
              </div>
            </div>
          </footer>

        </div>
      </main>

      {/* FIXED SLIDE NUMERICAL NAVIGATOR AT BOTTOM (01 to 11) */}
      <nav className="py-6 px-4 bg-obsidian/95 backdrop-blur-md border-t border-white/[0.04] z-20 relative flex flex-col items-center space-y-4" id="slide-navigator">
        <div className="flex flex-wrap justify-center gap-1.5 md:gap-2.5 max-w-4xl">
          {Array.from({ length: 11 }, (_, i) => i + 1).map((slideNum) => {
            const formattedNum = slideNum < 10 ? `0${slideNum}` : `${slideNum}`;
            const isActive = activeSlide === slideNum;
            return (
              <button
                key={slideNum}
                onClick={() => goToSlide(slideNum)}
                className={`w-10 h-8 md:w-12 md:h-10 text-[10px] font-mono tracking-widest font-extrabold flex items-center justify-center transition-all cursor-pointer rounded-none border ${
                  isActive 
                    ? "bg-stone-navy text-neon-gold border-neon-gold border-glow-gold-active font-black scale-105" 
                    : "bg-stone-navy/40 text-marble/55 border-white/[0.06] hover:bg-stone-navy hover:text-white"
                }`}
                title={`Go to Slide ${formattedNum}`}
              >
                {formattedNum}
              </button>
            );
          })}
        </div>

        {/* Slide Next/Prev controls */}
        <div className="flex items-center space-x-6 text-xs font-mono text-marble/70">
          <button 
            onClick={handlePrevSlide} 
            disabled={activeSlide === 1}
            className="flex items-center space-x-1 hover:text-neon-gold transition-colors disabled:opacity-20 disabled:hover:text-marble/70 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>PREV PILLAR</span>
          </button>
          
          <span className="text-[#999077]">
            SLIDE <strong className="text-white">{activeSlide < 10 ? `0${activeSlide}` : activeSlide}</strong> OF <strong className="text-white">11</strong>
          </span>

          <button 
            onClick={handleNextSlide} 
            disabled={activeSlide === 11}
            className="flex items-center space-x-1 hover:text-neon-gold transition-colors disabled:opacity-20 disabled:hover:text-marble/70 cursor-pointer"
          >
            <span>NEXT PILLAR</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </nav>
    </div>
  );
}
