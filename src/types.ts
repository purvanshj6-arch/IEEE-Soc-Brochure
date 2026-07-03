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

export interface SlideData {
  id: string; // "01", "02", etc.
  title: string;
  subtitle: string;
  description: string;
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
  status: "completed" | "active" | "upcoming";
}

export interface MentorData {
  name: string;
  role: string;
  organization: string;
  avatar?: string;
  specialization: string[];
}
