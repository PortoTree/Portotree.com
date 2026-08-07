"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Bold, Italic, Link as LinkIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify, ChevronDown, RotateCcw } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({ value, onChange, placeholder, className = "" }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showAlign, setShowAlign] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [savedSelection, setSavedSelection] = useState<Range | null>(null);

  const [hasSelection, setHasSelection] = useState(false);
  const [hasFormatting, setHasFormatting] = useState(false);

  // Sync value when changed externally (e.g. opening different items or resetting form)
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      // Only overwrite if the editor is not currently focused to prevent cursor jumping while typing
      if (document.activeElement !== editorRef.current) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value]);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (
        selection && 
        selection.rangeCount > 0 && 
        !selection.isCollapsed && 
        editorRef.current?.contains(selection.anchorNode)
      ) {
        setHasSelection(true);
      } else {
        setHasSelection(false);
      }
    };
    
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  const exec = (command: string, val: string | undefined = undefined) => {
    document.execCommand(command, false, val);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    // Maintain focus
    editorRef.current?.focus();
  };

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html);
      checkFormatting(html);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    // Strip HTML formatting on paste to prevent weird backgrounds/styles
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const checkFormatting = (html: string) => {
    // Check if there are any formatting tags (b, i, a, or inline styles for alignment)
    const formatted = /<(b|i|a|u|strike|font|span|div style)[^>]*>/i.test(html) || /style="/i.test(html);
    setHasFormatting(formatted);
  };

  // Check formatting on mount/initial value
  useEffect(() => {
    checkFormatting(value || '');
  }, [value]);

  const handleReset = () => {
    if (editorRef.current) {
      if (hasSelection) {
        document.execCommand('removeFormat', false, undefined);
      } else {
        // Strip all HTML and keep plain text
        const text = editorRef.current.innerText || '';
        editorRef.current.innerHTML = '';
        document.execCommand('insertText', false, text);
        // Fallback if insertText fails (sometimes it does in older environments, but works in chrome)
        if (editorRef.current.innerHTML === '') {
          editorRef.current.innerText = text;
        }
      }
      const html = editorRef.current.innerHTML;
      onChange(html);
      checkFormatting(html);
      editorRef.current.focus();
    }
  };

  const handleOpenLinkModal = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      setSavedSelection(range);
      setLinkText(selection.toString());
    } else {
      setSavedSelection(null);
      setLinkText('');
    }
    setLinkUrl('https://');
    setShowLinkModal(true);
  };

  const handleAddLink = () => {
    if (!linkUrl || linkUrl === 'https://') {
      setShowLinkModal(false);
      return;
    }

    // Restore selection
    if (savedSelection) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(savedSelection);
      }
    } else {
      editorRef.current?.focus();
    }

    if (linkText && savedSelection && savedSelection.toString() !== linkText) {
      const html = `<a href="${linkUrl}">${linkText}</a>`;
      exec('insertHTML', html);
    } else if (!savedSelection || savedSelection.toString() === '') {
      const html = `<a href="${linkUrl}">${linkText || linkUrl}</a>`;
      exec('insertHTML', html);
    } else {
      exec('createLink', linkUrl);
    }

    setShowLinkModal(false);
    setLinkUrl('');
    setLinkText('');
  };

  return (
    <div className={`border border-slate-300 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-shadow bg-white relative ${className}`}>
      <style>{`
        .rich-text-editor:empty::before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
          display: block;
        }
      `}</style>
      <div className="flex items-center gap-1 border-b border-slate-200 p-2 text-slate-500 bg-slate-50/50 flex-wrap">
        <button type="button" disabled={!hasSelection} onClick={() => exec('bold')} className="p-1.5 hover:bg-slate-200 disabled:hover:bg-transparent rounded transition-colors text-slate-600 disabled:text-slate-300 disabled:cursor-not-allowed" title="Bold">
          <Bold size={16} />
        </button>
        <button type="button" disabled={!hasSelection} onClick={() => exec('italic')} className="p-1.5 hover:bg-slate-200 disabled:hover:bg-transparent rounded transition-colors text-slate-600 disabled:text-slate-300 disabled:cursor-not-allowed" title="Italic">
          <Italic size={16} />
        </button>
        
        <div className="w-[1px] h-4 bg-slate-300 mx-1"></div>
        
        <button type="button" disabled={!hasSelection} onClick={handleOpenLinkModal} className="p-1.5 hover:bg-slate-200 disabled:hover:bg-transparent rounded transition-colors text-slate-600 disabled:text-slate-300 disabled:cursor-not-allowed" title="Link">
          <LinkIcon size={16} />
        </button>
        
        <div className="w-[1px] h-4 bg-slate-300 mx-1"></div>
        
        <div className="relative">
          <button 
            type="button" 
            disabled={!hasSelection}
            onClick={() => setShowAlign(!showAlign)} 
            onBlur={() => setTimeout(() => setShowAlign(false), 200)}
            className="flex items-center gap-0.5 p-1.5 hover:bg-slate-200 disabled:hover:bg-transparent rounded transition-colors text-slate-600 disabled:text-slate-300 disabled:cursor-not-allowed" 
            title="Text Alignment"
          >
            <AlignLeft size={16} />
            <ChevronDown size={14} className="opacity-50" />
          </button>
          
          {showAlign && (
            <div className="absolute top-full mt-1 bg-white border border-slate-200 shadow-md rounded-lg p-1 flex flex-col gap-1 z-10 w-10">
              <button type="button" onClick={() => exec('justifyLeft')} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 flex items-center justify-center">
                <AlignLeft size={16} />
              </button>
              <button type="button" onClick={() => exec('justifyCenter')} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 flex items-center justify-center">
                <AlignCenter size={16} />
              </button>
              <button type="button" onClick={() => exec('justifyRight')} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 flex items-center justify-center">
                <AlignRight size={16} />
              </button>
              <button type="button" onClick={() => exec('justifyFull')} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 flex items-center justify-center">
                <AlignJustify size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="w-[1px] h-4 bg-slate-300 mx-1"></div>

        <button type="button" disabled={!hasFormatting} onClick={handleReset} className="p-1.5 hover:bg-slate-200 disabled:hover:bg-transparent rounded transition-colors text-slate-600 disabled:text-slate-300 disabled:cursor-not-allowed" title="Reset Format">
          <RotateCcw size={16} />
        </button>
      </div>
      <div 
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        onPaste={handlePaste}
        className="rich-text-editor p-3 min-h-[120px] outline-none text-slate-700 [&_b]:font-bold [&_i]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_a]:text-emerald-600 [&_a]:underline"
        data-placeholder={placeholder}
      />
      
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <h3 className="font-semibold text-slate-800">Tambah Link</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm text-slate-600">Teks Link</label>
                <input 
                  type="text" 
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-3 py-2 outline-none text-slate-700 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-slate-600">URL</label>
                <input 
                  type="url" 
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-3 py-2 outline-none text-slate-700 text-sm"
                />
              </div>
            </div>
            <div className="px-4 py-3 border-t border-slate-100 flex justify-end gap-2 bg-slate-50">
              <button 
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-lg transition-colors font-medium"
              >
                Batal
              </button>
              <button 
                type="button"
                onClick={handleAddLink}
                className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
              >
                Tambah Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
