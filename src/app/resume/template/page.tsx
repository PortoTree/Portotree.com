import React from 'react';
import { TemplateGallery } from '@/components/cv-builder/TemplateGallery';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Galeri Template CV - PortoTree',
  description: 'Jelajahi berbagai template CV berstandar ATS dan desain profesional.',
};

export default function PublicTemplateGalleryPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 mt-16 md:mt-20">
        <TemplateGallery isPublic={true} />
      </div>
      <Footer />
    </main>
  );
}
