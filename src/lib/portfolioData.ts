export interface PortfolioData {
  personal: {
    name: string;
    headline: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    photoUrl: string;
    hireMeLink?: 'email' | 'whatsapp';
  };
  social?: Array<{
    isDummy?: boolean;
    id: string;
    platform: string;
    username: string;
    url: string;
  }>;
  experience?: Array<{
    isDummy?: boolean;
    id: string;
    role: string;
    company: string;
    location: string;
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
    current: boolean;
    description: string;
  }>;
  education?: Array<{
    isDummy?: boolean;
    id: string;
    level: string;
    degree: string;
    school: string;
    location: string;
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
    current: boolean;
    description: string;
  }>;
  organization?: Array<{
    isDummy?: boolean;
    id: string;
    name: string;
    role: string;
    location: string;
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
    current: boolean;
    description: string;
  }>;
  projects?: Array<{
    isDummy?: boolean;
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    videoUrl?: string;
    techStack: string; // comma separated
    link: string;
  }>;
  certifications?: Array<{
    isDummy?: boolean;
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  }>;
  awards?: Array<{
    isDummy?: boolean;
    id: string;
    title: string;
    issuer: string;
    year: string;
    description: string;
    imageUrl: string;
  }>;
  services?: Array<{
    isDummy?: boolean;
    id: string;
    title: string;
    link: string;
    description: string;
  }>;
  skills?: string; // comma separated
  activeSections?: string[];
}

export const placeholderPortfolioData: PortfolioData = {
  personal: {
    name: "John Doe",
    headline: "Fullstack Developer",
    bio: "I build modern web applications with passion and precision.",
    email: "john@example.com",
    phone: "",
    location: "Jakarta, Indonesia",
    photoUrl: "https://res.cloudinary.com/dn1sg27e1/image/upload/v1785830943/placeholder-person-4x4_mjkcnf.png",
    hireMeLink: "email"
  },
  social: [
    {
      id: "soc-1",
      platform: "LinkedIn",
      username: "",
      url: "https://linkedin.com/in/"
    },
    {
      id: "soc-2",
      platform: "GitHub",
      username: "",
      url: "https://github.com/"
    },
    {
      id: "soc-3",
      platform: "Twitter",
      username: "",
      url: "https://twitter.com/"
    },
    {
      id: "soc-4",
      platform: "Instagram",
      username: "",
      url: "https://instagram.com/"
    },
    {
      id: "soc-5",
      platform: "Facebook",
      username: "",
      url: "https://facebook.com/"
    },
    {
      id: "soc-6",
      platform: "WhatsApp",
      username: "",
      url: "https://wa.me/"
    },
    {
      id: "soc-7",
      platform: "YouTube",
      username: "",
      url: "https://youtube.com/@"
    },
    {
      id: "soc-8",
      platform: "TikTok",
      username: "",
      url: "https://tiktok.com/@"
    }
  ],
  experience: [
    {
      id: "exp-1",
      role: "Senior Frontend Engineer",
      company: "Tech Corp",
      location: "Jakarta, Indonesia",
      startMonth: "Januari",
      startYear: "2021",
      endMonth: "",
      endYear: "",
      current: true,
      description: "Leading the frontend development team to build modern web applications using Next.js and Tailwind CSS."
    }
  ],
  education: [
    {
      id: "edu-1",
      level: "S1",
      degree: "Teknik Informatika",
      school: "Universitas Indonesia",
      location: "Jakarta",
      startMonth: "Agustus",
      startYear: "2016",
      endMonth: "Agustus",
      endYear: "2020",
      current: false,
      description: "Lulus dengan predikat Cum Laude (IPK 3.85)."
    }
  ],
  organization: [
    {
      id: "org-1",
      name: "BEM Universitas Indonesia",
      role: "Ketua Divisi Humas",
      location: "Jakarta",
      startMonth: "Februari",
      startYear: "2018",
      endMonth: "Desember",
      endYear: "2019",
      current: false,
      description: "Bertanggung jawab atas komunikasi internal dan eksternal BEM, serta mengelola media sosial dengan peningkatan interaksi sebesar 40%."
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Example project 1",
      description: "A full-stack e-commerce platform with Next.js, Prisma, and Stripe integration.",
      imageUrl: "https://res.cloudinary.com/dn1sg27e1/image/upload/v1785830538/Screenshot_2026-08-04_150156_g0ecb1.png",
      videoUrl: "",
      techStack: "Next.js, TypeScript, Tailwind",
      link: "https://example.com"
    },
    {
      id: "proj-2",
      title: "Example project 2",
      description: "A modern web app to generate stunning portfolios easily without writing code.",
      imageUrl: "https://res.cloudinary.com/dn1sg27e1/image/upload/v1785830639/Screenshot_2026-08-04_150328_bvf7f4.png",
      videoUrl: "",
      techStack: "React, Tailwind, Node.js",
      link: "https://example.com"
    },
    {
      id: "proj-3",
      title: "Example project 3",
      description: "A seamless mobile-first experience for connecting developers globally.",
      imageUrl: "https://res.cloudinary.com/dn1sg27e1/image/upload/v1785831019/Screenshot_2026-08-04_150946_jnfyj4.png",
      videoUrl: "",
      techStack: "Vue, Firebase, Tailwind",
      link: "https://example.com"
    }
  ],
  certifications: [
    {
      id: "cert-1",
      title: "Google UX Design Professional Certificate",
      description: "Menyelesaikan program intensif UX Design dari Google selama 6 bulan yang mencakup proses desain lengkap dari wireframing hingga prototyping interaktif.",
      imageUrl: "/contoh-sertifikat.jpg"
    }
  ],
  awards: [
    {
      id: "award-1",
      title: "Juara 1 Hackathon Nasional",
      issuer: "Kementerian Kominfo",
      year: "2023",
      description: "Memenangkan juara pertama dari 500+ peserta dengan mengembangkan solusi teknologi untuk UMKM di Indonesia.",
      imageUrl: "/contoh-penghargaan.jpg"
    }
  ],
  services: [
    {
      id: "srv-1",
      title: "Web Development",
      link: "https://wa.me/6281234567890",
      description: "Membangun website modern yang cepat, responsif, dan SEO friendly menggunakan teknologi terbaru seperti Next.js dan Tailwind CSS."
    },
    {
      id: "srv-2",
      title: "UI/UX Design",
      link: "https://wa.me/6281234567890",
      description: "Merancang antarmuka pengguna yang intuitif dan estetis untuk aplikasi web dan mobile guna meningkatkan pengalaman pengguna."
    }
  ],
  skills: "React, Next.js, TypeScript, TailwindCSS, Node.js",
};

export const defaultPortfolioData: PortfolioData = {
  personal: {
    name: "",
    headline: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    photoUrl: "",
    hireMeLink: "email"
  },
  social: [],
  experience: [],
  education: [],
  organization: [],
  projects: [],
  skills: "",
  activeSections: ['education', 'experience', 'organization', 'projects', 'social', 'skills', 'certifications', 'awards', 'services']
};
