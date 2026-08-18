import React from 'react';
import { ATSClassic } from '@/components/cv-builder/templates/ATSClassic';
import { ATSModern } from '@/components/cv-builder/templates/ATSModern';
import { ProModern } from '@/components/cv-builder/templates/ProModern';
import { CreativeBlue } from '@/components/cv-builder/templates/CreativeBlue';

export type TemplateTier = 'free' | 'premium' | 'exclusive';

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  tier: TemplateTier;
  price?: number; // Hanya relevan jika tier === 'exclusive'
  component: React.FC<any>; // Menggunakan any sementara, atau jika ada type khusus bisa disesuaikan
}

export const CV_TEMPLATES: CVTemplate[] = [
  {
    id: "ats-classic",
    name: "ATS Classic",
    description: "Desain minimalis, bersih, dan sangat ramah ATS (Applicant Tracking System).",
    thumbnailUrl: "/templates/ats-classic.png", // Nanti bisa diganti dengan path asli jika ada
    tier: "free",
    component: ATSClassic,
  },
  {
    id: "ats-modern",
    name: "ATS Modern",
    description: "Template ATS dengan sentuhan tipografi modern dan aksen garis tepi yang elegan.",
    thumbnailUrl: "/templates/ats-modern.png",
    tier: "free", // Untuk sekarang jadikan free karena ini default, atau premium?
    component: ATSModern,
  },
  {
    id: "pro-modern",
    name: "Pro Modern",
    description: "Desain 2 kolom dengan foto profil dan warna elegan untuk kesan profesional tingkat tinggi.",
    thumbnailUrl: "/placeholder-potret.png",
    tier: "premium",
    component: ProModern,
  },
  {
    id: "creative-blue",
    name: "Creative Blue",
    description: "Desain kreatif dengan gaya pita (ribbon) biru elegan dan dua kolom berlatar kontras.",
    thumbnailUrl: "/placeholder-potret.png",
    tier: "premium",
    component: CreativeBlue,
  },
  // Template masa depan
  // {
  //   id: "creative-pro",
  //   name: "Creative Pro",
  //   description: "Template kreatif untuk desainer atau pekerja kreatif dengan layout 2 kolom.",
  //   thumbnailUrl: "/templates/creative-pro.png",
  //   tier: "premium",
  //   component: CreativeProTemplate,
  // },
  // {
  //   id: "executive-suite",
  //   name: "Executive Suite",
  //   description: "Template eksklusif untuk level manajerial ke atas.",
  //   thumbnailUrl: "/templates/executive-suite.png",
  //   tier: "exclusive",
  //   price: 49000,
  //   component: ExecutiveSuiteTemplate,
  // }
];

export function getTemplateById(id: string): CVTemplate | undefined {
  return CV_TEMPLATES.find((t) => t.id === id) || CV_TEMPLATES[0]; // fallback ke ats-classic
}
