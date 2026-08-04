export interface PortfolioData {
  personal: {
    name: string;
    headline: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    photoUrl: string;
  };
  social: {
    linkedin: string;
    github: string;
    twitter: string;
    instagram: string;
    facebook: string;
  };
  experience: Array<{
    id: string;
    role: string;
    company: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    techStack: string; // comma separated
    link: string;
  }>;
  skills: string; // comma separated
}

export const defaultPortfolioData: PortfolioData = {
  personal: {
    name: "John Doe",
    headline: "Fullstack Developer",
    bio: "I build modern web applications with passion and precision.",
    email: "john@example.com",
    phone: "",
    location: "Jakarta, Indonesia",
    photoUrl: "https://res.cloudinary.com/dn1sg27e1/image/upload/v1785830943/placeholder-person-4x4_mjkcnf.png",
  },
  social: {
    linkedin: "",
    github: "",
    twitter: "",
    instagram: "",
    facebook: "",
  },
  experience: [
    {
      id: "exp-1",
      role: "Senior Frontend Engineer",
      company: "Tech Corp",
      startDate: "2021",
      endDate: "Present",
      current: true,
      description: "Leading the frontend development team to build modern web applications using Next.js and Tailwind CSS."
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Example project 1",
      description: "A full-stack e-commerce platform with Next.js, Prisma, and Stripe integration.",
      imageUrl: "https://res.cloudinary.com/dn1sg27e1/image/upload/v1785830538/Screenshot_2026-08-04_150156_g0ecb1.png",
      techStack: "Next.js, TypeScript, Tailwind",
      link: "https://example.com"
    },
    {
      id: "proj-2",
      title: "Example project 2",
      description: "A modern web app to generate stunning portfolios easily without writing code.",
      imageUrl: "https://res.cloudinary.com/dn1sg27e1/image/upload/v1785830639/Screenshot_2026-08-04_150328_bvf7f4.png",
      techStack: "React, Tailwind, Node.js",
      link: "https://example.com"
    },
    {
      id: "proj-3",
      title: "Example project 3",
      description: "A seamless mobile-first experience for connecting developers globally.",
      imageUrl: "https://res.cloudinary.com/dn1sg27e1/image/upload/v1785831019/Screenshot_2026-08-04_150946_jnfyj4.png",
      techStack: "React Native, Expo, Firebase",
      link: "https://example.com"
    }
  ],
  skills: "React, Next.js, TypeScript, TailwindCSS, Node.js",
};
