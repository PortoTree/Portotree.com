"use client";

import React from "react";
import { useBuilderState } from "../useBuilderState";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

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

  if (element.type === 'HEADING' || element.type === 'BADGE' || element.type === 'BUTTON') {
    return (
      <div className="space-y-2 mt-3">
        <Label className="text-xs font-semibold capitalize text-zinc-600">{element.type.toLowerCase()} Text</Label>
        <Input 
          value={element.config?.text || ''} 
          onChange={(e) => updateText(e.target.value)}
          onFocus={onFocus}
          className="h-8 text-sm"
        />
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
        <div className="flex items-center justify-between pb-3 border-b">
          <Label className="font-semibold text-sm">Tampilkan Bagian Ini</Label>
          <Switch checked={section.isActive} onCheckedChange={handleToggle} />
        </div>

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
      
      <div className="flex-1 overflow-y-auto">
        <Accordion className="w-full">
          {sections.filter((s: any) => s.type !== "CANVAS_SETTINGS").map((section: any) => (
            <AccordionItem key={section.id} value={section.id} className="px-5">
              <AccordionTrigger className="text-sm font-semibold capitalize hover:no-underline hover:text-blue-600">
                {section.id.replace('-section', '').replace('-', ' ')}
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
