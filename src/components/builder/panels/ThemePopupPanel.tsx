"use client";

import React from 'react';
import { useBuilderState } from "../useBuilderState";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Paintbrush } from "lucide-react";

export function ThemePopupPanel({ state }: { state: ReturnType<typeof useBuilderState> }) {
  const { editingSection, activeElementId, sections, setSections } = state;

  if (!editingSection) return (
    <div className="p-6 text-center text-zinc-500">
      Silakan klik elemen teks atau tombol di kanvas untuk mengubah warnanya.
    </div>
  );

  const updateColor = (key: string, value: string) => {
    if (!activeElementId) {
      // Update section config
      const newSecs = sections.map(s => {
        if (s.id === editingSection.id) {
          return { ...s, config: { ...s.config, [key]: value } };
        }
        return s;
      });
      setSections(newSecs);
      return;
    }

    // Update element config
    const recursivelyUpdate = (els: any[]): any[] => {
      return els.map(e => {
        if (e.id === activeElementId) return { ...e, config: { ...e.config, [key]: value } };
        if (e.elements) return { ...e, elements: recursivelyUpdate(e.elements) };
        return e;
      });
    };
    
    setSections(sections.map((s: any) => {
      if (s.id !== editingSection.id) return s;
      return { ...s, elements: recursivelyUpdate(s.elements) };
    }));
  };

  const currentElement = activeElementId 
    ? (() => {
        const findEl = (els: any[]): any => {
          for (const e of els) {
            if (e.id === activeElementId) return e;
            if (e.elements) {
              const f = findEl(e.elements);
              if (f) return f;
            }
          }
          return null;
        };
        return findEl(editingSection.elements || []);
      })()
    : null;

  const currentConfig = currentElement ? currentElement.config : editingSection.config;
  const isText = currentElement && (currentElement.type === 'HEADING' || currentElement.type === 'TEXT');
  const isButton = currentElement && currentElement.type === 'BUTTON';

  return (
    <div className="w-full bg-white flex flex-col h-full">
      <div className="p-4 border-b bg-zinc-50 flex items-center gap-2">
        <Paintbrush className="w-4 h-4 text-blue-600" />
        <h3 className="font-bold text-sm">Theme / Style Editor</h3>
      </div>
      <div className="p-4 space-y-4">
        {(!activeElementId || isText) && (
          <div className="space-y-2">
            <Label className="text-xs font-semibold">Warna Teks</Label>
            <div className="flex gap-2">
              <Input 
                type="color" 
                value={currentConfig?.textColor || '#000000'}
                onChange={(e) => updateColor('textColor', e.target.value)}
                className="w-10 h-10 p-1"
              />
              <Input 
                type="text" 
                value={currentConfig?.textColor || '#000000'}
                onChange={(e) => updateColor('textColor', e.target.value)}
                className="flex-1 font-mono text-sm"
              />
            </div>
          </div>
        )}

        {isButton && (
          <div className="space-y-2">
            <Label className="text-xs font-semibold">Warna Tombol</Label>
            <div className="flex gap-2">
              <Input 
                type="color" 
                value={currentConfig?.bgColor || '#3b82f6'}
                onChange={(e) => updateColor('bgColor', e.target.value)}
                className="w-10 h-10 p-1"
              />
              <Input 
                type="text" 
                value={currentConfig?.bgColor || '#3b82f6'}
                onChange={(e) => updateColor('bgColor', e.target.value)}
                className="flex-1 font-mono text-sm"
              />
            </div>
          </div>
        )}

        {(!activeElementId) && (
          <div className="space-y-2">
            <Label className="text-xs font-semibold">Background Section</Label>
            <div className="flex gap-2">
              <Input 
                type="color" 
                value={currentConfig?.bgColor || '#ffffff'}
                onChange={(e) => updateColor('bgColor', e.target.value)}
                className="w-10 h-10 p-1"
              />
              <Input 
                type="text" 
                value={currentConfig?.bgColor || '#ffffff'}
                onChange={(e) => updateColor('bgColor', e.target.value)}
                className="flex-1 font-mono text-sm"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
