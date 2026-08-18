import React from 'react';
import { TemplateGallery } from '@/components/cv-builder/TemplateGallery';

export const metadata = {
  title: 'Pilih Template CV - Dashboard PortoTree',
};

export default function DashboardTemplateGalleryPage() {
  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <TemplateGallery isPublic={false} />
    </div>
  );
}
