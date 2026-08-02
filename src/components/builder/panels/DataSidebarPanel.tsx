"use client";

import React from "react";
import { useBuilderState } from "../useBuilderState";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle } from "lucide-react";

function ElementInput({ element, section, sections, setSections, setActiveElementId, setEditingSection }: any) {
  const updateText = (newText: string) => {
    const recursivelyUpdate = (els: any[]): any[] => {
      return els.map(e => {
        if (e.id === element.id) return { ...e, config: { ...e.config, text: newText } };
        if (e.elements) return { ...e, elements: recursivelyUpdate(e.elements) };
        return e;
      });
    };
    
    setSections(sections.map((s: any) => {
      if (s.id !== section.id) return s;
      return { ...s, elements: recursivelyUpdate(s.elements) };
    }));
  };

  const onFocus = () => {
    setActiveElementId(element.id);
    setEditingSection(section);
  };

  const updateConfig = (key: string, value: any) => {
    const recursivelyUpdate = (els: any[]): any[] => {
      return els.map(e => {
        if (e.id === element.id) return { ...e, config: { ...e.config, [key]: value } };
        if (e.elements) return { ...e, elements: recursivelyUpdate(e.elements) };
        return e;
      });
    };
    setSections(sections.map((s: any) => {
      if (s.id !== section.id) return s;
      return { ...s, elements: recursivelyUpdate(s.elements) };
    }));
  };

  if (element.type === 'HEADING' || element.type === 'BADGE') {
    return (
      <div className="space-y-2 mt-3">
        <Label className="text-xs font-semibold capitalize text-zinc-600">
          {element.type === 'HEADING' ? 'Heading text/name' : 'Badge text'}
        </Label>
        <Input 
          value={element.config?.text || ''} 
          onChange={(e) => updateText(e.target.value)}
          onFocus={onFocus}
          className="h-8 text-sm"
        />
      </div>
    );
  }

  if (element.type === 'BUTTON') {
    return (
      <div className="space-y-4 mt-4 border p-3 rounded bg-zinc-50">
        <div className="space-y-2">
          <Label className="text-xs font-semibold capitalize text-zinc-600">Button text</Label>
          <Input 
            value={element.config?.text || ''} 
            onChange={(e) => updateConfig('text', e.target.value)}
            onFocus={onFocus}
            className="h-8 text-sm"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-zinc-600">Button option</Label>
          <div className="flex gap-2">
            <button
              onClick={() => updateConfig('actionType', 'whatsapp')}
              className={`flex-1 py-1 flex justify-center items-center rounded border ${element.config?.actionType === 'whatsapp' ? 'bg-green-100 border-green-500 text-green-600' : 'bg-white hover:bg-zinc-50 text-zinc-400'}`}
              title="WhatsApp"
            >
              <img src="/whatsapp.webp" alt="WhatsApp" className="w-5 h-5 object-contain" />
            </button>
            <button
              onClick={() => updateConfig('actionType', 'gmail')}
              className={`flex-1 py-1 flex justify-center items-center rounded border ${element.config?.actionType === 'gmail' ? 'bg-red-100 border-red-500 text-red-600' : 'bg-white hover:bg-zinc-50 text-zinc-400'}`}
              title="Gmail"
            >
              <img src="/gmail.webp" alt="Gmail" className="w-5 h-5 object-contain" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold text-zinc-600">button link</Label>
          <div className="flex items-center">
            {element.config?.actionType === 'whatsapp' && (
              <span className="h-8 flex items-center text-xs font-medium text-zinc-500 whitespace-nowrap bg-zinc-100 px-2 rounded-l border-y border-l border-zinc-200">https://wa.me/</span>
            )}
            <Input 
              type={element.config?.actionType === 'gmail' ? 'email' : 'text'}
              value={element.config?.link || ''} 
              onChange={(e) => {
                let val = e.target.value;
                if (element.config?.actionType === 'whatsapp') {
                  // Only allow numbers for WhatsApp
                  val = val.replace(/\D/g, '');
                }
                updateConfig('link', val);
              }}
              onFocus={onFocus}
              className={`h-8 text-sm w-full ${element.config?.actionType === 'whatsapp' ? 'rounded-l-none' : ''} ${
                element.config?.actionType === 'gmail' && 
                element.config?.link && 
                !element.config?.link.includes('@') 
                  ? 'border-red-500 focus-visible:ring-red-500' 
                  : ''
              }`}
              placeholder={element.config?.actionType === 'gmail' ? 'email@anda.com' : '62812345678'}
            />
          </div>
          {element.config?.actionType === 'gmail' && element.config?.link && !element.config?.link.includes('@') && (
            <p className="text-[10px] text-red-500 font-medium mt-1">
              Email wajib menggunakan tanda @
            </p>
          )}
        </div>
      </div>
    );
  }

  if (element.type === 'NAVIGATION') {
    return (
      <div className="space-y-3 mt-4 border p-3 rounded bg-zinc-50">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold text-zinc-600">Navigasi komponen</Label>
          <Switch 
            checked={element.config?.showNavigation !== false} 
            onCheckedChange={(checked) => updateConfig('showNavigation', checked)} 
          />
        </div>
        <p className={`text-xs text-slate-500 italic px-1 leading-relaxed`}>
          Otomatis muncul pada versi dekstop, pada versi mobile tetap di sembunyikan
        </p>

        {element.config?.showNavigation !== false && (
          <div className="mt-4 pt-4 border-t border-zinc-200 space-y-4">
            <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Tampilkan Menu:</Label>
            {sections
              .filter((s: any) => s.type === 'SECTION' && !s.id.includes('footer') && s.id !== 'hero-section')
              .map((s: any) => {
              const isHidden = element.config?.hiddenNavItems?.includes(s.id);
              
              // Extract title from first HEADING element
              const findHeading = (elements: any[]): string | null => {
                if (!elements) return null;
                for (const el of elements) {
                  if (el.type === 'HEADING' && el.config?.text) return el.config.text;
                  if (el.children) {
                    const childHeading = findHeading(el.children);
                    if (childHeading) return childHeading;
                  }
                  if (el.elements) {
                    const subHeading = findHeading(el.elements);
                    if (subHeading) return subHeading;
                  }
                }
                return null;
              };
              
              const headingText = findHeading(s.elements);
              let label = s.id;
              if (headingText) {
                label = headingText.replace(/<[^>]*>?/gm, '');
                if (label === label.toUpperCase()) {
                  label = label.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
                }
              } else {
                label = s.id.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
              }
              
              return (
                <div key={s.id} className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-700 capitalize">{label}</span>
                  <Switch 
                    checked={!isHidden}
                    onCheckedChange={(checked) => {
                      let hiddenItems = [...(element.config?.hiddenNavItems || [])];
                      if (!checked) {
                        hiddenItems.push(s.id);
                      } else {
                        hiddenItems = hiddenItems.filter((id: string) => id !== s.id);
                      }
                      updateConfig('hiddenNavItems', hiddenItems);
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }


  if (element.type === 'TEXT') {
    return (
      <div className="space-y-2 mt-3">
        <Label className="text-xs font-semibold text-zinc-600">Description</Label>
        <Textarea 
          value={element.config?.text || ''} 
          onChange={(e) => updateText(e.target.value)}
          onFocus={onFocus}
          className="text-sm min-h-[80px]"
        />
      </div>
    );
  }

  return null;
}

const SECTION_TRANSLATIONS: Record<string, string> = {
  "hero-section": "Beranda",
  "about-section": "Tentang",
  "skill-section": "Keahlian",
  "services-section": "Layanan",
  "portfolio-section": "Portofolio",
  "experience-section": "Pengalaman",
  "stats-section": "Statistik",
  "tech-section": "Teknologi",
  "contact-section": "Kontak",
};

export function DataSidebarPanel({ state }: { state: ReturnType<typeof useBuilderState> }) {
  const { sections, setSections, setActiveElementId, setEditingSection } = state;

  const renderElements = (elements: any[], section: any): any => {
    if (!elements) return null;
    return elements.map(el => (
      <React.Fragment key={el.id}>
        <ElementInput 
          element={el} 
          section={section} 
          sections={sections} 
          setSections={setSections}
          setActiveElementId={setActiveElementId}
          setEditingSection={setEditingSection}
        />
        {el.elements && renderElements(el.elements, section)}
      </React.Fragment>
    ));
  };

  const renderSectionForm = (section: any) => {
    if (section.type === "CANVAS_SETTINGS") return null;

    const handleToggle = (checked: boolean) => {
      setSections(sections.map((s: any) => s.id === section.id ? { ...s, isActive: checked } : s));
    };

    return (
      <div className="space-y-4 pt-2">
        {section.type !== 'HEADER' && (
          <div className="flex items-center justify-between pb-3 border-b">
            <Label className="font-semibold text-sm">Tampilkan Bagian Ini</Label>
            <Switch checked={section.isActive} onCheckedChange={handleToggle} />
          </div>
        )}

        {/* If active, map the elements into inputs */}
        <div className={`transition-all ${!section.isActive ? 'opacity-50 pointer-events-none' : ''}`}>
           {renderElements(section.elements, section)}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-white border-r custom-scrollbar flex flex-col">
      <div className="p-5 border-b bg-zinc-50 shrink-0">
        <h2 className="font-bold text-lg text-zinc-900">Konten Portofolio</h2>
        <p className="text-xs text-zinc-500 mt-1">Atur isi teks, gambar, dan visibilitas setiap bagian portofolio Anda.</p>
      </div>
      
      <div className="flex-1 pb-10">
        <Accordion className="w-full">
          {sections.filter((s: any) => s.type !== "CANVAS_SETTINGS").map((section: any) => (
            <AccordionItem key={section.id} value={section.id} className="px-5">
              <AccordionTrigger className="text-sm font-semibold capitalize hover:no-underline hover:text-blue-600">
                {SECTION_TRANSLATIONS[section.id] || section.id.replace('-section', '').replace('-', ' ')}
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                {renderSectionForm(section)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
